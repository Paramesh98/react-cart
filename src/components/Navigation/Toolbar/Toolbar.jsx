import React, { Component } from 'react';

import classes from './Toolbar.css';

class Toolbar extends Component {
    render() {
        return (
            <nav className={classes.Product_navbar}>
                <h1>Shopping Cart</h1>
                <div className={classes.Search}>
                    <input type="text" placeholder="Search by name" onChange={this.props.filterCloth.bind(this)}/>
                </div>
                <div className={classes.Cart_items}>
                    <p onClick={this.props.showCart}>Cart({this.props.totalQuantity})</p>
                </div>
            </nav>
        );
    }
};

export default Toolbar;