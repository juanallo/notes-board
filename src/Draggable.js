import React from 'react';
import styled, { css } from 'styled-components';

export default class Draggable extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			isDragging: false,
			x: props.x  || 0,
			y: props.y || 0,
			originalX: 0,
			originalY: 0,
		};
	}

	componentWillUnmount() {
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('mouseup', this.handleMouseUp);
	}

	handleMouseDown = ({ clientX, clientY }) => {
		window.addEventListener('mousemove', this.handleMouseMove);
		window.addEventListener('mouseup', this.handleMouseUp);

		if (this.props.onDragStart) {
			this.props.onDragStart();
		}

		this.setState({
			originalX: clientX,
			originalY: clientY,
			isDragging: true
		});
	};

	handleMouseMove = ({ clientX, clientY }) => {
		const { isDragging } = this.state;

		if (!isDragging) {
			return;
		}

		this.setState(prevState => {
			const mouseDx = clientX - prevState.originalX;
			const mouseDy = clientY - prevState.originalY;

			return {
				x: this.props.x + mouseDx,
				y: this.props.y + mouseDy
			}
		});
	};

	handleMouseUp = () => {
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('mouseup', this.handleMouseUp);

		this.setState(
			{
				originalX: 0,
				originalY: 0,
				isDragging: false
			},
			() => {
				if (this.props.onDragEnd) {
					this.props.onDragEnd({x: this.state.x, y: this.state.y});
				}
			}
		);
	};

	render() {
		const { children } = this.props;
		const { x, y, isDragging } = this.state;

		return (
			<Container
				onMouseDown={this.handleMouseDown}
				x={x}
				y={y}
				isDragging={isDragging}>
				{children}
			</Container>
		);
	}
}

const Container = styled.div.attrs({
	style: ({ x, y }) => ({
		transform: `translate(${x}px, ${y}px)`,
		position: 'relative'
	}),
})`
  cursor: grab;
  
  ${({ isDragging }) =>
	isDragging && css`
    opacity: 0.8;
    cursor: grabbing;
  `};
`;