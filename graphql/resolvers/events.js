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
        async addEvent(_, {eventInput: {host_email, title, description, tags, requirements, location, start_time, slots} }) {
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
                    slots: slots,
                });
    
                const res = await addEvent.save();
    
                return {
                    id: res.id,
                    ...res._doc
                }
            }
        },
        async joinEvent(_, {eventJoin: {event_id} }) {
            
        }
    },
    Query: {
        event: (_, {ID}) => Event.findById(ID),
        async findEventByName(_, {eventName}) {
            return Event.findOne({name: eventName});
        },
        async getLatestEvents(_, {limit}) {
            return Event.find({}).sort({created: -1}).limit(limit);
        },
        async getEventsByEmail(_, {email, limit}) {//Get latest events by host with limit
            const hostUser = await User.findOne({ email: email });
            return Event.find({host: hostUser}).sort({created: -1}).limit(limit);
        },
        async getEventsByKeyword(_, {keyword, limit}) {//Get latest events by keyword and limit
            return Event.find({name: {$regex: keyword, $options: 'i'}}).sort({created: -1}).limit(limit);
        },
        //Find events by tags
        //Filter events by tags
        async getEventsByTags(_, {tags}) {
            const events = await Event.find({});
            let eventList = [];
            for (let i = 0; i < events.length; i++){
                let eventTags = events[i].tags;
                let match = false;
                for (let j = 0; j < eventTags.length; j++){
                    for (let k = 0; k < tags.length; k++){
                        if (eventTags[j].category == tags[k]){
                            match = true;
                        }
                    }
                }
                if (match){
                    eventList.push(events[i]);
                }
            }
            return eventList;
        }
    }
}

