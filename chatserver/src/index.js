import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { split } from 'apollo-link';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import App from './App';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();
const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
})
const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true
    }
});
const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);
const client = new ApolloClient({
    cache,
    link
})
ReactDOM.render(<ApolloProvider client={client}>
    <App />
</ApolloProvider>, document.getElementById('root'));
serviceWorker.unregister();
