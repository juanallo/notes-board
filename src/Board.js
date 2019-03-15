import React, {Component} from 'react';
import Note from './Note';


export default class Board extends Component {

	constructor(props){
		super(props);

		this.state = {
			notes: [
				{
					id: 0,
					note: 'Creating Boards'
				},
				{
					id: 1,
					note: 'Another Note'
				}
			]
		};
		this.eachNote = this.eachNote.bind(this);
		this.update = this.update.bind(this);
		this.remove = this.remove.bind(this);
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
				{this.state.notes.map(this.eachNote)}
			</div>
		);
	}
}