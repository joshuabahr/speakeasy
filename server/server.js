require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const router = require('./router');
const init = require('./init');
const socketEvents = require('./socket/socketEvents');

const port = 3000;
const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);
socketEvents(io);

app.get('*.js', (req, res, next) => {
  if (req.url === '/theme.js') {
    next();
  } else {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../static')));
app.use('/api', router);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../static/index.html')));
init()
  .then(() => {
    server.listen(port, () => console.log(`app is listening on http://localhost:${port}`));
  })
  .catch(err => console.error('unable to connect to database ', err));
