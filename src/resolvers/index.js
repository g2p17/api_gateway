const authResolver        = require('./authResolver')
const parkingResolver     = require('./parkingResolver')
const lodash              = require('lodash')

const resolvers = lodash.merge(authResolver, parkingResolver);
module.exports = resolvers;