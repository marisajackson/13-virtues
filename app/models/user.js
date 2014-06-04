'use strict';

var bcrypt = require('bcrypt');
var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');

class User {

  updateVirtues(virtues){
    this.virtues = [];
    this.virtues = virtues;
  }

  save(fn){
    users.save(this, ()=>fn());
  }

  static register(obj, fn){
    users.findOne({email:obj.email}, (err,user)=>{
      if(user) {
        fn(null);
      } else {
        user = new User();
        user.email = obj.email;
        user.name = obj.name;
        user.password = bcrypt.hashSync(obj.password, 8);
        user.virtues = [];
        users.save(user, ()=>fn(user));
      }
    });
  }

  static login(obj, fn){
    users.findOne({email:obj.email}, (e,u)=>{
      if(u){
        var isMatch = bcrypt.compareSync(obj.password, u.password);
        if(isMatch){
          fn(u);
        }else{
          fn(null);
        }
      }else{
        fn(null);
      }
    });
  }

  static findByUserId(userId, fn){
    if(userId){
      if(userId.length !== 24){fn(null); return;}
      userId = Mongo.ObjectID(userId);
      users.findOne({_id:userId}, (err, user)=>{
        user = _.create(User.prototype, user);
        fn(user);
      });
    } else {
      fn(null);
    }
  }

}

module.exports = User;
