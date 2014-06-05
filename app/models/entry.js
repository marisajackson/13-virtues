'use strict';

var entries = global.nss.db.collection('entries');
var moment = require('moment');
// var Mongo = require('mongodb');
var _ = require('lodash');

class Entry {

  findAverageRating(virtues){
    var total = 0;
    var indexTotal = 0;
    Object.keys(virtues).map(function(v, i){
      total += virtues[v] * 1;
      indexTotal++;
    });
    var avg = total/indexTotal;
    return Math.round(avg * 2)/2;
  }

  static create(userId, obj, fn){
    var content = _.pick(obj, 'content');
    delete obj.content;

    var entry = new Entry();
    entry.userId = userId;
    entry.date = new Date();
    entry.content = content.content;
    entry.virtues = obj;

    var avg = entry.findAverageRating(obj);
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

  static formatDates(entries, fn){
    var formatEntries = entries.map(e=>{
      e.date = moment(e.date).format('MMMM Do YYYY');
      return e;
    });
    fn(formatEntries);
  }

}

module.exports = Entry;
