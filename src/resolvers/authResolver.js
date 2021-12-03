const userResolver = {
    Query: {

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
    }
};

module.exports = userResolver;