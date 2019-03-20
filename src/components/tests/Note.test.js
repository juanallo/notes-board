import React from 'react';
import {mount, shallow} from './utils/EnzymeAdapter';
import Note from '../Note/Note';
import NotePageObject from "./utils/pageObject/NotePageObject";

describe('Note Test', () => {

	it('Note renders without failing', () =>{
		const wrapper = shallow(<Note index="test" onRemove={noOp} onChange={noOp}/>);
		const notePO = new NotePageObject(wrapper);
		expect(notePO.note()).toHaveLength(1);
		expect(notePO.note().text()).toMatch('');
		expect(notePO.isEditing()).toBeFalsy();
	});

	it('Load a Note with text', () => {
		const {notePO, text} = buildNoteWithText();
		expect(notePO.note().text()).toMatch(text);
	});

	it('Load a Note and edit', async () => {
		const {notePO, text} = buildNoteWithText(mount);
		notePO.edit();

		expect(notePO.note()).toHaveLength(0);
		expect(notePO.isEditing()).toBeTruthy();
		expect(notePO.noteEditor().text()).toMatch(text);
	});

	it('Save a note', ()=> {
		const {notePO, text, onChangeMock} = buildNoteWithText(mount);
		notePO.setState({editing: true});

		expect(notePO.isEditing()).toBeTruthy();
		expect(notePO.noteEditor().text()).toMatch(text);

		notePO.save();

		expect(onChangeMock.mock.calls.length).toBe(1);
		expect(onChangeMock.mock.calls[0][0]).toBe(text);

		expect(notePO.isEditing()).toBeFalsy();
		expect(notePO.note()).toHaveLength(1);
	});

	it('Load a Note and remove', () => {
		const {notePO, onRemoveMock} = buildNoteWithText();
		notePO.remove();
		expect(onRemoveMock.mock.calls.length).toBe(1);
	});

	function buildNoteWithText(enzymeFunction = shallow) {
		const text = 'Note content';
		const onChangeMock = jest.fn();
		const onRemoveMock = jest.fn();

		const wrapper = enzymeFunction(
			<Note index="test"
			      onChange={onChangeMock}
			      onRemove={onRemoveMock}
			>
				{text}
			</Note>
		);
		const notePO = new NotePageObject(wrapper);

		return {text, notePO, onChangeMock, onRemoveMock};
	}

	function noOp() {

	}
});