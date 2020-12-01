import React from 'react';
import { RenderBlocks } from '@eeacms/volto-blocks-form/components';
import { getPanels, accordionBlockHasValue } from './util';
import { Accordion } from 'semantic-ui-react';

import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import rightSVG from '@plone/volto/icons/right-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import AnimateHeight from 'react-animate-height';

import './editor.less';

const View = (props) => {
  const { data } = props;
  const panels = getPanels(data.data);
  const metadata = props.metadata || props.properties;
  const [activeIndex, setActiveIndex] = React.useState(0);
  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }

  React.useEffect(() => {
    data.collapsed ? setActiveIndex(-1) : setActiveIndex(0);
  }, [data.collapsed]);

  return (
    <div className="accordion-block">
      {panels.map(([id, panel], index) => {
        return accordionBlockHasValue(panel) ? (
          <Accordion fluid styled key={id} exclusive={false}>
            <React.Fragment>
              <Accordion.Title
                as={data.title_size}
                active={activeIndex === index}
                index={index}
                onClick={handleClick}
                className={cx('accordion-title', {
                  'align-arrow-left': !props?.data?.right_arrows,
                  'align-arrow-right': props?.data?.right_arrows,
                })}
              >
                {activeIndex === index ? (
                  <Icon name={downSVG} size="24px" />
                ) : (
                  <Icon
                    name={rightSVG}
                    size="24px"
                    className={cx({
                      'rotate-arrow': props?.data?.right_arrows,
                    })}
                  />
                )}
                <span>{panel?.title}</span>
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
                    content={panel}
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
