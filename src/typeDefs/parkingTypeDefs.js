const { gql } = require('apollo-server')

const parkingTypes = gql `
    type Parking {
        admin_id: String!
        parking_place: String!
        vehicle_slots: Int!
        motorcycles_slots: Int!
        bicycles_slots: Int!
        person_with_disability_slots: Int!
        vehicle_price: Int!
        motorcycles_price: Int!
        bicycles_price: Int!
        person_with_disability_price: Int!
    }

    input ParkingInput {
        id: Int!
        admin_id: String!
        parking_place: String!
        vehicle_slots: Int!
        motorcycles_slots: Int!
        bicycles_slots: Int!
        person_with_disability_slots: Int!
        vehicle_price: Int!
        motorcycles_price: Int!
        bicycles_price: Int!
        person_with_disability_price: Int!
    }

    input ParkingUpdate {
        vehicle_slots: Int!
        motorcycles_slots: Int!
        bicycles_slots: Int!
        person_with_disability_slots: Int!
        vehicle_price: Int!
        motorcycles_price: Int!
        bicycles_price: Int!
        person_with_disability_price: Int!
    }

    type Query {
        parkingDetail(parkId:Int!): ParkingDetail
        listParking_admin(adminId:String!):[Parking]
        listParking_place(parkingPlace:String!):[Parking]
        parkings:[Parking]
    }

    type Mutation {
        parkingCreate(parking:ParkingInput!):Parking
        parkingUpdate(parking:ParkingUpdate!):Parking
        parkingDelete(parkId:Int!): String!  
    }
`;
module.exports = parkingTypes;