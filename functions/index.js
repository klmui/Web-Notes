const functions = require('firebase-functions');
const app = require('express')();

// Imports
const {
    getAllNotes,
    postOneNote
} = require('./APIs/notes');

// Go to its Firebase function, paste the link in Chrome and add /notes at the end to get res
app.get('/notes', getAllNotes);


// POST route
app.post('/note', postOneNote);

exports.api = functions.https.onRequest(app);