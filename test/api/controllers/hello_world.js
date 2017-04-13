var should = require('should');
var supertest = require('supertest');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

describe('controllers', function() {

  describe('hello_world', function() {

    describe('GET /hello', function() {

        var app, getNameStub, mockHelloHelper, request;

        beforeEach(function (done) {
           // Create stub import of hello_helper
            mockHelloHelper = proxyquire('../../../api/controllers/hello_world', {
               '../helpers/hello_helper': {
                   getName: function () {
                       return 'Bob';
                   }
               }
            });
            app = require('../../../app');
            request = supertest(app);
            done();
        });

        it('should be true', function () {
            let myBool = true;
            myBool.should.equal(true);
        });

      it('should return a default string', function(done) {
        request
          .get('/hello')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.eql('Sup, Bob!');
            done();
          });
      });

      it('should accept a name parameter', function(done) {

        request
          .get('/hello')
          .query({ name: 'Scott'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql('Sup, Scott!');

            done();
          });
      });
    });
  });
});
