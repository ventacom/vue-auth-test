var express = require('express');
var path = require('path');

var port = process.env.PORT || 5000;

app = express();

app.use('/dist', express.static('dist'));

console.log('dir name = ', __dirname)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
});

app.listen(port);

console.log('server started '+ port);
