import React from 'react';
import { Button, Ref } from 'semantic-ui-react';
import { BlockChooser, Icon } from '@plone/volto/components';
import { usePopper } from 'react-popper';
import { Portal } from 'react-portal';
import addSVG from '@plone/volto/icons/add.svg';

const OpenedBlocksChooser = (props) => {
  const { blocksConfig, block, onInsertBlock, referenceElement } = props;

  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'left',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 0],
        },
      },
      {
        name: 'flip',
      },
    ],
  });

  return (
    <Portal node={document.getElementById('body')}>
      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="accordion-chooser"
      >
        <BlockChooser
          onInsertBlock={onInsertBlock}
          currentBlock={block}
          showRestricted
          blocksConfig={blocksConfig}
        />
      </div>
    </Portal>
  );
};

const NewBlockAddButton = (props) => {
  const { addNewBlockOpened, index, setAddNewBlockOpened } = props;

  const [referenceElement, setReferenceElement] = React.useState(null);

  return (
    <>
      <Ref innerRef={setReferenceElement}>
        <Button
          basic
          icon
          onClick={() => setAddNewBlockOpened()}
          className="add-block-button"
          aria-label={`Add block in position ${index}`}
        >
          <Icon name={addSVG} className="circled" size="19px" />
        </Button>
      </Ref>
      {addNewBlockOpened ? (
        <OpenedBlocksChooser {...props} referenceElement={referenceElement} />
      ) : null}
    </>
  );
};

export default NewBlockAddButton;
