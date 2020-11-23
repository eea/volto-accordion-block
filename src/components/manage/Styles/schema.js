export const StyleSchema = () => ({
  title: 'Styling',
  fieldsets: [
    {
      id: 'default',
      title: 'Style',
      fields: ['backgroundColor', 'title_size'],
    },
  ],
  properties: {
    backgroundColor: {
      title: 'Background color',
      type: 'color',
      widget: 'color_picker',
    },
    title_size: {
      title: 'Title size',
      description: 'Size of accordion Title in a Panel',
      choices: [
        ['xx-small', 'xx-small'],
        ['x-small', 'x-small'],
        ['small', 'small'],
        ['medium', 'medium'],
        ['large', 'large'],
        ['x-large', 'x-large'],
        ['xx-large', 'xx-large'],
        ['xxx-large', 'xxx-large'],
      ],
    },
  },
  required: [],
});

export const TextSettingsSchema = {
  title: 'Text settings',
  fieldsets: [
    {
      id: 'text_settings',
      title: 'Text settings',
      fields: ['grid_column_align_text', 'grid_column_text_color'],
    },
  ],
  properties: {
    grid_column_align_text: {
      title: 'Text align',
      widget: 'align',
    },
    grid_column_text_color: {
      title: 'Text color',
      widget: 'color_picker',
    },
  },
  required: [],
};
