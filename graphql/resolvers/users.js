const User = require('../../models/User');
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
        },
        async updateReputation(_, {reputationInput: {host_email, email, show}}) {
            const user = await User.findOne({ email: email });
            const host = await User.findOne({ email: host_email });
            const user_list = await User.find({});

            let mean_total = 0;
            let population_mean = 0;
            for (let i = 0; i < user_list.length; i++) {
                let rep = user_list[i].reputation;
                mean_total += rep;
            };
            population_mean = mean_total / user_list.length;
            // console.log(population_mean);

            let variance_total = 0;
            let population_variance = 0;
            for (let i = 0; i < user_list.length; i++) {
                let rep = user_list[i].reputation;
                let temp_variance = (rep - population_mean)**2;
                variance_total += temp_variance;
            };
            population_variance = Math.sqrt(variance_total / user_list.length);
            // console.log(population_variance);

            if ((!user) || (!host)) {
                throw new ApolloError('User or Host does not exist', 'USER_OR_HOST_DOES_NOT_EXISTS');
            } 
            else if (user && (show)){
                host_rep = host.reputation
                host_z = ((host_rep - population_mean) / population_variance)
                // console.log("Host")
                // console.log(host_rep)
                // console.log(host_z)

                user_rep = user.reputation
                user_z = ((user_rep - population_mean) / population_variance)
                // console.log("User")
                // console.log(user_rep)
                // console.log(user_z)

                if (host_z > user_z) {
                    amount = ((host_z - user_z) * population_variance) + population_mean
                } else {
                    amount = 1
                }
                user.reputation += amount
            } 
            else if (user && !(show)){
                host_rep = host.reputation
                host_z = ((host_rep - population_mean) / population_variance)
                // console.log("Host")
                // console.log(host_rep)
                // console.log(host_z)

                user_rep = user.reputation
                user_z = ((user_rep - population_mean) / population_variance)
                // console.log("User")
                // console.log(user_rep)
                // console.log(user_z)

                if ((host_z > user_z) && user_rep >= 0) {
                    amount = ((host_z - user_z) * population_variance) + population_mean
                } else {
                    amount = 0
                }
                user.reputation -= amount
            } 

            const res = await user.save()

            return {
                id: res.id,
                ...res._doc
            }
        }
    },
    Query: {
        user: (_, {ID}) => User.findById(ID),
        async getUserByEmail(_, {email}) {
            const res = User.findOne({email: email});
            return res
        },
        async getAllUsers() {
            return User.find({});
        }
    }
};