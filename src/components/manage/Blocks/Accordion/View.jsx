import React from 'react';
import { RenderBlocks } from '@eeacms/volto-blocks-form/components';
import { getColumns, GroupblockHasValue } from './util';
import { Accordion } from 'semantic-ui-react';
import { applyBgColor } from '@eeacms/volto-accordion-block/components/manage/Styles';

import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import rightSVG from '@plone/volto/icons/right-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import AnimateHeight from 'react-animate-height';

import './editor.less';

const View = (props) => {
  const {
    data: { data = {} },
  } = props;
  const columnList = getColumns(data);
  const metadata = props.metadata || props.properties;
  const [activeIndex, setActiveIndex] = React.useState(0);
  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }
  return (
    <div>
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
                <div
                  className={cx('align-arrow-left', {
                    'align-arrow-right': props.data.arrow_select,
                  })}
                >
                  {activeIndex === index ? (
                    <Icon name={downSVG} size="20px" />
                  ) : (
                    <Icon name={rightSVG} size="20px" />
                  )}
                  <p>{column?.blocks?.acc_title}</p>
                </div>
              </Accordion.Title>
              <div>
                <Accordion.Content active={activeIndex === index}>
                  <div {...applyBgColor(data?.blocks?.settings || {})}>
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
                  </div>
                </Accordion.Content>
              </div>
            </React.Fragment>
          </Accordion>
        ) : null;
      })}
    </div>
  );
};

export default View;
