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
		const wrapper = mount(<Board boardName="test" />);
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
		ls.set('test', {"state":{"notes":[{"id":0,"note":"New Note","coordinates":{"x":1740,"y":238}},{"id":4,"note":"New Note","coordinates":{"x":1544,"y":510}}]}});

		const wrapper = mount(<Board boardName="test"/>);

		expect(wrapper.find('.note')).toHaveLength(2);
	});

	it('Remove a note', () => {
		const wrapper = mountBoardWith2Notes();

		wrapper.instance().remove(0);

		expect(wrapper.state().notes).toHaveLength(1);
		expect(wrapper.state().notes[0].id).toBe(4);
	});

	it('update a note', () => {
		const newText = 'changing note text';
		const wrapper = mountBoardWith2Notes();

		wrapper.instance().update(newText, 0);
		expect(wrapper.state().notes[0].note).toEqual(newText);
	});

	it('Drag a note', () => {
		const wrapper = mountBoardWith2Notes();

		wrapper.instance().onDragEnd(0, {x:0, y:0});
		expect(wrapper.state().notes[0].coordinates.x).toBe(0);
		expect(wrapper.state().notes[0].coordinates.y).toBe(0);
	});

	function mountBoardWith2Notes() {
		ls.set('test', {
			"state": {
				"notes": [{
					"id": 0,
					"note": "New Note",
					"coordinates": {"x": 1740, "y": 238}
				}, {"id": 4, "note": "New Note", "coordinates": {"x": 1544, "y": 510}}]
			}
		});

		const wrapper = mount(<Board boardName="test"/>);
		return wrapper;
	};
});