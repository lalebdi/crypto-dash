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
                confirmFavorites: this.confirmFavorites,
                setFilteredCoins: this.setFilteredCoins,
                setCurrentFavorite: this.setCurrentFavorite
            }
        }

        componentDidMount = () => {
            this.fetchCoins();
            this.fetchPrices();
        }

        fetchCoins = async () => {
            let coinList =  (await cc.coinList()).Data; // await is waiting for the promise to resolve
            this.setState({coinList})
            // console.log(coinList);
        }
        
        fetchPrices = async () => {
            if(this.state.firstVisit) return;
            let prices = await this.prices();
            // console.log(prices);
            // Must filter the empty price objects.
            prices = prices.filter(price => Object.keys(price).length);
            this.setState({prices})
        }

        prices = async () => {
            let returnData = [];
            for(let i = 0; i< this.state.favorites.length; i++){
                try {
                    let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
                    returnData.push(priceData);
                } catch (e){
                    console.log('fetch price error: ', e)
                }
            }
            return returnData;
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
            let currentFavorite  = this.state.favorites[0];
            this.setState({
                firstVisit: false,
                page: 'dashboard',
                currentFavorite
            }, () => {
                this.fetchPrices();
            });
            localStorage.setItem('cryptoDash', JSON.stringify({
                favorites: this.state.favorites,
                currentFavorite
            }))
        }

        setCurrentFavorite = (sym) =>{
            this.setState({
                currentFavorite: sym
            });
            localStorage.setItem('cryptoDash', JSON.stringify({
                ...JSON.parse(localStorage.getItem('cryptoDash')),
                currentFavorite: sym
            }))
        }

        savedStettings(){
            let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
            if(!cryptoDashData){
                    return {page: 'settings', firstVisit: true} // the boolean is to let the app know that the user is here for the first time
            }
            let {favorites, currentFavorite} = cryptoDashData;
            return {favorites, currentFavorite};
            
        }

        setPage = page => this.setState({page})

        // the function below will give us the filtered coins. It will be called in the search input
        setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})

    render() {
        return (
            <AppContext.Provider value={this.state} >
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
