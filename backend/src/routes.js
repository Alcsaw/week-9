const express = require('express');

const routes = express.Router();

routes.post('/users', (req, res) => {    // When accessing (GET) the app through the route in the first
    // parameter, it calls the function defined in the 2º parameter
return res.json(req.body);
});

module.exports = routes;
