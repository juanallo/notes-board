import React, {Component} from 'react';
import {FaPen, FaTrash, FaRegSave} from 'react-icons/fa';

class Note extends Component {

	constructor(props){
		super(props);

		this.state = {
			editing: false
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

	save(e){
		e.preventDefault();
		this.props.onChange(this._nexText.value, this.props.index);
		this.setState({
			editing: false
		});
	}

	remove(){
		this.props.onRemove(this.props.index);
	}

	renderForm() {
		return (
			<div className="note">
				<form className="note__form" onSubmit={this.save}>
					<textarea ref={ input => this._nexText = input}>
						{this.props.children}
					</textarea>
					<div className="form__footer">
						<button id="save"><FaRegSave /></button>
					</div>
				</form>
			</div>
		);
	}

	renderDisplay(){
		return (
			<div className="note">
				<p>{this.props.children}</p>
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