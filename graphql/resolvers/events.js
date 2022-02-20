const Event = require('../../models/Event');
const User = require('../../models/User');
const {
    ApolloServer,
    gql,
    UserInputError
} = require('apollo-server');
const { ApolloError } = require('apollo-server-errors');

module.exports = {
    Mutation: {
        async addEvent(_, {eventInput: {host_email, title, description} }) {
            const hostUser = await User.findOne({ email: host_email });

            if (!hostUser) {
                throw new ApolloError('User does not exist', 'USER_DOES_NOT_EXISTS');
            }
            else{
                const addEvent = new Event({
                    name: title,
                    description: description,
                    host: hostUser,
                    start: moment.format(start).valueOf(),
                });
    
                const res = await addEvent.save();
    
                return {
                    id: res.id,
                    ...res._doc
                }
            }
        },
        async joinEvent(_, {eventJoin: {} }) {
            
        }
    },
    Query: {
        event: (_, {ID}) => Event.findById(ID)
    }
}