import React from 'react';
import { Accordion, Input } from 'semantic-ui-react';
import { Icon } from './util';
import './editor.less';

const AccordionFilter = ({
  config,
  data,
  filterValue,
  handleFilteredValueChange,
}) => {
  const accordionConfig = config.blocks.blocksConfig.accordion;
  const { titleIcons } = accordionConfig;
  const iconOnRight = data.right_arrows;
  const iconPosition = iconOnRight ? 'rightPosition' : 'leftPosition';
  return (
    <Accordion
      className={`styled ${
        data.styles ? data.styles.theme : accordionConfig?.defaults?.theme
      }`}
    >
      <Accordion.Title
        className={
          'accordion-title filter ' +
          (data.right_arrows ? 'align-arrow-right' : 'align-arrow-left')
        }
      >
        <Icon
          name={
            filterValue === ''
              ? titleIcons.unfiltered[iconPosition]
              : titleIcons.filtered[iconPosition]
          }
          onClick={() => handleFilteredValueChange('')}
        />
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
