import * as React from 'react';
import { withStyles, StyleRules, StyleRulesCallback } from 'material-ui/styles';
import RepeatIcon from 'material-ui-icons/Repeat';
import MessageIcon from 'material-ui-icons/Message';
import FavoriteIcon from 'material-ui-icons/FavoriteBorder';
import CommentIcon from 'material-ui-icons/ChatBubbleOutline';
import { ClassNameMap } from 'material-ui';

const styles: StyleRules | StyleRulesCallback = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '340px',
    marginTop: '0.6em'
  },
  item: {
    display: 'flex',
    alignItems: 'center'
  }
};

interface ActionBarProps {
  classes: ClassNameMap;
  reposts_count: number;
  comments_count: number;
  attitudes_count: number;
}

class ActionBar extends React.Component<ActionBarProps> {
  
  render() {
    const { classes } = this.props;
    const { reposts_count, comments_count, attitudes_count } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.item}>
          <CommentIcon />
          <span>{comments_count}</span>
        </div>
        <div className={classes.item}>
          <RepeatIcon />
          <span>{reposts_count}</span>
        </div>
        <div className={classes.item}>
          <FavoriteIcon />
          <span>{attitudes_count}</span>
        </div>
        <div className={classes.item}>
          <MessageIcon />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ActionBar);
