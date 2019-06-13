const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const {ObjectID} = require('mongodb');

/*Todo.deleteMany({}).then((res) => {
	console.log(res);
})
*/

Todo.findOneAndRemove({ _id: "5cf10cde1c78b0170f732068"}).then((todo) => {
    console.log(todo);
})