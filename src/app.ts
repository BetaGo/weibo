import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as mongo from 'connect-mongo';
import * as mongoose from 'mongoose';
import * as errorhandler from 'errorhandler';

const MongoStore = mongo(session);


// 私密内容
import * as sessionSecret from './secret/session';
import * as mongoSecret from './secret/mongo';

import index from './routes/index';
import login from './routes/login';
import home from './routes/home';
import api from './routes/api';

const app = express();

// 链接到数据库
mongoose.connect(mongoSecret.mongodb, { useMongoClient: true });
mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// allow cors
app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];
  const origin:any = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// set session
app.use(session({
  name: 'weibo_session',
  secret: sessionSecret.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2592000000,
  },
  store: new MongoStore({
    url: mongoSecret.mongodb,
  }),
}));

app.use('/', index);
app.use('/login', login);
app.use('/home', home);
app.use('/api', api);



// error handler
app.use(errorhandler());

module.exports = app;
