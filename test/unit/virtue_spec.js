/* global before, describe, it, beforeEach */
/* jshint expr: true */

'use strict';

process.env.DBNAME = 'test-virtues';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var app = require('../../app/app');
var request = require('supertest');
var traceur = require('traceur');

var Virtue;
var User;

var sue;
var v1;

describe('Virtue', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(){
      User = traceur.require(__dirname + '/../../app/models/user.js');
      Virtue = traceur.require(__dirname + '/../../app/models/virtue.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('users').drop(function(){
      global.nss.db.collection('virtues').drop(function(){
        User.register({email: 'sue@sue.com', password: '1234', name: 'Sue'}, function(user){
          sue = user;
          Virtue.create({name: 'Temperance', creatorId: sue._id}, function(virtue){
            v1 = virtue;
            done();
          });
        });
      });
    });
  });

  describe('.create', function(){
    it('should successfully create a virtue object', function(done){
      var obj = {name: 'Frugality', creatorId: sue._id};
      Virtue.create(obj, function(v){
        expect(v).to.be.ok;
        expect(v).to.be.an.instanceof(Virtue);
        expect(v.creatorId).to.deep.equal(sue._id);
        expect(v.name).to.equal('Frugality');
        done();
      });
    });


    it('should NOT create a virtue', function(done){
      var obj = {name: ' TEMPERaNCE   ', creatorId: sue._id};
      Virtue.create(obj, function(v){
        expect(v).to.be.null;
        done();
      });
    });

  });


  // describe('.findByVirtueId', function(){
  //   it('should return correct virtue object', function(done){
  //     Virtue.findByVirtueId(v1._id.toString(), function(user){
  //       expect(user).to.be.instanceof(User);
  //       expect(user.email).to.equal(sue.email);
  //       expect(user._id).to.deep.equal(sue._id);
  //       done();
  //     });
  //   });
  //
  //   it('should return null for bad userId', function(done){
  //     User.findByUserId('wrong', function(user){
  //       expect(user).to.be.null;
  //       done();
  //     });
  //   });



  // });

});
