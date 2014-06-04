'use strict';

exports.index = (req, res)=>{
  res.render('users/index', {title: 'Home'});
};

exports.new = (req, res)=>{
  res.render('users/new');
};

exports.create = (req, res)=>{
  //create new user and redirect
};

exports.login = (req, res)=>{
  //log in and redirect
};
