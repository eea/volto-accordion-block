import React from 'react';
import { Accordion, Input } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { Icon } from './util';
import './editor.less';

const messages = defineMessages({
  placeholder: {
    id: 'Type to filter...',
    defaultMessage: 'Type to filter...',
  },
});

const AccordionFilter = ({
  config,
  data,
  filterValue,
  handleFilteredValueChange,
}) => {
  const intl = useIntl();
  const { titleIcons } = config;
  const iconOnRight = data.right_arrows;
  const iconPosition = iconOnRight ? 'rightPosition' : 'leftPosition';
  return (
    <Accordion
      className={`styled ${
        data.styles ? data.styles.theme : config?.defaults?.theme
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
          options={titleIcons}
          onClick={() => handleFilteredValueChange('')}
        />
        <Input
          fluid
          className="input-accordion-title"
          transparent
          placeholder={intl.formatMessage(messages.placeholder)}
          value={filterValue}
          onChange={(e) => handleFilteredValueChange(e.target.value)}
        />
      </Accordion.Title>
    </Accordion>
  );
};

export default AccordionFilter;
