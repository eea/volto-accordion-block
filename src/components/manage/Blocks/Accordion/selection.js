import without from 'lodash/without';

export const getSelectedBlocks = (items, selected, active, id, event) => {
  if (event.shiftKey) {
    const anchor = items.indexOf(selected.length > 0 ? selected[0] : active);
    const focus = items.indexOf(id);
    if (anchor === focus) return [id];
    return items.slice(Math.min(anchor, focus), Math.max(anchor, focus) + 1);
  }

  if (event.ctrlKey || event.metaKey) {
    const selection = [...selected];
    if (active && !selection.includes(active)) selection.push(active);
    return selection.includes(id) ? without(selection, id) : [...selection, id];
  }

  return [];
};
