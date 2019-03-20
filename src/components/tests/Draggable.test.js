import React from 'react';
import {mount, shallow} from './utils/EnzymeAdapter';
import Draggable from '../Draggable';
import {mouseUp, mouseMove} from './utils/MouseSimulator';

describe('Draggable Test', ()=> {
	it('load a Draggable in a particular position', () => {
		const wrapper = shallow(<Draggable x={0} y={10} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('Mouse move while not dragging', () => {
		const wrapper = mount(<Draggable x={0} y={10} />);

		mouseMove(10, 20);

		expect(wrapper.state().x).toBe(0);
		expect(wrapper.state().y).toBe(10);
		expect(wrapper.state().isDragging).toBeFalsy();
	});

	it('Drag and drop a draggable', () => {
		const onDragEnd = jest.fn();
		const wrapper = mount(<Draggable x={0} y={10} onDragEnd={onDragEnd} />);
		wrapper.simulate("mousedown", {clientX: 0, clientY: 10});
		mouseMove(10, 20);

		expect(wrapper.state().x).toBe(10);
		expect(wrapper.state().y).toBe(20);

		mouseMove(30, 40);

		expect(wrapper.state().x).toBe(30);
		expect(wrapper.state().y).toBe(40);

		mouseUp();

		expect(onDragEnd.mock.calls.length).toBe(1);
		expect(onDragEnd.mock.calls[0][0]).toEqual({x: 30, y: 40});
	});

	it('Special l&f when dragging', () => {

	});
});