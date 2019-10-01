// Standard methods of a controller:
// index => fetch a list of all sessions
// show => fetch one session
// store => create a session
// update => edit a session
// destroy => delete a session

const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email })    //same as findOne({ email: email }), since the
                                                    // variable name is the same, we can shorten it

        if (! user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
};