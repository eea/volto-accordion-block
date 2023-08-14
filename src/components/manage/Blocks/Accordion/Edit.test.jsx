import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Edit from './Edit';
import config from '@plone/volto/registry';

jest.mock('@plone/volto/components', () => ({
  BlocksForm: jest.fn(() => <div>RenderBlocks</div>),
  Icon: () => <div>Icon</div>,
  SidebarPortal: () => <div>SidebarPortal</div>,
  BlocksToolbar: () => <div>BlocksToolbar</div>,
  BlockDataForm: () => <div>BlockDataForm</div>,
}));

jest.mock('@plone/volto/helpers', () => ({
  withBlockExtensions: jest.fn((Component) => Component),
  emptyBlocksForm: jest.fn(),
}));

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

const mockData = {
  title: 'Accordion',
};

describe('Edit Component', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Edit data={mockData} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
