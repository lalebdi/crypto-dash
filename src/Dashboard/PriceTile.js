import React from 'react';
import styled, { css } from 'styled-components';
import { SelectableTile } from '../Shared/Tile';
import { fontSize3, fontSizeBig } from '../Shared/Styles';
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid';

const justifyRight = styled.div`
justify-self: right;
`
const justifyLeft = styled.div`
justify-self: left;
`

const TickerPrice = styled.div`
 ${fontSizeBig}
`
const ChangePct = styled.div`
 color: green;
 ${props => props.red && css`
    color:red;
`}
`

const numberFormat = number => {
    return +(number + '').slice(0, 7);
}

const PriceTileStyled = styled(SelectableTile)`
${props => props.compact && css`
display: grid;
${fontSize3}
grid-gap: 5px;
grid-template-columns: repeat(3, 1fr);
justify-items: right;
`}
`
function CHnagePercent ({data}){
    return(
        <justifyRight>
            <ChangePct red={data.CHANGEPCT24HOUR < 0}>
                    {numberFormat(data.CHANGEPCT24HOUR)}
            </ChangePct>
        </justifyRight>
    )
}

function PriceTile ({sym, data}){
    return(
        <PriceTileStyled>
            <CoinHeaderGridStyled>
                <div> {sym} </div>
                <CHnagePercent data= {data} />
            </CoinHeaderGridStyled>
            <TickerPrice>
                ${numberFormat(data.PRICE)}
            </TickerPrice>
        </PriceTileStyled>
    )
}


function PriceTileCompact({sym, data}){
    return(
        <PriceTileStyled compact>
                <justifyLeft> {sym} </justifyLeft>
                <CHnagePercent data= {data} />
            <div>
                ${numberFormat(data.PRICE)}
            </div>
        </PriceTileStyled>
    )
}

export default function ({price, index}) {
    let sym = Object.keys(price)[0];
    let data = price[sym]['USD'];
    let TileCLass = index < 5 ? PriceTile : PriceTileCompact;
    return (
        <TileCLass sym={sym} data={data}>
            {/* {sym} {data.PRICE} */}
        </TileCLass>
    )
}
