import React from 'react';
import TitleEdit from './TitleEdit';
import { DragDropList } from '@eeacms/volto-blocks-form/components';
import { getBlocks } from '@plone/volto/helpers';
import {
  addBlock,
  changeBlock,
  deleteBlock,
  moveBlock,
  mutateBlock,
  nextBlockId,
  previousBlockId,
} from '@eeacms/volto-blocks-form/helpers';
import { settings } from '~/config';

const BlocksForm = (props) => {
  const {
    pathname,
    onChangeField,
    metadata,
    properties,
    onChangeFormData,
    selectedBlock,
    onSelectBlock,
    allowedBlocks,
    title,
    description,
    manage,
  } = props;

  const blockList = getBlocks(properties);

  const onMutateBlock = (id, value) => {
    const newFormData = mutateBlock(properties, id, value);
    onChangeFormData(newFormData);
  };

  const onChangeBlock = (id, value) => {
    const newFormData = changeBlock(properties, id, value);
    onChangeFormData(newFormData);
  };

  return (
    <div className="ui container blocks-form" title={title}>
      <DragDropList
        childList={blockList}
        onMoveItem={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }
          const newFormData = moveBlock(
            properties,
            source.index,
            destination.index,
          );
          onChangeFormData(newFormData);
          return true;
        }}
      >
        {(dragProps) => {
          const { child, childId, index } = dragProps;
          const blockProps = {
            allowedBlocks,
            block: childId,
            data: child,
            id: childId,
            index,
            manage,
            onChangeBlock,
            onChangeField,
            onMutateBlock,
            onSelectBlock,
            pathname,
            metadata,
            properties,
            selected: selectedBlock === childId,
            type: child['@type'],
          };
          return (
            <TitleEdit
              key={childId}
              {...blockProps}
              formTitle={title}
              formDescription={description}
            />
          );
        }}
      </DragDropList>
    </div>
  );
};

export default BlocksForm;
