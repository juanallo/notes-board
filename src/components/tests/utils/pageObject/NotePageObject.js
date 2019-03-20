export default class NotePageObject {

	constructor(component){
		this._component = component;
		this.setState = this._component.setState.bind(this._component);
	}

	note(){
		return this._component.find('p');
	}

	noteEditor(){
		return this._component.find('textarea');
	}

	isEditing(){
		return !!this._component.find('.note__form').length;
	}

	edit(){
		this._component.find('.edit').simulate('click');
	}

	save(){
		this._component.find('.note__form').simulate('submit');
	}

	remove(){
		this._component.find('.remove').simulate('click');
	}
}