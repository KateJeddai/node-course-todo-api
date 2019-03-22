const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
	if(err) {
		return console.log('Unable to connect');
	}
	console.log('Connected to MongoDB server');

	var db = client.db('TodoApp');

	/*db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID("5c949a89ec8168a76dc51810")
	}, {
       $set: {
       	  completed: true
       }
	}, {
		returnOriginal: false
	}).then(res => {
		console.log(res);
	})*/

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID("5c94a29cec8168a76dc5190c")
	}, {
		$set: {
			name: 'Mary'
		},
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then(res => {
		console.log(res);
	})

})