import * as React from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import HomeIcon from 'material-ui-icons/Home';
import SearchIcon from 'material-ui-icons/Search';
import NotificationsIcon from 'material-ui-icons/Notifications';
import MessageIcon from 'material-ui-icons/Message';

import { Dispatch } from 'redux';

import { EmotionsAction } from '../../redux/modules/emotions';
import { SessionAction } from '../../redux/modules/session';

export interface ActionBarProps {
  loadUserInfo: () => (dispatch: Dispatch<SessionAction>) => Promise<void>;
  loadEmotions: () => (dispatch: Dispatch<EmotionsAction>) => Promise<void>;
}
interface StateType {
  value: number;
}

class ActionBar extends React.Component<ActionBarProps, StateType> {
  state = {
    value: 0,
  };

  componentDidMount() {
    this.props.loadEmotions();
    this.props.loadUserInfo();
  }

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