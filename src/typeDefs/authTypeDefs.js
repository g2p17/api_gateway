const { gql } = require('apollo-server');

const authTypes = gql `

    input SignUpInput {
        username            : String!
        identity_document   : String!
        phone_number        : String!
        password            : String!
        name                : String!
        email               : String!
        role                : String!
    }

    input SignUpInputAdmin {
        username            : String!
        identity_document   : String!
        phone_number        : String!
        password            : String!
        name                : String!
        email               : String!
    }

    input CredentialsInput {
        username:String!
        password:String!
    }

    type Tokens {
        refresh:String!
        access :String!
    }

    type UserDetail{
        id                  : Int!
        username            : String!
        name                : String!
        email               : String!
        identity_document   : String!
        phone_number        : String!
        role                : String!
    }

    input Refresh {
        refresh:String!
    }

    type Access {
        access:String!
    }

    input UserUpdate{
        name              : String!
        email             : String!
        username          : String!
        password          : String!
        identity_document : String!
        phone_number      : String!    
    }

    type Query {
        userDetailById(userId:Int!):UserDetail!
    }

    type Mutation{
        signUpUser(userInput:SignUpInput):Tokens!
        signUpUserAdmin(userInput:SignUpInputAdmin):Tokens!
        logIn(credentials:CredentialsInput!):Tokens!
        refreshToken(token:Refresh!):Access!
        updateUser(userId:Int!, user:UserUpdate!):UserDetail!
        deleteUser(userId:Int!):String!
    }
`;

module.exports = authTypes;