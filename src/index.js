import accordionSVG from '@eeacms/volto-accordion-block/icons/accordion.svg';
import { AccordionBlockEdit, AccordionBlockView } from './components';
import { PanelWidget } from '@eeacms/volto-accordion-block/components';
import { options } from '@eeacms/volto-accordion-block/components';

const applyConfig = (config) => {
  config.blocks.blocksConfig.accordion = {
    id: 'accordion',
    title: 'Accordion',
    icon: accordionSVG,
    group: 'common',
    view: AccordionBlockView,
    edit: AccordionBlockEdit,
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
