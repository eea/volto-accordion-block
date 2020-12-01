import React from 'react';
import { Accordion, Input } from 'semantic-ui-react';

import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import rightSVG from '@plone/volto/icons/right-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

import AnimateHeight from 'react-animate-height';
export default (props) => {
  const {
    children,
    handleTitleChange,
    handleTitleClick,
    uid,
    panel,
    data,
  } = props;
  const [activeIndex, setActiveIndex] = React.useState(0);
  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }
  //handle accordion collapse behavior
  React.useEffect(() => {
    data.collapsed ? setActiveIndex(-1) : setActiveIndex(0);
  }, [data.collapsed]);

  return (
    <Accordion fluid styled>
      <React.Fragment>
        <Accordion.Title
          as={data.title_size}
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
          className={cx('accordion-title', {
            'align-arrow-left': !props?.data?.right_arrows,
            'align-arrow-right': props?.data?.right_arrows,
          })}
        >
          {activeIndex === 0 ? (
            <Icon name={downSVG} size="24px" />
          ) : (
            <Icon
              size="24px"
              name={rightSVG}
              className={cx({ 'rotate-arrow': data?.right_arrows })}
            />
          )}
          {!data.readOnlyTitles ? (
            <Input
              fluid
              className="input-accordion-title"
              transparent
              placeholder="Enter Title"
              value={panel?.title}
              onClick={(e) => {
                handleTitleClick();
                e.stopPropagation();
              }}
              onChange={(e) => handleTitleChange(e, [uid, panel])}
            />
          ) : (
            <span>{panel?.title}</span>
          )}
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
  );
};
