import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import AccordionEdit from './AccordionEdit';
import renderer from 'react-test-renderer';
import config from '@plone/volto/registry';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore();

config.blocks.blocksConfig.accordion = {
  ...config.blocks.blocksConfig.accordion,
  defaults: {
    theme: 'defaultTheme',
  },
  titleIcons: {
    opened: {
      rightPosition: 'chevron left',
      leftPosition: 'chevron right',
    },
    closed: {
      rightPosition: 'chevron down',
      leftPosition: 'chevron down',
    },
    size: 'tiny',
    iconComponent: 'SemanticIcon',
  },
};

const handleTitleChange = jest.fn();
const handleTitleClick = jest.fn();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
    formatMessage: () => 'Select layout',
  },
});
describe('AccordionEdit', () => {
  const uid = 'uid';
  const panel = { title: 'Panel Title' };
  const data = {
    title_size: 'h3',
    right_arrows: true,
    collapsed: false,
    exclusive: false,
    non_exclusive: true,
    styles: {
      theme: 'default',
    },
  };
  const data1 = {
    title_size: 'h3',
    right_arrows: false,
    collapsed: true,
    exclusive: false,
    non_exclusive: true,
    readOnlyTitles: true,
  };
  const index = 0;

  it('should render correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <AccordionEdit
          handleTitleChange={handleTitleChange}
          handleTitleClick={handleTitleClick}
          uid={uid}
          panel={panel}
          data={data}
          index={index}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AccordionEdit
          handleTitleChange={handleTitleChange}
          handleTitleClick={handleTitleClick}
          uid={uid}
          panel={panel}
          data={data1}
          index={index}
        />
      </Provider>,
    );

    expect(getByText(panel.title)).toBeInTheDocument();
  });

  it('should handle title click correctly', () => {
    const { getByDisplayValue } = render(
      <Provider store={store}>
        <AccordionEdit
          handleTitleChange={handleTitleChange}
          handleTitleClick={handleTitleClick}
          uid={uid}
          panel={panel}
          data={data}
          index={index}
        />
      </Provider>,
    );

    fireEvent.click(getByDisplayValue(panel.title));

    expect(handleTitleClick).toHaveBeenCalled();
  });

  it('should handle title change correctly and check the parameters the handleTitleChange function was called with', () => {
    const { getByDisplayValue } = render(
      <Provider store={store}>
        <AccordionEdit
          handleTitleChange={handleTitleChange}
          handleTitleClick={handleTitleClick}
          uid={uid}
          panel={panel}
          data={data}
          index={index}
        />
      </Provider>,
    );

    fireEvent.change(getByDisplayValue(panel.title), {
      target: { value: 'New Panel Title' },
    });

    expect(handleTitleChange).toHaveBeenCalledWith(expect.any(Object), [
      uid,
      panel,
    ]);
  });

  it('should open accordion content when title is clicked', () => {
    config.blocks.blocksConfig.accordion = {
      ...config.blocks.blocksConfig.accordion,
    };
    const { container, getByText } = render(
      <Provider store={store}>
        <AccordionEdit
          handleTitleChange={handleTitleChange}
          handleTitleClick={handleTitleClick}
          uid={uid}
          panel={panel}
          data={data}
          index={index}
        >
          <p>Accordion Content</p>
        </AccordionEdit>
      </Provider>,
    );
    const accordionTitle = container.querySelector('.accordion-title');
    fireEvent.click(accordionTitle);

    const contentElement = getByText('Accordion Content');
    expect(contentElement).toBeInTheDocument();
  });

  it('should open accordion content when title is clicked', () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <AccordionEdit
          handleTitleChange={handleTitleChange}
          handleTitleClick={handleTitleClick}
          uid={uid}
          panel={panel}
          data={{ ...data, non_exclusive: false }}
          index={index}
        >
          <p>Accordion Content</p>
        </AccordionEdit>
      </Provider>,
    );
    const accordionTitle = container.querySelector('.accordion-title');
    fireEvent.click(accordionTitle);

    const contentElement = getByText('Accordion Content');
    expect(contentElement).toBeInTheDocument();
  });
});
