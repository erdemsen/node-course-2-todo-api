const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{//v3 de buradaki db değişkeni client oluyor
    if(err){
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //deleteMany
    // db.collection('Todos').deleteMany({text:'go to interview'}).then((result)=>{
    //   console.log(result);
    // });
    //deleteOne
    // db.collection('Todos').deleteOne({text:'go to interview'}).then((result)=>{
    //   console.log(result);
    // });
    //findOneAndDelete  bulduğu nesneyi hem siler hem return değeri olarak geri döner
    db.collection('Todos').findOneAndDelete({_id:new ObjectId("5bf5d22c71810703d0c2043f")}).then((result)=>{
      console.log(result);
    });
    // db.close();
});
