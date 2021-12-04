const { RESTDataSource } = require('apollo-datasource-rest');
const serverConfig       = require('../server');

class ReservationAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.reservation_api_url;
    }

    async createReservation(reservation) {
        reservation = new Object(JSON.parse(JSON.stringify(reservation)));
        return await this.post('/reservation', reservation);
    }

    async reservationByParkinglot(parkinglot) {
        return await this.get(`/reservation/${parkinglot}/parkingLot`);
    }

    async listReservations() {
        return await this.get(`/reservations/`);
    }
}

module.exports = ReservationAPI;