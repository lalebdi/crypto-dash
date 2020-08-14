import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
display : grid;
grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
grid-gap: 15px;
margin-top: 40px;
`
// the above will divide them into 5 columns stretched
// the grid-gap will put a gap between the rows and columns but not on the edges
function getLowerSectionCoins(coinList, filteredCoins){
    return (filteredCoins && Object.keys(filteredCoins)) ||
    Object.keys(coinList).slice(0, 100);
}


function getCoinsToDisplay(coinList, topSection, favorites, filterCoins){
    return topSection? favorites :  getLowerSectionCoins(coinList, filterCoins);
}

export default function CoinGrid({topSection}) {
    return (
        <AppContext.Consumer>
            {({coinList, favorites, filteredCoins}) => (
            <CoinGridStyled>
                {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(coinKey => 
                    <CoinTile key={coinKey} coinKey={coinKey} topSection={topSection} />
                    )}
            </CoinGridStyled>
            ) }
        </AppContext.Consumer>
    );
}
