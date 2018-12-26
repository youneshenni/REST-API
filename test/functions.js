const expect = require('chai').expect;
const getType = require('../functions').getType;
const encrypt = require('../functions').encrypt;
const random = require('../functions').random;
const isEmpty = require('../functions').isEmpty;

describe('getType', function() {
  it('Should return sql',
      function() {
        config = {
          database: {
            dialect: 'mysql',
          },
        };
        const results = getType(config);
        expect(results).equal('sql');
      });
  it('Should return MongoDB', function() {
    config = {
      database: {
        dialect: 'mongo',
      },
    };
    const results = getType(config);
    expect(results).equal('mongo');
  });
});

describe('encrypt', function() {
  it('Should give the encrypted password as a callback argument', function() {
    const password = 'Test';
    encrypt(password, function(hash, done) {
      expect(hash).exist;
    });
  });
  it('HASH should be different from password', function() {
    const password = 'Test';
    encrypt(password, function(hash, done) {
      expect(hash === password).be.false;
    });
  });
});

describe('random', function() {
  it('Should return something', function() {
    results = random(10);
    expect(results).exist;
  });
  it('Should not return undefined', function() {
    results = random(10);
    expect(results).not.be.undefined;
  });
  it('Should return a string', function() {
    results = random(10);
    expect(results).be.a('string');
  });
  it('Should be of the length given as argument', function() {
    results = random(10);
    expect(results.length).equal(10);
  });
});

describe('isEmpty', function() {
  it('Should know if object is empty', function() {
    expect(isEmpty({})).be.true;
  });
  it('Should know if object is not empty', function() {
    expect(isEmpty({
      hey: 'no',
    })).be.false;
  });
});
