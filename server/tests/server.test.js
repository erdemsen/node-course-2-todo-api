const expect = require('expect');
const request = require('supertest');
const {ObjectID}=require('mongodb');

const {
  app
} = require('./../server');
const {
  ToDo
} = require('./../models/todo');

//testler yapılırken database in tamamen boşaltılmasını sağlar
// beforeEach((done)=>{
//   ToDo.remove({}).then(()=>{
//     done();
//   });
// });

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Todo test';
    request(app)
      .post('/todos')
      .send({
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // ToDo.find().then((todos)=>{
        //
        // });
        done();
      });
  });
});

describe('GET /getTodos/:id',()=>{
  it('should be return todo doc',(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe('sth');
    })
    .end(done);
  });
});
