import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

export {mount, shallow};