import { v4 as uuid } from 'uuid';
import { emptyBlocksForm } from '@eeacms/volto-blocks-form/helpers';
import { map, omit, without, keys } from 'lodash';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  blockHasValue,
} from '@plone/volto/helpers';

export const empty = (count) => {
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

export const getColumns = (data) => {
  return (data?.blocks_layout?.items || []).map((id) => [
    id,
    data.blocks?.[id],
  ]);
};

export const AccordionblockHasValue = (content) => {
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const blockValue = map(content[blocksLayoutFieldname].items, (block) => {
    const blockData = content[blocksFieldname]?.[block];
    return blockHasValue(blockData);
  });
  if (content.hasOwnProperty('title') && content?.title.length > 0) return true;
  return blockValue.some((item) => item === true);
};

export const deleteBlock = (formData, blockId, colId) => {
  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const panelData = formData[blocksFieldname][colId];

  return {
    ...panelData,
    [blocksLayoutFieldname]: {
      items:
        panelData[blocksLayoutFieldname].items.length > 1
          ? without(panelData[blocksLayoutFieldname].items, blockId)
          : panelData[blocksLayoutFieldname].items,
    },
    [blocksFieldname]:
      keys(panelData[blocksFieldname]).length > 2
        ? omit(panelData[blocksFieldname], [blockId])
        : panelData[blocksFieldname],
  };
};
