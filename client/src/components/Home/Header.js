import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

const styles = {
  avatar: {
    margin: '10px'
  },
};

type Props = {
  classes: Object
};

class Header extends Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Avatar
          alt="avatar"
          src="http://tva2.sinaimg.cn/crop.0.0.440.440.50/4242e8adjw8elz58g3kyvj20c80c8myg.jpg"
          className={classes.avatar}
        />
        <Typography type="headline">主页</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
