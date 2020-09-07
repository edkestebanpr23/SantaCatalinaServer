const { gql } = require('apollo-server-express');

const ClientSchQ = `
    getClients: [DataClient]
    getClient (id: ID!): DataClient
`;

const ClientSchM = `
    createClient(input: ClientInput): Boolean
    updateClient(id: ID!, input: ClientInput): DataClient
    deleteClient(id: ID!): Boolean
`;

const ClientExtra = `
    input ClientInput {
        name: String!
        telephone: String!
        age: Int!
        document: String!
    }

    type DataClient {
        id: ID!
        token: String!
        name: String!
        telephone: String!
        age: Int!
        document: String!
        active: Boolean
        nui: String!
    }


`;

const ClientSch = { ClientSchQ, ClientSchM, ClientExtra };

module.exports = ClientSch;