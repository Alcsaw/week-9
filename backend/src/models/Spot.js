const mongoose = require('mongoose');

const serverConfig = require('../config/server');

console.log(serverConfig);

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    }
});
// automatically converts the virtuals to json

//Virtual -> field doesn't exists in the database, but it's going to be set via JS.
SpotSchema.virtual('thumbnail_url').get(function() {
    //return `http://localhost:3333/files/${this.thumbnail}`
    // Fix images not showing on Android Device
    return `${serverConfig.baseURL}/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);
