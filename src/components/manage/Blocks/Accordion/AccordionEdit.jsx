import React from 'react';
import { Segment, Accordion } from 'semantic-ui-react';
import { emptyBlocksForm } from '@eeacms/volto-blocks-form/helpers';
import { v4 as uuid } from 'uuid';
import { Icon } from '@plone/volto/components';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

import BlocksForm from './TitleBlock/BlocksForm';
import AnimateHeight from 'react-animate-height';
export default ({
  children,
  coldata,
  metadata,
  pathname,
  manage,
  selected,
  block,
  selectedBlock,
  setSelectedBlock,
  onChangeBlock,
  data,
}) => {
  const empty = () => {
    return [uuid(), emptyBlocksForm()];
  };

  const [newId, newData] = empty();

  const [activeIndex, setActiveIndex] = React.useState(0);
  const blockState = {};
  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }

  return (
    <div>
      <Accordion fluid styled>
        <React.Fragment>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
            className="accordion-title"
          >
            {/* <div className="accordion-tools">
              {activeIndex === 0 ? (
                <Icon name={upSVG} size="20px" />
              ) : (
                <Icon name={downSVG} size="20px" />
              )}
            </div> */}
            <BlocksForm
              key={newId}
              metadata={metadata}
              properties={newData}
              manage={manage}
              selectedBlock={selected ? selectedBlock[newId] : null}
              description={data?.instructions?.data}
              onSelectBlock={(id) =>
                setSelectedBlock({
                  [newId]: id,
                })
              }
              onChangeFormData={(newFormData) => {
                onChangeBlock(block, {
                  ...data,
                  data: {
                    ...coldata,
                    blocks: {
                      ...coldata.blocks,
                      [newId]: newFormData,
                    },
                  },
                });
              }}
              onChangeField={(id, value) => {
                if (['blocks', 'blocks_layout'].indexOf(id) > -1) {
                  blockState[id] = value;
                  onChangeBlock(block, {
                    ...data,
                    data: {
                      ...coldata,
                      blocks: {
                        ...coldata.blocks,
                        [newId]: {
                          ...coldata.blocks?.[newId],
                          ...blockState,
                        },
                      },
                    },
                  });
                }
              }}
              pathname={pathname}
            />
          </Accordion.Title>
          <div>
            <Accordion.Content active={activeIndex === 0}>
              <div style={{ margin: '1em' }}>
                <AnimateHeight
                  animateOpacity
                  duration={500}
                  height={activeIndex === 0 ? 'auto' : 0}
                >
                  {children}
                </AnimateHeight>
              </div>
            </Accordion.Content>
          </div>
        </React.Fragment>
      </Accordion>
    </div>
  );
};
