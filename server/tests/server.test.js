const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const {ObjectID} = require('mongodb');

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

beforeEach((done) => {
	Todo.remove({})
      .then(() => {
          return Todo.insertMany(todos);
      }) 
      .then(() => done());
})


describe('POST todos', () => {
	it('should create a new todo', (done) => {
         const text = 'test post todo';

         request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
              expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
            	if(err) {
            	  return done(err);
            	}

            	Todo.find({text}).then((todos) => {
            		expect(todos.length).toBe(1);
            		expect(todos[0].text).toBe(text);
            		done();
            	}).catch(error => done(error));
            })
	})

	it('should not create todo with invalid body data', (done) => {
        request(app)
           .post('/todos')
           .send({})
           .expect(400)
           .end((err, res) => {
           	   if(err) {
           		   return done(err);
           	   }

           	   Todo.find().then((todos) => {
                  expect(todos.length).toBe(2);
                  done();
               }).catch(error => done(error));
           })
	})

});


describe('GET todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
})

describe('GET todo by id', () => {
  it('should get todo by ID', (done) => {
      request(app)
         .get(`/todos/${todos[0]._id.toHexString()}`) 
         .expect(200)
         .expect((res) => {
            expect(res.body.text).toBe(todos[0].text);
         })
         .end(done);
  })

  it('should return 404 if ID is not found', (done) => {
      var fakeId = new ObjectID().toHexString();
      request(app)
         .get(`/todos/${fakeId}`)
         .expect(404)
         .end(done);
  })

  it('should return 404 if ID is not valid', (done) => {
      var fakeId = new ObjectID().toHexString();
      request(app)
         .get(`/todos/123`)
         .expect(404)
         .end(done);
  })
})