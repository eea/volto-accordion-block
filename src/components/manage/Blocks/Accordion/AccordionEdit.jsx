import React from 'react';
import { Accordion, Input } from 'semantic-ui-react';

import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import rightSVG from '@plone/volto/icons/right-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

import AnimateHeight from 'react-animate-height';
export default (props) => {
  const { children, handleTitleChange, colId, column, data } = props;
  const [activeIndex, setActiveIndex] = React.useState(0);
  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }

  const CustomTag = `${data.as || 'div'}`;
  return (
    <div className="block-accordion">
      <Accordion fluid styled>
        <React.Fragment>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
            className="accordion-title"
          >
            <CustomTag
              className={cx('align-arrow-left', {
                'align-arrow-right': data?.arrow_select,
              })}
            >
              {activeIndex === 0 ? (
                <Icon name={downSVG} />
              ) : (
                <Icon
                  name={rightSVG}
                  className={cx({ 'rotate-arrow': data?.arrow_select })}
                />
              )}
              <Input
                fluid
                className="input-accordion-title"
                transparent
                placeholder="Enter Title"
                value={column?.blocks_layout?.title}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleTitleChange(e, [colId, column])}
              />
            </CustomTag>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <AnimateHeight
              animateOpacity
              duration={500}
              height={activeIndex === 0 ? 'auto' : 0}
            >
              {children}
            </AnimateHeight>
          </Accordion.Content>
        </React.Fragment>
      </Accordion>
    </div>
  );
};
