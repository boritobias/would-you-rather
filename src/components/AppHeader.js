import React from 'react';
import { Header } from 'semantic-ui-react';

function AppHeader() {
  return (
    <div className='app-header'>
      <Header as='h1' textAlign='center'>
        Would you rather?
      </Header>
    </div>
  );
}

export default AppHeader;
