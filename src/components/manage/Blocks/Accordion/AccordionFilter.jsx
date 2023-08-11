import React from 'react';
import { Accordion, Input, Icon } from 'semantic-ui-react';
import './editor.less';

const AccordionFilter = ({
  config,
  data,
  filterValue,
  handleFilteredValueChange,
}) => {
  const accordionConfig = config.blocks.blocksConfig.accordion;

  return (
    <Accordion
      className={`${
        data.styles ? data.styles.theme : accordionConfig?.defaults?.theme
      }`}
    >
      <Accordion.Title className="accordion-title filter align-arrow-right">
        {filterValue === '' ? (
          <Icon className="ri-filter-3-line" />
        ) : (
          <Icon
            className="ri-close-line"
            onClick={() => handleFilteredValueChange('')}
          />
        )}
        <Input
          fluid
          className="input-accordion-title"
          transparent
          placeholder="Type to filter..."
          value={filterValue}
          onChange={(e) => handleFilteredValueChange(e.target.value)}
        />
      </Accordion.Title>
    </Accordion>
  );
};

export default AccordionFilter;
