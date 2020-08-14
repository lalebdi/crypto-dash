import React from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';
import { AppContext } from '../App/AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
display: grid;
grid-template-columns: 200px 1fr;
`
const SearchInput= styled.input`
${backgroundColor2}
${fontSize2}
border: 1px solid;
height: 25px;
color: #1163c9;
place-self: center left;
`
// creating a debaounce function (compliments of lodash) to prevent firing off multiple searches with each input
// the second argument is the time
const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
    // console.log(inputValue);
    //  Getting all the coin symbols
    let coinSymbols = Object.keys(coinList);
    // Get all the coin name map symbol to name
    let coinNames = coinSymbols.map(sym => coinList[sym].CoinName)
    // compiling all the list we want to search
    let allStringsToSearch = coinSymbols.concat(coinNames); // so when the user searches BTC it will yield the same as bitcoin
    // console.log(allStringsToSearch);
    // will use fuzzy to do the search for us. the third argument is options 
    let fuzzyResults = fuzzy.filter(inputValue, allStringsToSearch, {}).map(result => result.string);
    console.log(fuzzyResults);
    // transferring the fuzzyResults into the coins using .map()
    // pickBy will pick from the object a list of keys from the callback function
    let filteredCoins = _.pickBy(coinList, (result, symKey) =>{
        let coinName = result.CoinName;
        return (_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName) )
    })
    // console.log(filteredCoins);
    setFilterCoins(filteredCoins)
}, 500)


function filterCoins(e, setFilteredCoins, coinList){
    let inputValue = e.target.value;
    // console.log(inputValue);
    // the if statement below is to rest the search if there's not input
    if(!inputValue){
        setFilteredCoins(null);
        return
    }
    handleFilter(inputValue, coinList, setFilteredCoins);
}

export default function Search() {
    return (
        <AppContext.Consumer>
            {({setFilteredCoins, coinList}) => 
        <SearchGrid>
            <h2>Searchall coins</h2>
            <SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)} />
        </SearchGrid>
        }
        </AppContext.Consumer>
    )
}
