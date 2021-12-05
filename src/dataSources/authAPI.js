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

    async createUserAdmin(user){
        user = new Object(JSON.parse(JSON.stringify(user)));
        return await this.post('/user-admin/', user);
    }    

    async signInUser(credentials){
        credentials = new Object(credentials);
        return await this.post('/login/', credentials);
    }

    async getUser(userId){
        return await this.get(`/user-customer/detail/${userId}/`);
    }

    async refreshToken(token){
        token = new Object( token );
        return await this.post('/refresh/', token);
    }

    async updateUser(userId, user){
        user = new Object(JSON.parse(JSON.stringify(user)));
        return await this.put(`/user-customer/update/${userId}/`, user);
    }

    async deleteUser(userId){
        return await this.delete(`/user-customer/delete/${userId}/`);
    }    
}

module.exports = AuthAPI;