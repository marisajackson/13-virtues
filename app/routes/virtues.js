'use strict';

var traceur = require('traceur');
var Virtue = traceur.require(__dirname + '/../../app/models/virtue.js');

exports.index = (req, res)=>{
  Virtue.findAllVirtues(virtues=>{
    res.render('virtues/index', {virtues:virtues});//sending back to ajax or need to render partial
  });
};

exports.create = (req, res)=>{
  var userId = res.locals.user._id;
  Virtue.create(userId, req.body, ()=>{
    Virtue.findAllVirtues(virtues=>{
      res.render('virtues/index', {virtues:virtues});//sending back to ajax or need to render partial
    });
  });
};
