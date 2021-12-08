const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

module.exports = {
    auth_api_url:       `${process.env.BACKEND_AUTH_URL}`,
    parking_api_url:    `${process.env.BACKEND_PARKING_URL}`,
    reservation_api_url: `${process.env.BACKEND_RESERVATION_URL}`
}