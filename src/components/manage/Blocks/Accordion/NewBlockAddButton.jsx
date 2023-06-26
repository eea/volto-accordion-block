import React from 'react';
import { Button, Ref } from 'semantic-ui-react';
import { BlockChooser, Icon } from '@plone/volto/components';
import useOutsideClick from '@kitconcept/volto-blocks-grid/helpers/useOutsideClick/useOutsideClick';
import { usePopper } from 'react-popper';
import { Portal } from 'react-portal';

import addSVG from '@plone/volto/icons/add.svg';

const NewBlockAddButton = (props) => {
  const { allowedBlocks, block, index, onInsertBlock } = props;
  const ref = React.useRef();
  const [isOpenMenu, setOpenMenu] = React.useState(false);

  const [referenceElement, setReferenceElement] = React.useState(null);
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

  useOutsideClick(ref, () => setOpenMenu(false));

  return (
    <>
      <Ref innerRef={setReferenceElement}>
        <Button
          basic
          icon
          onClick={() => setOpenMenu(true)}
          className="add-block-button"
          aria-label={`Add block in position ${index}`}
        >
          <Icon name={addSVG} className="circled" size="19px" />
        </Button>
      </Ref>
      {isOpenMenu ? (
        <Portal node={document.getElementById('body')}>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <BlockChooser
              onInsertBlock={onInsertBlock}
              currentBlock={block}
              showRestricted
              allowedBlocks={allowedBlocks}
              ref={ref}
            />
          </div>
        </Portal>
      ) : null}
    </>
  );
};

export default NewBlockAddButton;
