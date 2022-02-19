const usersResolvers = require('./users');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...eventsResolvers.Query,
        ...tagsResolvers.Query,
        ...requirementsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...eventsResolvers.Mutation,
        ...tagsResolver.Mutation,
        ...requirementsResolvers.Mutation,
    },
};