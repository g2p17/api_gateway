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

    type InfoCustomer {
        clientId: String!
        parkingLot: String!              
        vehicleType: String!
        vehiclePlate: String!        
    }

    input ReservationUpdate {
        parkingLot: String!
        vehicleType: String!
        vehiclePlate: String!
        entryTime: String!
        estimatedTime: Int!       
    }

    type ResultReservation {
        reservation: String!
    }

    input QuotationInput {
        parkingLot: String!
        vehicleType: String!
        entryTime: String!
        estimatedTime: Int!
    }

    type QuotationResult {
        parkingLot: String!
        vehicleType: String!
        entryTime: String!
        price: Float!
        state: String!
    }

    extend type Query {
        reservationsDetailByparkingLot(parkinglot:String!):[ ReservationDetailParkinglot ]!
        reservationsDetailByparkingLotCustomers(parkinglot:String!):[ InfoCustomer ]!
        reservationCountReservation(parkinglot: String!): ResultReservation!
        reservationsDetail:[ ReservationDetail ]!
        reservationById(reservationId:String!): ReservationDetail!
        computeQuote(quotation: QuotationInput!): QuotationResult!
    }

    extend type Mutation{
        registerReservation(reservationInput: ReservationInput):ResultReservation!
        deleteReservation(reservationId: String!): String!
        updateReservation(reservationId: String!, reservationUpdate: ReservationUpdate!): ReservationDetail!
    }
`;

module.exports = authTypes;