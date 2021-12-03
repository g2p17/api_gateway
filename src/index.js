const { ApolloServer} = require('apollo-server');

const typeDefs       = require('./typeDefs');
const resolvers      = require('./resolvers');
const AuthAPI        = require('./dataSources/authAPI');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        authAPI   : new AuthAPI()
    }),
    introspection: true,
    playground   : true
});

server.listen( process.env.PORT || 4000 ).then(({url}) => {
        console.log(`🚀 Server ready at ${url}`);
    }
);