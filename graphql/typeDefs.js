const { gql } = require('apollo-server');

module.exports = gql`
type Event {
    host: String,
    name: String,
    created: String,
    start: String,
    description: String,
    requirements: Float,
    location: String,
    tags: [String],
    joined: [String],
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
    reputation: Float
}

type Query {
    event(id: ID!): Event
    findEventByID(event_id: ID): Event
    tag(id: ID!): Tag
    user(id: ID!): User
    getUserByEmail(email: String): User
    findEventByName(eventName: String): Event
    getLatestEvents(limit: Int, rep: Float): [Event]
    getEventsByEmail(email: String, limit: Int): [Event]
    getEventsByKeyword(keyword: String, limit: Int): [Event]
    getAllTags: [Tag]
    getEventsByTags(tags: [String]): [Event]
    getAllUsers: [User]
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
    user_email: String, 
    title: String, 
    description: String,
    tags: [String],
    requirements: Float,
    location: String,
    start_time: String,
    slots: Int
}

input EventJoin {
    user_email: String,
    event_name: String
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
    host_email: String,
    email: String,
    show: Int
}

input LoginInput {
    email: String,
    password: String 
}
`