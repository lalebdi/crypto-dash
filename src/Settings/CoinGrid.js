import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { SelectableTile } from '../Shared/Tile';

export const CoinGridStyled = styled.div`
display : grid;
grid-template-columns: repeat(5, 1fr);
grid-gap: 15px;
`
// the above will divide them into 5 columns stretched
// the grid-gap will put a gap between the rows and columns but not on the edges
export default function CoinGrid() {
    return (
        <AppContext.Consumer>
            {({coinList}) => <CoinGridStyled>
                {Object.keys(coinList).map(coinKey => 
                    <SelectableTile> {coinKey} </SelectableTile>)}
            </CoinGridStyled> }
        </AppContext.Consumer>
    )
}
