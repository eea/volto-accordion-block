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
    index,
  } = props;
  const [activeIndex, setActiveIndex] = React.useState([0]);

  const handleClick = (e, itemProps) => {
    const { index } = itemProps;
    if (data.non_exclusive) {
      const newIndex =
        activeIndex.indexOf(index) === -1
          ? [...activeIndex, index]
          : activeIndex.filter((item) => item !== index);

      setActiveIndex(newIndex);
    } else {
      const newIndex =
        activeIndex.indexOf(index) === -1
          ? [index]
          : activeIndex.filter((item) => item !== index);

      setActiveIndex(newIndex);
    }
  };

  const isExclusive = (index) => {
    return activeIndex.includes(index);
  };

  React.useEffect(() => {
    return data.collapsed ? setActiveIndex([]) : setActiveIndex([0]);
  }, [data.collapsed]);

  return (
    <Accordion fluid styled>
      <React.Fragment>
        <Accordion.Title
          as={data.title_size}
          active={isExclusive(index)}
          index={index}
          onClick={handleClick}
          className={cx('accordion-title', {
            'align-arrow-left': !props?.data?.right_arrows,
            'align-arrow-right': props?.data?.right_arrows,
          })}
        >
          {isExclusive(index) ? (
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
              value={panel?.title || ''}
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
        <Accordion.Content active={isExclusive(index)}>
          <AnimateHeight
            animateOpacity
            duration={500}
            height={isExclusive(index) ? 'auto' : 0}
          >
            {children}
          </AnimateHeight>
        </Accordion.Content>
      </React.Fragment>
    </Accordion>
  );
};
