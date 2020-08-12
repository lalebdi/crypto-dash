import React, { Component } from 'react';

export const AppContext = React.createContext(); // we exported this to be used in the consumers  in the child components

export  class AppProvider extends Component {
        constructor(props){
            super(props)
            this.state = {
                page: 'dashboard',
                ...this.savedStettings(), // this will default into the dash page and if the user setup a localstorage they will land here 
                // passing the function in the state as recommended in the documentation
                setPage: this.setPage,
                confirmFavorites: this.confirmFavorites

            }
        }

        confirmFavorites = () => {
            // console.log("Hello")
            this.setState({
                firstVisit: false,
                page: 'dashboard'
            });
            localStorage.setItem('cryptoDash', JSON.stringify({
                test: 'hello'
            }))
        }

        savedStettings(){
            let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
            if(!cryptoDashData){
                    return {page: 'settings', firstVisit: true} // the boolean is to let the app know that the user is here for the first time
            }
            return {};
            
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
