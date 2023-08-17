import React from 'react';
import View from './View';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';
import * as utils from './util';
import '@testing-library/jest-dom/extend-expect';

config.blocks.blocksConfig.accordion = {
  ...config.blocks.blocksConfig.accordion,
  titleIcons: {
    opened: {
      rightPosition: 'chevron left',
      leftPosition: 'chevron right',
    },
    closed: {
      rightPosition: 'chevron down',
      leftPosition: 'chevron down',
    },
    size: 'tiny',
    iconComponent: 'SemanticIcon',
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
  getPanels: () => [['id1', { title: 'Panel 1' }]],
  accordionBlockHasValue: jest.fn(),
  Icon: () => <div>Icon</div>,
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
    utils.accordionBlockHasValue.mockReturnValue(true);
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

  it('renders null', () => {
    utils.accordionBlockHasValue.mockReturnValue(false);
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
    utils.accordionBlockHasValue.mockReturnValue(true);
    const { rerender, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <View data={mockData} />
        </MemoryRouter>
      </Provider>,
    );
    expect(getByText('Panel 1')).toBeInTheDocument();

    rerender(
      <Provider store={store}>
        <MemoryRouter>
          <View data={mockData1} />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('should open accordion content when title is clicked', () => {
    utils.accordionBlockHasValue.mockReturnValue(true);
    const { container, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <View data={mockData} />
        </MemoryRouter>
      </Provider>,
    );
    const accordionTitle = container.querySelector('.accordion-title');
    fireEvent.click(accordionTitle);

    const contentElement = getByText('RenderBlocks');
    expect(contentElement).toBeInTheDocument();
  });

  it('should open accordion content when title is clicked', () => {
    utils.accordionBlockHasValue.mockReturnValue(true);
    const { container, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <View data={{ ...mockData, non_exclusive: false }}>
            <p>Accordion Content</p>
          </View>
        </MemoryRouter>
      </Provider>,
    );
    const accordionTitle = container.querySelector('.accordion-title');
    fireEvent.click(accordionTitle);

    const contentElement = getByText('RenderBlocks');
    expect(contentElement).toBeInTheDocument();
  });

  it('should open accordion content when Enter key is pressed', () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <View data={mockData} />
        </MemoryRouter>
      </Provider>,
    );

    const accordionTitle = container.querySelector('.accordion-title');
    fireEvent.keyDown(accordionTitle, { keyCode: 13 });

    const contentElement = getByText('RenderBlocks');
    expect(contentElement).toBeInTheDocument();
  });
});
