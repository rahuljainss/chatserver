import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import withStyles from "@material-ui/core/styles/withStyles";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { TextField } from "@material-ui/core";
const styles = theme => ({
  main: {
    margin: theme.spacing.unit * 2,
  },
  base: {
    margin: 12,
    minWidth: 500,
    minHeight: 35,
  },
  base2: {
    textAlign: 'center',
    backgroundColor: 'blue'
  },
  rows: {
  margin: 8,
  minHeight: 40,
  maxHeight: 40
  },
  buttons: {
    marginRight: '5px'
  }
});

const propTypes = {
  opens: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};
const ADD_TODO = gql`
  mutation sendMessage($from: String!,$to: String!,$message: String!) {
    sendMessage(from: $from,to: $to, message: $message) {
      id
      from
      to
      message
    }
  }
`;
const View = gql`
  query chats($from: String, $to: String) {
    chats(from: $from, to:$to) {
      id
      from
      to
      message
    }
  }`;

const Subs = gql`
subscription {
  messageSent {
    id
    from
    to
    message
  }
}`;

class UserChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: ""
    };
  }
  handleChange = field => (e) => {
    this.setState({
      [field]: e.target.value,
    });
  }
  handleClickOpen = () => {
    this.setState({ opens: true });
  };


  handleSubs = (subscribeToMore) => {
          subscribeToMore({
            document: Subs,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newFeedItem = subscriptionData.data;
              if (!prev.chats.find(message => message.id === newFeedItem.messageSent.id)) {
              return Object.assign({}, prev, {
                  chats: [...prev.chats,newFeedItem.messageSent]
              });}
              else {
                return prev;
              }
            }
          })
        }

  render() {
    const { opens, classes, sender, to, onClose } = this.props;
    const { message } = this.state;
    const { name } = to ? to : '';
    return (
      <Query
        query={View}
        variables={{ from: sender, to: name }}
      >
        {({ loading, error, subscribeToMore, data }) => {
          if (loading) return <p>Good things take time....</p>;
          if (error) return <p>Error</p>;
          this.handleSubs(subscribeToMore);
          return (
            <div>
              <Dialog
                open={opens}
                className={classes.main}
                onClose={this.handledClose}
              >
              <DialogTitle id="simple-dialog-title" className={classes.base2}>{`${name}`}</DialogTitle>
                {data.chats.map(({ from, message }) => (
                  <TextField label={from} type="text" variant="outlined" className={classes.rows}value={message}/>
                ))}
                <TextField variant="outlined" type="text" onChange={this.handleChange('message')} value={message} className={classes.base} placeholder="Enter your message"/>
                <DialogActions>
                  
                  <Mutation mutation={ADD_TODO}>
                  
                    {(sendMessage) => (
                      <>
                      <Button variant="outlined" color="primary" autoFocus onClick={onClose} className={classes.buttons}>Close</Button>
                      <Button
                        onClick={e => {
                          e.preventDefault();
                          sendMessage({ variables: { from: sender, to: name, message: message } });
                        }}
                        color="primary"
                        variant="outlined"
                        autoFocus
                      >
                        Send
                    </Button>
                    </>)
                  }
                  </Mutation>
                </DialogActions>
              </Dialog>
            </div>
          );
        }}
      </Query>
    );
  }
}

UserChat.propTypes = propTypes;
export default withStyles(styles)(UserChat);
