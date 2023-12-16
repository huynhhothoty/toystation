const express = require('express');
const { connectDatabase } = require('./configs/DBconfig');
const { rootRouter } = require('./routes/index');
const dotenv = require('dotenv');
const { errorHandler } = require('./middlewares/error/ErrorHandler');
const { CustomError } = require('./utils/CustomError');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// init app
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

// config
const corsOptions = {
    origin: 'http://localhost:5173',
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

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});