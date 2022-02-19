const { gql } = require('apollo-server');

module.exports = gql`
type User {
    username: String,
    email: String,
    password: String,
    token: String,
    reputation: Int
}

input RegisterInput {
    username: String,
    email: String,
    password: String 
}

input LoginInput {
    email: String,
    password: String 
}

type Query {
    user(id: ID!): User
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
}

type Tag {
    category: String,
    icon: String,
    color: String
}

type Requirement {
    operation: String,
    attribute: String,
    value: String
}

type Event {
    host: User,
    name: String,
    created: String,
    start: String,
    description: String,
    requirements: [Requirement],
    location: String,
    tags: [Tag]
}
`