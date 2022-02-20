const Tag = require('../../models/Tag');
const {
    ApolloServer,
    gql,
    UserInputError
} = require('apollo-server');
const { ApolloError } = require('apollo-server-errors');

module.exports = {
    Mutation: {
        async addTag(_, {tagInput: {category, icon, color} }) {
            const oldTag = await Tag.findOne({ category });

            if (oldTag) {
                throw new ApolloError('This tag already exists: ' + category, 'TAG_ALREADY_EXISTS');
            }
            
            const newTag = new Tag({
                category: category.toLowerCase(),
                icon: icon,
                color: color
            });

            const res = await newTag.save();
            
            return {
                id: res.id,
                ...res._doc
            };
        }
    },
    Query: {
        tag: (_, {ID}) => Tag.findById(ID),
        async getAllTags() {
            return Tag.find({})
        }
    }
};