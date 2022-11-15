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

  choices.push(['accordion', 'Accordion']);

  return {
    ...AccordionLayoutSchema,
    properties: {
      ...AccordionLayoutSchema.properties,
      allowedBlocks: {
        ...AccordionLayoutSchema.properties.allowedBlocks,
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
    title: 'Accordion',
    icon: accordionSVG,
    group: 'common',
    titleIcons: {
      closed: { leftPosition: rightSVG, rightPosition: leftSVG },
      opened: { leftPosition: downSVG, rightPosition: downSVG },
      size: '24px',
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
      styled: 'styled',
      fluid: 'fluid',
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
