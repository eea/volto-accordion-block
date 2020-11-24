import accordionSVG from '@plone/volto/icons/list-arrows.svg';
import { AccordionBlockEdit, AccordionBlockView } from './components';
import { PanelsWidget } from '@eeacms/volto-accordion-block/components';

const applyConfig = (config) => {
  config.blocks.blocksConfig.accordion = {
    id: 'accordion',
    title: 'Accordion',
    icon: accordionSVG,
    group: 'common',
    view: AccordionBlockView,
    edit: AccordionBlockEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };
  config.widgets.type.panels = PanelsWidget;
  return config;
};

export default applyConfig;
