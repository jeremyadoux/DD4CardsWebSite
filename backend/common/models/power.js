'use strict';

const PowerCard = require('../classes/power').Power;

module.exports = function(Power) {
  Power.card = function(id, cb) {
    Power.findById(id, function(err, power) {
      let powerCard = new PowerCard(power);
      cb(null, powerCard.saveCardToImg());
    });
  };

  Power.remoteMethod(
    'card',
    {
      description: 'Get the card generated',
      isStatic: true,
      accepts: { arg: 'id', type: 'string', required: true },
      returns: { arg: 'content', type: 'buffer', root: true, encoding: 'raw' },
      http: {path: '/card/:id', verb: 'get'}
    }
  );
};
