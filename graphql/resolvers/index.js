const eventsResolvers = require('./events');
const tagsResolvers = require('./tags');
const usersResolvers = require('./users');

module.exports = {
    Query: {
        ...eventsResolvers.Query,
        ...tagsResolvers.Query,
        ...usersResolvers.Query,

    },
    Mutation: {
        ...eventsResolvers.Mutation,
        ...tagsResolvers.Mutation,
        ...usersResolvers.Mutation,
    },
};
