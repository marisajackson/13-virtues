/* global before, describe, it, beforeEach */
/* jshint expr: true */

'use strict';

process.env.DBNAME = 'test-virtues';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var app = require('../../app/app');
var request = require('supertest');
var traceur = require('traceur');

var User;
var Entry;
var sue;
var e1;
var e2;
var e3;

describe('User', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(){
      Entry = traceur.require(__dirname + '/../../app/models/entry.js');
      User = traceur.require(__dirname + '/../../app/models/user.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('users').drop(function(){
      global.nss.db.collection('users').drop(function(){
        User.register({email: 'sue@sue.com', password: '1234', name: 'Sue'}, function(user){
          sue = user;
          Entry.create(sue._id, {content: 'This is story about my day1', virtues: {v1: 4, v2: 3, v3: 1}}, function(entry1){
            e1 = entry1;
            Entry.create(sue._id, {content: 'This is story about my day2', virtues: {v1: 4, v2: 3, v3: 1}}, function(entry2){
              e2 = entry2;
              Entry.create(sue._id, {content: 'This is story about my day3', virtues: {v1: 4, v2: 3, v3: 1}}, function(entry3){
                e3 = entry3;
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('.create', function(){
    it('should successfully add an entry to the database', function(done){
      var obj = {content: 'This is story about my day', virtues: {v1: 4, v2: 3, v3: 1}};
      Entry.create(sue._id, obj, function(e){
        expect(e).to.be.ok;
        expect(e).to.be.an.instanceof(Entry);
        expect(e._id).to.be.an.instanceof(Mongo.ObjectID);
        expect(e.content).to.equal('This is story about my day');
        expect(e.virtues).to.be.an('object');
        expect(e.userId).to.deep.equal(sue._id);
        expect(e.avgRating).to.equal(2.5);
        expect(e.date).to.be.an.instanceof(Date);
        done();
      });
    });
  });



  describe('.findByUserId', function(){
    it('should return an array of entries', function(done){
      Entry.findByUserId(sue._id, function(entries){
        expect(entries).to.have.length(3);
        expect(entries[0].content).to.equal('This is story about my day1');
        done();
      });
    });

    it('should return null for bad userId', function(done){
      User.findByUserId('wrong', function(user){
        expect(user).to.be.null;
        done();
      });
    });

  });

});
