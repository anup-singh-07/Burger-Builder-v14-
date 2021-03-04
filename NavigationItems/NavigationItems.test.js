//https://jestjs.io/docs/en/getting-started.html
//jest documentation(get expect their)

//https://enzymejs.github.io/enzyme/docs/api/
//enzyme documentation(api reference)

//.test.js is important as it will be automatically get picked by the create-react-app
//when we will use the special command

//create the instance of Navigation Items. To render a unit part of the project we
//use enzyme

//shallow method is used to render the single component that we are testing. 
//It does not render child components

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems.js';
import NavigationItem from './NavigationItem/NavigationItem.js';

configure({ adapter: new Adapter() }) //with this enzyme get connected

describe('<Navigation Items />', () => {

    //to avoid writing same thing again and again we will use beforeEach() which
    //will run before every tests i.e., before every 'it'.
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })

    it('should render two  <Navigation Item /> if not authenticated', () => {
        // const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three  <Navigation Item /> if authenticated', () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated />);
        // wrapper = shallow(<NavigationItems isAuthenticated />) //OR
        wrapper.setProps({ isAuthenticated: true }) //setProps is method provided by enzyme
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should have a LOGOUT in between <NavigationItems />', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.contains(<NavigationItem link='/Logout'>Logout</NavigationItem>)).toEqual(true);
    });
});