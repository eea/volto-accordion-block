import accordionSVG from '@plone/volto/icons/list-arrows.svg';
import {
  AccordionBlockEdit,
  AccordionBlockView,
  AccordionLayoutSchema,
  AccordionStylingSchema,
} from './components';
import { PanelsWidget } from '@eeacms/volto-accordion-block/components';
import rightSVG from '@plone/volto/icons/right-key.svg';
import leftSVG from '@plone/volto/icons/left-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import filterSVG from '@plone/volto/icons/filter.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import { defineMessages, createIntlCache, createIntl } from 'react-intl';

const messages = defineMessages({
  accordionTitle: {
    id: 'Accordion',
    defaultMessage: 'Accordion',
  },
});

const cache = createIntlCache();

const intl = createIntl(
  {
    locale: 'en',
    messages: messages,
  },
  cache,
);

const extendedSchema = (config) => {
  const choices = Object.keys(config.blocks.blocksConfig)
    .map((key) => {
      if (config.blocks.blocksConfig[key]?.restricted) {
        return false;
      } else {
        const title = config.blocks.blocksConfig[key]?.title || key;
        return [key, title];
      }
    })
    .filter((val) => !!val);

  choices.push(['accordion', intl.formatMessage(messages.accordionTitle)]);
  const accordionLayoutSchema = AccordionLayoutSchema(intl);

  return {
    ...accordionLayoutSchema,
    properties: {
      ...accordionLayoutSchema.properties,
      allowedBlocks: {
        ...accordionLayoutSchema.properties.allowedBlocks,
        items: {
          choices: choices,
        },
      },
    },
  };
};

const applyConfig = (config) => {
  config.blocks.blocksConfig.accordion = {
    id: 'accordion',
    title: intl.formatMessage(messages.accordionTitle),
    icon: accordionSVG,
    group: 'common',
    titleIcons: {
      closed: { leftPosition: rightSVG, rightPosition: leftSVG },
      opened: { leftPosition: downSVG, rightPosition: downSVG },
      filtered: { leftPosition: clearSVG, rightPosition: clearSVG },
      unfiltered: { leftPosition: filterSVG, rightPosition: filterSVG },
      size: '24px',
      iconComponent: 'VoltoIcon', // other option is SemanticIcon
    },
    view: AccordionBlockView,
    edit: AccordionBlockEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    schema: extendedSchema(config),
    schemaEnhancer: AccordionStylingSchema,
    // See https://react.semantic-ui.com/modules/accordion/
    options: {
      styled: true,
      fluid: true,
    },
    defaults: {},
    security: {
      addPermission: [],
      view: [],
    },
  };
  config.widgets.type.panels = PanelsWidget;
  return config;
};

export default applyConfig;
