const { RESTDataSource } = require('apollo-datasource-rest');
const serverConfig       = require('../server');

class AuthAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.auth_api_url;
    }

    async createUser(user){
        user = new Object(JSON.parse(JSON.stringify(user)));
        return await this.post('/user-customer/', user);
    }

    async signInUser(credentials){
        credentials = new Object(credentials);
        return await this.post('/login/', credentials);
    }

    async getUser(userId){
        console.info(userId);
        return await this.get(`/user-customer/detail/${userId}/`);
    }
}

module.exports = AuthAPI;