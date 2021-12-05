const authResolver        = require('./authResolver')
const reservationResolver = require('./reservationResolver');
const parkingResolver     = require('./parkingResolver')
const lodash              = require('lodash')

const resolvers = lodash.merge(authResolver, parkingResolver, reservationResolver);

module.exports = resolvers;