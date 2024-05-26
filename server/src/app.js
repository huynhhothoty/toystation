const express = require('express');
const { connectDatabase } = require('./configs/DBconfig');
const { rootRouter } = require('./routes');
const { errorHandler } = require('./middlewares/error/ErrorHandler');
const { CustomError } = require('./utils/CustomError');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// init app
const app = express();
const FELink =
    process.env.NODE_ENV === 'production' ? process.env.FE_LINK : 'http://localhost:5173';

// config
const corsOptions = {
    origin: FELink,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
connectDatabase();

// body parser
app.use(cookieParser());

// config route api path
app.use('/api', rootRouter);

// all invalid route will cause error
app.all('*', (req, res, next) => {
    next(new CustomError(`Can't find this route`, 404));
});

// middleware use to handle error
app.use(errorHandler);

module.exports = { app };
