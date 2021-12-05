const { gql } = require('apollo-server')

const parkingTypes = gql `
    type Parking {
        id:Int!
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

    type ParkingUpd {
        vehicle_slots: Int!
        motorcycles_slots: Int!
        bicycles_slots: Int!
        person_with_disability_slots: Int!
        vehicle_price: Int!
        motorcycles_price: Int!
        bicycles_price: Int!
        person_with_disability_price: Int!
    }

    input ParkingUpdinput {
        id:Int!
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

    input ParkingUp{
        vehicle_slots: Int!
        motorcycles_slots: Int!
        bicycles_slots: Int!
        person_with_disability_slots: Int!
        vehicle_price: Int!
        motorcycles_price: Int!
        bicycles_price: Int!
        person_with_disability_price: Int!
    }

    extend type Query {
        parkingDetail(parkId:Int!): Parking
        listParking_admin(adminId:String!):[Parking]
        listParking_place(parkingPlace:String!):[Parking]
        parkings:[Parking]
    }

    extend type Mutation {
        parkingCreating(parkingC:ParkingInput!):Parking
        parkingUpdate(parkingUp:ParkingUp!, id:Int! ):ParkingUpd
        parkingDelete(parkId:Int!): String!  
    }
`;
module.exports = parkingTypes;