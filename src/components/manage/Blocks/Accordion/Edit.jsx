import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { BlocksForm } from '@eeacms/volto-blocks-form/components';
import { emptyBlocksForm } from '@eeacms/volto-blocks-form/helpers';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { accordionBlockSchema } from './Schema';
import AccordionEdit from './AccordionEdit';
import { empty, getColumns } from './util';

import './editor.less';

const Edit = (props) => {
  const { block, data, onChangeBlock, pathname, selected } = props;

  const metadata = props.metadata || props.properties;
  const properties = isEmpty(data?.data?.blocks) ? empty(3) : data.data;
  const [selectedBlock, setSelectedBlock] = useState({});

  const blockState = {};
  const coldata = properties;
  const columnList = getColumns(coldata);

  const handleTitleChange = (e, value) => {
    const [colId, column] = value;
    const modifiedBlock = {
      ...column,
      title: e.target.value,
    };
    onChangeBlock(block, {
      ...data,
      data: {
        ...coldata,
        blocks: {
          ...coldata.blocks,
          [colId]: modifiedBlock,
        },
      },
    });
  };

  return (
    <div className="accordion-block">
      {columnList.map(([colId, column], index) => (
        <AccordionEdit
          colId={colId}
          column={column}
          coldata={coldata}
          handleTitleChange={handleTitleChange}
          handleTitleClick={() => setSelectedBlock({})}
          data={data}
          key={index}
        >
          <BlocksForm
            key={colId}
            metadata={metadata}
            properties={isEmpty(column) ? emptyBlocksForm() : column}
            selectedBlock={selected ? selectedBlock[colId] : null}
            onSelectBlock={(id) =>
              setSelectedBlock({
                [colId]: id,
              })
            }
            onChangeFormData={(newFormData) => {
              onChangeBlock(block, {
                ...data,
                data: {
                  ...coldata,
                  blocks: {
                    ...coldata.blocks,
                    [colId]: newFormData,
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
                      [colId]: {
                        ...coldata.blocks?.[colId],
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
      {Object.keys(selectedBlock).length === 0 ? (
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
