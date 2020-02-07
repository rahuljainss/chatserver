const typeDefs = `
type Chat {
  id: Int!
  from: String
  to: String
  message: String!
}

type Query {
  chats(from: String, to: String):[Chat]
}

type Mutation {
  sendMessage(from: String!, to: String! message: String!): Chat
}

type Subscription {
  messageSent: Chat
}
`;
module.exports = typeDefs;
