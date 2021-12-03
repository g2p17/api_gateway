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
        signUpUser: async (_, {userInput}, { dataSources }) => {

            const authInput = {
                username            : userInput.username,
                password            : userInput.password,
                name                : userInput.name,
                email               : userInput.email,
                identity_document   : userInput.identity_document,
                phone_number        : userInput.phone_number
            }
            const userResponse = await dataSources.authAPI.createUser(authInput);

            return userResponse;
        },
        logIn: async(_, { credentials }, { dataSources }) => {
            return await dataSources.authAPI.signInUser(credentials);
        },
    }
};

module.exports = userResolver;