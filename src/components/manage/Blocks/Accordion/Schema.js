import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Accordion: {
    id: 'Accordion',
    defaultMessage: 'Accordion',
  },
  Style: {
    id: 'Style',
    defaultMessage: 'Style',
  },
  Title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  friendly_name: {
    id: 'Friendly name',
    defaultMessage: 'Friendly name',
  },
  title_size: {
    id: 'Title size',
    defaultMessage: 'Title size',
  },
  title_size_description: {
    id: 'Accordion Title size',
    defaultMessage: 'Accordion Title size',
  },
  right_arrows: {
    id: 'Title Icon on the right',
    defaultMessage: 'Title Icon on the right',
  },
  collapsed: {
    id: 'Collapsed by default',
    defaultMessage: 'Collapsed by default',
  },
  non_exclusive: {
    id: 'Non exclusive',
    defaultMessage: 'Non exclusive',
  },
  non_exclusive_description: {
    id: 'Allow multiple panels open at a time',
    defaultMessage: 'Allow multiple panels open at a time',
  },
});

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

export const accordionBlockSchema = ({ intl }) => ({
  title: 'Accordion block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['data'],
    },
    {
      id: 'style',
      title: intl.formatMessage(messages.Style),
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
      title: intl.formatMessage(messages.Title),
      description: intl.formatMessage(messages.friendly_name),
      type: 'string',
    },
    data: {
      title: intl.formatMessage(messages.Accordion),
      type: 'panels',
      schema: AccordionSchema,
    },
    title_size: {
      title: intl.formatMessage(messages.title_size),
      description: intl.formatMessage(messages.title_size_description),
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
      title: intl.formatMessage(messages.right_arrows),
      type: 'boolean',
      default: false,
    },
    collapsed: {
      title: intl.formatMessage(messages.collapsed),
      type: 'boolean',
      default: true,
    },
    non_exclusive: {
      title: intl.formatMessage(messages.non_exclusive),
      description: intl.formatMessage(messages.non_exclusive_description),
      type: 'boolean',
      default: true,
    },
  },
  required: ['title'],
});
