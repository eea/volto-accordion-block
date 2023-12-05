import React from 'react';
import { v4 as uuid } from 'uuid';
import { omit, without } from 'lodash';
import move from 'lodash-move';
import { useIntl, defineMessages } from 'react-intl';
import { Button } from 'semantic-ui-react';
import { Icon, FormFieldWrapper, DragDropList } from '@plone/volto/components';
import { emptyBlocksForm } from '@plone/volto/helpers';

import addSVG from '@plone/volto/icons/add.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

import './editor.less';

const messages = defineMessages({
  add: { id: 'Add', defaultMessage: 'Add' },
  panelIndex: {
    id: 'panel_index',
    defaultMessage: 'Panel {panel_index}',
  },
});

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
  const intl = useIntl();
  const { fieldSet, value = {}, id, onChange, schema } = props;
  const { blocks = {} } = value;
  const itemsList = (value.blocks_layout?.items || []).map((id) => [
    id,
    blocks[id],
  ]);

  const objectSchema = typeof schema === 'function' ? schema(props) : schema;

  return (
    <div className="panels-widget">
      <FormFieldWrapper {...props} noForInFieldLabel draggable={false}>
        <div className="add-item-button-wrapper">
          <Button
            compact
            icon
            aria-label={
              objectSchema.addMessage ||
              `${intl.formatMessage(messages.add)} ${objectSchema.title}`
            }
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
                  items: [...(value.blocks_layout?.items || []), newId],
                },
              });
            }}
          >
            <Icon name={addSVG} size="18px" />
            &nbsp;
            {/* Custom addMessage in schema, else default to english */}
            {objectSchema.addMessage ||
              `${intl.formatMessage(messages.add)} ${objectSchema.title}`}
          </Button>
        </div>
      </FormFieldWrapper>
      <div className="items-area">
        <DragDropList
          forwardedAriaLabelledBy={`fieldset-${
            fieldSet || 'default'
          }-field-label-${id}`}
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
            const { child, childId, index, draginfo } = dragProps;
            return (
              <div
                ref={draginfo.innerRef}
                {...draginfo.draggableProps}
                key={childId}
              >
                <div className="panel-item" style={{ position: 'relative' }}>
                  <button
                    style={{
                      visibility: 'visible',
                      display: 'inline-block',
                    }}
                    {...draginfo.dragHandleProps}
                    className="drag handle"
                  >
                    <Icon name={dragSVG} size="18px" />
                  </button>
                  <div className="label">
                    {child.title ||
                      `${intl.formatMessage(messages.panelIndex, {
                        panel_index: `${index + 1}`,
                      })}`}
                  </div>
                  {value.blocks_layout?.items?.length > 1 ? (
                    <button
                      onClick={() => {
                        const newFormData = {
                          ...value,
                          blocks: omit({ ...value.blocks }, [childId]),
                          blocks_layout: {
                            ...value.blocks_layout,
                            items: without(
                              [...(value.blocks_layout?.items || [])],
                              childId,
                            ),
                          },
                        };
                        onChange(id, newFormData);
                      }}
                    >
                      <Icon name={trashSVG} size="18px" color="#e40166" />
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            );
          }}
        </DragDropList>
      </div>
    </div>
  );
};

export default PanelsWidget;
