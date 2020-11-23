import React from 'react';
import { RenderBlocks } from '@eeacms/volto-blocks-form/components';
import { getColumns, GroupblockHasValue } from './util';
import { Accordion } from 'semantic-ui-react';

import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import rightSVG from '@plone/volto/icons/right-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import AnimateHeight from 'react-animate-height';

import './editor.less';

const View = (props) => {
  const { data } = props;
  const CustomTag = `${data.as || 'div'}`;
  const columnList = getColumns(data.data);
  const metadata = props.metadata || props.properties;
  const [activeIndex, setActiveIndex] = React.useState(0);
  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }
  return (
    <div className="block-accordion">
      {columnList.map(([id, column], index) => {
        return GroupblockHasValue(column) ? (
          <Accordion fluid styled key={id}>
            <React.Fragment>
              <Accordion.Title
                active={activeIndex === index}
                index={index}
                onClick={handleClick}
                className="accordion-title"
              >
                <CustomTag
                  className={cx('align-arrow-left', {
                    'align-arrow-right': props?.data?.arrow_select,
                  })}
                >
                  {activeIndex === index ? (
                    <Icon name={downSVG} />
                  ) : (
                    <Icon
                      name={rightSVG}
                      className={cx({
                        'rotate-arrow': props?.data?.arrow_select,
                      })}
                    />
                  )}
                  {column?.blocks_layout?.title}
                </CustomTag>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                <AnimateHeight
                  animateOpacity
                  duration={500}
                  height={activeIndex === index ? 'auto' : 0}
                >
                  <RenderBlocks
                    {...props}
                    metadata={metadata}
                    content={column}
                  />
                </AnimateHeight>
              </Accordion.Content>
            </React.Fragment>
          </Accordion>
        ) : null;
      })}
    </div>
  );
};

export default View;
