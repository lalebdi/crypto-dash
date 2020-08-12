import React, { Component } from 'react';

export const AppContext = React.createContext(); // we exported this to be used in the consumers  in the child components

export  class AppProvider extends Component {
        constructor(props){
            super(props)
            this.state = {
                page: 'settings',
                // passing the function in the state as recommended in the documentation
                setPage: this.setPage
            }
        }

        setPage = page => this.setState({page})
    render() {
        return (
            <AppContext.Provider value={this.state} >
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
