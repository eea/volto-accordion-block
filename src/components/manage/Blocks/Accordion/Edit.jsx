import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { BlocksForm } from '@eeacms/volto-blocks-form/components';
import { Segment, Button } from 'semantic-ui-react';
import { emptyBlocksForm } from '@eeacms/volto-blocks-form/helpers';
import { SidebarPortal, Icon } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { accordionBlockSchema } from './Schema';
import AccordionEdit from './AccordionEdit';
import EditBlockWrapper from './EditBlockWrapper';
import Panels from './Panels.jsx';
import { empty, getColumns } from './util';
import { options } from './panels';
import './editor.less';
import upSVG from '@plone/volto/icons/up.svg';
import tuneSVG from '@plone/volto/icons/tune.svg';

const Edit = (props) => {
  const { block, data, onChangeBlock, pathname, selected } = props;

  const metadata = props.metadata || props.properties;
  const properties = isEmpty(data?.data?.blocks)
    ? emptyBlocksForm()
    : data.data;

  const [selectedBlock, setSelectedBlock] = useState({});
  const [activePanel, setactivePanel] = useState(null);

  const createPanes = (initialData) => {
    const { count } = initialData;
    return {
      data: empty(count),
    };
  };

  const blockState = {};
  const coldata = properties;
  const columnList = getColumns(coldata);

  const handleTitleChange = (e, value) => {
    const [colId, column] = value;
    const modifiedBlock = {
      ...column,
      blocks: {
        ...column.blocks,
        acc_title: e.target.value,
      },
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
    <section className="section-block">
      {Object.keys(data).length === 1 ? (
        <Panels
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
            <AccordionEdit
              colId={colId}
              column={column}
              coldata={coldata}
              handleTitleChange={handleTitleChange}
              data={data}
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
              >
                {({ draginfo }, editBlock, blockProps) => (
                  <EditBlockWrapper
                    draginfo={draginfo}
                    blockProps={blockProps}
                    extraControls={
                      <>
                        <Button
                          icon
                          basic
                          title="Edit Panel"
                          onClick={() => {
                            setSelectedBlock({});
                            setactivePanel(colId);
                            //this.props.setSidebarTab(1);
                          }}
                        >
                          <Icon name={tuneSVG} className="" size="19px" />
                        </Button>
                      </>
                    }
                  >
                    {editBlock}
                  </EditBlockWrapper>
                )}
              </BlocksForm>
            </AccordionEdit>
          ))}
        </div>
      )}
      {Object.keys(selectedBlock).length === 0 ? (
        <SidebarPortal selected={true}>
          {activePanel ? (
            <>
              <Segment>
                <Button onClick={() => setactivePanel(null)}>
                  <Icon name={upSVG} size="14px" />
                  Edit parent Accordion block
                </Button>
              </Segment>
              {/* <InlineForm
                schema={''}
                title={`Panel ${
                  columnList.map(([colId]) => colId).indexOf(activePanel) + 1
                }`}
                onChangeField={onChangeColumnSettings}
                formData={data?.data?.blocks?.[activePanel]?.settings || {}}
              /> */}
            </>
          ) : (
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
      ) : (
        ''
      )}
    </section>
  );
};

export default Edit;
