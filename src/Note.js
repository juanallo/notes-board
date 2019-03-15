import React, {Component} from 'react';
import {FaPen, FaTrash} from 'react-icons/fa';

class Note extends Component {

	render(){
		return (
			<div className="note">
				<p>Learn React</p>
				<span>
					<button><FaPen id="edit" /></button>
					<button><FaTrash id="remove"/></button>
				</span>
			</div>
		);
	}
}

export default Note;