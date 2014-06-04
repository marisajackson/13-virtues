'use strict';

var entries = global.nss.db.collection('entries');
// var Mongo = require('mongodb');
var _ = require('lodash');

class Entry {

  findAverageRating(virtues){
    var total = 0;
    var indexTotal = 0;
    Object.keys(virtues).map(function(v, i){
      total += virtues[v];
      indexTotal++;
    });
    var avg = total/indexTotal;
    return Math.round(avg * 2)/2;
  }

  static create(userId, obj, fn){

    var entry = new Entry();
    entry.userId = userId;
    entry.date = new Date();
    entry.content = obj.content;
    entry.virtues = obj.virtues;

    var avg = entry.findAverageRating(obj.virtues);
    entry.avgRating = avg;

    entries.save(entry, ()=>{
      entry = _.create(Entry.prototype, entry);
      fn(entry);
    });
  }

  static findByUserId(userId, fn){
    entries.find({userId:userId}).toArray((err, records)=>{
      fn(records);
    });
  }

}

module.exports = Entry;
