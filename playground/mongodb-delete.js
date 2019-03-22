const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
	if(err) {
		return console.log('Unable to connect');
	}
	console.log('Connected to MongoDB server');

	var db = client.db('TodoApp');

	/*db.collection('Todos').deleteMany({text: 'Eat lunch'}).then(res => {
		console.log(res);
	}) */

    /*db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((res) => {
    	console.log(res);
    })*/

    db.collection('Todos').findOneAndDelete({completed: false}).then(res => {
    	console.log(res);
    })

})