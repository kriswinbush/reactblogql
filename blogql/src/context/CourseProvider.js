import React, {Component} from 'react';
import { httpReq } from '../services/qlHttpReq';

export const CourseContext = React.createContext();


class CourseProvider extends Component {
    state = {
        course:{},
        courseList: [],
        getCourse: async (id) => {
            let response = await httpReq({ query: `{course(id: ${id}) { title, author, description}}`});
            let result = await response.json();
            this.setState(result.data.course)
        },
        getcourses: async (topic) => {
            let response = await httpReq({query: `{courses(topic: ${topic}) { title, author, topic}`});
            let result = await response.json();
            this.setState(result.data.course)
        },
        updateCourse: async (id, topic) => {
            /* mutation {
                updateCourseTopic(id: 1, topic: "javascript") {
                    title,
                    topic
                }
            } */
            let result = await httpReq({ query: '{course(id: 1) { title, author, description}}'})
            let data = await result.json()
            console.log(data)
            this.setState(data.data.course);
            console.log(this.state)
        },
        getAllCourses: async () => {
            let qlReq = { query: `{ allCourses {title _id} }` };
            let response = await httpReq(qlReq);
            let result = await response.json();
            if(result.errors && result.errors.length) {
                //display errors in form logic
                console.log(result);
            } else {
            this.setState({courseList: result.data.allCourses});
            }
        },
    }
    componentDidMount() {
        this.state.getAllCourses();
    }
    render() {
        return (
            <CourseContext.Provider value={this.state}>
                {this.props.children}
            </CourseContext.Provider>
        )
    }

}
export default CourseProvider;
