export const StyleSchema = () => ({
  title: 'Styling',
  fieldsets: [
    {
      id: 'default',
      title: 'Style',
      fields: ['backgroundColor'],
    },
  ],
  properties: {
    backgroundColor: {
      title: 'Background color',
      type: 'color',
      widget: 'color_picker',
    },
    // grid_vertical_align: {
    //   title: 'Vertical align',
    //   choices: [
    //     ['bottom', 'Bottom'],
    //     ['middle', 'Middle'],
    //     ['top', 'Top'],
    //   ],
    // },
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
