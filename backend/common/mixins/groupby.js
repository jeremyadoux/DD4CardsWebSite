'use strict';

module.exports = function(Model, bootOptions = {}) {
  Model.groupBy = function( filter, cb ) {
    let waferCollection = Model.getDataSource().connector.collection( Model.modelName );
    // OPTIONAL if ( ! filter.where ) return cb( new Error( 'missing a where clause in the filter' ) );
    if ( ! filter.groupBy ) return cb( new Error( 'missing a groupBy clause in the filter' ) );
    let pipeline = [];

    if ( filter.where )
      pipeline.push({ $match: filter.where });

    pipeline.push({
      $group: {
        _id: '$' + filter.groupBy,
        count: { $sum: 1 }
      }
    });

    // rename the _id field to be the name of the groupBy field
    let p = {
      _id: 0,
      count: 1
    };
    p[ filter.groupBy ] = "$_id";

    pipeline.push({
      $project: p
    });

    // console.log( 'pipeline:', JSON.stringify( pipeline, null, 2 ) );

    waferCollection.aggregate( pipeline, cb );
  };

  Model.remoteMethod('groupBy', {
    isStatic: true,
    description: 'Invoke a group by',
    accessType: 'WRITE',
    accepts: {arg: 'filter', type: 'object', description: '{"where:{...}, "groupBy": "field"}'},
    returns: {arg:'data', type:['object'], root:true}
  });
};
