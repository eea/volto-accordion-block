import { emptyAccordion, getPanels, accordionBlockHasValue } from './util';
import config from '@plone/volto/registry';

describe('emptyAccordion', () => {
  it('should create an accordion with a given count of empty blocks', () => {
    const result = emptyAccordion(2);

    expect(Object.keys(result.blocks)).toHaveLength(2);
    expect(result.blocks_layout.items).toHaveLength(2);

    for (const blockId in result.blocks) {
      expect(result.blocks[blockId]['@type']).toEqual(
        config.settings.defaultBlockType,
      );
    }
  });
});

describe('getPanels', () => {
  it('should return an array of pairs [id, blockData]', () => {
    const mockData = {
      blocks: {
        block_1: 'block1',
        block_2: 'block2',
      },
      blocks_layout: {
        items: ['block_1', 'block_2'],
      },
    };

    const expected = [
      ['block_1', 'block1'],
      ['block_2', 'block2'],
    ];

    expect(getPanels(mockData)).toEqual(expected);
  });

  it('should return an array of pairs [id, blockData]', () => {
    const mockData = {
      blocks: {
        block_1: 'block1',
        block_2: 'block2',
      },
      blocks_layout: {},
    };

    const expected = [];

    expect(getPanels(mockData)).toEqual(expected);
  });
});

describe('accordionBlockHasValue', () => {
  it('should return true when content has a title', () => {
    const content = {
      title: 'Test title',
      blocks: {
        block_1: {
          '@type': 'default',
        },
      },
      blocks_layout: {
        items: ['block_1'],
      },
    };
    expect(accordionBlockHasValue(content)).toEqual(true);
  });

  it('should return false when no blocks have value', () => {
    config.blocks.blocksConfig.default = { blockHasValue: () => false };
    const content = {
      title: '',
      blocks: {
        block_1: {
          '@type': 'default',
        },
      },
      blocks_layout: {
        items: ['block_1'],
      },
    };
    expect(accordionBlockHasValue(content)).toEqual(false);
  });
});
