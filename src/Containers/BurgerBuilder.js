import React, { Component } from 'react'
import Aux from '../hoc/Aux'
import Burger from '../Components/Burger/Burger'
import BurgerControls from '../Components/Burger/BuildControls'
import Modal from '../Components/UI/Modal'
import OrderSumary from '../Components/OrderSummary'


const INGREDIENT_PRICES = {
    Lechuga : 5,
    Queso : 10,
    Carne: 20,
    Bacon: 15,
}

class BurgerBuilder extends Component {
    state = {
        ingredients:{
            Lechuga:0,
            Bacon:0,
            Queso:0,
            Carne:0,
        },
        totalPrice: 4,
        purcharsable: false,
        purchasing: false,
    }

// i need to call this function in add and remove handlers and agree the updated state for 
// use more recently state
updatePurcharsState (ingredients) {

    const sum = Object.keys(ingredients)
                .map(ingKey =>{
                    return ingredients[ingKey];
                })
    let sumed = sum.reduce((sum, el)=>{
        return sum + el
    },0)

    this.setState({purcharsable: sumed > 0})
}

addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount +1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice:newPrice, ingredients: updatedIngredients });
    this.updatePurcharsState(updatedIngredients);
}


removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
        return;
    }
    const updatedCount = oldCount -1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount
    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubtraction;

    this.setState({ totalPrice:newPrice, ingredients: updatedIngredients });
    this.updatePurcharsState(updatedIngredients);
}

purchaseHandler = () => {
    this.setState({purchasing : true})
}

modalCloseHandler = () => {
    this.setState({purchasing : false})
}

purchaseCancelHandler = () => {
    this.setState({purchasing:false})
}

purchaseContinueHandler = () => {
    alert ('Estas comprando')
}

    render() {

        //i agree this for disable button when i don't have nothing to substract and
        //create new variable for using state and no modify that
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }



        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.modalCloseHandler}>
                    <OrderSumary 
                    ingredients={this.state.ingredients} 
                    continue={this.purchaseContinueHandler} 
                    cancel={this.purchaseCancelHandler} 
                    total={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                ingredientsAdd={this.addIngredientHandler}
                ingredientsRemove={this.removeIngredientHandler}
                disabled = {disabledInfo}
                purcharsable = {this.state.purcharsable}
                price = {this.state.totalPrice}
                ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}


export default BurgerBuilder;