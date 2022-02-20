const Event = require('../../models/Event');
const User = require('../../models/User');
const Tag = require('../../models/Tag')

const {
    ApolloServer,
    gql,
    UserInputError
} = require('apollo-server');
const { ApolloError } = require('apollo-server-errors');

module.exports = {
    Mutation: {
        async addEvent(_, {eventInput: {host_email, title, description, tags, requirements, location, start_time} }) {
            const hostUser = await User.findOne({ email: host_email });

            if (!hostUser) {
                throw new ApolloError('User does not exist', 'USER_DOES_NOT_EXISTS');
            }
            else{
                categories = []
                for (let i = 0; i < tags.length; i++){
                    let cat = await Tag.findOne({ category: tags[i] })
                    if (cat) {
                        categories.push(cat)
                    }
                }

                const addEvent = new Event({
                    name: title,
                    description: description,
                    host: hostUser,
                    tags: categories,
                    requirements: requirements,
                    location: location,
                    start: start_time,
                });
    
                const res = await addEvent.save();
    
                return {
                    id: res.id,
                    ...res._doc
                }
            }
        },
        async joinEvent(_, {eventJoin: {email} }) {
            
        }
    },
    Query: {
        event: (_, {ID}) => Event.findById(ID)
    }
}