var express = require('express');
var path = require('path');

// var port = process.env.PORT || 5000;

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app = express();

app.use('/dist', express.static('dist'));

console.log('dir name = ', __dirname)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
});

app.listen(server_port, server_ip_address, function () {
  console.log('Listening on ' + server_ip_address + ', port ' + server_port)
});
