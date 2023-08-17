import { v4 as uuid } from 'uuid';
import { map } from 'lodash';

import { Icon as VoltoIcon } from '@plone/volto/components';
import { Icon as SemanticIcon } from 'semantic-ui-react';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  blockHasValue,
  emptyBlocksForm,
} from '@plone/volto/helpers';

export const emptyAccordion = (count) => {
  const blocks = {};
  const items = [];
  for (let x = 0; x < count; x++) {
    const id = uuid();
    blocks[id] = emptyBlocksForm();
    items.push(id);
  }

  return {
    blocks,
    blocks_layout: {
      items,
    },
  };
};

export const getPanels = (data) => {
  return (data?.blocks_layout?.items || []).map((id) => [
    id,
    data.blocks?.[id],
  ]);
};

export const accordionBlockHasValue = (content) => {
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const blockValue = map(content[blocksLayoutFieldname].items, (block) => {
    const blockData = content[blocksFieldname]?.[block];
    return blockHasValue(blockData);
  });
  if (content.hasOwnProperty('title') && content?.title.length > 0) return true;
  return blockValue.some((item) => item === true);
};

export const Icon = (props) => {
  const { name, options, ...rest } = props;
  const componentToRender = options.iconComponent;

  // Map component names to their actual components
  const componentMap = {
    SemanticIcon,
    VoltoIcon,
  };
  // Get the component from the map based on the configuration
  const IconComponent = componentMap[componentToRender] || VoltoIcon;

  return <IconComponent size={options.size} name={name} {...rest} />;
};
