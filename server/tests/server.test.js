const expect = require('expect');
const request = require('supertest');

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
