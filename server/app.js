const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const User = require('./models/User');
const bcrypt = require('bcrypt');

// const path = require('path');

const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const port = 4000;
// app.use(express.static(path.join(__dirname, '../client/dist')))

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    // res.sendFile(__dirname, '../client/dist/index.html');
});

app.get('/messages', (req, res) => {
    client.connect(err => {
        const collection = client.db("IIM").collection("messages");
        collection.find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });
});


// create new user in mongodb
app.post('/api/users/create', (req, res) => {
    client.connect(async (err) => {
        const username = req.body.username;
        const password = req.body.password;
        
        console.log(req.body.username);
        console.log(req.body.password);

        if (err) throw err;
        const collection = client.db("IIM").collection("users");
        const requestUser = await collection.findOne({ "username": username });
        console.log();
        //console.log("request", requestUser.username);
        console.log("current username", username);
        if (requestUser == null) {
            if (username && password) {
                var passwordHash = await bcrypt.hash(password, 12);
                collection.insertOne({ "username": username,  "password": passwordHash });
                res.send("User created");
            } else {
                res.status(422).send('incomplete data');
            }
        } else {
            res.status(400).send("User already exists")
        }
    });
});
app.post('/api/messages/create', (req, res) => {
    client.connect(async (err) => {
        const content = req.body.content;
        const username = req.body.username;

        console.log(req.body.content);
        console.log(req.body.username);

        if (err) throw err;
        const collection = client.db("IIM").collection("messages");
        if (content) {
            collection.insertOne({ "content": content, "username": username, createdAt: new Date()});
            res.send("Message created");
        } else {
            res.status(422).send('incomplete data');
        }
    });
});

app.post('/', (req, res) => {
    // res.sendFile(__dirname, '../client/dist/index.html');
});


app.listen(port, () => {
    console.log(`Server listening on the http://localhost:${port}`);
});