import React, { Component } from 'react';

import classes from './Cloth.css';

class Cloth extends Component {
    getImage = (path) => {
        return require('../../../assets/images/'+path);
    }
    render() {
        return (
            <div className={classes.Cloth_card}>
                <div className={classes.Cloth_image}>
                    <img src={this.getImage(this.props.item.imgUrl)} alt=""/>
                </div>
                <div className={classes.Cloth_info}>
                    <h3>{this.props.item.title}</h3>
                    <h6>${this.props.item.price}</h6>
                    {!this.props.item.bool ?  
                        <button 
                            className={classes.Add_to_cart_btn}
                            onClick={() => this.props.addClothToCart(this.props.item)}>Add to Cart</button> :
                            <button className={classes.Added_to_card_btn}>Added</button>}
                </div>
            </div>
        )
    }
};

export default Cloth;