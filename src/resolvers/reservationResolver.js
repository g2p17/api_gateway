const { ApolloError } = require('apollo-server');

const reservationResolver = {
    Query: {
        reservationsDetailByparkingLot: async(_, { parkinglot }, { dataSources, userIdToken}) => {            

            userIdentity_document = (await dataSources.authAPI.getUser(userIdToken)).identity_document;
            parkinglots = await dataSources.parkingAPI.getparkingByAdmin(userIdentity_document);

            const result = parkinglots.find(parkingLot => 
                                                parkingLot.parking_place.localeCompare(parkinglot) == 0);
            if (result != null)
                return await dataSources.reservationAPI.reservationByParkinglot(parkinglot);

            return null;
        },
        reservationById: async(_, { reservationId }, { dataSources, userIdToken}) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username;
            reservation   = await dataSources.reservationAPI.reservationById(reservationId);
            
            usernameReservation = reservation.clientId;
            if(usernameToken == usernameReservation)
                return reservation;

            return null;
        },
        reservationsDetailByparkingLotCustomers: async(_, { parkinglot }, { dataSources, userIdToken}) => {

            userIdentity_document = (await dataSources.authAPI.getUser(userIdToken)).identity_document;
            parkinglots = await dataSources.parkingAPI.getparkingByAdmin(userIdentity_document);

            const result = parkinglots.find(parkingLot => 
                                                parkingLot.parking_place.localeCompare(parkinglot) == 0);
            if (result != null)
                return await dataSources.reservationAPI.reservationCustomer(parkinglot);

            return null;
        },
        computeQuote: async(_, { quotation }, { dataSources }) => {
            parkinglots = await dataSources.parkingAPI.getparkingByPlace(quotation.parkingLot);
            reservationAmount = await dataSources.reservationAPI.reservationCount(quotation.parkingLot);
            parking = parkinglots[0];            
            let maximumSlotType = 0;

            const date1 = new Date();
            const date2 = new Date(quotation.entryTime);

            if (parkinglots.length == 0)
                throw new ApolloError(`Not Found parkinglot`, 404);

            if (date2 < date1)
                throw new ApolloError(`The entryTime must occur after current date `, 400);

            if (quotation.vehicleType == "Car") {
                maximumSlotType = parking.vehicle_slots;
                slot_price = parking.vehicle_price;
            } else if (quotation.vehicleType == "Motorcycle") {
                maximumSlotType = parking.motorcycles_slots;
                slot_price = parking.motorcycles_price;
            } else if (quotation.vehicleType == "Bicycle") {
                maximumSlotType = parking.bicycles_slots;
                slot_price = parking.bicycles_price;
            } else if (quotation.vehicleType == "Disabled Parking") {
                maximumSlotType = parking.person_with_disability_slots;
                slot_price = parking.person_with_disability_price;
            }      

            availableSlots = maximumSlotType - parseInt(reservationAmount.reservation);
            if (availableSlots > 0) {
                priceComputed = quotation.estimatedTime * slot_price;

                return {
                    parkingLot: quotation.parkingLot,
                    vehicleType: quotation.vehicleType,
                    entryTime: quotation.entryTime,
                    price: priceComputed,
                    state: "Available"
                }
            }

            return null;
        }
    },
    Mutation: {
        registerReservation: async (_, { reservationInput }, { dataSources, userIdToken }) => {
            parkingLot = await dataSources.parkingAPI.getparkingByPlace(reservationInput.parkingLot);
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username;
            
            if (parkingLot.length > 0 && usernameToken.localeCompare(reservationInput.clientId) == 0) {
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
            console.log(reservationId);
            console.info(reservationUpdate);
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username;            
            reservation = await dataSources.reservationAPI.reservationById(reservationId);
            parkingLot = await dataSources.parkingAPI.getparkingByPlace(reservationUpdate.parkingLot);            
            
            reservationUpdate.clientId = reservation.clientId;

            if (parkingLot.length > 0 && usernameToken.localeCompare(reservation.clientId) == 0)
                return await dataSources.reservationAPI.updateReservation(reservationId, reservationUpdate);
            
            return null;
        }
    }
};

module.exports = reservationResolver;