import { jest } from '@jest/globals';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import config from '@plone/volto/registry';
import { blocksConfig } from '@plone/volto/config/Blocks';
import installSlate from '@plone/volto-slate/index';

var mockSemanticComponents = jest.requireActual('semantic-ui-react');
var mockComponents = jest.requireActual('@plone/volto/components');

jest.doMock('semantic-ui-react', () => ({
  __esModule: true,
  ...mockSemanticComponents,
  Popup: ({ content, trigger }) => {
    return (
      <div className="popup">
        <div className="trigger">{trigger}</div>
        <div className="content">{content}</div>
      </div>
    );
  },
}));

jest.doMock('@plone/volto/components', () => {
  return {
    __esModule: true,
    ...mockComponents,
    SidebarPortal: ({ children }) => <div id="sidebar">{children}</div>,
  };
});

const mockStore = configureStore([thunk]);

config.blocks.blocksConfig = {
  ...blocksConfig,
  ...config.blocks.blocksConfig,
};

[installSlate].reduce((acc, apply) => apply(acc), config);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

global.store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
    formatMessage: jest.fn(),
  },
  content: {
    create: {},
    subrequests: [],
  },
  connected_data_parameters: {},
  screen: {
    page: {
      width: 768,
    },
  },
});
