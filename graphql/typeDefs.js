const { gql } = require('apollo-server');

module.exports = gql`
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

type Requirement {
    operation: String,
    attribute: String,
    value: String
}

type Tag {
    category: String,
    icon: String,
    color: String
}

type User {
    username: String,
    email: String,
    password: String,
    token: String,
    reputation: Int
}

type Query {
    user(id: ID!): User
}

type Mutation {
    addTag(registerInput: RegisterInput): Tag
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
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
`