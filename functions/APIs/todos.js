exports.getAllTodos = (request, response) => {
  todos = [
    {
      'id': '1',
      'title': 'greeting',
      'body': 'Hello world from kenny'
    },
    {
      'id': '2',
      'title': 'greeting2',
      'body': 'Hello world 2 from kenny'
    }
  ]
  return response.json(todos);
}