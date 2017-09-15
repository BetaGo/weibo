import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import RepeatIcon from 'material-ui-icons/Repeat';
import MessageIcon from 'material-ui-icons/Message';
import FavoriteIcon from 'material-ui-icons/FavoriteBorder';
import CommentIcon from 'material-ui-icons/ChatBubbleOutline';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '340px'
  }
};

class ActionBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <CommentIcon /> 12
        </div>
        <div>
          <RepeatIcon /> 206
        </div>
        <div>
          <FavoriteIcon /> 234
        </div>
        <div>
          <MessageIcon />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ActionBar);
