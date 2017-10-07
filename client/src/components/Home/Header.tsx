import * as React from 'react';
// import { ClassNameMap } from 'material-ui';
import { withStyles, StyleRules, StyleRulesCallback } from 'material-ui/styles';
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

interface PropsType {
  classes?: {
    root: string;
    avatar: string;
  };
  profile_image_url: string;
  loadHomeTimeline: () => void;
}

class Header extends React.Component<PropsType, {}> {
  public static defaultProps: Partial<PropsType> = {
    classes: {
      root: '',
      avatar: ''
    }
  };

  componentDidMount() {
    this.props.loadHomeTimeline();
  }
  
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
