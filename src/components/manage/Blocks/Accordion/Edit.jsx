import { BlocksForm, Icon, SidebarPortal } from '@plone/volto/components';
import { emptyBlocksForm } from '@plone/volto/helpers';
import helpSVG from '@plone/volto/icons/help.svg';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { BlockDataForm } from '@plone/volto/components';
import { useIntl } from 'react-intl';
import AccordionEdit from './AccordionEdit';
import EditBlockWrapper from './EditBlockWrapper';
import './editor.less';
import { accordionBlockSchema } from './Schema';
import { emptyAccordion, getPanels } from './util';
import { cloneDeep } from 'lodash';
import config from '@plone/volto/registry';

const Edit = (props) => {
  const [selectedBlock, setSelectedBlock] = useState({});
  const {
    block,
    data,
    onChangeBlock,
    onChangeField,
    pathname,
    selected,
    manage,
    formDescription,
  } = props;
  const intl = useIntl();
  const properties = isEmpty(data?.data?.blocks)
    ? emptyAccordion(3)
    : data.data;
  const metadata = props.metadata || props.properties;

  const applySchemaEnhancer = (originalSchema) => {
    let schema, schemaEnhancer;
    const formData = data;
    const { blocks } = config;

    const blockType = formData['@type'];
    const variations = blocks?.blocksConfig[blockType]?.variations || [];

    if (variations.length === 0) {
      // No variations present but anyways
      // finalize the schema with a schemaEnhancer in the block config is present
      schemaEnhancer = blocks.blocksConfig?.[blockType]?.schemaEnhancer;
      if (schemaEnhancer)
        schema = schemaEnhancer({ schema: originalSchema, formData, intl });
    }

    const activeItemName = formData?.variation;
    let activeItem = variations.find((item) => item.id === activeItemName);
    if (!activeItem) activeItem = variations.find((item) => item.isDefault);

    schemaEnhancer = activeItem?.['schemaEnhancer'];

    schema = schemaEnhancer
      ? schemaEnhancer({ schema: cloneDeep(originalSchema), formData, intl })
      : cloneDeep(originalSchema);

    return schema;
  };

  /**
   * Will set field values from schema, by matching the default values
   * @returns {Object} defaultValues
   */
  const setInitialData = () => {
    const accordionSchema = applySchemaEnhancer(accordionBlockSchema({ intl }));
    const defaultValues = Object.keys(accordionSchema.properties).reduce(
      (accumulator, currentVal) => {
        return accordionSchema.properties[currentVal].default
          ? {
              ...accumulator,
              [currentVal]: accordionSchema.properties[currentVal].default,
            }
          : accumulator;
      },
      {},
    );

    return {
      ...defaultValues,
      ...data,
      data: {
        ...properties,
      },
    };
  };

  React.useEffect(() => {
    if (isEmpty(data?.data)) {
      onChangeBlock(block, setInitialData());
    }
    /* eslint-disable-next-line */
  }, []);

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
              } else {
                onChangeField(id, value);
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
          <BlockDataForm
            schema={accordionBlockSchema({ intl })}
            title="Accordion block"
            onChangeField={(id, value) => {
              onChangeBlock(block, {
                ...data,
                [id]: value,
              });
            }}
            formData={data}
            block={block}
          />
        )}
      </SidebarPortal>
    </fieldset>
  );
};

export default withBlockExtensions(Edit);
