import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import AccordionFilter from './AccordionFilter';
import '@testing-library/jest-dom/extend-expect';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('AccordionFilter', () => {
  const accordionConfig = {
    defaults: {
      theme: 'defaultTheme',
    },
    titleIcons: {
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

  const handleFilteredValueChange = jest.fn();
  let filterValue = '';
  const data = {
    styles: {
      theme: 'custom-theme',
    },
    right_arrows: true,
  };

  it('renders correctly with default props', () => {
    const { container } = render(
      <Provider store={store}>
        <AccordionFilter
          config={accordionConfig}
          data={data}
          filterValue={filterValue}
          handleFilteredValueChange={handleFilteredValueChange}
        />
      </Provider>,
    );

    // Assert that Accordion, Accordion.Title, Icon, and Input components are rendered
    expect(container.querySelector('.accordion')).toBeInTheDocument();
    expect(container.querySelector('.accordion-title')).toBeInTheDocument();
    expect(container.querySelector('input')).toBeInTheDocument();
    expect(container.querySelector('i')).toBeInTheDocument();
  });

  it('calls handleFilteredValueChange when input value changes', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <AccordionFilter
          config={accordionConfig}
          data={data}
          filterValue={filterValue}
          handleFilteredValueChange={handleFilteredValueChange}
        />
      </Provider>,
    );

    const input = getByPlaceholderText('Type to filter...');
    fireEvent.change(input, { target: { value: 'new filter text' } });

    expect(handleFilteredValueChange).toHaveBeenCalledWith('new filter text');
  });

  it('calls handleFilteredValueChange when icon is clicked', () => {
    const { container } = render(
      <Provider store={store}>
        <AccordionFilter
          config={accordionConfig}
          data={data}
          filterValue={filterValue}
          handleFilteredValueChange={handleFilteredValueChange}
        />
      </Provider>,
    );

    const icon = container.querySelector('i');
    fireEvent.click(icon);

    expect(handleFilteredValueChange).toHaveBeenCalledWith('');
  });

  it('renders with different class without right_arrow', () => {
    data.right_arrows = false;
    data.styles = false;
    const { container } = render(
      <Provider store={store}>
        <AccordionFilter
          config={accordionConfig}
          data={data}
          filterValue={filterValue}
          handleFilteredValueChange={handleFilteredValueChange}
        />
      </Provider>,
    );

    expect(container.querySelector('.align-arrow-left')).toBeInTheDocument();
  });

  it('renders with filtered icon', () => {
    filterValue = 'value';
    const { container } = render(
      <Provider store={store}>
        <AccordionFilter
          config={accordionConfig}
          data={data}
          filterValue={filterValue}
          handleFilteredValueChange={handleFilteredValueChange}
        />
      </Provider>,
    );

    expect(container.querySelector('.chevron.down')).toBeInTheDocument();
  });
});
