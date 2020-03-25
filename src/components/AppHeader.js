import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'

class AppHeader extends Component {
  render() {
    return (
      <div className='app-header'>
        <Header as='h1' textAlign='center'>Would you rather?</Header>
      </div>
    )
  }
}

export default AppHeader