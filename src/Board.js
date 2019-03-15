import React, {Component} from 'react';
import Note from './Note';


export default class Board extends Component {

	constructor(props){
		super(props);

		this.state = {
			notes: []
		};
		this.eachNote = this.eachNote.bind(this);
		this.update = this.update.bind(this);
		this.remove = this.remove.bind(this);
		this.add = this.add.bind(this);
	}

	eachNote(note, i){
		return (
			<Note   key={i}
			        index={i}
					onChange={this.update}
					onRemove={this.remove}>
				{note.note}
			</Note>
		);
	}

	add(text){
		this.setState(prevState => ({
			notes: [
				...prevState.notes,
				{
					id: prevState.notes.length,
					note: text
				}
			]
		}))
	}

	remove(id){
		this.setState(prevState => ({notes: prevState.notes.filter(note => note.id !== id)}))
	}

	update(newText, id){
		this.setState(prevState => ({
			notes: prevState.notes.map(
				note => (note.id) !== id ? note : {...note, note: newText}
			)
		}));
	}

	render(){
		return (
			<div className="board">
				<button id="add"
				        onClick={this.add.bind(null, 'New Note')}>Add</button>

				{this.state.notes.map(this.eachNote)}
			</div>
		);
	}
}