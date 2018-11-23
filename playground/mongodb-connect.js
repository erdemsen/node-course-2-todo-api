const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{//v3 de buradaki db değişkeni client oluyor
    if(err){
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
//v3 de db değişkenini elle oluşturmak gerekiyor const db= client.db('ToDoApp'); şeklinde
    // db.collection('Todos').insertOne({
    //   text: 'something to do',
    //   completed: false
    // },(err,result)=>{
    //   if(err){
    //     return console.log('Unable to insert todo',err);
    //   }
    //   console.log(JSON.stringify(result.ops,undefined,2));
    // });
    //v3 de db.close yerine client.close(); kullanılıyor


    db.collection('Users').insertOne({
      name: 'Erdem ŞEN',
      age: 27,
      location: 'Buca/İZMİR'
    },(err,result)=>{
      if(err){
        return console.log('Unable to insert user',err);
      }
      console.log(JSON.stringify(result.ops,undefined,2));
    });
    db.close();
});
