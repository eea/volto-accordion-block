import React from 'react';
import { RenderBlocks } from '@eeacms/volto-blocks-form/components';
import { getColumns, GroupblockHasValue } from './util';
import AccordionEdit from './AccordionEdit';
const View = (props) => {
  const {
    data: { data = {} },
  } = props;
  const columnList = getColumns(data);
  const metadata = props.metadata || props.properties;
  return (
    <div>
      {columnList.map(([id, column], index) => {
        return GroupblockHasValue(column) ? (
          <AccordionEdit data={data}>
            <RenderBlocks {...props} metadata={metadata} content={column} />
          </AccordionEdit>
        ) : null;
      })}
    </div>
  );
};

export default View;
