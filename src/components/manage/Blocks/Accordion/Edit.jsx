import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { BlocksForm } from '@eeacms/volto-blocks-form/components';
import { emptyBlocksForm } from '@eeacms/volto-blocks-form/helpers';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { accordionBlockSchema } from './Schema';
import AccordionEdit from './AccordionEdit';
import { emptyAccordion, getPanels } from './util';

import './editor.less';

const Edit = (props) => {
  const { block, data, onChangeBlock, pathname, selected, manage } = props;

  const metadata = props.metadata || props.properties;
  const properties = isEmpty(data?.data?.blocks)
    ? emptyAccordion(3)
    : data.data;
  const [selectedBlock, setSelectedBlock] = useState({});
  React.useEffect(() => {
    properties.blocks_layout.items.map((item) => {
      if (isEmpty(properties.blocks[item].blocks)) {
        return onChangeBlock(block, {
          ...data,
          data: {
            ...properties,
            blocks: {
              ...properties.blocks,
              [item]: emptyBlocksForm(),
            },
          },
        });
      }
      return undefined;
    });
  }, [
    onChangeBlock,
    properties,
    selectedBlock,
    block,
    data,
    properties.blocks,
  ]);

  const blockState = {};
  const panelData = properties;
  const panels = getPanels(panelData);

  const handleTitleChange = (e, value) => {
    const [uid, panel] = value;
    const modifiedBlock = {
      ...panel,
      title: e.target.value,
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

  return (
    <div className="accordion-block">
      {panels.map(([uid, panel], index) => (
        <AccordionEdit
          uid={uid}
          panel={panel}
          panelData={panelData}
          handleTitleChange={handleTitleChange}
          handleTitleClick={() => setSelectedBlock({})}
          data={data}
          key={index}
        >
          <BlocksForm
            key={uid}
            title={data.placeholder}
            description={data?.instructions?.data}
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
          />
        </AccordionEdit>
      ))}
      {Object.keys(selectedBlock).length === 0 && !data.readOnlySettings ? (
        <SidebarPortal selected={true}>
          <>
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
          </>
        </SidebarPortal>
      ) : (
        ''
      )}
    </div>
  );
};

export default Edit;
