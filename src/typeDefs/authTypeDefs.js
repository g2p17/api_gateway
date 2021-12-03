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

    input CredentialsInput {
        username:String!
        password:String!
    }

    type Tokens {
        refresh:String!
        access :String!
    }


    type UserDetail{
        id                  :Int!
        username            :String!
        name                :String!
        email               :String!
        identity_document   :String!
        phone_number        :String!
        role                :String!                
    }

    type Query {
        userDetailById(userId:Int!):UserDetail!
    }

    type Mutation{
        signUpUser(userInput:SignUpInput):Tokens!
        logIn(credentials:CredentialsInput!):Tokens!
    }
`;

module.exports = authTypes;