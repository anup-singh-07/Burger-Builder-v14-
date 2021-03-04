import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient.js';
import classes from './Burger.css';

const burger = (props) =>{

    let transformedIngredient = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey])].map((_ , index) => {
               return <BurgerIngredient key = {igKey + index} type = {igKey} />
            });
        })
        .reduce((arr , el) => {
            return arr.concat(el) //reduce method  reduces the array to single value. learn more from net
        } , []);//for transforming Object into arrays
        //we used map because map executes function on each array elements
    //to display message when there is no ingrdients added
    // console.log(transformedIngredient)
    if(transformedIngredient.length === 0 ){
        transformedIngredient = <p>Please start adding ingredients!</p>
    }
    return (
        <div className = { classes.Burger }>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;