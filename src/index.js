import accordionSVG from '@eeacms/volto-accordion-block/icons/accordion.svg';
import {
  AccordionBlockEdit,
  AccordionBlockView,
  AccordionBlockSchema,
} from './components';
import {
  PanelWidget,
  ColorPickerWidget,
} from '@eeacms/volto-accordion-block/components';
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
    available_colors: [
      // '#B80000',
      // '#DB3E00',
      // '#FCCB00',
      // '#008B02',
      // '#006B76',
      // '#1273DE',
      // '#004DCF',
      // '#5300EB',
      '#EFEFEF',
      '#EB9694',
      '#FAD0C3',
      '#FEF3BD',
      '#C1E1C5',
      '#BEDADC',
      '#C4DEF6',
      '#BED3F3',
      '#D4C4FB',
    ],
  };
  config.widgets.type.panels = PanelWidget;
  config.widgets.widget.color_picker = ColorPickerWidget;
  return config;
};

export default applyConfig;
