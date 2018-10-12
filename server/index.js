const express = require('express');
const app = express();
const proxy = require('express-http-proxy');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');

// const router = require('./routes.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(compression());

app.use('/:id', express.static('public'));
app.get('/api/photos/:idOrName/restaurants', proxy('ec2-18-216-127-98.us-east-2.compute.amazonaws.com'));
app.set('port', process.env.PORT || 8080);

// app.use('/api', router);

app.listen(app.get('port'), () => {
  console.log(`app is listening to port ${app.get('port')}`);
});