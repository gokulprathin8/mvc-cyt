const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/catchAsync');
const globalErrorHandler = require('./controllers/errorController');

const translationRouter = require('./routes/translationRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`))

app.use('/api/v1/translate', translationRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`The endpoint ${req.originalUrl} is not defined. If you believe this is wrong. Please contact system administrator.`, 404));
});

app.use(globalErrorHandler);
module.exports = app;