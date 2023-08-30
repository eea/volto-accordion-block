import React from 'react';
import { getPanels, accordionBlockHasValue, Icon } from './util';
import { Accordion } from 'semantic-ui-react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { useLocation, useHistory } from 'react-router-dom';

import cx from 'classnames';
import { RenderBlocks } from '@plone/volto/components';
import AnimateHeight from 'react-animate-height';
import config from '@plone/volto/registry';
import './editor.less';
import AccordionFilter from './AccordionFilter';

const useQuery = (location) => {
  const { search } = location;
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const View = (props) => {
  const { data, className } = props;
  const location = useLocation();
  const history = useHistory();
  const panels = getPanels(data.data);
  const metadata = props.metadata || props.properties;
  const diffView =
    location?.pathname.slice(
      location?.pathname.lastIndexOf('/'),
      location?.pathname.length,
    ) === '/diff';

  const [activeIndex, setActiveIndex] = React.useState([]);
  const [activePanel, setActivePanel] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState('');
  const [itemToScroll, setItemToScroll] = React.useState('');
  const accordionConfig = config.blocks.blocksConfig.accordion;
  const { titleIcons } = accordionConfig;
  const iconOnRight = data.right_arrows;
  const iconPosition = iconOnRight ? 'rightPosition' : 'leftPosition';

  const query = useQuery(location);
  const activePanels = query.get('activeAccordion')?.split(',');
  const [firstIdFromPanels] = panels[0];

  const activePanelsRef = React.useRef(activePanels);
  const firstIdFromPanelsRef = React.useRef(firstIdFromPanels);

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
    const newIndex =
      activeIndex.indexOf(index) === -1
        ? data.non_exclusive
          ? [...activeIndex, index]
          : [index]
        : activeIndex.filter((item) => item !== index);

    const newPanel =
      activePanel.indexOf(id) === -1
        ? data.non_exclusive
          ? [...activePanel, id]
          : [id]
        : activePanel.filter((item) => item !== id);

    handleActiveIndex(newIndex, newPanel);
  };

  const handleActiveIndex = (index, id) => {
    setActiveIndex(index);
    setActivePanel(id);
    addQueryParam('activeAccordion', id);
  };

  const handleFilteredValueChange = (value) => {
    setFilterValue(value);
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
    !!activePanelsRef.current &&
      setItemToScroll(
        activePanelsRef.current[activePanelsRef.current?.length - 1],
      );
  }, []);

  React.useEffect(() => {
    if (data.collapsed) {
      setActivePanel(activePanelsRef.current || []);
    } else {
      if (!!activePanelsRef.current && !!activePanelsRef.current[0].length) {
        setActivePanel(activePanelsRef.current || []);
      } else {
        setActivePanel([
          firstIdFromPanelsRef.current,
          ...(activePanelsRef.current || []),
        ]);
      }
    }
  }, [data.collapsed]);

  return (
    <div className={cx('accordion-block', className)}>
      {data.headline && <h2 className="headline">{data.headline}</h2>}
      {data.filtering && (
        <AccordionFilter
          config={accordionConfig}
          data={data}
          filterValue={filterValue}
          handleFilteredValueChange={handleFilteredValueChange}
        />
      )}
      {panels
        .filter(
          (panel) =>
            !data.filtering ||
            filterValue === '' ||
            (filterValue !== '' &&
              panel[1].title
                ?.toLowerCase()
                .includes(filterValue.toLowerCase())),
        )
        .map(([id, panel], index) => {
          const active = isExclusive(id);
          return accordionBlockHasValue(panel) ? (
            <Accordion
              key={id}
              id={id}
              exclusive={!data.exclusive}
              className={
                data.styles
                  ? data.styles.theme
                  : accordionConfig?.defaults?.theme
              }
              {...accordionConfig.options}
            >
              <React.Fragment>
                <Accordion.Title
                  as={data.title_size}
                  active={active}
                  aria-expanded={active}
                  className={cx('accordion-title', {
                    'align-arrow-left': !iconOnRight,
                    'align-arrow-right': iconOnRight,
                  })}
                  index={index}
                  onClick={(e) => handleClick(e, { index, id })}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 || e.keyCode === 32) {
                      e.preventDefault();
                      handleClick(e, { index, id });
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <Icon
                    options={titleIcons}
                    name={
                      active
                        ? titleIcons.opened[iconPosition]
                        : titleIcons.closed[iconPosition]
                    }
                  />
                  <span>{panel?.title}</span>
                </Accordion.Title>
                <AnimateHeight
                  animateOpacity
                  duration={500}
                  height={active || diffView ? 'auto' : 0}
                  onTransitionEnd={() => {
                    if (!!activePanels && id === itemToScroll) {
                      scrollToElement();
                      setItemToScroll('');
                    }
                  }}
                >
                  <Accordion.Content active={diffView ? true : active}>
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
