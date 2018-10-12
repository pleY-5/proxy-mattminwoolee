const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
var path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const compression = require('compression');

// const router = require('./routes.js');

/********* Loader.io *********/
app.get('/loaderio-1ee1f35b8d9ff2a3ed249fcbb2f0d31a', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/loaderio-1ee1f35b8d9ff2a3ed249fcbb2f0d31a.txt'));
});

app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(compression());

app.use('/:id', express.static('public'));
app.get('/api/photos/:idOrName/restaurants', proxy('ec2-18-216-127-98.us-east-2.compute.amazonaws.com'));
app.set('port', process.env.PORT || 8080);

// app.use('/api', router);

app.listen(app.get('port'), () => {
  console.log(`app is listening to port ${app.get('port')}`);
});