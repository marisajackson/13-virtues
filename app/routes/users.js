'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../../app/models/user.js');

exports.index = (req, res)=>{
  res.render('users/index', {title: 'Home Page'});
};

exports.new = (req, res)=>{
  res.render('users/new');
};

exports.create = (req, res)=>{
  User.register(req.body, (user)=>{
    if(user){
      req.session.userId = user._id;
      res.redirect('/users');
    } else {
      res.redirect('/');
    }
  });
};

exports.login = (req, res)=>{
  User.login(req.body, (user)=>{
    if(user){
      req.session.userId = user._id;
      res.redirect('/users');
    } else {
      res.redirect('/');
    }
  });
};

exports.lookup = (req, res, next)=>{
  User.findByUserId(req.session.userId, u=>{
    res.locals.user = u;
    next();
  });
};

exports.logout = (req, res)=>{
  req.session.userId = null;
  res.redirect('/');
};
