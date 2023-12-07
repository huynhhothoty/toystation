import express from 'express';
import { connectDatabase } from './configs/DBconfig.js';
import { rootRouter } from './routes/index.js';

// init app
const app = express();
const port = 3000;

// config
app.use(express.json());
connectDatabase();

// config route api path
app.use('/api', rootRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
