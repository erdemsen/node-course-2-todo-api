var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {ToDo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  var todo = new ToDo({
    text:req.body.text
  });
  //todo is a mongoose model so we can use .save method
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.send(e);
  });
});

app.listen(3000,()=>{
  console.log('Started on port 3000.');
});

module.exports={app};
