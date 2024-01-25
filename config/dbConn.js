const mongoose = require('mongoose');
const URI = 'mongodb+srv://dstankoski:ayjwQTZfw6lRcrn1@cluster0.glzsdff.mongodb.net/?retryWrites=true&w=majority';
const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;