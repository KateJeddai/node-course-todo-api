// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if(err) {
  	 return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  var db = client.db('TodoApp');

  /*db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, res) => {
    if(err) {
    	return console.log('Unable to insert todo', err);
    }
    console.log(JSON.stringify(res.ops, undefined, 2));
  });*/

  db.collection('Users').insertOne({
  	name: 'Kate',
  	age: 27,
  	location: 'UK'
  }, (err, res) => {
  	 if(err) {
  	 	 return console.log('Unable to insert the user');
  	 }
  	 console.log(JSON.stringify(res.ops, undefined, 2), res.ops[0]._id.getTimestamp());
  });

   client.close();
});