const chats = [];
const CHAT_CHANNEL = 'CHAT_CHANNEL';

const resolvers = {
    Query: {
        chats(root, { from, to, message }, context) {
            const chat= chats.filter(chats => (chats.from === from && chats.to === to)||(chats.from === to && chats.to === from));
            return chat;
        }
    },

    Mutation: {
        sendMessage(root, { from, to, message }, { pubsub }) {
            const chat = { id: chats.length + 1, from, to, message }
            chats.push(chat)
            pubsub.publish('CHAT_CHANNEL', { messageSent: chat })
            return chat
        }
    },

    Subscription: {
        messageSent: {
            subscribe: (root, args, { pubsub }) => {
                return pubsub.asyncIterator(CHAT_CHANNEL)
            }
        }
    }
}

module.exports = resolvers