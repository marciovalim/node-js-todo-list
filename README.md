# Node.JS Todo List
What can we learn from a simple Node.JS todo app REST API? 
<br>
The basics:

### HTTP Methods
When creating a REST API, we use different HTTP methods, (such as GET, POST, PUT and others), to annotate different endpoint use cases.
This means that when creating our todo API, we should do the following -- or something like that:

- POST /users => for creating an user;
- GET /todos => for listing the todos;
- POST /todos => for creating a todo;
- PUT /todos => for updating a todo information;
- PATCH /todos => for setting a todo as done -- or making another small update;
- DELETE /todos => for deleting a todo;

### API Parameters
For receiving data in our app server, we can use different types of parameters, each with its own purpose:
- Route Params: passed directly into the route path, normally used to significate edit, search and delete IDs
- Query Params: passed directly in the url, after the route path, normally used to pagination and filters
- Body Params: passed inside the request and can be more complex data structures, normally used to insert information on the server

### Middlewares

Middlewares are functions that can be executed between an user's request and an API route, and can also be reused between different routes.
Because of that, we can use them for request validations that occurs many times.
<br>
This todo app uses them to validate the username and the todo id that are passed as parameters in some routes.
