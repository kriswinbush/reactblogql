import React, {Component} from 'react';

export const AppContext = React.createContext();

class AppProvider extends Component {

    state = {
        sideDrawerOpen: false,
        toggleDrawer: (drawerState) => {
            this.setState({sideDrawerOpen: drawerState});
        }
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export default AppProvider;