import ErrorMessage, {Graph} from '../src/components/ErrorMessage';
import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

configure({adapter: new Adapter()});
const wrapper = shallow(<ErrorMessage  title={"Page not found"} content={<p>The requested page</p>} />);

describe('<ErrorMessage  title={"Page not found"} content={<p>The requested page</p>} />',()=>{
    describe('render()', () => {
        it('+++ render the DUMB component', () => {
            expect(wrapper.find('h1').text()).toBe('Page not found')
        });
        
    });
});