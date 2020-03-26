# Would You Rather Project

This is the final assessment project for Udacity's React & Redux course, the 'Would you rather?' app, where the user can answer a question by choosing one of two options.

## To get started

* clone project with `https://github.com/susumoa/would-you-rather.git`
* install all project dependencies with `npm install`
* start the development server with `npm start`

## How to use

### Login

![login](./screenshots/Login.png)

Choose from one of the existing users, then log in.

### Home

![home](./screenshots/Home.png)

Unanswered questions are automaticly shown as teasers. To see the full question, click on Show question.
To see the answered question, change to the Answered tab.
The navigation bar shows who is the logged in user, and lets the user log out.

### Unanswered Question

![unanswered_question](./screenshots\Unanswered.png)

The author's avatar and name are shown with the two options. After choosing the submit button becomes enabled.

### Answered Question

![answered_question](./screenshots\Answered.png)

The author's avatar and name are shown with the two options. The chosen answer is marked. Both answers have their statistics (what percent of the users chose this answer, how many users chose this answer). The submit button is disabled. The user can't change the chosen answer.

### New Question

![new](./screenshots\New.png)

Ask a new question by filling the two input fields with the two options. The user can't sumbit the question if one of the options is empty.

### Leaderboard

![leaderboard](./screenshots\Leaderboard.png)

The leaderboard shows who asked and answered the most questions.

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

## Pictures

Pictures are from [https://www.flaticon.com/packs/avatar-10](https://www.flaticon.com/packs/avatar-10)