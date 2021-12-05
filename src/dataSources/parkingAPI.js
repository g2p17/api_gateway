const { RESTDataSource } = require('apollo-datasource-rest');
const serverConfig       = require('../server');


class ParkingAPI extends RESTDataSource {

    constructor(){
        super();
        this.baseURL = serverConfig.parking_api_url;
    }

    async parkingCreate(parkingC){
        parkingC = new Object(JSON.parse(JSON.stringify(parkingC)));
        return await this.post('parking/create/', parkingC);
    }

    async getparkingPlaceById(parkId){
        return await this.get(`/parking/${parkId}`);
    }

    async getparkingByAdmin(adminId){
        return await this.get(`/parking/admin/${adminId}`);
    }

    async getparkingByPlace(parkingPlace){
        return await this.get(`/parking/place/${parkingPlace}`);
    }

    async getAllParkings(){
        return await this.get(`/parkings`);
    }

    async updateParking(parkingUp){
        parkingUp = new Object(JSON.parse(JSON.stringify(parkingUp)));
        let parkingId = parkingUp.id;
        return await this.put(`/parking/update/${parkingId}`, parkingUp);
    }

    async deleteParking(parkId){
        return await this.delete(`parking/remove/${parkId}`);
    }
}
module.exports = ParkingAPI;