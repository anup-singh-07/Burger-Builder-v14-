import React from 'react';
import Burger from '../../Burger/Burger.js';
import Button from '../../UI/Buttons/Buttons.js';

import classes from './CheckoutSummary.css';

const checkoutSummary = ( props ) => {
    return(
        <div className = {classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style = {{width : '100%', height : 'auto', margin : 'auto'}}>
                <Burger ingredients = {props.ingredients} />
            </div>
            <Button 
                btnType = "Danger"
                clicked = {props.checkoutCancelled}>Cancel</Button>
            <Button 
                btnType = "Success"
                clicked = {props.checkoutContinued}>Continue</Button>
        </div>
    )
}

export default checkoutSummary;