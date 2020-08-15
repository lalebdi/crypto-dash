import React from 'react';
import ReactHighcharts from 'react-highcharts';
import HighChartConfig from './HighChartConfig';
import { Tile } from '../Shared/Tile' ;
import { AppContext } from '../App/AppProvider';

export default function () {
    return (
        <AppContext.Consumer>
            {({}) => 
            <Tile>
                <ReactHighcharts config={HighChartConfig()} />
            </Tile>
            }
        </AppContext.Consumer>
    )
}
