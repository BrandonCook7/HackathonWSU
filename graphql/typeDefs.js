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
    getUserByEmail(email: String): User
    findEventByName(eventName: String): Event
    getLatestEvents(limit: Int): [Event]
    getEventsByEmail(email: String, limit: Int): [Event]
    getEventsByKeyword(keyword: String, limit: Int): [Event]
    getAllTags: [Tag]
    getEventsByTags(tags: [String]): [Event]
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
    user_id: String, 
    title: String, 
    description: String,
    tags: [String],
    requirements: Int,
    location: String,
    start_time: String,
    slots: Int
}

input EventJoin {
    user_id: String,
    event_id: String
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