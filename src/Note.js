import React, {Component} from 'react';
import {FaPen, FaTrash, FaRegSave} from 'react-icons/fa';

class Note extends Component {

	constructor({text='Learn React'}){
		super({text});

		this.state = {
			editing: false,
			text: text
		};

		this.remove = this.remove.bind(this);
		this.edit = this.edit.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.renderDisplay = this.renderDisplay.bind(this);
		this.save = this.save.bind(this);
	}

	edit(){
		this.setState({
			editing: true
		})
	}

	save(){
		this.setState({
			editing: false,
			text: this._nexText.value
		});
	}

	remove(){
		alert('Remove');
	}

	renderForm() {
		return (
			<div className="note">
				<form className="note__form">
					<textarea ref={ input => this._nexText = input} defaultValue={this.state.text}/>
					<div className="form__footer">
						<button id="save" onClick={this.save}><FaRegSave /></button>
					</div>
				</form>
			</div>
		);
	}

	renderDisplay(){
		return (
			<div className="note">
				<p>{this.state.text}</p>
				<span>
					<button id="edit" onClick={this.edit}><FaPen  /></button>
					<button id="remove" onClick={this.remove}><FaTrash /></button>
				</span>
			</div>
		);
	}

	render(){
		return this.state.editing ? this.renderForm() : this.renderDisplay();
	}
}

export default Note;