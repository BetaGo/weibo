import * as React from 'react';
// import { ClassNameMap } from 'material-ui';
import { withStyles, StyleRules, StyleRulesCallback, WithStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { Dispatch } from 'redux';

import { EntitiesAction } from '../../redux/modules/entities';

const styles: StyleRules | StyleRulesCallback = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: '1.5em',
    height: '1.5em',
    margin: '10px 20px 10px 10px'
  }
};

export interface HeaderProps {
  profile_image_url: string;
  loadHomeTimeline?: () => (dispatch: Dispatch<EntitiesAction>) => Promise<void>;
}

class Header extends React.Component<HeaderProps & WithStyles, {}> {
  componentDidMount() {
    if ( typeof this.props.loadHomeTimeline  === 'function') {
      this.props.loadHomeTimeline();
    }
  }
  
  render() {
    const { classes } = this.props;
    const { profile_image_url } = this.props;
    return (
      <div className={classes.root}>
        <div className="wtf">wtf</div>
        <Avatar
          alt="avatar"
          src={profile_image_url}
          className={classes.avatar}
        />
        <Typography type="title">主页</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
