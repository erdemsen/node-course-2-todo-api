var mongoose = require('mongoose');

var ToDo = mongoose.model('Todo',{
  text: {
    type:String,
    required : true,
    minlength: 1
  },
  completed: {
    type:Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {ToDo}
