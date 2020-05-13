import React from 'react';
import { connect } from 'react-redux';
import { Header, Image, Table, Container } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

function Leaderboard(props) {
  const { users } = props;
  const userList = users.map((user) => {
    const { answers, questions, name, id, avatarURL } = user;
    const numOfQuestions = questions.length;
    const numOfAnswers = Object.keys(answers).length;
    const sum = numOfQuestions + numOfAnswers;
    return {
      id,
      name,
      numOfQuestions,
      numOfAnswers,
      sum,
      avatarURL,
    };
  });

  const sortedUserList = userList.sort((a, b) => b.sum - a.sum);

  const trophyColor = ['yellow', 'grey', 'brown'];
  const tropySize = ['big', 'large'];

  return (
    <Container>
      <Header as='h2' textAlign='center'>
        Leaderboard
      </Header>

      <br />

      <Table className='form-center'>
        <Table.Header className='center'>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Questions Asked</Table.HeaderCell>
            <Table.HeaderCell>Questions Answered</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className='center'>
          {sortedUserList.map((user, key) => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Icon name='trophy' size={tropySize[key]} color={trophyColor[key]} />
              </Table.Cell>
              <Table.Cell>
                <Image src={user.avatarURL} size='mini' className='avatar' />
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'>{user.name}</Header>
              </Table.Cell>
              <Table.Cell>{user.numOfQuestions}</Table.Cell>
              <Table.Cell>{user.numOfAnswers}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}

export default connect(mapStateToProps)(Leaderboard);
