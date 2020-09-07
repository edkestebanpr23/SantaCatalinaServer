const EucharistSchQ = `
    getEucharists: [EucharistType]
`;

const EucharistSchM = `
    createEucharist(input: EucharistInput): Boolean
    updateEucharist(id: ID!, input: EucharistInput, products: [ProductInput], payments: [PaymentInput]): EucharistType
    updatePayment(id: ID, payment: PaymentInput): EucharistType
    deleteEucharist(id: ID!): ID
`;

const EucharistExtra = `
    input EucharistInput {
        title: String!
        spaceav: Int!
        user: ID
        description: String
        date: String!
    }

    input PeopleInput {
        register: String
        remperature: Float
        client: ID
    }

    input ProductInput {
        product: String!
        category: String
        woman: Boolean
        price: Int!
        quantity: Int!
    }

    input PaymentInput {
        quantity: Int!
        date: String
    }

    type EucharistType {
        id: ID!
        title: String!
        spaceav: Int!
        user: ID!
        description: String
        finalized: Boolean
        register: String
        date: String!
        active: Boolean
        people: [PeopleType]
    }

    type ProductType {
        product: String!
        category: String
        woman: Boolean
        price: Int!
        quantity: Int!
    }

    type PaymentType {
        quantity: Int!
        date: String
    }

    type PeopleType {
        register: String
        remperature: Float
        client: ID
    }
`;

const EucharistSch = { EucharistSchQ, EucharistSchM, EucharistExtra };

module.exports = EucharistSch;