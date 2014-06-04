'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var entries = traceur.require(__dirname + '/../routes/entries.js');
  var virtues = traceur.require(__dirname + '/../routes/virtues.js');

  app.all('*', users.lookup);

  app.get('/', dbg, home.index);

  app.get('/users/new', dbg, users.new);
  app.post('/users', dbg, users.create);
  app.post('/users/login', dbg, users.login);
  app.get('/users', dbg, users.index);
  app.get('/users/logout', dbg, users.logout);
  app.put('/users', dbg, users.update);

  app.get('/virtues', dbg, virtues.index);
  app.post('/virtues', dbg, virtues.create);

  app.get('/entries/new', dbg, entries.new);
  app.post('/entries', dbg, entries.create);
  app.get('/entries/show', dbg, entries.show);
  app.get('/entries/trends', dbg, entries.trends);

  console.log('Routes Loaded');
  fn();
}
