import React from 'react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import BlockChooserButton from '@plone/volto/components/manage/BlockChooser/BlockChooserButton';
import {
  applyBlockDefaults,
  applyBlockInitialValue,
  getBlocksFieldname,
  blockHasValue,
  buildStyleClassNamesFromData,
  buildStyleClassNamesExtenders,
  buildStyleObjectFromData,
} from '@plone/volto/helpers/Blocks/Blocks';
import config from '@plone/volto/registry';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';

import dragSVG from '@plone/volto/icons/drag.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  deleteBlock: {
    id: 'delete_block',
    defaultMessage: 'delete {type} block',
  },
  dragBlock: {
    id: 'drag_block',
    defaultMessage: 'drag {type} block',
  },
});

class EditBlockWrapper extends React.Component {
  render() {
    const { intl, blockProps, draginfo, disabled, children } = this.props;

    const {
      allowedBlocks,
      showRestricted,
      block,
      blocksConfig,
      selected,
      type,
      onChangeBlock,
      onDeleteBlock,
      onInsertBlock,
      onSelectBlock,
      onMutateBlock,
      data: originalData,
      editable,
      properties,
      showBlockChooser,
      navRoot,
      contentType,
    } = blockProps;

    const data = applyBlockDefaults({
      data: originalData,
      ...blockProps,
      intl,
    });
    const visible =
      selected &&
      !disabled &&
      !(
        !!data.fixed ||
        (!config.experimental.addBlockButton.enabled &&
          !(blockHasValue(data) && editable))
      );

    const required = isBoolean(data.required)
      ? data.required
      : includes(config.blocks.requiredBlocks, type);

    let classNames = buildStyleClassNamesFromData(data.styles);
    classNames = buildStyleClassNamesExtenders({
      block,
      content: properties,
      data,
      classNames,
    });
    const style = buildStyleObjectFromData(data);
    const styleMergedWithDragProps = {
      ...draginfo.draggableProps,
      style: { ...style, ...draginfo.draggableProps.style },
    };

    return (
      <div
        ref={draginfo.innerRef}
        {...styleMergedWithDragProps}
        className={cx(`block-editor-${data['@type']}`, classNames, {
          [data.align]: data.align,
        })}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              visibility: visible ? 'visible' : 'hidden',
              display: 'inline-block',
            }}
            {...(!disabled ? draginfo.dragHandleProps : {})}
            className="drag handle wrapper"
            aria-label={intl.formatMessage(messages.dragBlock, { type })}
          >
            <Icon name={dragSVG} size="18px" />
          </div>
          <div
            className={cx('ui drag block inner', type, {
              multiSelected: this.props.multiSelected,
            })}
          >
            {children}
            {!disabled && selected && !required && editable && (
              <Button
                type="button"
                icon
                basic
                onClick={() => onDeleteBlock(block, true)}
                className="delete-button"
                aria-label={intl.formatMessage(messages.deleteBlock, {
                  type,
                })}
              >
                <Icon name={trashSVG} size="18px" />
              </Button>
            )}
            {!disabled &&
              config.experimental.addBlockButton.enabled &&
              showBlockChooser && (
                <BlockChooserButton
                  data={data}
                  block={block}
                  onInsertBlock={(id, value) => {
                    if (blockHasValue(data)) {
                      onSelectBlock(onInsertBlock(id, value));
                    } else {
                      const blocksFieldname = getBlocksFieldname(properties);
                      const newFormData = applyBlockInitialValue({
                        id,
                        value,
                        blocksConfig,
                        formData: {
                          ...properties,
                          [blocksFieldname]: {
                            ...properties[blocksFieldname],
                            [id]: value || null,
                          },
                        },
                        intl,
                      });
                      const newValue = newFormData[blocksFieldname][id];
                      onChangeBlock(id, newValue);
                    }
                  }}
                  onMutateBlock={onMutateBlock}
                  allowedBlocks={allowedBlocks}
                  showRestricted={showRestricted}
                  blocksConfig={blocksConfig}
                  size="24px"
                  properties={properties}
                  navRoot={navRoot}
                  contentType={contentType}
                />
              )}
          </div>
          {disabled && (
            <div
              style={{
                display: 'none',
                // keep react-beautiful-dnd happy
              }}
              {...draginfo.dragHandleProps}
            />
          )}
        </div>
      </div>
    );
  }
}

export default injectIntl(EditBlockWrapper);
