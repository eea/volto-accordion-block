import React from 'react';
import View from './View';
import { render, fireEvent, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter, Route } from 'react-router-dom';
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
    unfiltered: {
      rightPosition: 'chevron left',
      leftPosition: 'chevron right',
    },
    filtered: {
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

const mockData2 = {
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
  right_arrows: false,
  non_exclusive: true,
  collapsed: false,
  filtering: false,
};

describe('View Component', () => {
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

  it('filters the accordion panels based on the filter value', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <View data={{ ...mockData2, filtering: true }} />
        </MemoryRouter>
      </Provider>,
    );

    const filterInput = screen.getByPlaceholderText('Type to filter...');
    fireEvent.change(filterInput, { target: { value: 'Panel 1' } });

    expect(screen.getByText('Panel 1')).toBeInTheDocument();
    expect(screen.queryByText('Panel 2')).not.toBeInTheDocument();
  });

  it('updates the URL query parameter when a panel is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <View data={mockData2} />
          <Route
            path="*"
            render={({ location }) => <div>{location.search}</div>}
          />
        </MemoryRouter>
      </Provider>,
    );

    const panel1Title = screen.getByText('Panel 1');
    fireEvent.click(panel1Title);

    expect(screen.getByText('?activeAccordion=')).toBeInTheDocument();
  });

  it('renders the accordion panels in diff view mode', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/diff']}>
          <View data={mockData2} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('RenderBlocks')).toBeInTheDocument();
  });
});
