const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const {ObjectID} = require('mongodb');

const id = '5c961b8424268e27ccb8fcb0';
const userId = '5c94f75e1c740012b82cf288';

/*if(!ObjectID.isValid(id)) {
	console.log('id is not valid');
}

Todo.find({_id: id})
    .then((todos) => {
    	console.log('Todos', todos);
    })

Todo.findOne({_id: id})
    .then((todo) => {
    	console.log('Todo', todo);
    })    

Todo.findById(id)
    .then((todo) => {
    	if(!todo) {
    		return console.log('id not found');
    	}
    	console.log('Todo by id', todo);
    }).catch(err => console.log(err));*/

User.findById(userId)    
    .then(user => {
    	if(!user) {
    		console.log('User not found');
    	}
    	console.log('User', user);
    }).catch(err => console.log(err));