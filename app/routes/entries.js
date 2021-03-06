'use strict';

var traceur = require('traceur');
var Entry = traceur.require(__dirname + '/../../app/models/entry.js');
var moment = require('moment');

exports.trends = (req, res)=>{
  var userId = res.locals.user._id;
  Entry.findByUserId(userId, entries=>{
    res.send(entries);
  });
};

exports.new = (req, res)=>{
  var date = new Date();
  date = moment(date).format('MMMM Do YYYY');
  res.render('entries/new', {date:date});//user object in res.locals
};

exports.create = (req, res)=>{
  var userId = res.locals.user._id;
  Entry.create(userId, req.body, (entry)=>{
    res.redirect('/users');
  });
};

exports.show = (req, res)=>{
  var userId = res.locals.user._id;
  Entry.findByUserId(userId, (entries)=>{
    Entry.formatDates(entries, (records)=>{
      Entry.getPropertyNames(records, (r)=>{
        console.log(r);
        res.render('entries/show', {entries:r});
      });
    });
  }); //show all entries and redirect
};
