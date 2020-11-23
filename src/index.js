import accordionSVG from '@eeacms/volto-accordion-block/icons/accordion.svg';
import {
  AccordionBlockEdit,
  AccordionBlockView,
  AccordionBlockSchema,
} from './components';
import { PanelWidget } from '@eeacms/volto-accordion-block/components';
import { options } from '@eeacms/volto-accordion-block/components';

const applyConfig = (config) => {
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

  const schema = {
    ...AccordionBlockSchema,
    properties: {
      ...AccordionBlockSchema.properties,
      allowedBlocks: {
        ...AccordionBlockSchema.properties.allowedBlocks,
        items: {
          choices: choices,
        },
      },
    },
  };
  config.blocks.blocksConfig.accordion = {
    id: 'accordion',
    title: 'Accordion',
    icon: accordionSVG,
    group: 'common',
    view: AccordionBlockView,
    edit: AccordionBlockEdit,
    schema: schema,
    restricted: false,
    options,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };
  config.widgets.type.panels = PanelWidget;
  return config;
};

export default applyConfig;
