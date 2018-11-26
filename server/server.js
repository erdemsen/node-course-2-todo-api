var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID}=require('mongodb');

var {
  mongoose
} = require('./db/mongoose.js');
var {
  ToDo
} = require('./models/todo');
var {
  User
} = require('./models/user');

var app = express();
app.use(bodyParser.json());

// A POST request for creating new todo
app.post('/todos', (req, res) => {
  var todo = new ToDo({
    text: req.body.text
  });
  //todo is a mongoose model so we can use .save method
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.send(e);
  });
});

// GET request for getting all todos
// app.get('/getTodos', (req, res) => {
//   ToDo.find({}).then((doc) => {
//     res.send(doc);
//   }, (err) => {
//     res.send(e);
//   });
// });

// GET request for a special ToDo
app.get('/getTodos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send('ID is not valid');
  } else {
    ToDo.findById(id).then((doc) => {
      if (doc)
        res.send(doc);
      else {
        res.status(404).send();
      }
    }, (err) => {
      res.status(400).send(e);
    });
  }
});

app.listen(3000, () => {
  console.log('Started on port 3000.');
});

module.exports = {
  app
};
