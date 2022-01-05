const express = require('express');
const deployd = require('deployd');

// on lance le serveur via express et on charge les fichiers statiques
const app  = express();
app.get('/', function(req , res) {
    res.sendFile(__dirname + "/index.html");
    app.use('/static',express.static('static'))
})
app.listen(8080);

// on lance la bdd via deployd
const options = {port: 1888, env : "development"};
const dpd = deployd(options);
dpd.listen();