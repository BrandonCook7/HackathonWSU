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
    color: [String]
}

type Requirement {
    operation: String,
    attribute: String,
    value: String
}

type Event {
    id: Int,
    host: User,
    name: String,
    created: String,
    start: String,
    description: String,
    requirements: [String],
    location: String,
    tags: [Tag]
}
`
/*
type Event {
    id: Int,
    host: User,
    name: String,
    created: Date,
    start: Date,
    description: String,
    requirements: String,
    location: String,
    tags: Array
}

type Tag {
    category: String,
    icon: String,
    color: Array
}

type Requirement {
    operation: String,
    attribute: String,
    value: String
}
*/