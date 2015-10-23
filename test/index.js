'use strict';
/* global describe, it, should */

var express = require('express'),
    moment =  require('moment'),
    ip = require('ip'),
    request = require('supertest');

var app = express().use(require('..'));

describe('page fetch', function(){
  it('should return data', function(done){
    request(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /text/)
      .expect(200, done);
  });

  it('should not return 404', function(done){
    request(app)
      .get('/non-exist-url')
      .set('Accept', 'text/plain')
      .expect('Content-Type', /text/)
      .expect(200, done);
  });
});

describe('json fetch', function(){
  it('should return json', function(done){
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res){
	var before = moment().subtract(5, 'second');
	var recent = moment(res.body.datetime).isAfter(before);
	if(!recent) throw new Error('JSON datetime not current');
      })
      .expect(200, done);
  });
});
