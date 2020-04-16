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