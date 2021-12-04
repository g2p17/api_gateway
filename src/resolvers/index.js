const authResolver        = require('./authResolver');
const reservationResolver = require('./reservationResolver');
const lodash              = require('lodash');

const resolvers = lodash.merge(authResolver, reservationResolver);
module.exports = resolvers;