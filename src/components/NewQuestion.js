import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Form, Header, Container } from 'semantic-ui-react';
import { handleSaveQuestion } from '../actions/questions';

function NewQuestion(props) {
  const [options, setOptions] = useState({
    optionOne: '',
    optionTwo: '',
  });
  const [toHome, setToHome] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const { optionOne, optionTwo } = options;
    const { authedUser, handleSaveQuestion } = props;
    handleSaveQuestion(optionOne, optionTwo, authedUser);

    setOptions({
      optionOne: '',
      optionTwo: '',
    });
    setToHome(true);
  };
  const { optionOne, optionTwo } = options;

  if (toHome) {
    return <Redirect to='/' />;
  }

  return (
    <Container style={{ width: '50%' }}>
      <Header as='h2' textAlign='center'>
        Create New Question
      </Header>

      <br />

      <Header as='h3' textAlign='center'>
        Would you rather
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input required placeholder='Option 1' value={optionOne} onChange={handleInputChange} name='optionOne' />
        </Form.Field>
        <Header as='h4' textAlign='center'>
          or
        </Header>
        <Form.Field>
          <input required placeholder='Option 2' value={optionTwo} onChange={handleInputChange} name='optionTwo' />
        </Form.Field>
        <Button type='submit'>Submit New Question</Button>
      </Form>
    </Container>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps, { handleSaveQuestion })(NewQuestion);
