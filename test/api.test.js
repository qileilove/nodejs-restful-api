'use strict';

var app = require('../server');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('API Tests', function() {
  var task = {
    name: 'integration test',
  };

  describe('## the bear api test', function() {

    it(' the get / request should return something ',  async function() {
      const res= await request(app)
        .get('/')
        .set('Accept', 'application/json');
        expect(res.statusCode).to.equal(200);
         expect(res.body).deep.equal({ message: 'hooray! welcome to our api!' });
        const resBody=res.body;
        console.log(resBody);
        // expect(resBody[0]).deep.equal({ _id: '5a56305c4f9d4e24750eb5ac', name: 'Jqwe', __v: 0 });
    });
    it(' the get /bears request should return all bears ',  async function() {
      const res= await request(app)
        .get('/bears')
        .set('Accept', 'application/json');
        expect(res.statusCode).to.equal(200);
        // expect(res.body.name).to.equal('integration test');
        const resBody=res.body;
        expect(resBody[0]).deep.equal({ _id: '5a56305c4f9d4e24750eb5ac', name: 'Jqwe', __v: 0 });
    });
    it(' the post /bears request with name should return create successful ',  async function() {
      const res= await request(app)
        .post('/bears')
        .set('Accept', 'application/json')
        .send({name: '1a'});
        
        expect(res.statusCode).to.equal(400);
        const resBody=res.body;
         expect(resBody[0].msg).equal('Name must have only alphabetical characters.');
    });
  
    it(' the get /bears request with name should return the right result successful ',  async function() {
      const res= await request(app)
        .get('/bears')
        .set('Accept', 'application/json')
        .query({bear_name: 'Jqwe'});
        
        expect(res.statusCode).to.equal(200);
        const resBody=res.body;
        console.log(resBody);
        expect(resBody).deep.equal({ _id: '5a56305c4f9d4e24750eb5ac', name: 'Jqwe', __v: 0 });
    });
  });
  
});
  