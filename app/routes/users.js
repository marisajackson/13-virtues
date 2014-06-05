'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../../app/models/user.js');
var Virtue = traceur.require(__dirname + '/../../app/models/virtue.js');
// var _ = require('lodash');

exports.update = (req, res)=>{
  User.findByUserId(req.session.userId, user=>{
    user.updateVirtues(req.body.virtue);
    res.locals.user = user;
    user.save(()=>{
      Virtue.findAllVirtues(virtues=>{
        res.render('virtues/index', {virtues:virtues});
      });
    });
  });
};


exports.index = (req, res)=>{
  res.render('users/index', {title: 'Home'}); //user object in res.locals
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
