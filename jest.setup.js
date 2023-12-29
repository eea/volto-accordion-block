import { jest } from '@jest/globals';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

global.store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
  content: {
    create: {},
    subrequests: [],
  },
  connected_data_parameters: {},
});

const mockSemanticComponents = jest.requireActual('semantic-ui-react');
const mockComponents = jest.requireActual('@plone/volto/components');

jest.mock('semantic-ui-react', () => ({
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
    Toast: ({ children }) => <div className="toast">{children}</div>,
    SidebarPortal: ({ children }) => <div id="sidebar">{children}</div>,
    UniversalLink: ({ children, href }) => {
      return <a href={href}>{children}</a>;
    },
  };
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);
