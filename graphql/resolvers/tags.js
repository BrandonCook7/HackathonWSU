const Tag = require('../../models/Tag'); //SKELETON
const {
    ApolloServer,
    gql,
    UserInputError
} = require('apollo-server');
const { ApolloError } = require('apollo-server-errors');

module.exports = {
    Mutation: {
        async addTag(_, {registerInput: {category, icon, color} }) {
            const oldTag = await Tag.findOne({ category });

            if (oldTag) {
                throw new ApolloError('This tag already exists: ' + category, 'TAG_ALREADY_EXISTS');
            }
            
            const newTag = new Tag({
                category: category.tolowerCase(),
                icon: icon.toLowerCase(),
                color: color.toLowerCase()
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
        user: (_, {ID}) => User.findById(ID)
    }
}