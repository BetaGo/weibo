import * as React from 'react';
import { withStyles, StyleRules, StyleRulesCallback, WithStyles } from 'material-ui/styles';

const styles: StyleRules | StyleRulesCallback = {
  imageContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gridImage: {
    boxSizing: 'border-box',
    border: '3px solid hsla(0,0%,100%,.5)',
    width: '33.3%',
  }
};

interface Props {
  pics: Array<string>;
}

const GridPic = (props: Props & WithStyles) => {
  const { classes, pics} = props;
  return (
    <div className={classes.imageContainer}>
      {pics.map((url, index) => {
        return <img className={classes.gridImage} key={`image${index}`} src={url} />;
      })}
    </div>
  );
};

export default withStyles(styles)(GridPic);
