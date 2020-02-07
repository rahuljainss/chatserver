import React from "react";
import { User } from "../constants";
import SampleTable from "../Table/Table";
import UserChat from "../UserChat/UserChat";

class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      record: ""
    };
  }
  handleClickOpen = data => {
    this.setState({
      opened: true,
      record: data
    });
  };
  handledClose = () => {
    this.setState({ opened: false });
  };

  userTobeRender = () => {
    const name = this.props.match.params.name;
    const email = this.props.location.state;
    const friends = User.filter(data => (name === data.name)&&(email === data.email))[0];
    if(friends) {
      const friendList = friends.friends;
      const Friend = User.filter(data => friendList.indexOf(data.id) !== -1);
      return Friend;
    } else {
      return [];
    }
  };

  render() {
    const { opened, record } = this.state;
    const { match } = this.props;
    const { name } = match.params;
    return (
      <>
        <SampleTable
          data={this.userTobeRender()}
          onSubmit={this.handleClickOpen}
        />
        <UserChat opens={opened} sender={name} to={record} onClose={this.handledClose}/>
      </>
    );
  }
}

export default UserList;
