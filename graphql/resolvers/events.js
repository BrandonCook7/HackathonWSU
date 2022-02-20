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
        async addEvent(_, {eventInput: {user_email, title, description, tags, requirements, location, start_time, slots} }) {
            const hostUser = await User.findOne({ email: user_email });

            if (!hostUser) {
                throw new ApolloError('User does not exist', 'USER_DOES_NOT_EXISTS');
            }
            else{
                categories = []
                for (let i = 0; i < tags.length; i++) {
                    let cat = await Tag.findOne({ category: tags[i] })
                    if (cat) {
                        categories.push(tags[i])
                    }
                }

                const new_event = new Event({
                    name: title,
                    description: description,
                    host: user_email,
                    tags: categories,
                    requirements: requirements,
                    location: location,
                    start: start_time,
                    slots: slots,
                    joined: [user_email],
                });
    
                const res = await new_event.save();
    
                return {
                    id: res.id,
                    ...res._doc
                }
            }
        },
        async joinEvent(_, {eventJoin: {user_email, event_id} }) {

            const authenticated_user = await User.findOne({ email: user_email });
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
        async getLatestEvents(_, {limit, rep}) { //Only only the user to see post's that are their rep or less
            let e = Event.find({}).sort({created: -1}).limit(limit);
            if ((rep != null) && (Event.reputation != null)) {
                e = e.where('reputation').lte(rep);
                //return (await e).filter(event => Event.reputation <= rep);
            } else {
                return e;
            }
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

