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
}

module.exports = AuthAPI;