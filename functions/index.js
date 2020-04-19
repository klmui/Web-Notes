const functions = require('firebase-functions');
const app = require('express')();

// Imports
const {
    getAllNotes,
    postOneNote,
    deleteNote,
    editNote,
    getOneNote
} = require('./APIs/notes');

// middleware
const auth = require('./util/auth');

const {
  loginUser,
  signUpUser,
  uploadProfilePhoto,
  getUserDetail,
  updateUserDetails
} = require('./APIs/users');

// NOTE API
// Go to its Firebase function, paste the link in Chrome and add /notes at the end to get res
app.get('/notes', auth, getAllNotes);
app.get('/note/:noteId', auth, getOneNote);

//app.get('/note/:noteId', auth, getOneNote);

// POST route
app.post('/note', auth, postOneNote);

// DELETE route
app.delete('/note/:noteId', auth, deleteNote);

// PUT route
app.put('/note/:noteId', auth, editNote);

// USER API
app.post('/login', loginUser);

app.post('/signup', signUpUser);

app.post('/user/image', auth, uploadProfilePhoto);

app.get('/user', auth, getUserDetail);

app.post('/user', auth, updateUserDetails);

exports.api = functions.https.onRequest(app);