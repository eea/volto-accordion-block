import React from 'react';
import { v4 as uuid } from 'uuid';
import { omit, without } from 'lodash';
import move from 'lodash-move';
import { Icon, FormFieldWrapper } from '@plone/volto/components';
import { DragDropList } from '@plone/volto/components';
import { emptyBlocksForm } from '@plone/volto/helpers';

import dragSVG from '@plone/volto/icons/drag.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import plusSVG from '@plone/volto/icons/circle-plus.svg';

import './editor.less';

export function moveItem(formData, source, destination) {
  return {
    ...formData,
    blocks_layout: {
      items: move(formData.blocks_layout?.items, source, destination),
    },
  };
}

const empty = () => {
  return [uuid(), emptyBlocksForm()];
};

const PanelsWidget = (props) => {
  const { value = {}, id, onChange } = props;
  const { blocks = {} } = value;
  const itemsList = (value.blocks_layout?.items || []).map((id) => [
    id,
    blocks[id],
  ]);

  return (
    <FormFieldWrapper {...props} draggable={false} className="panels-widget">
      <div className="items-area">
        <DragDropList
          childList={itemsList}
          onMoveItem={(result) => {
            const { source, destination } = result;
            if (!destination) {
              return;
            }
            const newFormData = moveItem(
              value,
              source.index,
              destination.index,
            );
            onChange(id, newFormData);
            return true;
          }}
        >
          {(dragProps) => {
            const { childId, index, draginfo } = dragProps;
            return (
              <div ref={draginfo.innerRef} {...draginfo.draggableProps}>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      visibility: 'visible',
                      display: 'inline-block',
                    }}
                    {...draginfo.dragHandleProps}
                    className="drag handle wrapper"
                  >
                    <Icon name={dragSVG} size="18px" />
                  </div>
                  <div className="item-area">
                    <div className="label">Panel {index + 1}</div>
                    {value.blocks_layout?.items?.length > 1 ? (
                      <button
                        onClick={() => {
                          const newFormData = {
                            ...value,
                            blocks: omit({ ...value.blocks }, [childId]),
                            blocks_layout: {
                              ...value.blocks_layout,
                              items: without(
                                [...value.blocks_layout?.items],
                                childId,
                              ),
                            },
                          };
                          onChange(id, newFormData);
                        }}
                      >
                        <Icon name={trashSVG} size="18px" />
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            );
          }}
        </DragDropList>
        <button
          onClick={() => {
            const [newId, newData] = empty();
            onChange(id, {
              ...value,
              blocks: {
                ...value.blocks,
                [newId]: newData,
              },
              blocks_layout: {
                ...value.blocks_layout,
                items: [...value.blocks_layout?.items, newId],
              },
            });
          }}
        >
          <Icon name={plusSVG} size="18px" />
        </button>
      </div>
    </FormFieldWrapper>
  );
};

export default PanelsWidget;
