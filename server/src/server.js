import express from 'express';

// init app
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
