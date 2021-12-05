const authTypes        = require("./authTypeDefs")
const reservationTypes = require("./reservationTypeDefs")      
const parkingTypes     = require("./parkingTypeDefs")

const schemaArrays = [ authTypes, parkingTypes, reservationTypes ]

module.exports     = schemaArrays