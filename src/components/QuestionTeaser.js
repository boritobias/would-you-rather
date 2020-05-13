import React from 'react';
import { connect } from 'react-redux';
import { Container, Form, Header, Image, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function QuestionTeaser(props) {
  const { question, user } = props;
  const { optionOne, id } = question;
  const { name, avatarURL } = user;

  return (
    <Container>
      <Grid>
        <Grid.Column width={2}>
          <Image src={avatarURL} alt={`Avatar of ${name}`} size='tiny' className='avatar' />
        </Grid.Column>
        <Grid.Column width={6}>
          <Form>
            <Header as='h4' className='question-header' style={{ color: '#969696' }}>
              Question by {name}:
            </Header>
            <Header as='h3'>Would you rather</Header>
            <Form.Group style={{ display: 'block' }}>
              <Form.Field>{optionOne.text}</Form.Field>
              <Form.Field>...</Form.Field>
              <Form.Button>
                <Link to={`/questions/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                  Show question
                </Link>
              </Form.Button>
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const user = users[question.author];

  return {
    authedUser,
    question,
    user,
    users,
  };
}

export default connect(mapStateToProps)(QuestionTeaser);
