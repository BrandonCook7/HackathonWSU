const { gql } = require('apollo-server');

module.exports = gql`
type User {
    username: String,
    email: String,
    password: String,
    token: String
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

type Event {
    username: String,
    email: String,
    password: String,
    token: String
}

type Tag {
    username: String,
    email: String,
    password: String,
    token: String
}

type Requirement {
    username: String,
    email: String,
    password: String,
    token: String
}

`