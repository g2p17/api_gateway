const authResolver        = require('./authResolver')

const lodash              = require('lodash')

const resolvers = lodash.merge(authResolver);
module.exports = resolvers;