import React from 'react';
import { Header, Container, Icon } from 'semantic-ui-react';

function NoMatch() {
  return (
    <Container textAlign='center'>
      <Icon name='search' size='huge' />
      <Header as='h1'>404</Header>
      <Header as='h1'>Not Found</Header>
      <Header as='h3'>Use the menu to move around</Header>
    </Container>
  );
}

export default NoMatch;
