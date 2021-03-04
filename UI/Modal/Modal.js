import React , { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary.js';
import Backdrop from '../Backdrop/Backdrop.js';

class Modal extends Component {
    //to stop modal to re-render everytime we need to attach a hook so converted this in class based component
    shouldComponentUpdate(nextProps , nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    // componentDidUpdate() {
    //     console.log("[Modal] Did Update");
    // }

    render(){
        return (
            <Aux>
                <Backdrop 
                    show = {this.props.show}
                    clicked = {this.props.modalClosed}>
                </Backdrop>
                <div className = {classes.Modal}
                    style = {{
                        transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity : this.props.show ? '1' : '0'
                    }}>
                        {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
