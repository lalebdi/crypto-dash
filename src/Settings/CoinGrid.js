import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../App/AppProvider';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
display : grid;
grid-template-columns: repeat(5, 1fr);
grid-gap: 15px;
margin-top: 40px;
`
// the above will divide them into 5 columns stretched
// the grid-gap will put a gap between the rows and columns but not on the edges

function getCoinToDisplay(coinList, topSection){
    // Wanted to display 10 in the top section 
    return Object.keys(coinList).slice(0, topSection? 10 : 100);
}

export default function CoinGrid({topSection}) {
    return (
        <AppContext.Consumer>
            {({coinList}) => <CoinGridStyled>
                {getCoinToDisplay(coinList, topSection).map(coinKey => 
                    <CoinTile coinKey={coinKey} topSection={topSection} />)}
            </CoinGridStyled> }
        </AppContext.Consumer>
    )
}
