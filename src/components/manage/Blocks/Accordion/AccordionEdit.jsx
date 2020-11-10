import React from 'react';
import { Segment, Accordion } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import { TextWidget } from '@plone/volto/components';
import AnimateHeight from 'react-animate-height';
export default ({ children }) => {
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
            <div className="accordion-tools">
              {activeIndex === 0 ? (
                <Icon name={upSVG} size="20px" />
              ) : (
                <Icon name={downSVG} size="20px" />
              )}
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
