import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import Draggable from '../Draggable';

configure({adapter: new Adapter()});


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

function mouseMove(x, y) {
	const evt = document.createEvent('MouseEvents');
	evt.initMouseEvent("mousemove", true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, null);
	document.dispatchEvent(evt);
	return evt;
}

function mouseUp(){
	const evt = document.createEvent('MouseEvents');
	evt.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	document.dispatchEvent(evt);
}