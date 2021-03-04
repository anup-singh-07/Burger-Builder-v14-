import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem.js';

const navigationItems = (props) => (
    <ul className = {classes.NavigationItems}>
        <NavigationItem link = '/' exact active = {true}>Burger Builder</NavigationItem>
        {props.isAuthenticated? <NavigationItem link = '/orders'>Orders</NavigationItem> : null}
        {!props.isAuthenticated
            ?<NavigationItem link = '/Auth'>Sign Up/ Sign In</NavigationItem>
            :<NavigationItem link = '/Logout'>Logout</NavigationItem>
        }
    </ul>
);

export default navigationItems;