const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const todos = [
    {  
      _id: new ObjectID(),
      text: 'eat'
    },
    {
      _id: new ObjectID(),
      text: 'sing'
    }
];

const populateTodos = function(done){
  this.timeout(5000);
  Todo.deleteMany({})
      .then(() => {
          return Todo.insertMany(todos);
      }) 
      .then(() => done());
}

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
    {  
      _id: userOneId,
      email: "test@test.com",
      password: "pass1234",
      tokens: [
        {
          access: 'auth',
          token: jwt.sign({ _id: userOneId, access: 'auth'}, '123abc').toString()
        }
      ]
    },
    {
      _id: userTwoId,
      email: "test@gmail.com",
      password: "pass5678"
    }
];

const populateUsers = function(done) {
  this.timeout(5000);
  User.deleteMany({})
      .then(() => {
          var userOne = new User(users[0]).save();
          var userTwo = new User(users[1]).save();

          return Promise.all([userOne, userTwo])
      }).then(() => done());
}

	module.exports = {
    todos, populateTodos, users, populateUsers
  }
