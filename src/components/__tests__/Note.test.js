import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import Note from '../Note';

configure({adapter: new Adapter()});

describe('Note Test', () => {
	it('Note renders without failing', () =>{
		const wrapper = shallow(<Note index="test"/>);
		expect(wrapper.find('p')).toHaveLength(1);
		expect(wrapper.find('p').text()).toMatch('');
		expect(wrapper.find('textarea')).toHaveLength(0);
	});


	it('Load a Note with text', () => {
		const {wrapper, text} = buildNoteWithText();
		expect(wrapper.find('p').text()).toMatch(text);
	});

	it('Load a Note and edit', async () => {
		const {wrapper, text} = buildNoteWithText(mount);
		wrapper.find('.edit').simulate('click');

		expect(wrapper.find('p')).toHaveLength(0);
		expect(wrapper.find('textarea')).toHaveLength(1);
		expect(wrapper.find('textarea').text()).toMatch(text);
	});

	it('Save a note', ()=> {
		const {wrapper, text, onChangeMock} = buildNoteWithText(mount);
		wrapper.setState({editing: true});

		expect(wrapper.find('textarea')).toHaveLength(1);
		expect(wrapper.find('textarea').text()).toMatch(text);

		expect(wrapper.find('.note__form')).toHaveLength(1);
		wrapper.find('.note__form').simulate('submit');

		expect(onChangeMock.mock.calls.length).toBe(1);
		expect(onChangeMock.mock.calls[0][0]).toBe(text);

		expect(wrapper.find('textarea')).toHaveLength(0);
		expect(wrapper.find('p')).toHaveLength(1);
	});

	it('Load a Note and remove', () => {
		const {wrapper, onRemoveMock} = buildNoteWithText();
		wrapper.find('.remove').simulate('click');
		expect(onRemoveMock.mock.calls.length).toBe(1);
	});

	function buildNoteWithText(enzymeFunction = shallow) {
		const onChangeMock = jest.fn();
		const onRemoveMock = jest.fn();
		const text = 'Note content';
		const wrapper = enzymeFunction(<Note index="test" onChange={onChangeMock} onRemove={onRemoveMock}>{text}</Note>);
		return {text, wrapper, onChangeMock, onRemoveMock};
	}
});