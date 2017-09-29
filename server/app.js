import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// var index = require('./routes/index');
import api from './routes/api';

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', api);

app.use('/', (req, res) => {
	res.end('Home page');
});



// catch 404 and forward to error handler
app.use((req, res, next) => {
	var err = new Error('Not Found');
  	err.status = 404;
  	next(err);
});

// error handler
app.use((err, req, res, next)=>{
	// set locals, only providing error in development
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};

	  // render the error page
	  res.status(err.status || 500);
	  res.render('error');
});

export default app;
