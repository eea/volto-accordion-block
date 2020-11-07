import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { BlocksForm } from '@eeacms/volto-blocks-form/components';
import { emptyBlocksForm } from '@eeacms/volto-blocks-form/helpers';
import AccordionEdit from './AccordionEdit';
import Layout from './Layout.jsx';
import { empty, getColumns } from './util';
import { options } from './layout';
import './editor.less';

const Edit = (props) => {
  const {
    block,
    data,
    onChangeBlock,
    pathname,
    selected,
    manage,
    data: { display },
  } = props;

  const metadata = props.metadata || props.properties;
  const properties = isEmpty(data?.data?.blocks)
    ? emptyBlocksForm()
    : data.data;

  const [selectedBlock, setSelectedBlock] = useState({});

  const createPanes = (initialData) => {
    const { count } = initialData;
    return {
      data: empty(count),
    };
  };

  const blockState = {};
  const coldata = properties;
  const columnList = getColumns(coldata);

  return (
    <section className="section-block">
      {!display && Object.keys(data).length === 1 ? (
        <Layout
          variants={options}
          data={data}
          onChange={(initialData) => {
            onChangeBlock(block, {
              ...data,
              ...createPanes(initialData),
            });
          }}
        />
      ) : display && Object.keys(data).length === 2 ? (
        <Layout
          variants={options}
          data={data}
          onChange={(initialData) => {
            onChangeBlock(block, {
              ...data,
              ...createPanes(initialData),
            });
          }}
        />
      ) : (
        <div>
          {columnList.map(([colId, column], index) => (
            <AccordionEdit>
              <BlocksForm
                key={colId}
                metadata={metadata}
                properties={isEmpty(column) ? emptyBlocksForm() : column}
                manage={manage}
                selectedBlock={selected ? selectedBlock[colId] : null}
                description={data?.instructions?.data}
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
        </div>
      )}
    </section>
  );
};

export default Edit;
