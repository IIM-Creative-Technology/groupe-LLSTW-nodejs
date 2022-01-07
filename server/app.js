const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const bcrypt = require('bcrypt');

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin"],
        credentials: true
    }
});



// const path = require('path');

const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const port = 4000;
// app.use(express.static(path.join(__dirname, '../client/dist')))

/*
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
});
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.options('*', cors());

app.get('/', (req, res) => {
    // res.sendFile(__dirname, '../client/dist/index.html');
});

app.get('/api/messages', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    client.connect(err => {
        const collection = client.db("IIM").collection("messages");
        collection.find({}).sort({datefield: -1}).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result);
            res.send(result);
        });
    });
});

// login user from mongodb
app.post('/api/login', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    client.connect(async (err) => {
        const password = req.body.password;
        const username = req.body.username;

        if (err) throw err;
        const collection = client.db("IIM").collection("users");
        const requestUser = await collection.findOne({username: username});
        if (requestUser == null) {
            res.send("User not found");
        } else {
            const compare = await bcrypt.compare(password, requestUser.password);
            if (compare == true) {
                console.log("password matched");
                        res.send({
                            username: requestUser.username,
                            id: requestUser._id
            });
            } else {
                console.log("password not matched");
                        res.send({
                            username: null,
                            email: null,
                            name: null,
                            id: null
                });
            }
        }
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
    res.setHeader('Access-Control-Allow-Origin', '*');
    client.connect(async (err) => {
        const content = req.body.content;
        const username = req.body.username;
        const id = req.body.id;

        console.log(content);
        console.log(username);
        console.log(id);

        if (err) throw err;
        const collection = client.db("IIM").collection("messages");
        const requestUser = await collection.findOne({ "username": username, "id": id });
        if (requestUser != null) {
            if (content && username) {
                collection.insertOne({ "content": content, "username": username, createdAt: new Date()});
                res.status(200).send("Message created");
            } else {
                res.status(422).send('incomplete data');
            }
        } else {
            res.status(400).send("User does not exist")
        }
        
    });
});

app.post('/', (req, res) => {
    // res.sendFile(__dirname, '../client/dist/index.html');
});

// socket.io on connection
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chatMessage', () => {
        client.connect(err => {
            const collection = client.db("IIM").collection("messages");
            collection.find({}).sort({datefield: -1}).toArray(function (err, result) {
                if (err) throw err;
                //console.log(result);
                socket.emit('insertMessage', result.reverse()[0])
            });
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

httpServer.listen(3000);

app.listen(port, () => {
    console.log(`Server listening on the http://localhost:${port}`);
});
