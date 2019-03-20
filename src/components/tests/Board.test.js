import React from 'react';
import {mount} from './utils/EnzymeAdapter';
import Board from '../Board/Board';
import ls from 'local-storage'
import BoardPageObject from "./utils/pageObject/BoardPageObject";

describe('Board Test', () => {
	afterEach(() => {
		ls.clear();
	});

	it('load an empty board', () => {
		const boardPO = new BoardPageObject(mount(<Board boardName="test"/>));
		expect(boardPO.notes()).toHaveLength(0);
	});

	it('Add a note', () => {
		const boardPO = new BoardPageObject(mount(<Board boardName="test"/>));
		expect(boardPO.notes()).toHaveLength(0);
		boardPO.add();
		expect(boardPO.notes()).toHaveLength(1);
	});

	it('clear all notes', () => {
		const boardPO = new BoardPageObject(mount(<Board boardName="test"/>));
		boardPO.setState({notes: [{id: 1, note: 'text', coordinates: {}}]});

		expect(boardPO.notes()).toHaveLength(1);
		boardPO.clearAll();
		expect(boardPO.notes()).toHaveLength(0);
	});

	it('Load a board from Local Storage', () => {
		const boardPO = new BoardPageObject(mountBoardWith2Notes());
		expect(boardPO.notes()).toHaveLength(2);
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
		wrapper.instance().onDragEnd(0, {x: 0, y: 0});
		expect(wrapper.state().notes[0].coordinates.x).toBe(0);
		expect(wrapper.state().notes[0].coordinates.y).toBe(0);
	});

	function mountBoardWith2Notes() {
		ls.set('test', {
						"state": {
							"notes": [{
								"id": 0,
								"note": "New Note",
								"coordinates": {
									"x": 1740,
									"y": 238
									}
								},
								{
									"id": 4,
									"note": "New Note",
									"coordinates": {
										"x": 1544,
										"y": 510
									}
								}]
						}}
			);

		return mount(<Board boardName="test"/>);
	}
});