const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const { connectDatabase } = require('./src/configs/DBconfig');
const { rootRouter } = require('./src/routes/index');
const { errorHandler } = require('./src/middlewares/error/ErrorHandler');
const { CustomError } = require('./src/utils/CustomError');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// init app
const app = express();
const port = process.env.PORT || 3000;

// config
const corsOptions = {
    origin: ['https://toystation.vercel.app', 'http://localhost:5173'],
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
