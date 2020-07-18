import React, { Component } from 'react';

import Toolbar from './components/Navigation/Toolbar/Toolbar';
import Cloths from './components/Cloths/Cloths';
import Modal from './components/UI/Modal/Modal';
import OrderSummery from './components/OrderSummery/OrderSummery';

class App extends Component {
  state = {
    cloths: [],
    cart: [],
    clothItems: [
      { id: 1, title: "Winter Jacket", imgUrl: "jacket-1.jpg", price: "2.58", bool: false },
      { id: 2, title: "Men Designer Jacket", imgUrl: "jacket-2.jpg", price: "2.98", bool: false },
      { id: 3, title: "NEW MENS CROSSHATCH JACKET", imgUrl: "jacket-4.jpg", price: "5.98", bool: false },
      { id: 4, title: "Cotton Plain Shirt For Men", imgUrl: "shirt-1.jpg", price: "3.58", bool: false },
      { id: 5, title: "Ultrathin Soft Shirts Mens", imgUrl: "shirt-2.jpg", price: "2.08", bool: false },
      { id: 6, title: "Autumn 2017 Fashion Brand Cotton", imgUrl: "autumn-2017-fashion-brand-cotton.jpg", price: "2.08", bool: false }
    ],
    qu: 0,
    showCart: false,
    price: 0
  }

  addToCartHandler = (cloth) => {
    let matchClothIndex = this.state.cart.findIndex(item => {
      return item.id === cloth.id
    });

    if(matchClothIndex > -1) {
      let cart = this.state.cart;
      cart[matchClothIndex].qty++;
      this.setState({ cart });
    } 
    else {
      cloth.qty = 1;
      let cart = this.state.cart;
      cart.push(cloth);
      this.setState({ cart });
    }

    localStorage.setItem('cart', JSON.stringify(this.state.cart));
    
    let cart = this.state.cart;
    let quantity = cart.reduce((total, cloth) => {
      return total + cloth.qty
    }, 0);

    this.setState({ quantity });
    this.totalItems();
    this.totalPriceHandler();
    cloth.bool = true;
    setTimeout(() => {
      let cloths = this.state.cloths.slice();
      let matchingClothIndex = cloths.findIndex(i => i.id === cloth.id);
      cloths[matchingClothIndex].bool = false;
      this.setState({ cloths })
    }, 1000);
  }

  removeFromCartHandler = (cloth) => {

    const matchingClothIndex = this.state.cart.findIndex((item) => {
      return item.id === cloth.id;
    });

    if (this.state.cart[matchingClothIndex].qty <= 1) {
      let cart = this.state.cart;
      cart.splice(matchingClothIndex, 1)
      this.setState({ cart })
    } 
    else {
      let cart = this.state.cart;
      cart[matchingClothIndex].qty--;
      this.setState({ cart })
    }

    localStorage.setItem('cart', JSON.stringify(this.state.cart));
    let quantity =  this.state.cart.reduce((total, cloth) => {
        return total - cloth.qty;
    }, 0);
    this.setState({ quantity })
    this.getTotalQuantity();
    this.totalPriceHandler();
    if( this.state.quantity < 0 ) {
      let quantity = this.state.quantity;
      quantity *= -1;
      this.setState({ quantity })
      this.getTotalQuantity();
      this.totalPriceHandler();
    }
  }

  totalItems() {
    let t_items = this.state.cart.reduce((total, product) => {
      return total + product.qty;
    }, 0);
    this.setState({ quantity: t_items });
  }

  getTotalQuantity() {
    let cart = [];
    if( localStorage && localStorage.getItem('cart') ) {
      cart = JSON.parse(localStorage.getItem('cart'));
      this.setState({ cart })
    } else {
        let cart = [];
        this.setState({ cart })
    }
    let quantity =  cart.reduce((total, product) => {
          return total + product.qty;
    }, 0);
    this.setState({ quantity });
  }

  showCartHandler = () => {
    this.setState({
      showCart: true
    });
  }

  closedCart = () => {
    this.setState({
      showCart: false
    })
  }

  totalPriceHandler = () => {
    let cart = [];
    if( localStorage && localStorage.getItem('cart') ) {
      cart = JSON.parse(localStorage.getItem('cart'));
      this.setState({ cart })
    } else {
        let cart = [];
        this.setState({ cart })
    }
    let price =  cart.reduce((total, product) => {
      return (total + product.qty * product.price);
    }, 0);
    this.setState({ price });
  }

  filterClothHandle = event => {
    let updatedClothItems = this.state.clothItems
    updatedClothItems = updatedClothItems.filter((c) => {
      return c.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1
    });
    this.setState({cloths: updatedClothItems});
  }

  handleContinue = () => {
    alert("Nothing will happen now. Sorry!")
  }

  componentDidMount() {
    this.setState({
      cloths: this.state.clothItems
    })
    this.getTotalQuantity();
    this.totalPriceHandler();
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showCart} modalClosed={this.closedCart}>
          <OrderSummery 
            cart={this.state.cart} 
            totalQuantity={this.state.quantity} 
            totalPrice={this.state.price} 
            modalClosed={this.closedCart}
            addToCart={this.addToCartHandler}
            removeCloth={this.removeFromCartHandler}
            continue={this.handleContinue} />
        </Modal>
        <Toolbar 
          totalQuantity={this.state.quantity} 
          showCart={this.showCartHandler}
          filterCloth={this.filterClothHandle}/>
        <Cloths 
          cloths={this.state.cloths}
          addToCart={this.addToCartHandler}></Cloths>
      </div>
    );
  }
}

export default App;
