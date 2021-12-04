const reservationResolver = {
    Query: {
        reservationsDetailByparkingLot: async(_, { parkinglot }, { dataSources, userIdToken}) => {            
            reservations = await dataSources.reservationAPI.reservationByParkinglot(parkinglot);
            
            roleToken = (await dataSources.authAPI.getUser(userIdToken)).role;
            if (roleToken.localeCompare("admin") == 0)
                return reservations;

            return null;
        },
        reservationsDetail: async(_, { }, { dataSources, userIdToken}) => {
            roleToken = (await dataSources.authAPI.getUser(userIdToken)).role;
            if (roleToken.localeCompare("admin") == 0)
                return reservations;

            return null;
        }
    },
    Mutation: {
        registerReservation: async (_, { reservationInput }, { dataSources, userIdToken }) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username;
            if (usernameToken.localeCompare(reservationInput.clientId) == 0) {
                return await dataSources.reservationAPI.createReservation(reservationInput);
            }
            
            return null;
        },
    }
};

module.exports = reservationResolver;