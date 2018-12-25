const expect = require('chai').expect;
const getType = require('../functions').getType;

describe('getType', function() {
  it('Should return sql',
      function() {
        config = {
          database: {
            dialect: 'mysql',
          },
        };
        const results = getType(config);
        expect(results).to.equal('sql');
      });
  it('Should return MongoDB', function() {
    config = {
      database: {
        dialect: 'mongo',
      },
    };
    const results = getType(config);
    expect(results).to.equal('mongo');
  });
});
