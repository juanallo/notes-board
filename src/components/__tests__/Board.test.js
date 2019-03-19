import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import Board from '../Board';
import ls from 'local-storage'

configure({adapter: new Adapter()});

describe('Board Test', () => {
	afterEach(()=>{
		ls.clear();
	});

	it('load an empty board', () => {
		const wrapper = mount(<Board />);
		expect(wrapper.find('.note')).toHaveLength(0);
	});

	it('Add a note', () => {
		const wrapper = mount(<Board />);
		expect(wrapper.find('.note')).toHaveLength(0);

		wrapper.find('#add').simulate('click');

		expect(wrapper.find('.note')).toHaveLength(1);
	});

	it('clear all notes', () => {
		const wrapper = mount(<Board />);
		wrapper.setState({notes: [{id: 1, note: 'text', coordinates: {}}]});
		expect(wrapper.find('.note')).toHaveLength(1);

		wrapper.find('#clear-all').simulate('click');
		expect(wrapper.find('.note')).toHaveLength(0);
	});

	it('Load a board from Local Storage', () => {

	});
});