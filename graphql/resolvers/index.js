const usersResolvers = require('./users');

module.exports = {
    Query: {
        ...usersResolvers.Query
        //...eventResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation
        //...eventResolvers.Mutation
    },
};