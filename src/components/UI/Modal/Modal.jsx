import React, { Component } from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <Backdrop show={this.props.show} clickedBackdrop={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)', opacity: this.props.show ? '1' : '0'}}>
                    { this.props.children }    
                </div>
            </React.Fragment>
        );
    }
}
 
export default Modal;