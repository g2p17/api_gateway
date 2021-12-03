require('dotenv').config();

module.exports = {
    auth_api_url:   `${process.env.BACKEND_AUTH_URL}`,
    parking_api_url: `${process.env.BACKEND_PARKING_URL}`
}