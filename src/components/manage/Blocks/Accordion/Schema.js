export const AccordionSchema = {
  title: 'Accordion',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['panel_title'],
    },
  ],
  properties: {
    panel_title: {
      title: 'Accordion title',
    },
  },
  required: [],
};

export const accordionBlockSchema = () => ({
  title: 'Accordion block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['data'], //  'nrColumns', 'block_title'
    },
    {
      id: 'style',
      title: 'Style',
      fields: ['as', 'arrow_select'],
    },
  ],
  properties: {
    block_title: {
      title: 'Block title',
      default: 'Panels',
    },
    data: {
      title: 'Accordion',
      type: 'panels',
      schema: AccordionSchema,
    },
    as: {
      title: 'Title size',
      description: 'Accordion Title size',
      type: 'string',
      factory: 'Choice',
      default: 'h6',
      choices: [
        ['h2', 'h2'],
        ['h3', 'h3'],
        ['h4', 'h4'],
        ['h5', 'h5'],
        ['h6', 'h6'],
      ],
    },
    arrow_select: {
      title: 'Toggle arrows',
      type: 'boolean',
      default: false,
    },
  },
  required: ['title'],
});
