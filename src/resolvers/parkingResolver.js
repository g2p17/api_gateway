const parkingResolver = {
    Query: {      
        parkingDetail: async(_, { parkId }, { dataSources, userIdToken}) => {
            identityToken = (await dataSources.authAPI.getUser(userIdToken)).identity_document
            adminparkingplace = (await dataSources.parkingAPI.getparkingPlaceById(parkId)).admin_id
            if(identityToken == adminparkingplace)
                return await dataSources.parkingAPI.getparkingPlaceById(parkId);
            
            return null;
        },
        
        listParking_admin: async(_, { adminId }, { dataSources, userIdToken }) => {
            /* listParking_admin(adminId:String!):[Parking]*/

        },

        listParking_place: async(_, { parkingPlace }, { dataSources, userIdToken }) => {
            /* listParking_place(parkingPlace:String!):[Parking]*/ 
        },

        parkings: async(_, { }, { dataSources, userIdToken  }) => {
            /* parkings:[Parking]*/ 
        },   

    },
    Mutation: {
        /*parkingCreate(parking:ParkingInput!):Parking*/
        parkingCreate: async(_, { parking }, { dataSources, userIdToken }) => {
            identityToken = (await dataSources.authAPI.getUser(userIdToken)).identity_document
            if(parking.admin_id == identityToken)
            console.log(parking.admin_id +"  ADMIN")
                return await dataSources.parkingAPI.createParking(parking);
           
            return null;
        },

        parkingUpdate: async(_, { parking }, { dataSources, userIdToken }) => {
            /* parkingUpdate(parking:ParkingUpdate!):Parking*/
        },
        
        parkingDelete: async(_, { parkId }, { dataSources, userIdToken }) => {
            /* parkingDelete(parkId:Int!): String!*/
        }, 
    }
};

module.exports = parkingResolver;