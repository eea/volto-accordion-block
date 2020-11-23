import React from 'react';
import { Accordion, Input } from 'semantic-ui-react';

import { applyTitleSize } from '@eeacms/volto-accordion-block/components/manage/Styles';
import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import rightSVG from '@plone/volto/icons/right-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

import AnimateHeight from 'react-animate-height';
export default ({
  children,
  coldata,
  handleTitleChange,
  colId,
  column,
  data,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }

  return (
    <div>
      <Accordion fluid styled>
        <React.Fragment>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
            className="accordion-title"
          >
            <div
              className={cx('align-arrow-left', {
                'align-arrow-right': data?.data?.blocks?.settings?.arrow_select,
              })}
            >
              {activeIndex === 0 ? (
                <Icon name={downSVG} size="20px" />
              ) : (
                <Icon name={rightSVG} size="20px" />
              )}
              <Input
                {...applyTitleSize(data?.data?.blocks?.settings || {})}
                fluid
                className="input-accordion-title"
                transparent
                placeholder="Enter Title"
                value={column?.blocks?.acc_title}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleTitleChange(e, [colId, column])}
              />
            </div>
          </Accordion.Title>
          <div>
            <Accordion.Content active={activeIndex === 0}>
              <div style={{ margin: '1em' }}>
                <AnimateHeight
                  animateOpacity
                  duration={500}
                  height={activeIndex === 0 ? 'auto' : 0}
                >
                  {children}
                </AnimateHeight>
              </div>
            </Accordion.Content>
          </div>
        </React.Fragment>
      </Accordion>
    </div>
  );
};
