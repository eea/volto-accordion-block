import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Edit from './Edit';
import config from '@plone/volto/registry';

jest.mock('@plone/volto/components', () => ({
  BlocksForm: jest.fn(
    ({ children, onSelectBlock, onChangeFormData, properties }) => {
      const blockList = properties.blocks
        ? Object.entries(properties.blocks)
        : [];
      return (
        <div>
          {blockList.map(([blockId, blockData], index) => (
            <div key={blockId}>
              {children(
                {
                  child: blockData,
                  childId: blockId,
                  index,
                },
                <div>EditBlock</div>,
                {
                  allowedBlocks: [],
                  block: blockId,
                  data: blockData,
                  id: blockId,
                  index,
                  onChangeBlock: jest.fn(),
                  onSelectBlock,
                  onChangeFormData,
                  properties,
                  selected: false,
                  type: blockData['@type'],
                },
              )}
            </div>
          ))}
        </div>
      );
    },
  ),
  Icon: () => <div>Icon</div>,
  SidebarPortal: ({ children }) => <div>{children}</div>,
  BlocksToolbar: () => <div>BlocksToolbar</div>,
  BlockDataForm: () => <div>BlockDataForm</div>,
}));

jest.mock('@plone/volto/helpers', () => ({
  withBlockExtensions: jest.fn((Component) => Component),
  emptyBlocksForm: jest.fn(),
  getBlocksLayoutFieldname: () => 'blocks_layout',
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
    unfiltered: {
      rightPosition: 'chevron left',
      leftPosition: 'chevron right',
    },
    filtered: {
      rightPosition: 'chevron down',
      leftPosition: 'chevron down',
    },
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
  data: {
    blocks: {
      1: {
        '@type': 'accordionPanel',
        title: 'Panel 1',
        blocks_layout: {
          items: ['block1', 'block2'],
        },
      },
      2: {
        '@type': 'accordionPanel',
        title: 'Panel 2',
        blocks_layout: {
          items: ['block3', 'block4'],
        },
      },
    },
    blocks_layout: {
      items: ['1', '2'],
    },
  },
};

describe('Edit Component', () => {
  it('renders the accordion title correctly', () => {
    const onChangeBlock = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Edit data={mockData} onChangeBlock={onChangeBlock} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Accordion')).toBeInTheDocument();
  });

  it('renders the accordion panels correctly', () => {
    const onChangeBlock = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Edit data={mockData} onChangeBlock={onChangeBlock} />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByDisplayValue('Panel 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Panel 2')).toBeInTheDocument();
  });

  it('calls onChangeBlock when the title changes', () => {
    const onChangeBlock = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Edit data={mockData} onChangeBlock={onChangeBlock} />
        </MemoryRouter>
      </Provider>,
    );
    const titleInput = screen.getByDisplayValue('Panel 1');
    fireEvent.change(titleInput, { target: { value: 'New Panel Title' } });
    expect(onChangeBlock).toHaveBeenCalled();
  });

  it('filters the accordion panels based on the filter value', () => {
    const onChangeBlock = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Edit
            data={{ ...mockData, filtering: true }}
            onChangeBlock={onChangeBlock}
          />
        </MemoryRouter>
      </Provider>,
    );
    const filterInput = screen.getByPlaceholderText('Type to filter...');
    fireEvent.change(filterInput, { target: { value: 'Panel 1' } });

    expect(screen.getByPlaceholderText('Enter Title')).toHaveDisplayValue(
      'Panel 1',
    );
    expect(screen.queryByDisplayValue('Panel 2')).not.toBeInTheDocument();
  });

  it('renders the block toolbar when a block is selected', () => {
    const onChangeBlock = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Edit data={mockData} selected={true} onChangeBlock={onChangeBlock} />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('BlocksToolbar')).toBeInTheDocument();
  });

  it('renders the block data form in the sidebar portal', () => {
    const onChangeBlock = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Edit data={mockData} selected={true} onChangeBlock={onChangeBlock} />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('BlockDataForm')).toBeInTheDocument();
  });
});
