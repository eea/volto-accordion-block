import { v4 as uuid } from 'uuid';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  getBlocks,
  hasBlocksData,
} from '@plone/volto/helpers/Blocks/Blocks';
import config from '@plone/volto/registry';

/* Inline deep‑clone helpers – used only by the Tabs block */
function deepCloneFormData(formData) {
  const blocksField = getBlocksFieldname(formData);
  const layoutField = getBlocksLayoutFieldname(formData);
  const childBlocks = getBlocks(formData);

  const cloned = childBlocks
    .map(([_, child]) => {
      const childCfg = config.blocks.blocksConfig[child['@type']] || {};
      if (childCfg.cloneData) {
        return childCfg.cloneData(child);
      }
      return hasBlocksData(child) ? deepCloneFormData(child) : [uuid(), child];
    })
    .filter(Boolean);

  const newData = {
    ...formData,
    [blocksField]: {
      ...Object.fromEntries(cloned.map(([newId, data]) => [newId, data])),
    },
    [layoutField]: {
      items: cloned.map(([newId]) => newId),
    },
  };

  // Return a fresh UUID for the *parent* block and its cloned content
  return [uuid(), newData];
}

export function cloneData(blockData) {
  const tabsData = blockData.data;
  const cloneWithIds = deepCloneFormData(tabsData);
  const [id, newBlockData] = cloneWithIds;
  return [
    id,
    {
      ...blockData,
      data: newBlockData,
    },
  ];
}
