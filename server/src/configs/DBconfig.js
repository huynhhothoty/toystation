const mongoose = require('mongoose');
const connectDatabase = async () => {
    try {
        // await mongoose.connect('mongodb://127.0.0.1:27017/MyTestDB')
        await mongoose.connect(
            'mongodb+srv://huynhhothoty:kuQRfdSzC3RllSpT@bootcampdb.ak789bd.mongodb.net/toydatabase?retryWrites=true&w=majority&appName=AtlasApp'
        );

        console.log('Connect Database successfully');
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    connectDatabase,
};
