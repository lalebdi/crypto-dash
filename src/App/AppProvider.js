import React, { Component } from 'react';
import _ from 'lodash';

const cc = require('cryptocompare');

export const AppContext = React.createContext(); // we exported this to be used in the consumers  in the child components

const MAX_FAVORITES =10;

export  class AppProvider extends Component {
        constructor(props){
            super(props)
            this.state = {
                page: 'dashboard',
                favorites: ['BTC', 'ETH', 'XMR', 'DOGE'], // delfault coins
                ...this.savedStettings(), // this will default into the dash page and if the user setup a localstorage they will land here 
                // passing the function in the state as recommended in the documentation
                setPage: this.setPage,
                addCoin: this.addCoin,
                removeCoin: this.removeCoin,
                isInFavorites: this.isInFavorites,
                confirmFavorites: this.confirmFavorites

            }
        }

        componentDidMount = () => {
            this.fetchCoins();
        }

        fetchCoins = async () => {
            let coinList =  (await cc.coinList()).Data; // await is waiting for the promise to resolve
            this.setState({coinList})
            // console.log(coinList);
        }
        
        addCoin = key => {
            let favorites = [...this.state.favorites];
            if(favorites.length < MAX_FAVORITES){
                favorites.push(key);
                this.setState({favorites});
            }
        };

        // using lodash below - .pull -> pull the value from the array and return the array
        removeCoin = key => {
            let favorites = [...this.state.favorites];
            this.setState({favorites: _.pull(favorites, key)})
        }

        // Using the lodash below - .includes -> takes an array and asks if the key is in the array
        isInFavorites = key => _.includes(this.state.favorites, key)

        confirmFavorites = () => {
            // console.log("Hello")
            this.setState({
                firstVisit: false,
                page: 'dashboard'
            });
            localStorage.setItem('cryptoDash', JSON.stringify({
                favorites: this.state.favorites
            }))
        }

        savedStettings(){
            let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
            if(!cryptoDashData){
                    return {page: 'settings', firstVisit: true} // the boolean is to let the app know that the user is here for the first time
            }
            let {favorites} = cryptoDashData;
            return {favorites};
            
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
