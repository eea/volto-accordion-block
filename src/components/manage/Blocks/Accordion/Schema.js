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
      fields: ['data'],
    },
    {
      id: 'style',
      title: 'Style',
      fields: [
        'title',
        'title_size',
        'right_arrows',
        'collapsed',
        'non_exclusive',
      ],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Friendly name',
      type: 'string',
    },
    data: {
      title: 'Accordion',
      type: 'panels',
      schema: AccordionSchema,
    },
    title_size: {
      title: 'Title size',
      description: 'Accordion Title size',
      type: 'string',
      factory: 'Choice',
      choices: [
        ['h2', 'Heading 2'],
        ['h3', 'Heading 3'],
        ['h4', 'Heading 4'],
        ['h5', 'Heading 5'],
        ['h6', 'Heading 6'],
      ],
    },
    right_arrows: {
      title: 'Title Icon on the right',
      type: 'boolean',
      default: false,
    },
    collapsed: {
      title: 'Collapsed by default',
      type: 'boolean',
      default: true,
    },
    non_exclusive: {
      title: 'Non exclusive',
      description: 'Allow multiple panels open at a time',
      type: 'boolean',
      default: true,
    },
  },
  required: ['title'],
});
