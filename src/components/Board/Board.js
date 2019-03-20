import React, {Component} from 'react';
import Note from '../Note/Note';
import Draggable from '../Draggable';
import ls from 'local-storage';
import './board.css';

export default class Board extends Component {

	constructor(props){
		super(props);

		this.state = {
			notes: []
		};

		this.add = this.add.bind(this);
		this.update = this.update.bind(this);
		this.remove = this.remove.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.eachNote = this.eachNote.bind(this);

		this.nextId = this.nextId.bind(this);
		this.randomBetween = this.randomBetween.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	componentDidMount() {
		const boardData = ls.get(this.props.boardName);
		if(boardData) {
			this.setState(boardData.state);
			this._nextId = boardData.nextId;
		}
	}

	componentDidUpdate(){
		ls.set(this.props.boardName, {state: this.state, nextId: this._nextId});
	}

	add(text){
		const id = this.nextId();

		const coordinates = {
			x: this.randomBetween(0, window.innerWidth - 150),
			y: this.randomBetween(0, window.innerHeight - 150)
		};

		this.setState(prevState => ({
			notes: [
				...prevState.notes,
				{
					id: id,
					note: text,
					coordinates: coordinates
				}
			]
		}))
	}

	randomBetween(x, y, s){
		return x + Math.ceil(Math.random() * (y - x));
	}

	nextId(){
		this._nextId = this._nextId || 0;
		return this._nextId++;
	}

	remove(id){
		this.setState(prevState => ({notes: prevState.notes.filter(note => note.id !== id)}))
	}

	clearAll(){
		this.setState({
			notes: []
		});
	}

	update(newText, id){
		this.setState(prevState => ({
			notes: prevState.notes.map(
				note => (note.id) !== id ? note : {...note, note: newText}
			)
		}));
	}

	eachNote(note){
		return (
			<Draggable key={note.id}
			           onDragEnd={this.onDragEnd.bind(this, note.id)}
			           {...note.coordinates}>
				<Note   index={note.id}
				        onChange={this.update}
				        onRemove={this.remove}>
					{note.note}
				</Note>
			</Draggable>
		);
	}

	onDragEnd(id, coordinates){
		this.setState(prevState => ({
			notes: prevState.notes.map(
				note => (note.id) !== id ? note : {...note, coordinates: coordinates}
			)
		}));
	}

	render(){
		return (
			<div className="board">
				<button id="add"
				        onClick={this.add.bind(null, 'New Note')}>Add</button>
				<button id="clear-all"
				        onClick={this.clearAll}>Clear</button>
				{this.state.notes.map(this.eachNote)}
			</div>
		);
	}
}