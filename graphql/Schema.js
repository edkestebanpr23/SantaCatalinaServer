const { gql } = require('apollo-server-express');
const UserSch = require('./schema/userShc');
const ClientSch = require('./schema/clientSch');
const EucharistSch = require('./schema/eucharistSch');

const typeDefs = gql`

    scalar DateTime

    type Query {
        hello: String
        ${UserSch.UserSchQ}
        ${ClientSch.ClientSchQ}
        ${EucharistSch.EucharistSchQ}
    }

    type Mutation {
        ${UserSch.UserSchM}
        ${ClientSch.ClientSchM}
        ${EucharistSch.EucharistSchM}
    }

    ${UserSch.UserExtra}
    ${ClientSch.ClientExtra}
    ${EucharistSch.EucharistExtra}
`;

module.exports = typeDefs;