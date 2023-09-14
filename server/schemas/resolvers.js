import {
    AuthenticationError,
} from 'apollo-server-express'
import {
    User, Pet,
} from '../models'


const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('pet');
            }
            throw AuthenticationError('You need to be logged in!');
        },
        getPet: async (parent, { id }, context) => {
            if (context.user) {
                return Pet.findOne({ _id: id }).populate('user');
            } throw AuthenticationError('You need to be logged in!');
        },
        getPets: async (parent, args, context) => {
            if (context.user) {
                return Pet.find().populate('user');
            } throw AuthenticationError('You need to be logged in!');
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        addThought: async (parent, { thoughtText }, context) => {
            if (context.user) {
                const thought = await Thought.create({
                    thoughtText,
                    thoughtAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { thoughts: thought._id } }
                );

                return thought;
            }
            throw AuthenticationError;
            ('You need to be logged in!');
        },
        addComment: async (parent, { thoughtId, commentText }, context) => {
            if (context.user) {
                return Thought.findOneAndUpdate(
                    { _id: thoughtId },
                    {
                        $addToSet: {
                            comments: { commentText, commentAuthor: context.user.username },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw AuthenticationError;
        },
        removeThought: async (parent, { thoughtId }, context) => {
            if (context.user) {
                const thought = await Thought.findOneAndDelete({
                    _id: thoughtId,
                    thoughtAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { thoughts: thought._id } }
                );

                return thought;
            }
            throw AuthenticationError;
        },
        removeComment: async (parent, { thoughtId, commentId }, context) => {
            if (context.user) {
                return Thought.findOneAndUpdate(
                    { _id: thoughtId },
                    {
                        $pull: {
                            comments: {
                                _id: commentId,
                                commentAuthor: context.user.username,
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

export default resolvers;
