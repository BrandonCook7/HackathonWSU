const { gql } = require('apollo-server');

module.exports = gql`
type Event {
    host: User,
    name: String,
    created: String,
    start: String,
    description: String,
    requirements: [String],
    location: String,
    tags: [Tag],
    joined: [User],
    slots: Int
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
    event(id: ID!): Event
    tag(id: ID!): Tag
    user(id: ID!): User
    findEventByName(eventName: String): Event
    getLatestEvents(limit: Int): [Event]
    getEventsByEmail(email: String, limit: Int): [Event]
}

type Mutation {
    addEvent(eventInput: EventInput): Event
    joinEvent(eventJoin: EventJoin): Event

    addTag(tagInput: TagInput): Tag

    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    updateReputation(reputationInput: ReputationInput): User
}

input EventInput {
    host_email: String, 
    title: String, 
    description: String,
    tags: [String],
    requirements: [String],
    location: String,
    start_time: String
}

input EventJoin {
    placeholder: String
}

input TagInput{
    category: String,
    icon: String,
    color: String
}

input RegisterInput {
    username: String,
    email: String,
    password: String 
}

input ReputationInput {
    email: String,
    show: Int
}

input LoginInput {
    email: String,
    password: String 
}
`