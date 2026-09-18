import { getSelectedBlocks } from './selection';

const items = ['a', 'b', 'c'];

describe('Accordion multiselection', () => {
  it.each([
    ['a', 'c', ['a', 'b', 'c']],
    ['c', 'a', ['a', 'b', 'c']],
    ['b', 'b', ['b']],
  ])(
    'selects the inclusive Shift range from %s to %s',
    (active, id, expected) => {
      expect(
        getSelectedBlocks(items, [], active, id, { shiftKey: true }),
      ).toEqual(expected);
    },
  );

  it('anchors Shift selection at the first selected block', () => {
    expect(
      getSelectedBlocks(items, ['b'], 'a', 'c', { shiftKey: true }),
    ).toEqual(['b', 'c']);
  });

  it.each(['ctrlKey', 'metaKey'])(
    '%s adds the active block and toggles without mutating selection',
    (modifier) => {
      const selected = ['a'];
      expect(
        getSelectedBlocks(items, [], 'a', 'c', { [modifier]: true }),
      ).toEqual(['a', 'c']);
      expect(
        getSelectedBlocks(items, selected, 'a', 'c', { [modifier]: true }),
      ).toEqual(['a', 'c']);
      expect(
        getSelectedBlocks(items, ['a', 'c'], null, 'a', { [modifier]: true }),
      ).toEqual(['c']);
      expect(selected).toEqual(['a']);
    },
  );

  it('gives Shift precedence over additive selection', () => {
    expect(
      getSelectedBlocks(items, [], 'a', 'c', { shiftKey: true, metaKey: true }),
    ).toEqual(items);
  });

  it('returns no multiple selection for a plain click', () => {
    expect(getSelectedBlocks(items, ['a'], 'a', 'c', {})).toEqual([]);
  });
});
