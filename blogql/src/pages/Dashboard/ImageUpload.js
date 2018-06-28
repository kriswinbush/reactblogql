import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core';
const styles = {
    root: {
        flexGrow: 1
    },
    fileInput: {
        width: "100%",
        padding: "10px 0 10px 10px",
        cursor: "pointer"
    },
    img: {
        width: "300px",
        height: "190px"
    },
    imgPreview: {
        width: "300px",
        textAlign: "center",
        height: "190px",
        border: "2px dashed gray"
    },
    previewText: {
        width: "100%",
        marginTop: "20px"
    },
    centerText: {
        textAlign: "center",
        width: "500px"
    }
}

class ImageUpload extends Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: ''};
    }
  
    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        this.props.onChange(e)
        reader.onloadend = () => {
            this.setState({
            file: file,
            imagePreviewUrl: reader.result
            });
        }
  
        reader.readAsDataURL(file)
    }
    /* componentDidUpdate(prevProps) {
        if(this.props.meta.pristine && !prevProps.meta.pristine) {
            this.setState({
                file: "",
                imagePreviewUrl: ""
            });
        }
    } */
    render() {
        const { classes} = this.props;  
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img className={classes.img} src={imagePreviewUrl} alt="blog upload" />);
        } else {
            $imagePreview = (<div className={classes.previewText}>Please select an Image for Preview</div>);
        }
        
      return (
        <Grid 
            container
            className={classes.root} 
            alignItems="center"
        >
            <Grid item xs={12}>
                <input 
                {...this.props}
                label="blogUploadImage" 
                id="blogUploadImage" 
                
                className={classes.fileInput} 
                type="file" 
                onChange={(e)=>this._handleImageChange(e)} 
            />
            </Grid>
            <Grid item xs={12}>
                <div className={classes.imgPreview}>
                    {$imagePreview}
                </div>
            </Grid>
        </Grid>
      )
    }
  }

  export default compose(
      withStyles(styles)
  )(ImageUpload);
