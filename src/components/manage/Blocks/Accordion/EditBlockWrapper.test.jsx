import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import config from '@plone/volto/registry';
import EditBlockWrapper from './EditBlockWrapper';

jest.mock('@plone/volto/components/theme/Icon/Icon', () => () => (
  <svg data-testid="icon" />
));

jest.mock(
  '@plone/volto/components/manage/BlockChooser/BlockChooserButton',
  () => () => <button type="button" data-testid="block-chooser-button" />,
);

const renderWrapper = (props = {}) => {
  const blockProps = {
    allowedBlocks: ['text'],
    block: 'inner-block',
    blocksConfig: {
      text: {
        id: 'text',
      },
    },
    contentType: 'Document',
    data: {
      '@type': 'text',
    },
    editable: true,
    navRoot: '/',
    onChangeBlock: jest.fn(),
    onDeleteBlock: jest.fn(),
    onInsertBlock: jest.fn(() => 'new-block'),
    onMutateBlock: jest.fn(),
    onSelectBlock: jest.fn(),
    properties: {
      blocks: {
        'inner-block': {
          '@type': 'text',
        },
      },
      blocks_layout: {
        items: ['inner-block'],
      },
    },
    selected: true,
    showBlockChooser: true,
    showRestricted: false,
    type: 'text',
    ...props.blockProps,
  };

  const draginfo = {
    draggableProps: {
      style: {},
    },
    dragHandleProps: {
      'data-testid': 'drag-handle',
    },
    innerRef: jest.fn(),
    ...props.draginfo,
  };

  return render(
    <IntlProvider locale="en" messages={{}}>
      <EditBlockWrapper
        blockProps={blockProps}
        draginfo={draginfo}
        disabled={props.disabled}
      >
        <div>Inner block</div>
      </EditBlockWrapper>
    </IntlProvider>,
  );
};

describe('Accordion EditBlockWrapper', () => {
  const originalExperimentalConfig = config.experimental;

  beforeEach(() => {
    config.experimental = {
      ...(config.experimental || {}),
      addBlockButton: {
        ...config.experimental?.addBlockButton,
        enabled: true,
      },
    };
  });

  afterEach(() => {
    config.experimental = originalExperimentalConfig;
  });

  it('renders standard Volto 18 block controls without the legacy toolbar', () => {
    renderWrapper();

    expect(document.querySelector('.block-toolbar')).not.toBeInTheDocument();
    expect(document.querySelector('.drag.handle.wrapper')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'delete text block' }),
    ).toHaveClass('delete-button');
    expect(screen.getByTestId('block-chooser-button')).toBeInTheDocument();
  });

  it('hides the action controls when inner buttons are disabled', () => {
    renderWrapper({ disabled: true });

    expect(
      screen.queryByRole('button', { name: 'delete text block' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('block-chooser-button'),
    ).not.toBeInTheDocument();
  });
});
