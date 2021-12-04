const { gql } = require('apollo-server');

const authTypes = gql `

    input ReservationInput {
        clientId: String!
        parkingLot: String!
        vehicleType: String!
        entryTime: String!
        estimatedTime: Int!
        vehiclePlate: String!        
    }

    type ReservationDetail{
        id:String!
        clientId: String!
        parkingLot: String!
        vehicleType: String!
        entryTime: String!
        exitTime: String!
        estimatedTime: Int!
        vehiclePlate: String!
    }

    type ReservationDetailParkinglot {
        id:String!
        parkingLot: String!
        vehicleType: String!
        entryTime: String!
        exitTime: String!
        estimatedTime: Int!
        vehiclePlate: String!
    }

    type ResultReservation {
        reservation: String!
    }

    type Query {
        reservationsDetailByparkingLot(parkinglot:String!):[ ReservationDetailParkinglot ]!
        reservationsDetail:[ ReservationDetail ]!
        reservationDetailById(reservationId:Int!):ReservationDetail!
    }

    type Mutation{
        registerReservation(reservationInput:ReservationInput):ResultReservation!
    }
`;

module.exports = authTypes;