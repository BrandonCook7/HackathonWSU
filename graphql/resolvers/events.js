const Event = require('../../models/Event');
const User = require('../../models/User');
const Tag = require('../../models/Tag')

const {
    ApolloServer,
    gql,
    UserInputError
} = require('apollo-server');
const { ApolloError } = require('apollo-server-errors');
const { events } = require('../../models/User');

module.exports = {
    Mutation: {
        async addEvent(_, {eventInput: {user_id, title, description, tags, requirements, location, start_time, slots} }) {
            const hostUser = await User.findOne({ _id: user_id });

            if (!hostUser) {
                throw new ApolloError('User does not exist', 'USER_DOES_NOT_EXISTS');
            }

            else{

                categories = []

                for (let i = 0; i < tags.length; i++) {
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
                    slots: slots,

                    // start: moment.format(start).valueOf(),
                });
    
                const res = await addEvent.save();
    
                return {
                    id: res.id,
                    ...res._doc
                }
            }
        },
        async joinEvent(_, {eventJoin: {user_id, event_id} }) {

            const authenticated_user = await User.findOne({ _id: user_id });
            const event = await Event.findOne({ _id: event_id });

            if (!authenticated_user) {
                throw new ApolloError('User does not exist', 'USER_DOES_NOT_EXISTS');
            }

            if (!event) {
                throw new ApolloError('Event does not exit', 'EVENT_DOES_NOT_EXISTS');
            }

            let newArr = []
            let flag = false

            for (let i = 0; i < event.joined.length; i++) {
                let user = event.joined[i]
                if (user.email != authenticated_user.email) {
                    console.log(user.email)
                    newArr.push(user)
                }
                else {
                    flag = true
                }
            }

            if (flag == false){
                newArr = [authenticated_user]
            }

            event.joined = newArr

            const res = await event.save()

            return {
                id: res.id,
                ...res._doc
            }
        }
    },
    Query: {
        event: (_, {ID}) => Event.findById(ID),

        async findEventByID(_, {event_id}) {
            return Event.findOne({ _id: event_id })
        },

        async findEventByName(_, {eventName}) {
            return Event.findOne({name: eventName});
        },

        async getLatestEvents(_, {limit}) {
            return Event.find({}).sort({created: -1}).limit(limit);
        },

        async getEventsByEmail(_, {email, limit}) {//Get latest events by host with limit
            const hostUser = await User.findOne({ email: email });
            return Event.find({host: hostUser}).sort({created: -1}).limit(limit);
            //return Event.find({host: hostUser}).sort({created: -1}).limit(limit);

            
        }
    }
}

