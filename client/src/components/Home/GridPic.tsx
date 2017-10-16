import * as React from 'react';
import { withStyles, StyleRules, StyleRulesCallback, WithStyles } from 'material-ui/styles';

const styles: StyleRules | StyleRulesCallback = {
  gridImage: {

  }
};

interface Props {
  pics: Array<string>;
}

const GridPic = ({pics}: Props & WithStyles) => (
  <div>
    {pics.map((url, index) => {
      return <img key={`image${index}`} src={url} />;
    })}
  </div>
);

export default GridPic;
