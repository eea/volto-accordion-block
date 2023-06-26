import React from 'react';
import { Icon } from '@plone/volto/components';
import { blockHasValue } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, injectIntl } from 'react-intl';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import cx from 'classnames';
import NewBlockAddButton from './NewBlockAddButton';

import dragSVG from '@plone/volto/icons/drag.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
});

class EditBlockWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewBlockOpened: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (
      this.blockNode.current &&
      doesNodeContainClick(this.blockNode.current, e)
    )
      return;

    if (this.state.addNewBlockOpened) {
      this.setState({
        addNewBlockOpened: false,
      });
      return true;
    }
  };

  blockNode = React.createRef();

  render() {
    const {
      intl,
      blockProps,
      draginfo,
      extraControls,
      disabled,
      children,
    } = this.props;

    const {
      allowedBlocks,
      block,
      data,
      onDeleteBlock,
      onInsertBlock,
      onSelectBlock,
      selected,
      index,
      blocksConfig,
    } = blockProps;
    const type = data['@type'];
    const { disableNewBlocks } = data;
    const dragVisible = !data.fixed;
    const visible = selected;

    const required = isBoolean(data.required)
      ? data.required
      : includes(config.blocks.requiredBlocks, type);

    const allowedBlocksFromConfig =
      blockProps.blocksConfig.accordion?.allowedBlocks;

    return (
      <div ref={this.blockNode}>
        <div
          ref={draginfo?.innerRef}
          {...(selected ? draginfo?.draggableProps : null)}
          className={`block-editor-${data['@type']}`}
        >
          {(!selected || !visible || disabled) && (
            <div
              style={{
                display: 'none',
                // keep react-beautiful-dnd happy
              }}
              {...draginfo.dragHandleProps}
            ></div>
          )}
          {visible && (
            <div className="block-toolbar">
              {extraControls}

              {!disabled && (
                <>
                  <div
                    style={{
                      display: dragVisible ? 'inline-block' : 'none',
                    }}
                    {...draginfo.dragHandleProps}
                    className="drag handle wrapper-accordion-block"
                  >
                    <Button icon basic title="Drag and drop">
                      <Icon name={dragSVG} size="19px" />
                    </Button>
                  </div>

                  {!disableNewBlocks && !blockHasValue(data) && (
                    <NewBlockAddButton
                      block={block}
                      index={index}
                      blocksConfig={blocksConfig}
                      onInsertBlock={(id, value) => {
                        onSelectBlock(onInsertBlock(id, value));
                        this.setState({ addNewBlockOpened: false });
                      }}
                      allowedBlocks={allowedBlocks || allowedBlocksFromConfig}
                    />
                  )}
                  {!required && (
                    <Button
                      icon
                      basic
                      title="Remove block"
                      onClick={() => onDeleteBlock(block)}
                      className="delete-button-accordion-block"
                      aria-label={intl.formatMessage(messages.delete)}
                    >
                      <Icon name={trashSVG} size="19px" color="#e40166" />
                    </Button>
                  )}
                </>
              )}
            </div>
          )}

          <div
            className={cx('ui drag block wrapper inner', type, {
              multiSelected: this.props.multiSelected,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(EditBlockWrapper);
