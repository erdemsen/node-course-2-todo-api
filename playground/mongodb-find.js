const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{//v3 de buradaki db değişkeni client oluyor
    if(err){
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Todos').find({completed:false}).toArray().then((docs)=>{
      console.log(docs);
    });
    db.close();
});
