const mongoose = require('mongoose');

// At creation, a booking has the approved field set as null (actually not set in the MongoDB).
// After the response to the request it is set as a Boolean.

const BookingSchema = new mongoose.Schema({
    date: String,
    approved:Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
