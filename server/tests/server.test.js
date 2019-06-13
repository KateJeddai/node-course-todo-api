const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

const {ObjectID} = require('mongodb');


beforeEach(populateUsers);
beforeEach(populateTodos);


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

describe('GET /users/me', function(){
  this.timeout(5000);
  it('should return user if authenticated', (done) => {
      request(app)
          .get('/users/me')
          .set('x-auth', users[0].tokens[0].token)
          .expect(200)
          .expect((res) => {
            expect(res.body._id).toBe((users[0]._id).toHexString());
            expect(res.body.email).toBe(users[0].email);
          }).end(done);
  })

  it('should return 401 if user is not authenticated', (done) => {
      request(app)
          .get('/users/me')
          .expect(401)
          .expect((res) => {
              expect(res.body).toEqual({});
          }).end(done);
  })
})

describe('POST /users', () => {
  it('should create a user', (done) => {
      var email = "example@example.com";
      var password = "12345678";

      request(app)
          .post('/users')
          .send({email, password})
          .expect(200)
          .expect((res) => {
             expect(res.headers['x-auth']).toExist();
             expect(res.body._id).toExist();
             expect(res.body.email).toBe(email); 
          }).end((err) => {
              if(err) return done(err);

              User.findOne({email}).then((user) => {
                expect(user).toExist();
                expect(user.password).toNotBe(password);
                done();
              });
          });

  })
  it('should return validation errors if request is not valid', (done) => {
      var email = "test";
      var password = "1234";
      request(app)
          .post('/users')
          .send({email, password})
          .expect(400)
          .end(done);
  })
  it('should not create user if email is already in use', (done) => {
      var email = users[0].email;
      var password = "12345678";
      request(app)
          .post('/users')
          .send({email, password})
          .expect(400)
          .end(done);
  })
})