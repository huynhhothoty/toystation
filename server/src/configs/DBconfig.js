const mongoose = require('mongoose');
const connectDatabase = async () => {
    try {
        // await mongoose.connect('mongodb://127.0.0.1:27017/MyTestDB')
        await mongoose.connect(process.env.DB_CONNECT_STRING);

        console.log('Connect Database successfully');
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    connectDatabase,
};
