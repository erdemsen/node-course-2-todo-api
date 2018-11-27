const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {ToDo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');

//ToDo.remove({}) if no filter then remove all
ToDo.remove({}).then((result)=>{
  console.log(result);
});

//ToDo.findOneAndRemove({});
//ToDo.findByIdAndRemove(id);  return deleted item
