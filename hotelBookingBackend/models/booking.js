const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'hotel',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('booking', bookingSchema);
