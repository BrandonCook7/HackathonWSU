const User = require('../../models/Event'); //SKELETON FROM USERS
const {
    ApolloServer,
    gql,
    UserInputError
} = require('apollo-server');
const { ApolloError } = require('apollo-server-errors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    Mutation: {
        async registerUser(_, {registerInput: {username, email, password} }) {
            /* Do input validation
            if (!(email && password && first_name && last_name)) {
                res.status(400).send("All input is required");
            }
            */
            const oldUser = await User.findOne({ email });

            if (oldUser) {
                throw new ApolloError('A user is already registered with the email: ' + email, 'USER_ALREADY_EXISTS');
            }
            
            var encryptedPassword = await bcrypt.hash(password, 10);
            
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            });

            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFESTRING",
                {
                  expiresIn: "2h",
                }
            );

            newUser.token = token;

            const res = await newUser.save();
            
            return {
                id: res.id,
                ...res._doc
            };
        },
        async loginUser(_, {loginInput: {email, password} }) {
            /* Do input validation
            if (!(email && password)) {
                res.status(400).send("All input is required");
            }
            */
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                  { user_id: user._id, email },
                  "UNSAFESTRING",
                  {
                    expiresIn: "2h",
                  }
                );
          
                // save user token
                user.token = token;

                return {
                    id: user.id,
                    ...user._doc
                }
            } else {
                throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
            }
        }
    },
    Query: {
        // async getEventEmail(_, {email}) {
        //     const user = await User.findOne({ email });
        //     const event = await Event.findOne({ user });
        //     return event;
        // },
        // event(_, {ID}) {
        //     e = Event.find(event => { event.id === ID });
        //     console.log("test");
        //     return e;
        // }
        event: (_, {ID}) => Event.findById({ID})
    }
};
        //event: (_, {ID}) => Event.findById(ID)
        // async getEvents(_, {limit}) {//Get latest events with limit
        //     //const events = await Event.find({}).sort({createdAt: -1}).limit(limit);
        //     //return events;
        //     //const events = await Event.find({}).sort({created: -1}).limit(limit);
        //     //return events;
        // },
        // async getEventsByTag(_, {tag, limit}) {//Get latest events by tag with limit
        //     const events = await Event.find({tags: tag}).sort({created: -1}).limit(limit);
        //     return events.map(event => {
        //         return {
        //             id: event.id,
        //             ...event._doc
        //         }
        //     });
        // },
        // async getEventsByHost(_, {host, limit}) {//Get latest events by host with limit
        //     const events = await Event.find({host: host}).sort({created: -1}).limit(limit);
        //     return events.map(event => {
        //         return {
        //             id: event.id,
        //             ...event._doc
        //         }
        //     });
        // },
        // async getEventsByKeyword(_, {keyword, limit}) {//Get latest events by keyword and limit
        //     const events = await Event.find({name: {$regex: /keyword/, $options: 'i'}}).sort({created: -1}).limit(limit);
        //     return events.map(event => {
        //         return {
        //             id: event.id,
        //             ...event._doc
        //         }
        //     });
        // }