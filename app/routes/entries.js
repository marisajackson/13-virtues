'use strict';

exports.trends = (req, res)=>{
  //find all entries by user id
  res.render('entires/trends');
};

exports.new = (req, res)=>{
  //will need date
  //renders form
  res.render('entries/new');
};

exports.create = (req, res)=>{
  // req.body is data
  //create new entry and redirect
};

exports.show = (req, res)=>{
  //find all entries by user id
  //show all entries and redirect
};
