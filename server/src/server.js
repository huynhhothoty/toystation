const express = require('express');
const { connectDatabase } = require('./configs/DBconfig');
const { rootRouter } = require('./routes/index');
const dotenv = require('dotenv');
const { errorHandler } = require('./middlewares/error/ErrorHandler');
const { CustomError } = require('./utils/CustomError');

// init app
const app = express();
const port = 3000;
dotenv.config();

// config
app.use(express.json());
connectDatabase();

// config route api path
app.use('/api', rootRouter);

// all invalid route will cause error
app.all('*', (req, res, next) => {
    next(new CustomError(`Can't find this route`, 404));
});

// middleware use to handle error
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
