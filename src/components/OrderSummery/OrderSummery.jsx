import React, { Component } from 'react';

import classes from './OrderSummery.css';

class OrderSummery extends Component {
    componentWillUpdate() { // every time if the parent is updated this component is re-render
        console.log("Order summery component will update")
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.cart !== this.props.cart ||
               nextProps.totalQuantity !== this.props.totalQuantity ||
               nextProps.totalPrice !== this.props.totalPrice ||
               nextProps.continue !== this.props.continue ||
               nextProps.modalClosed !== this.props.modalClosed;
    }
    render() {
        return (
            <div>
                <p>THIS IS THE ORDER SUMMERY</p>
                <hr/>
                <ul>
                    { this.props.cart.length === 0 ? <p>Cart is empty now, please enter something :( </p> : 
                        this.props.cart.map((c, i) => {
                            return <li key={i}>{c.title} - Quantity: {c.qty} <button onClick={() => this.props.addToCart(c)}>+</button> <button onClick={() => this.props.removeCloth(c)}>-</button></li>
                        })
                    }
                    
                </ul>
                <p>Total Item: <strong>{this.props.totalQuantity}</strong></p>
                <p>Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong></p>
                <div>
                    <button className={`${classes.Button} ${classes.Button_continue}`} onClick={this.props.continue}>Continue</button>
                    <button className={`${classes.Button} ${classes.Button_cancel}`} onClick={this.props.modalClosed}>Cancel</button>
                </div>
            </div>
        );
    }
};

export default OrderSummery;