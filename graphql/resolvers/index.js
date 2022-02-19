const usersResolvers = require('./users');
// const eventsResolvers = require('./events');
const tagsResolvers = require('./tags');

module.exports = {
    Query: {
        //...eventResolvers.Query,
        ...tagsResolvers.Query,
        ...usersResolvers.Query,

    },
    Mutation: {
        //...eventsResolvers.Mutation,
        ...tagsResolvers.Mutation,
        ...usersResolvers.Mutation,
    },
};