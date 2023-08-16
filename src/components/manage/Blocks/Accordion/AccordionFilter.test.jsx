import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import AccordionFilter from './AccordionFilter';
import config from '@plone/volto/registry';
import '@testing-library/jest-dom/extend-expect';

config.blocks.blocksConfig.accordion = {
  ...config.blocks.blocksConfig.accordion,
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
const accordionConfig = config.blocks.blocksConfig.accordion;
const data = {
  styles: {
    theme: 'custom-theme',
  },
  right_arrows: true,
};

describe('AccordionFilter', () => {
  it('renders correctly with default props', () => {
    const { container } = render(
      <AccordionFilter
        config={accordionConfig}
        data={data}
        filterValue={filterValue}
        handleFilteredValueChange={handleFilteredValueChange}
      />,
    );

    // Assert that Accordion, Accordion.Title, Icon, and Input components are rendered
    expect(container.querySelector('.accordion')).toBeInTheDocument();
    expect(container.querySelector('.accordion-title')).toBeInTheDocument();
    expect(container.querySelector('input')).toBeInTheDocument();
    expect(container.querySelector('i')).toBeInTheDocument();
  });

  it('calls handleFilteredValueChange when input value changes', () => {
    const { getByPlaceholderText } = render(
      <AccordionFilter
        config={accordionConfig}
        data={data}
        filterValue={filterValue}
        handleFilteredValueChange={handleFilteredValueChange}
      />,
    );

    const input = getByPlaceholderText('Type to filter...');
    fireEvent.change(input, { target: { value: 'new filter text' } });

    expect(handleFilteredValueChange).toHaveBeenCalledWith('new filter text');
  });

  it('calls handleFilteredValueChange when icon is clicked', () => {
    const { container } = render(
      <AccordionFilter
        config={accordionConfig}
        data={data}
        filterValue={filterValue}
        handleFilteredValueChange={handleFilteredValueChange}
      />,
    );

    const icon = container.querySelector('i');
    fireEvent.click(icon);

    expect(handleFilteredValueChange).toHaveBeenCalledWith('');
  });

  it('renders with different class without right_arrow', () => {
    data.right_arrows = false;
    data.styles = false;
    const { container } = render(
      <AccordionFilter
        config={accordionConfig}
        data={data}
        filterValue={filterValue}
        handleFilteredValueChange={handleFilteredValueChange}
      />,
    );

    expect(container.querySelector('.align-arrow-left')).toBeInTheDocument();
  });

  it('renders with filtered icon', () => {
    filterValue = 'value';
    const { container } = render(
      <AccordionFilter
        config={accordionConfig}
        data={data}
        filterValue={filterValue}
        handleFilteredValueChange={handleFilteredValueChange}
      />,
    );

    expect(container.querySelector('.chevron.down')).toBeInTheDocument();
  });
});