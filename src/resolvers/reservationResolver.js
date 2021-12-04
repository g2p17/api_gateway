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
            reservations = await dataSources.reservationAPI.listReservations();
            if (roleToken.localeCompare("admin") == 0)
                return reservations;

            return null;
        },
        reservationById: async(_, { reservationId }, { dataSources, userIdToken}) => {
            usernameToken       = (await dataSources.authAPI.getUser(userIdToken)).username;
            const reservation   = await dataSources.reservationAPI.reservationById(reservationId);
            
            usernameReservation = reservation.clientId;
            if(usernameToken == usernameReservation)
                return reservation;

            return null;
        },
        reservationsDetailByparkingLotCustomers: async(_, { parkinglot }, { dataSources, userIdToken}) => {
            roleToken = (await dataSources.authAPI.getUser(userIdToken)).role;
            infoCustomers = await dataSources.reservationAPI.reservationCustomer(parkinglot);
            if (roleToken.localeCompare("admin") == 0)
                return infoCustomers;

            return null;
        },
        reservationCountReservation: async(_, { parkinglot }, { dataSources }) => {
            return await dataSources.reservationAPI.reservationCount(parkinglot);
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
        deleteReservation: async (_, { reservationId }, { dataSources, userIdToken }) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username;            

            usernameReservation = (await dataSources.reservationAPI.reservationById(reservationId)).clientId;
            if (usernameToken.localeCompare(usernameReservation) == 0)
                return await dataSources.reservationAPI.deleteReservation(reservationId);

            return null;
        },
        updateReservation: async (_, { reservationId, reservationUpdate }, { dataSources, userIdToken }) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username;            
            reservation = await dataSources.reservationAPI.reservationById(reservationId);            
            
            reservationUpdate.clientId = reservation.clientId;

            if (usernameToken.localeCompare(reservation.clientId) == 0)
                return await dataSources.reservationAPI.updateReservation(reservationId, reservationUpdate);
            
            return null;
        }
    }
};

module.exports = reservationResolver;