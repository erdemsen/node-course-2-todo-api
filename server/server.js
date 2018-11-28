const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const {
  ObjectID
} = require('mongodb');

var {
  mongoose
} = require('./db/mongoose.js');
var {
  ToDo
} = require('./models/todo');
var {
  User
} = require('./models/user');
var {
  authenticate
} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// A POST request for creating new todo
app.post('/todos', authenticate, (req, res) => {
  var todo = new ToDo({
    text: req.body.text,
    _creator: req.user._id
  });
  //todo is a mongoose model so we can use .save method
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.send(e);
  });
});

//GET request for getting all todos
app.get('/getTodos', authenticate, (req, res) => {
  ToDo.find({
    _creator: req.user._id
  }).then((doc) => {
    res.send(doc);
  }, (err) => {
    res.send(e);
  });
});

// GET request for a special ToDo
app.get('/getTodos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send('ID is not valid');
  } else {
    ToDo.findOne({
      _id: id,
      _creator: req.user._id
    }).then((doc) => {
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

app.delete('/deleteTodo/:id', authenticate, (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send('ID is not valid');
  } else {
    ToDo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    }).then((doc) => {
      if (doc)
        res.send(doc);
      else {
        res.send('Id not found');
      }
    }).catch((e) => {
      res.status(404).send(e);
    });
  }
});

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']); //dönen jsondan belirtilen attr varsa alır

  if (!ObjectID.isValid(id)) {
    res.status(404).send('ID is not valid');
  }
  // fınd and updates by id set parameter as request values {new:true} means return updated record
  ToDo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {
    $set: body
  }, {
    new: true
  }).then((todo) => {
    if (!todo)
      res.status(404).send();

    res.send({
      todo
    }); //for sending as a object
  }).catch((e) => {
    res.status(404).send(e);
  });
});

//post http /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then((user) => {
    return user.generateAuthToken(user);
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(404).send(e);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});
//authenticate middleware ini kullanarak current user in bilgilerine erişebiliriz
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};
