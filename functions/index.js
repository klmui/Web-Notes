const functions = require('firebase-functions');
const app = require('express')();

// Imports
const {
    getAllNotes,
    postOneNote,
    deleteNote,
    editNote
} = require('./APIs/notes');

// Go to its Firebase function, paste the link in Chrome and add /notes at the end to get res
app.get('/notes', getAllNotes);

// POST route
app.post('/note', postOneNote);

// DELETE route
app.delete('/note/:noteId', deleteNote);

// PUT route
app.put('/note/:noteId', editNote);

exports.api = functions.https.onRequest(app);