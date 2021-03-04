import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary.js';
import Burger from '../../Components/Burger/Burger.js';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls.js';
import Modal from '../../Components/UI/Modal/Modal.js';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary.js';
import Spinner from '../../Components/UI/Spinner/Spinner.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';
import axios from '../../axios-order.js';
import * as action from '../../store/actions/index.js';

export class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }//we can use state like this also

    state = {
        // purchasable: false,
        purchasing: false
    }
    //handlers

    componentDidMount() {
        // console.log(this.props);
        this.props.onInitIngredient()
    }

    updatePurchaseState(ingredient) {
        const sum = Object.keys(ingredient)
            .map(igKey => {
                return ingredient[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    modalHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    modalCloseHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }


    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        //result stroed in disabledInfo will be like:
        //salad : true, meat : false , etc
        let orderSummary = null;

        let burger = this.props.error ? <h3 style={{ textAlign: "center", color: "red" }}>Sorry Some Error Found<br />Sorry for the inconvenince!!</h3> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        isAuth={this.props.isAuthenticated}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price.toFixed(2)}
                        ordered={this.modalHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancel={this.modalCloseHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price.toFixed(2)}>
            </OrderSummary>
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.modalCloseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(action.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(action.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(action.initIngredients()),
        onInitPurchase: () => dispatch(action.puchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));