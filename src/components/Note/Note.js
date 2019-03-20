import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FaPen, FaTrash, FaRegSave} from 'react-icons/fa';
import './note.css';

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

	shouldComponentUpdate(nextProps, nextState){
		return (
			this.props.children !== nextProps.children || this.state !== nextState
		)
	}

	componentDidUpdate(){
		if(this.state.editing){
			const textArea = this._nexText;
			textArea.focus();
			textArea.select();
		}
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
					<textarea className="note__textarea" ref={ input => this._nexText = input} defaultValue={this.props.children}>
					</textarea>
					<div className="form__footer">
						<button className="note__button note__button--save"><FaRegSave /></button>
					</div>
				</form>
			</div>
		);
	}

	renderDisplay(){
		return (
			<div className="note">
				<p className="note__content">{this.props.children}</p>
				<span className="note__footer">
					<button className="note__button note__button--edit" onClick={this.edit}><FaPen  /></button>
					<button className="note__button note__button--remove" onClick={this.remove}><FaTrash /></button>
				</span>
			</div>
		);
	}

	render(){
		return this.state.editing ? this.renderForm() : this.renderDisplay();
	}
}

Note.propTypes = {
	index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	onChange: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	children: PropTypes.string
};

export default Note;