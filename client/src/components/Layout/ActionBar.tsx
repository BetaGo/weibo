import * as React from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import HomeIcon from 'material-ui-icons/Home';
import SearchIcon from 'material-ui-icons/Search';
import NotificationsIcon from 'material-ui-icons/Notifications';
import MessageIcon from 'material-ui-icons/Message';

// import { Link } from 'react-router-dom';

interface StateType {
  value: number;
}

class ActionBar extends React.Component<{}, StateType> {
  state = {
    value: 0,
  };

  handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    this.setState({ value });
  }
  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        fullWidth={true}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<HomeIcon />} />
        <Tab icon={<SearchIcon />} />
        <Tab icon={<NotificationsIcon />} />
        <Tab icon={<MessageIcon />} />
      </Tabs>
    );
  }
}

export default ActionBar;