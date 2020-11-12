import { v4 as uuid } from 'uuid';
import { emptyBlocksForm } from '@eeacms/volto-blocks-form/helpers';
import { map } from 'lodash';
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

export const GroupblockHasValue = (content) => {
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const blockValue = map(content[blocksLayoutFieldname].items, (block) => {
    const blockData = content[blocksFieldname]?.[block];
    return blockHasValue(blockData);
  });
  return blockValue.length === 1 ? blockValue[0] : true;
};
