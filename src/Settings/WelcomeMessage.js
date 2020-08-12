import React from 'react';
import { AppContext } from '../App/AppProvider';

export default function WelcomeMessage({firstVisit}) {
    return (
        <AppContext.Consumer>
        {({firstVisit}) => 
        firstVisit? <div>
            Welcome to CryptoDash, Select your coins to begin. {' '}
        </div> : null }
        </AppContext.Consumer>
    )
}
