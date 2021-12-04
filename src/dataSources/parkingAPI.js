const { RESTDataSource } = require('apollo-datasource-rest');
const serverConfig       = require('../server');


class ParkingAPI extends RESTDataSource {

    constructor(){
        super();
        this.baseURL = serverConfig.parking_api_url;
    }

    async createParking(parking){
        parking = new Object(JSON.parse(JSON.stringify(parking)));
        return await this.post('/parking/create', parking);
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

    async updateParking(parkId){
        parking = new Object(JSON.parse(JSON.stringify(parkId)));
        return await this.put(`/parking/update/${parkId}`);
    }

    async deleteParking(parkId){
        return await this.delete(`parking/remove/${parkId}`);
    }
}
module.exports = ParkingAPI;