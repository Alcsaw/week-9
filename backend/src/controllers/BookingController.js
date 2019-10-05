const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate();
        // selects the relations of Spot and User with the booking object instead of only the ObjectID

        const ownerSocket = req.connectedUsers[booking.spot.user];

        if (ownerSocket) {
            // if the owner of the requested spot is online, sends a message 'booking_request'
            // containing the booking object
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};
