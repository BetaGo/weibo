import * as React from 'react';
// import { ClassNameMap } from 'material-ui';
import { withStyles, StyleRules, StyleRulesCallback, WithStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

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
}

class Header extends React.Component<HeaderProps & WithStyles, {}> {

  render() {
    const { classes } = this.props;
    const { profile_image_url } = this.props;
    return (
      <div className={classes.root}>
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
