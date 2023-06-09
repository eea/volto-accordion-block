import React from 'react';
import View from './View';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';
import '@testing-library/jest-dom/extend-expect';

config.blocks.blocksConfig.accordion = {
  ...config.blocks.blocksConfig.accordion,
  titleIcons: {
    opened: {
      rightPosition: '',
      leftPosition: '',
    },
    closed: {
      rightPosition: '',
      leftPosition: '',
    },
    size: '10px',
  },
};

const mockStore = configureStore();
const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

jest.mock('@plone/volto/helpers', () => ({
  withBlockExtensions: jest.fn((Component) => Component),
}));

jest.mock('@plone/volto/components', () => ({
  RenderBlocks: jest.fn(() => <div>RenderBlocks</div>),
  Icon: () => <div>Icon</div>,
}));

jest.mock('./util', () => ({
  getPanels: () => [
    ['id1', { title: 'Panel 1' }],
    ['id2', { title: 'Panel 2' }],
  ],
  accordionBlockHasValue: () => true,
}));

const mockData = {
  title_size: 'h3',
  right_arrows: true,
  collapsed: false,
  exclusive: false,
  non_exclusive: true,
  styles: {
    theme: 'default',
  },
};

const mockData1 = {
  title_size: 'h3',
  right_arrows: false,
  collapsed: true,
  exclusive: false,
  non_exclusive: true,
};

describe('View Component', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <View data={mockData} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders with panels', () => {
    const { rerender, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <View data={mockData} />
        </MemoryRouter>
      </Provider>,
    );
    expect(getByText('Panel 1')).toBeInTheDocument();
    expect(getByText('Panel 2')).toBeInTheDocument();

    rerender(
      <Provider store={store}>
        <MemoryRouter>
          <View data={mockData1} />
        </MemoryRouter>
      </Provider>,
    );
  });
});
