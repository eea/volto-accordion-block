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
  const { block, data, onChangeBlock, pathname, selected, manage } = props;

  const metadata = props.metadata || props.properties;
  const properties = isEmpty(data?.data?.blocks)
    ? emptyBlocksForm()
    : data.data;

  const [selectedBlock, setSelectedBlock] = useState(
    properties.blocks_layout.items[0],
  );

  const createPanes = (initialData) => {
    const { count } = initialData;
    return {
      data: empty(count),
    };
  };

  React.useEffect(() => {
    if (
      isEmpty(data?.data?.blocks) &&
      properties.blocks_layout.items[0] !== selectedBlock
    ) {
      setSelectedBlock(properties.blocks_layout.items[0]);
      onChangeBlock(block, {
        ...data,
        data: properties,
      });
    }
  }, [
    onChangeBlock,
    properties,
    selectedBlock,
    block,
    data,
    data?.data?.blocks,
  ]);

  const blockState = {};
  const coldata = properties;
  const columnList = getColumns(coldata);

  return (
    <section className="section-block">
      {Object.keys(data).length === 1 ? (
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
            <AccordionEdit isEditForm={pathname.includes('edit')}>
              <BlocksForm
                metadata={metadata}
                properties={isEmpty(column) ? emptyBlocksForm() : column}
                manage={manage}
                selectedBlock={selected ? selectedBlock : null}
                allowedBlocks={data.allowedBlocks}
                title={data.placeholder}
                description={data?.instructions?.data}
                onSelectBlock={(id) => setSelectedBlock(id)}
                onChangeFormData={(newFormData) => {
                  onChangeBlock(block, {
                    ...data,
                    data: newFormData,
                  });
                }}
                onChangeField={(id, value) => {
                  if (['blocks', 'blocks_layout'].indexOf(id) > -1) {
                    blockState[id] = value;
                    onChangeBlock(block, {
                      ...data,
                      data: {
                        ...data.data,
                        ...blockState,
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
