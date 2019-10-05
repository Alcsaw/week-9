const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const database_access = require('./config/database_access');
const serverConfig = require('./config/server');
const routes = require('./routes'); // Relative path, so it does not look for a module or package, but file

const app = express();  // Definition of the app to execute express
const server = http.Server(app);    // Abstraction of the server running HTTP protocol
const io = socketio(server);        // Adding capability to the server to handle socket io

io.on('connection', socket => {
    console.log('Usuário conectado', socket.id);

    socket.emit('message_hello', 'Hello world!');
});

mongoose.connect(`mongodb+srv://${database_access.username}:${database_access.password}@cluster0-6wy8b.mongodb.net/${database_access.db_name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// GET => request an information (SELECT) from backend;
//      req.query => access query params (to filter)
//      => app.get('/users, (req, res) => {...}) - http://localhost:3333/users?idade=20 - req.query.idade
//          When accessing (GET) the app through the route in the first
//          parameter, it calls the function defined in the 2º parameter
// POST => create an information, new register;
//      req.body => access the body (usually a JSON) of the request (to create and edit)
//      => app.post('/users, ...) - http://localhost:3333/users (with the JSON body defined) - req.body
// PUT => edit an information, edit register;
//      req.params => access route params (to edit or delete)
//      => app.put('/users/:id, ...) - http://localhost:3333/users/1 - req.params.id
// DELETE => delete an information;

app.use(cors({ origin: `http://localhost:${serverConfig.frontendWEBPort}` }));
app.use(express.json());    // Enabling JSON support for the app
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
                            // Express uses static to handle static files (e.g. PDFs, images etc,
                            // generally, uploaded files)
app.use(routes);    // Makes the app uses the routes defined in the imported file.
                    // Must be defined after the JSON, because JSON is only enabled in the functions
                    // declared after its own declaration


server.listen(serverConfig.serverPort);   // The port winch the app will be running (accessing through localhost:3333)
