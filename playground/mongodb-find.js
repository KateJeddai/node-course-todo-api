const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
	if(err) {
		return console.log('Unable to connect');
	}
	console.log('Connected to MongoDB server');

	var db = client.db('TodoApp');

	   /* db.collection('Todos').find({completed: true}).toArray().then((docs) => {
            console.log('Todos');
            console.log(JSON.stringify(docs, undefined, 2));
	    }, (err) => {
	    	console.log('Unable to fetch todos', err);
	    });

	    db.collection('Todos').find({_id: new ObjectID("5c93b1847bfdcc0e0455b84b")}).toArray().then((docs) => {
            console.log('Todos');
            console.log(JSON.stringify(docs, undefined, 2));
	    }, (err) => {
	    	console.log('Unable to fetch todos', err);
	    }); 

	    db.collection('Todos').find().count().then((count) => {
            console.log(`Todos count: ${count}`);
            
	    }, (err) => {
	    	console.log('Unable to fetch todos', err);
	    }); */

	    db.collection('Users').find({name: 'Anne'}).toArray().then((docs) => {
            console.log(JSON.stringify(docs, undefined, 2));
	    }, (err) => {
	    	console.log('Unable to fetch users', err);
	    })


	client.close();
})