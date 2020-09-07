const UserSchQ = `
    getUsers: [DataUser]
`;

const UserSchM = `
    createUser(input: UserInput): Boolean
    loginUser(input: LoginInput): DataUser
    updateUser(id: ID!, input: ClientInput): DataUser
    deleteUser(id: ID!): Boolean
`;

const UserExtra = `
    input UserInput {
        name: String!
        document: String!
        password: String!
        telephone: String!
        rol: String!
        img: String
    }

    input LoginInput {
        document: String!
        password: String!
    }

    type Token {
        token: String
    }

    type DataUser {
        token: String!
        name: String!
        telephone: String!
        img: String
        rol: String!
        active: Boolean
    }
`;

const UserSch = { UserSchQ, UserSchM, UserExtra };

module.exports = UserSch;