import React from 'react';
import { Segment, Card } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import './editor.less';

export default ({ data, onChange, children, variants }) => {
  return (
    <Segment>
      <h4>Accordion Panels:</h4>
      <Card.Group centered itemsPerRow={3}>
        {variants.map(({ icon, defaultData, title }, index) => (
          <Card key={index} onClick={() => onChange(defaultData)}>
            <Card.Content textAlign={'center'}>
              <Icon name={icon} size="88" className={'panel-icon'} />
              {title ? <p>{title}</p> : ''}
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Segment>
  );
};
