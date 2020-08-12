import React from 'react';
import { AppContext } from '../App/AppProvider';

// the name is weather the settings page or the dashboard
export default function  Page({name, children}) {
    return (
        <AppContext.Consumer>
            {({page}) => {
                if (page !== name) {
                    return null;
                }
            return <div> {children} </div>
            }}
        </AppContext.Consumer>
    )
}

// the page in line 8 is from the state
