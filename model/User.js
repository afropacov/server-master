const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({

    username: {type: String, require: true},
    password: {type: String, require: true},
    fullName: String,
    invoices: [
        {
            invoiceNumber: {type: String, require:true},
            articleTitle: {type: String, require: true},
            articleId: {type: Number, require:true},
            invoiceDate: {type: Date, require:true},
            cardNumber: {type: String, require:true} 
        }
    ],
    refreshToken: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;