import config from '@plone/volto/registry';
import { defineMessages } from 'react-intl';
import { addStyling } from '@plone/volto/helpers';

const messages = defineMessages({
  Accordion: {
    id: 'Accordion',
    defaultMessage: 'Accordion',
  },
  AccordionBlock: {
    id: 'Accordion block',
    defaultMessage: 'Accordion block',
  },
  Options: {
    id: 'Options',
    defaultMessage: 'Options',
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
  filtering: {
    id: 'Enable filtering',
    defaultMessage: 'Enable filtering',
  },
  Theme: {
    id: 'Theme',
    defaultMessage: 'Theme',
  },
  ThemeHelp: {
    id: 'Accordion theme',
    defaultMessage: 'Accordion theme',
  },
  ThemePrimary: {
    id: 'Primary',
    defaultMessage: 'Primary',
  },
  ThemeSecondary: {
    id: 'Secondary',
    defaultMessage: 'Secondary',
  },
  ThemeTertiary: {
    id: 'Tertiary',
    defaultMessage: 'Tertiary',
  },
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
});

export const AccordionSchema = (intl) => {
  return {
    title: intl.formatMessage(messages.Accordion),
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
};

export const AccordionBlockSchema = ({ intl }) => ({
  title: intl.formatMessage(messages.AccordionBlock),
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['data'],
    },
    {
      id: 'options',
      title: intl.formatMessage(messages.Options),
      fields: [
        'headline',
        'title',
        'title_size',
        'right_arrows',
        'collapsed',
        'non_exclusive',
        'filtering',
      ],
    },
  ],
  properties: {
    headline: {
      title: intl.formatMessage(messages.headline),
    },
    title: {
      title: intl.formatMessage(messages.Title),
      description: intl.formatMessage(messages.friendly_name),
      type: 'string',
    },
    data: {
      title: intl.formatMessage(messages.Accordion),
      type: 'panels',
      schema: AccordionSchema(intl),
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
      default: true,
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
    filtering: {
      title: intl.formatMessage(messages.filtering),
      type: 'boolean',
      default: false,
    },
  },
  required: [],
});

export const AccordionStylingSchema = (props) => {
  const { intl } = props;
  const schema = addStyling(props);
  schema.properties.styles.schema = {
    title: intl.formatMessage(messages.Accordion),
    block: 'accordion',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['theme'],
      },
    ],
    properties: {
      theme: {
        title: intl.formatMessage(messages.Theme),
        description: intl.formatMessage(messages.ThemeHelp),
        widget: 'theme_picker',
        colors: [
          ...(config.settings && config.settings.themeColors
            ? config.settings.themeColors.map(({ value, title }) => ({
                name: value,
                label: title,
              }))
            : []),
        ],
      },
    },
    required: [],
  };
  return schema;
};
