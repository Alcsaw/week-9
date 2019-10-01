const express = require('express');
const routes = require('./routes'); // Relative path, so it does not look for a module or package, but file

const app = express();  // Definition of the app to execute express

// GET => request an information (SELECT) from backend;
//      req.query => access query params (to filter)
//      => app.get('/users, ...) - http://localhost:3333/users?idade=20 - req.query.idade
// POST => create an information, new register;
//      req.body => access the body (usually a JSON) of the request (to create and edit)
//      => app.post('/users, ...) - http://localhost:3333/users (with the JSON body defined) - req.body
// PUT => edit an information, edit register;
//      req.params => access route params (to edit or delete)
//      => app.put('/users/:id, ...) - http://localhost:3333/users/1 - req.params.id
// DELETE => delete an information;

app.use(express.json());    // Enabling JSON support for the app
app.use(routes);    // Makes the app uses the routes defined in the imported file.
                    // Must be defined after the JSON, because JSON is only enabled in the functions
                    // declared after its own declaration


app.listen(3333);   // The port winch the app will be running (accessing through localhost:3333)
