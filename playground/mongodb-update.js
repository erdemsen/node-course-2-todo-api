const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{//v3 de buradaki db değişkeni client oluyor
    if(err){
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Todos').findOneAndUpdate({
      text:'go to interview'},{
        $set:{
          completed:true
        }
      },{
        returnOriginal:false
      }).then((result)=>{
      console.log(result);
    });
    // db.close();
});
