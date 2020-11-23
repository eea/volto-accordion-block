import React from 'react';

const elements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  div: 'div',
};

function Heading({ as, children, ...props }) {
  return React.createElement(elements[as] || elements.div, props, children);
}

Heading.defaultProps = {
  type: 'div',
};

export default Heading;
