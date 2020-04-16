// exports.getAllNotes = (request, response) => {
//   notes = [
//     {
//       'id': '1',
//       'title': 'greeting',
//       'body': 'Hello world from kenny'
//     },
//     {
//       'id': '2',
//       'title': 'greeting2',
//       'body': 'Hello world 2 from kenny'
//     }
//   ]
//   return response.json(notes);
// }

const { db } = require('../util/admin');

// GET all notes from DB
exports.getAllNotes = (request, response) => {
  db 
    .collection('notes')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let notes = [];
      data.forEach((doc) => {
        notes.push({
          todoId: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          createdAt: doc.data().createdAt
        });
      });
      return response.json(notes);
    }).catch((err) => {
      console.log(err);
      return response.status(500).json({error: err.code});
    });
}

// POST route
exports.postOneNote = (request, response) => {
  if (request.body.body.trim() === '') {
    return response.status(400).json({ body: 'Must not be empty' });
  }

  if(request.body.title.trim() === '') {
    return response.status(400).json({ title: 'Must not be empty' });
  }

  const newNoteItem = {
    title: request.body.title,
    body: request.body.body,
    createdAt: new Date().toISOString()
  }
  db
    .collection('notes')
    .add(newNoteItem)
    .then((doc) => {
      const responseNoteItem = newNoteItem;
      responseNoteItem.id = doc.id;
      return response.json(responseNoteItem);
    }).catch((err) => {
      response.status(500).json({ error: 'Something went wrong' });
      console.log(err);
    });
};

// DELETE route
exports.deleteNote = (request, response) => {
  const document = db.doc(`/notes/${request.params.noteId}`);
  document
      .get()
      .then((doc) => {
          if (!doc.exists) {
              return response.status(404).json({ error: 'Note not found' })
          }
          return document.delete();
      })
      .then(() => {
          response.json({ message: 'Delete successful' });
      })
      .catch((err) => {
          console.error(err);
          return response.status(500).json({ error: err.code });
      });
};

// PUT route
exports.editNote = (request, response) => {
  // Should not allow user to create these fields
  if (request.body.noteId || request.body.createdAt) {
    response.status(403).json({message: 'Not allowed to edit'});
  }
  let document = db.collection('notes').doc(`${request.params.noteId}`);
  document.update(request.body)
    .then(() => {
      response.json({message: 'Updated successfully'});
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({
        error: err.code
      });
    });
};