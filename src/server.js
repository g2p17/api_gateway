require('dotenv').config();

module.exports = {
    auth_api_url:       `${process.env.BACKEND_AUTH_URL}`,
    reservation_api_url: `${process.env.BACKEND_RESERVATION_URL}`
}