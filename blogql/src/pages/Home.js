import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';
import CourseProvider, {CourseContext} from '../context/CourseProvider';
const styles = {
    root: {
        flexGrow: 1
    }
}
class Home extends Component {

    render() {
        const { classes } = this.props;
        return (
            <CourseProvider>
            <Grid container spacin={0} className={classes.root}>
                <Grid item xs={12}>
                    <h1>Home Component</h1>
                </Grid>
                <Grid item xs={12}>
                    <CourseContext.Consumer>
                        { courseCtx => (<div className="App">
                        <header className="App-header">
                            <h1>Course Listing</h1>
                            <button onClick={() => {
                            courseCtx.getAllCourses()
                            }
                            }>change my name</button>
                        </header>
                        <ul>
                        {courseCtx.courseList.map(course => {
                            return (<li key={course._id}>{course.title}</li>)
                        })}
                        </ul>
                        </div>)}
                    </CourseContext.Consumer>
                </Grid>
            </Grid>
            </CourseProvider>
        )
    }
}

export default compose(
    withStyles(styles)
)(Home);