import React, {Component} from 'react';
import { httpReq } from "../services/qlHttpReq";
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';

export const AuthContext = React.createContext();

class AuthProvider extends Component {
    state = {
        auth: {},
        loginForm: {
            userName: "",
            userPassword: ""
        },
        handleLoginChange: (event) => {
            console.log(this.state.loginForm)
            let form = this.state.loginForm;
            form[event.target.name] = event.target.value;
            this.setState({loginForm : form})
            console.log(this.state)
        },
        submitLogin: async () => {
            console.log('submitting');
            var form = this.state.loginForm;
            let qlReq = {
                query: `
                {
                    signIn(userName:"${form.userName}", password:"${form.userPassword}") {
                      _id
                      password
                      userName
                      token
                    }
                  }
                `
            }
            let response = await httpReq(qlReq);
            let result = await response.json();
            console.log(result);
            if(!result.data.signIn && result.errors.length) {
                //display errors in form logic
                console.log(result);
            } else {
                for(var p in form) { 
                    form[p] = ""; 
                }
                console.log(window)
                //set token in localStorage
                
                this.setState({loginForm: form, auth: result.data.signIn }, () => {
                    window.localStorage.token = this.state.auth.token;
                    this.props.history.push('/');
                });
            }
        },
    }

    render() {
        return (
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default compose(
    withRouter
)(AuthProvider);