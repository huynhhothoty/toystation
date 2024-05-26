const dotenv = require('dotenv');
dotenv.config();
const { app } = require('./src/app');

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || 'development';

app.listen(port, () => {
    console.log(`App listening at ${mode} mode: http://localhost:${port}`);
});
