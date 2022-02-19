const usersResolvers = require('./users');
// const eventsResolvers = require('./events');
const tagsResolvers = require('./tags');
// const requirementsResolvers = require('./requirements');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        //...eventsResolvers.Query,
        ...tagsResolvers.Query,
        //...requirementsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        //...eventsResolvers.Mutation,
        ...tagsResolvers.Mutation,
        //...requirementsResolvers.Mutation,
    },
};