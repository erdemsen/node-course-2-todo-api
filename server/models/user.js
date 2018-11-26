var mongoose = require('mongoose');

var User = mongoose.model('User',{
  email : {
    type: String,
    required:true,
    trim: true,//boşluk karakterleri eler
    minlength:1
  },
});

module.exports = {User}
