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
        },
        computeQuote: async(_, { quotation }, { dataSources }) => {
            parkinglots = await dataSources.parkingAPI.getparkingByPlace(quotation.parkingLot);
            reservationAmount = await dataSources.reservationAPI.reservationCount(quotation.parkingLot);
            parking = parkinglots[0];            
            let maximumSlotType = 0;

            if (parkinglots.length == 0) {
                return {
                    parkingLot: quotation.parkingLot,
                    vehicleType: quotation.vehicleType,
                    entryTime: quotation.entryTime,
                    price: 0,
                    state: "Not available"
                }
            }

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