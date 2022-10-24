const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://trinhvanrinh:1234@phone.qhzjig5.mongodb.net/pluto?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            },
        );
        console.log('Connect SucessFully');
    } catch {
        console.log('Connect fail');
    }
}
module.exports = {
    connect,
    mongoURI: 'mongodb+srv://trinhvanrinh:1234@phone.qhzjig5.mongodb.net/pluto?retryWrites=true&w=majority',
};
