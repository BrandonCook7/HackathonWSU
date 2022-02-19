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

`
/*
type Event {
    id: Number,
    host: String,
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