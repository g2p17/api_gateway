const parkingResolver = {
    Query: {
        parkingDetail: async(_, { parkId }, { dataSources, userIdToken}) => {
            /*parkingDetail(parkId:Int!): ParkingDetail*/
            identityToken = (await dataSources.authAPI.get(userIdToken)).identity_document
            adminparkingplace = (await datasources.parkingAPI.get(identityToken))
            if(identityToken == adminparkingplace) 
                return await dataSources.parkingAPI.parkingById(adminId);
            else
                return null;
        },

        listParking_admin: async(_, { }, { }) => {
            /* listParking_admin(adminId:String!):[Parking]*/
        },

        listParking_place: async(_, { }, { }) => {
            /* listParking_place(parkingPlace:String!):[Parking]*/ 
        },
        
        parkings: async(_, { }, { }) => {
            /* parkings:[Parking]*/ 
        },   

        
        transactionByUsername: async(_, { username }, { dataSources, userIdToken}) => {
            /*transactionByUsername(username:String!):[Transaction] */
            usernameToken = (await dataSources.authAPI.get(userIdToken)).username
            if(username == usernameToken) 
                return await dataSources.accountAPI.transactionsByUsername(username);
            else
                return null;
        }, 
        transactionById: async(_, { transactionId}, { dataSources, userIdToken} ) => {
            /*transactionById(transationId:Int!):Transaction */
            usernameToken       = (await dataSources.authAPI.get(userIdToken)).username
            const transaction   = await dataSources.accountAPI.transactionsById( transactionId )
            usernameTransaction = transaction.usernameOrigin
            if(usernameToken == usernameTransaction)
                return transaction;
            else
                return null;
        }
    },
    Mutation: {
        parkingCreate: async(_, { }, { }) => {
            /* parkingCreate(parking:ParkingInput!):Parking*/
        },

        parkingUpdate: async(_, { }, { }) => {
            /* parkingUpdate(parking:ParkingUpdate!):Parking*/
        },
        parkingDelete: async(_, { }, { }) => {
            /* parkingDelete(parkId:Int!): String!*/
        },

        createTransaction: async(_, { transaction }, { dataSources, userIdToken }) => {
            usernameToken = (await dataSources.authAPI.get(userIdToken)).username
            if(transaction.usernameOrigin == usernameToken)
                return await dataSources.accountAPI.createTransaction(transaction);
            else
                return null;
        },
        updateTransaction: async(_, { transaction }, { dataSources, userIdToken }) => {
            usernameToken       = (await dataSources.authAPI.get(userIdToken)).username
            usernameTransaction = (await dataSources.accountAPI.transactionsById(transaction.id)).usernameOrigin
            if(usernameToken == usernameTransaction)
                return await dataSources.accountAPI.updateTransaction(transaction);
            else
                return null;

        },
        deleteParking: async(_, { username }, { dataSources, userIdToken }) => {
            usernameToken = (await dataSources.authAPI.get(userIdToken)).username
        }
    }
};

module.exports = parkingResolver;