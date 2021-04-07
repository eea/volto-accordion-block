import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Button, Segment } from 'semantic-ui-react';
import { BlocksForm, Icon } from '@plone/volto/components';
import { emptyBlocksForm } from '@plone/volto/helpers';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { accordionBlockSchema } from './Schema';
import AccordionEdit from './AccordionEdit';
import { emptyAccordion, getPanels } from './util';

import helpSVG from '@plone/volto/icons/help.svg';
import EditBlockWrapper from './EditBlockWrapper';
import './editor.less';

const Edit = (props) => {
  const [selectedBlock, setSelectedBlock] = useState({});
  const {
    block,
    data,
    onChangeBlock,
    pathname,
    selected,
    manage,
    formDescription,
  } = props;
  const properties = isEmpty(data?.data?.blocks)
    ? emptyAccordion(3)
    : data.data;
  const metadata = props.metadata || props.properties;

  React.useEffect(() => {
    if (isEmpty(data?.data)) {
      onChangeBlock(block, {
        ...data,
        data: {
          ...properties,
        },
      });
    }
    /* eslint-disable-next-line */
  }, []);

  // React.useEffect(() => {
  //   properties.blocks_layout.items.map((item) => {
  //     if (isEmpty(properties.blocks[item].blocks)) {
  //       return onChangeBlock(block, {
  //         ...data,
  //         data: {
  //           ...properties,
  //           blocks: {
  //             ...properties.blocks,
  //             [item]: emptyBlocksForm(),
  //           },
  //         },
  //       });
  //     }
  //     return undefined;
  //   });
  // }, [
  //   onChangeBlock,
  //   properties,
  //   selectedBlock,
  //   block,
  //   data,
  //   properties.blocks,
  // ]);

  const blockState = {};
  const panelData = properties;
  const panels = getPanels(panelData);

  const handleTitleChange = (e, value) => {
    const [uid, panel] = value;
    const modifiedBlock = {
      ...panel,
      title: e.target.value,
      '@type': 'accordionPanel',
    };
    onChangeBlock(block, {
      ...data,
      data: {
        ...panelData,
        blocks: {
          ...panelData.blocks,
          [uid]: modifiedBlock,
        },
      },
    });
  };

  // Get editing instructions from block settings or props
  let instructions = data?.instructions?.data || data?.instructions;
  if (!instructions || instructions === '<p><br/></p>') {
    instructions = formDescription;
  }

  return (
    <fieldset className="accordion-block">
      <legend
        onClick={() => {
          setSelectedBlock({});
          props.setSidebarTab(1);
        }}
        aria-hidden="true"
      >
        {data.title || 'Accordion'}
      </legend>
      {panels.map(([uid, panel], index) => (
        <AccordionEdit
          uid={uid}
          panel={panel}
          panelData={panelData}
          handleTitleChange={handleTitleChange}
          handleTitleClick={() => setSelectedBlock({})}
          data={data}
          index={index}
        >
          <BlocksForm
            key={uid}
            title={data.placeholder}
            description={instructions}
            manage={manage}
            allowedBlocks={data.allowedBlocks}
            metadata={metadata}
            properties={isEmpty(panel) ? emptyBlocksForm() : panel}
            selectedBlock={selected ? selectedBlock[uid] : null}
            onSelectBlock={(id) =>
              setSelectedBlock({
                [uid]: id,
              })
            }
            onChangeFormData={(newFormData) => {
              onChangeBlock(block, {
                ...data,
                data: {
                  ...panelData,
                  blocks: {
                    ...panelData.blocks,
                    [uid]: newFormData,
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
                    ...panelData,
                    blocks: {
                      ...panelData.blocks,
                      [uid]: {
                        ...panelData.blocks?.[uid],
                        ...blockState,
                      },
                    },
                  },
                });
              }
            }}
            pathname={pathname}
          >
            {({ draginfo }, editBlock, blockProps) => (
              <EditBlockWrapper
                draginfo={draginfo}
                blockProps={blockProps}
                disabled={data.disableInnerButtons}
                extraControls={
                  <>
                    {instructions && (
                      <>
                        <Button
                          icon
                          basic
                          title="Section help"
                          onClick={() => {
                            setSelectedBlock({});
                            const tab = manage ? 0 : 1;
                            props.setSidebarTab(tab);
                          }}
                        >
                          <Icon name={helpSVG} className="" size="19px" />
                        </Button>
                      </>
                    )}
                  </>
                }
              >
                {editBlock}
              </EditBlockWrapper>
            )}
          </BlocksForm>
        </AccordionEdit>
      ))}
      <SidebarPortal selected={selected && !Object.keys(selectedBlock).length}>
        {instructions && (
          <Segment attached>
            <div dangerouslySetInnerHTML={{ __html: instructions }} />
          </Segment>
        )}
        {!data?.readOnlySettings && (
          <InlineForm
            schema={accordionBlockSchema()}
            title="Accordion block"
            onChangeField={(id, value) => {
              onChangeBlock(block, {
                ...data,
                [id]: value,
              });
            }}
            formData={data}
          />
        )}
      </SidebarPortal>
    </fieldset>
  );
};

export default Edit;
