const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllNotes
} = require('./APIs/notes')

// Go to its Firebase function, paste the link in Chrome and add /notes at the end to get res
app.get('/notes', getAllNotes);
exports.api = functions.https.onRequest(app);