const multer = require('multer');   // Handles multipart (body of request) forms so we can upload
                                    // files via WS. JSON doesn't allow file attachments.
const path = require('path');   // Handles relative path inside the server. *nix systems use
                                // '../../uploads' while Windows uses '..\..\uploads', so this
                                // package handles thos kind of stuff for better compatibility

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {  // Parameters are the WS request, the uploaded file and
                                        // a callback function. The callback function receives as
                                        // parameter: the error that may occur in the function call
                                        // in that case there's nothing to worry about, 'cause it's
                                        // a very simple function), and the string to be the filename.
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            
            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
};