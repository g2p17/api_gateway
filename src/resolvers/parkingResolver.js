const parkingResolver = {
    Query: {      
        parkingDetail: async(_, { parkId }, { dataSources, userIdToken}) => {
            console.log(parkId+"captura")
            identityToken = (await dataSources.authAPI.get(userIdToken)).identity_document
            console.log(parkId+identityToken+"captura2")
            adminparkingplace = (await dataSources.parkingAPI.get(userIdToken)).admin_id
            
            if(identityToken == adminparkingplace) 
                return await dataSources.parkingAPI.parkingById(parkId);
            else
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
            identityToken = (await dataSources.authAPI.get(userIdToken)).identity_document
            if(parking.admin_id == identityToken)
                return await dataSources.parkingAPI.createParking(parking);
            else
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