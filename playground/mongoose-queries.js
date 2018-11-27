const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {ToDo}=require('./../server/models/todo');

var id='5bfbd1fb9d0873b0283e3876';

//check if id is valid
if(!ObjectID.isValid(id)){
  console.log('ID is not valid');
}
//return result as an array
ToDo.find({
  _id:id
}).then((todos)=>{
  console.log('Todos: ',todos);
});

//return result as an object
// ToDo.findOne

//ToDo.findById(id)
