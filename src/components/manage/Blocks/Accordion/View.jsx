import React from 'react';
import { RenderBlocks } from '@eeacms/volto-blocks-form/components';
import AccordionEdit from './AccordionEdit';
const View = (props) => {
  const { data } = props;
  const metadata = props.metadata || props.properties;
  return (
    <AccordionEdit data={data}>
      <RenderBlocks
        {...props}
        as={data?.as}
        metadata={metadata}
        content={data?.data || {}}
      />
    </AccordionEdit>
  );
};

export default View;
