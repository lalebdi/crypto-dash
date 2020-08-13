import React from 'react';
import styled from 'styled-components';

export const CoinHeaderGridStyled = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
`
// 2 columns for the name and the symbol

export const CoinSymbol = styled.div`
 justify-self: right;
`
// to float to the right

export default function CoinHeaderGrid({name, symbol}) {
    return (
        <CoinHeaderGridStyled>
            <div> {name} </div>
            <CoinSymbol> {symbol} </CoinSymbol>
        </CoinHeaderGridStyled>
    )
}
