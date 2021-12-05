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

    async reservationById(reservationId) {
        return await this.get(`/reservation/${reservationId}`);
    }

    async reservationCustomer(parkinglot) {
        return await this.get(`/reservation/${parkinglot}/parkingLot/customers`);
    }

    async reservationCount(parkinglot) {
        return await this.get(`/reservation/${parkinglot}/count`);
    }    

    async deleteReservation(reservationId) {
        return await this.delete(`/reservation/delete/${reservationId}`);
    }

    async updateReservation(reservationId, reservationUpdate) {
        reservationUpdate = new Object(JSON.parse(JSON.stringify(reservationUpdate)));
        return await this.put(`/reservation/update/${reservationId}`, reservationUpdate);
    }
}

module.exports = ReservationAPI;