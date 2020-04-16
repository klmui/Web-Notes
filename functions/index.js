const functions = require('firebase-functions');
const app = require('express')();

// Imports
const {
    getAllNotes,
    postOneNote,
    deleteNote,
    editNote
} = require('./APIs/notes');

// middleware
const auth = require('./util/auth');

const {
  loginUser,
  signUpUser,
  uploadProfilePhoto,
  getUserDetail
} = require('./APIs/users');

// NOTE API
// Go to its Firebase function, paste the link in Chrome and add /notes at the end to get res
app.get('/notes', getAllNotes);

// POST route
app.post('/note', postOneNote);

// DELETE route
app.delete('/note/:noteId', deleteNote);

// PUT route
app.put('/note/:noteId', editNote);

// USER API
app.post('/login', loginUser);

app.post('/signup', signUpUser);

app.post('/user/image', auth, uploadProfilePhoto);

app.get('/user', auth, getUserDetail);

exports.api = functions.https.onRequest(app);