const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.URL
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("IIM").collection("messages");
  collection.find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
  //client.close();
});