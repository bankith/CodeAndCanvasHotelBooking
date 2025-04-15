const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    district: {
        type: String,
        required: [true, 'Please add a district']
    },
    province: {
        type: String,
        required: [true, 'Please add a province']
    },
    postalcode: {
        type: String,
        required: [true, 'Please add a postal code'],
        maxlength: [5, 'Postal Code can not be more than 5 digits']
    },
    lat: {
        type: Number,
        required: [true, 'Please add a latitude code'],
        maxlength: [11, 'Postal Code can not be more than 10 digits']
    },
    long: {
        type: Number,
        required: [true, 'Please add a longtitude code'],
        maxlength: [11, 'Postal Code can not be more than 10 digits']
    },
    tel: {
        type: String
    },
    region: {
        type: String,
        required: [true, 'Please add a region']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

hotelSchema.virtual('bookings', {
    ref: 'booking',
    localField: '_id',
    foreignField: 'hotel',
    justOne: false
});

module.exports = mongoose.model('hotel', hotelSchema);
