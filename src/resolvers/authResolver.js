const userResolver = {
    Query: {
        userDetailById: async(_, {userId}, { dataSources, userIdToken }) => {
            if(userId == userIdToken)
                return await dataSources.authAPI.getUser(userId);
            else
                return null;
        }
    },
    Mutation: {
        signUpUser: async (_, { userInput }, { dataSources }) => {
            return await dataSources.authAPI.createUser(userInput);
        },
        signUpUserAdmin: async (_, { userInput }, { dataSources }) => {
            return await dataSources.authAPI.createUserAdmin(userInput);
        },
        logIn: async(_, { credentials }, { dataSources }) => {
            return await dataSources.authAPI.signInUser(credentials);
        },
        refreshToken: async(_, { token }, { dataSources }) => {
            return await dataSources.authAPI.refreshToken(token);
        },
        updateUser: async(_, { userId, user }, { dataSources, userIdToken }) => {
            if (userId == userIdToken)
                return await dataSources.authAPI.updateUser(userId, user);

            return null;
        },
        deleteUser: async(_, { userId }, { dataSources, userIdToken }) => {
            if (userId == userIdToken) 
                return await dataSources.authAPI.deleteUser(userId);

            return null;
        }
    }
};

module.exports = userResolver;