import * as actionTypes from './actionTypes.js';
import axios from '../../axios-order.js';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = ( ingredients ) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchingIngredientsFailed = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-82a5d.firebaseio.com/ingredients.json')
            .then( response => {
                dispatch(setIngredients(response.data))
                // console.log(response.data)
            })
            .catch( error => {
                dispatch(fetchingIngredientsFailed())
            })
    }
}