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
            identityToken = (await dataSources.authAPI.getUser(userIdToken)).identity_document
            if(identityToken == adminId)
                return await dataSources.parkingAPI.getparkingByAdmin(adminId);
            
            return null;
        },

        listParking_place: async(_, { parkingPlace }, { dataSources, userIdToken }) => {
            identityToken = (await dataSources.authAPI.getUser(userIdToken)).identity_document        
            placeAdminID =( await dataSources.parkingAPI.getparkingByPlace(parkingPlace))
            const myVal = placeAdminID.find(function(element) {
                return element ;
              });

            if(identityToken == myVal.admin_id)
                return await dataSources.parkingAPI.getparkingByPlace(parkingPlace); 

            return null; 
        },

        parkings: async(_, { }, { dataSources }) => {
            return await dataSources.parkingAPI.getAllParkings(); 
        },   

    },
    Mutation: {
        /*parkingCreate(parking:ParkingInput!):Parking*/
        parkingCreate: async(_, { parkingC }, { dataSources, userIdToken }) => {
            identityToken = (await dataSources.authAPI.getUser(userIdToken)).identity_document
            if(parkingC.admin_id == identityToken)
                return await dataSources.parkingAPI.parkingCreate(parkingC);
            
            return null;
        },


        parkingUpdate: async(_, { parkId, parkingUp }, { dataSources, userIdToken }) => {
            /* parkingUpdate(parking:ParkingUpdate!):Parking*/
        },
        
        parkingDelete: async(_, { parkId }, { dataSources, userIdToken }) => {
            identityToken = (await dataSources.authAPI.getUser(userIdToken)).identity_document
            adminparkingplace = (await dataSources.parkingAPI.getparkingPlaceById(parkId)).admin_id
            if(identityToken == adminparkingplace)
                return await dataSources.parkingAPI.deleteParking(parkId);
            
            return null;
        }, 
    }
};

module.exports = parkingResolver;