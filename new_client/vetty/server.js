// server.js
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Bind the router db to the app for access in auth routes
server.db = router.db;

server.use(middlewares);
server.use(auth);
server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});
