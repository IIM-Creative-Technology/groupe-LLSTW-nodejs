const express = require('express');
const app = express();

// const path = require('path');
const port = 4000;
// app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/', (req, res) => {
  // res.sendFile(__dirname, '../client/dist/index.html');
});
  
app.listen(port, () => {
    console.log(`Server listening on the http://localhost:${port}`);
});
  