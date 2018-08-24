'use strict';

const PowerGroupCard = require('../classes/groupPower').GroupPowerCard;
const PowerCard = require('../classes/power').Power;


module.exports = function(Grouppower) {
  Grouppower.generatePDF = function(id, cb) {
    Grouppower.findById(id, {include: "powers"},function(err, groupPower) {
      let powerList = [];
      groupPower.toJSON().powers.forEach(function(power, index) {
        let powerCard = new PowerCard(power);
        powerList.push(powerCard);
      });

      let groupCard = new PowerGroupCard(powerList);
      groupCard.generateForPrint();

      cb(null, '');
    });
  };

  Grouppower.remoteMethod(
    'generatePDF',
    {
      description: 'Get generated PDF',
      isStatic: true,
      accepts: { arg: 'id', type: 'string', required: true },
      returns: { arg: 'content', type: 'buffer', root: true, encoding: 'raw' },
      http: {path: '/card/:id', verb: 'get'}
    }
  );
};
