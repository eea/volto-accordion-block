import React from 'react';
import { getPanels, accordionBlockHasValue } from './util';
import { Accordion, Icon } from 'semantic-ui-react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { useLocation, useHistory } from 'react-router-dom';

import cx from 'classnames';
import { Icon as VoltoIcon, RenderBlocks } from '@plone/volto/components';
import AnimateHeight from 'react-animate-height';
import config from '@plone/volto/registry';
import './editor.less';

const animationDuration = 500;

const useQuery = (location) => {
  const { search } = location;
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const View = (props) => {
  const { data } = props;
  const location = useLocation();
  const history = useHistory();
  const panels = getPanels(data.data);
  const metadata = props.metadata || props.properties;
  const [activeIndex, setActiveIndex] = React.useState([]);
  const [activePanel, setActivePanel] = React.useState([]);
  const accordionConfig = config.blocks.blocksConfig.accordion;
  const { titleIcons } = accordionConfig;

  const query = useQuery(location);
  const activePanels = query.get('activeAccordion')?.split(',');
  const [firstIdFromPanels] = panels[0];

  const addQueryParam = (key, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value);

    history.push({
      hash: location.hash,
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const handleClick = (e, itemProps) => {
    const { index, id } = itemProps;
    if (data.non_exclusive) {
      const newIndex =
        activeIndex.indexOf(index) === -1
          ? [...activeIndex, index]
          : activeIndex.filter((item) => item !== index);
      const newPanel =
        activePanel.indexOf(id) === -1
          ? [...activePanel, id]
          : activePanel.filter((item) => item !== id);

      handleActiveIndex(newIndex, newPanel);
    } else {
      const newIndex =
        activeIndex.indexOf(index) === -1
          ? [index]
          : activeIndex.filter((item) => item !== index);
      const newPanel =
        activePanel.indexOf(id) === -1
          ? [id]
          : activePanel.filter((item) => item !== id);

      handleActiveIndex(newIndex, newPanel);
    }
  };

  const handleActiveIndex = (index, id) => {
    setActiveIndex(index);
    setActivePanel(id);
    addQueryParam('activeAccordion', id);
  };

  const scrollToElement = () => {
    if (!!activePanels && !!activePanels[0].length) {
      let element = document.getElementById(
        activePanels[activePanels.length - 1],
      );
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isExclusive = (id) => {
    return activePanel.includes(id);
  };

  React.useEffect(() => {
    setTimeout(() => scrollToElement(), animationDuration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (data.collapsed) {
      setActivePanel(activePanels || []);
    } else {
      if (!!activePanels && !!activePanels[0].length) {
        setActivePanel(activePanels || []);
      } else {
        setActivePanel([firstIdFromPanels, ...(activePanels || [])]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.collapsed]);

  return (
    <div className="accordion-block">
      {panels.map(([id, panel], index) => {
        return accordionBlockHasValue(panel) ? (
          <Accordion
            key={id}
            id={id}
            exclusive={!data.exclusive}
            className={
              data.styles ? data.styles.theme : accordionConfig?.defaults?.theme
            }
            {...accordionConfig.options}
          >
            <React.Fragment>
              <Accordion.Title
                as={data.title_size}
                active={isExclusive(id)}
                index={index}
                tabIndex={0}
                onClick={(e) => handleClick(e, { index, id })}
                onKeyDown={(e) => {
                  if (e.nativeEvent.keyCode === 13) {
                    handleClick(e, { index });
                  }
                }}
                className={cx('accordion-title', {
                  'align-arrow-left': !props?.data?.right_arrows,
                  'align-arrow-right': props?.data?.right_arrows,
                })}
              >
                {accordionConfig.semanticIcon ? (
                  <Icon className={accordionConfig.semanticIcon} />
                ) : isExclusive(id) ? (
                  <VoltoIcon
                    name={
                      props?.data?.right_arrows
                        ? titleIcons.opened.rightPosition
                        : titleIcons.opened.leftPosition
                    }
                    size={titleIcons.size}
                  />
                ) : (
                  <VoltoIcon
                    name={
                      props?.data?.right_arrows
                        ? titleIcons.closed.rightPosition
                        : titleIcons.closed.leftPosition
                    }
                    size={titleIcons.size}
                  />
                )}
                <span>{panel?.title}</span>
              </Accordion.Title>
              <AnimateHeight
                animateOpacity
                duration={animationDuration}
                height={isExclusive(id) ? 'auto' : 0}
              >
                <Accordion.Content active={isExclusive(id)}>
                  <RenderBlocks
                    {...props}
                    location={location}
                    metadata={metadata}
                    content={panel}
                  />
                </Accordion.Content>
              </AnimateHeight>
            </React.Fragment>
          </Accordion>
        ) : null;
      })}
    </div>
  );
};

export default withBlockExtensions(View);
