import { StyleSchema } from './schema';

export function makeStyleSchema({ available_colors }) {
  const schema = StyleSchema();
  schema.properties.backgroundColor.available_colors = available_colors;
  return schema;
}

export function applyBgColor(props) {
  return {
    style: {
      backgroundColor: props.backgroundColor,
    },
  };
}

export function applyTitleSize(props) {
  return {
    style: {
      fontSize: props.title_size,
    },
  };
}
