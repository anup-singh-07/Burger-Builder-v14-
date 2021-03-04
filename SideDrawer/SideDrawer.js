import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary.js';
import Backdrop from '../../UI/Backdrop/Backdrop.js';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if( props.openSideDrawer ){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show = {props.openSideDrawer} clicked = {props.closeSideDrawer}/>
            <div className = {attachedClasses.join(' ')} onClick = {props.closeSideDrawer}>
                <Logo height = "11%" marginBottom = "32px"/> 
                {/* we can desgin logo with 2 approaches
                    1. By passing props
                    2. By inbuilt style or use classes
                    will use both approach number 1 in SideDrawer.js and number 2 in Toolbar.js
             */ }
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;