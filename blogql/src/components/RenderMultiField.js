import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
const styles = {
  root: {
    flexGrow:1,
    width: "100%"
  },
  error: {
    color: "red"
  },
  textField: {
    width: "100%",
    marginBottom: "10px"
}
}
class RenderMultiFields extends Component {

  render() {
    const {classes, input, label, ...custom } = this.props;
    return (
      <Grid className={classes.root } container direction="row" spacing={16} align="flex-start">
        <Grid item xs={12}>
          <TextField
          className={classes.TextField }
            error={false}
            id={label}
            label={label}
            multiline
            rows="6"
            {...input}
            {...custom}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.error} variant="subheading" gutterBottom>this is a error</Typography>
        </Grid>
      </Grid>
    )
  }
}
export default compose(
  withStyles(styles)
)(RenderMultiFields);