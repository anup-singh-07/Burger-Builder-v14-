import React , { Component } from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary.js';
import Buttons from '../../UI/Buttons/Buttons.js';

//This can be a function based component, no need to be class based component
class OrderSummary extends Component {

    // componentDidUpdate() {
    //     console.log("[Order Summary] Updated");
    // }
    //order summary updates every time but we don't need that so will do changes in modal so that it
    //gets updated only when it is neccessary
    render(){
        const ingrdientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return ( 
            <li key = {igKey}>
                <span style = {{textTransform : 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
            </li>)
        })
        return(
            <Aux>
                <h3>Your Order:</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingrdientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price}</strong></p>
                <p>Continue to checkout?</p>
                <Buttons btnType = "Danger" clicked = {this.props.purchaseCancel}>Cancel</Buttons>
                <Buttons btnType = "Success" clicked = {this.props.purchaseContinue}>Continue</Buttons>
            </Aux>
        );
    }
}

export default OrderSummary;