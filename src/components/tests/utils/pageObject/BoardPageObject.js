
export default class BoardPageObject {

	constructor(component){
		this._component = component;
		this.setState = this._component.setState.bind(this._component);
	}

	notes(){
		return this._component.find('.note');
	}

	add(){
		this._component.find('.board__button--add').simulate('click');
	}

	clearAll(){
		this._component.find('.board__button--clear').simulate('click');
	}
}