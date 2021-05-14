const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/catchAsync');
const globalErrorHandler = require('./controllers/errorController');

const translationRouter = require('./routes/translationRoute');

// Calling the express object.
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// express.json for JSON parsing from the body.
// Please use the latest nodejs version for this to work.
app.use(express.json());
app.use(express.static(`${__dirname}/public`))

// Mapping the controller and the route here.
app.use('/api/v1/translate', translationRouter);

// Global Error handling, if no route matches with the endpoint requested.
app.all('*', (req, res, next) => {
    next(new AppError(`The endpoint ${req.originalUrl} is not defined. If you believe this is wrong. Please contact system administrator.`, 404));
});

// Second level error handling implementation
app.use(globalErrorHandler);
module.exports = app;
