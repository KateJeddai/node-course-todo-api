const {mongoose} = require('./db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})
    todo.save().then((doc) => {
       res.send(doc);
    }, (err) => {
       console.log(err);
       res.status(400).send(doc);
    })
})

app.listen(3000, () => {
	console.log('Started on port 3000');
})