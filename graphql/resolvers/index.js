const usersResolvers = require('./users');
// const eventsResolvers = require('./events');
const tagsResolvers = require('./tags');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        //...eventsResolvers.Query,
        ...tagsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        //...eventsResolvers.Mutation,
        ...tagsResolvers.Mutation,
    },
};