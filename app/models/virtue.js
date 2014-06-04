'use strict';

var virtues = global.nss.db.collection('virtues');
// var Mongo = require('mongodb');
var _ = require('lodash');

class Virtue {

  static create(obj, fn){
    var name = obj.name.trim().toLowerCase();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    virtues.findOne({name:name}, (err, v)=>{
      if(v){
        fn(null);
      }else{
        var virtue = new Virtue();
        virtue.name = name;
        virtue.creatorId = obj.creatorId;
        virtues.save(virtue, ()=>{
          virtue = _.create(Virtue.prototype, virtue);
          fn(virtue);
        });
      }
    });
  }

  // static findByVirtueId(virtueId, fn){
  //   if(userId){
  //     if(userId.length !== 24){fn(null); return;}
  //     userId = Mongo.ObjectID(userId);
  //     users.findOne({_id:userId}, (err, user)=>{
  //       user = _.create(User.prototype, user);
  //       fn(user);
  //     });
  //   } else {
  //     fn(null);
  //   }
  // }

}

module.exports = Virtue;
