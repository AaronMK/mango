import { MangoUtility } from "./utility.js"

export class MangoRadioOption extends HTMLInputElement
{
	constructor()
	{
		super();

		this.type = 'radio';
		this._initialized = false;
	}

	connectedCallback()
	{
		if (!this._initialized)
		{
			let groupName = this.getAttribute('name');
			let index = Number.parseInt(this.getAttribute('option-index'));
			let radioGroup = MangoRadioGroup._byName[groupName];

			radioGroup._elements[index] = this;

			if (index == radioGroup._selected_index)
				this.checked = true;

			this.addEventListener('change', MangoRadioGroup._set_index.bind(radioGroup, index));

			this._initialized = true;
		}
	}
}

customElements.define('mango-radio-option', MangoRadioOption, { extends : 'input' });

/**
 * The radio group is an object that can be used to automate the process
 * of creating radio buttons that have any legal javascript value associated
 * with them.  The radio group object tracks the selection of the radio inputs
 * it creates, and has a Selected property that can be used to get the
 * value of the radio button that is active, or to select the radio button
 * with that value in the group.
 */
export class MangoRadioGroup
{
	constructor()
	{
		this._name = MangoUtility.randomChars(15);
		this._selected_index = -1;

		this._options = [];
		this._elements = [];
		this._onchange = undefined;

		MangoRadioGroup._byName[this._name] = this;
	}

	_raiseChangeEvent()
	{
		let currSel = this.Selected;

		if (this._onchange)
			this._onchange(currSel);
	}

	/**
	 * @param {*} value
	 *   The value that should be used when the radio option is selected.
	 * 
	 * @param { string } elm_id
	 * 	An optional parameter to set the id of the created element.  If
	 *   omitted, a random id will be assigned.
	 * 
	 * @returns
	 *   An element object representing the radio button.
	 */
	genElement(value, elm_id)
	{
		let index = this._options.length;

		let elm = document.createElement('input');
		elm.name = this._name;
		elm.type = 'radio';
		elm.id = ( elm_id ) ? elm_id : MangoUtility.randomChars(8);

		this._elements.push(elm);
		this._options.push(value);

		elm.addEventListener('change', MangoRadioGroup._set_index.bind(this, index));

		if (index == 0)
		{
			elm.checked = true;
			this._selected_index = 0;
		}

		return elm;
	}

	/**
	 * Convenience function to generate both a radio option for the group
	 * and a matching label tag.
	 * 
	 * @param {*} value
	 *   The value that should be used when the radio option is selected.
	 * 
	 * @param { string } label_text
	 *   Text for the created label tag.
	 * 
	 * @param { string } elm_id
	 * 	An optional parameter to set the id of the created element. If
	 *   omitted, a random id will be assigned.
	 * 
	 * @returns
	 *  An array containing both the radio input and label elements. This
	 *  makes it easy to use as arguments to HTMLElement.append() calls.
	 */
	genElementAndLabel(value, label_text, elm_id)
	{
		let radio_elm = this.genElement(value, elm_id);

		let label_elm = document.createElement('label');
		label_elm.htmlFor = radio_elm.id;
		label_elm.innerHTML = label_text;

		return [radio_elm, label_elm];
	}

	/**
	 * This function is useful for creating selections inline in HTML text.  For example,
	 * when defining the innerHTML propertie of an element.  The element created is a
	 * subclass of HTMLInputElement.  Its connectedCallback() associates it with this
	 * radio group and makes necessary internal connections.
	 * 
	 * @param {*} value 
	 *   The value that should be used when the radio option is selected.
	 * 
	 * @param { string } elm_id
	 * 	An optional parameter to set the id of the created element.  If
	 *   omitted, a random id will be assigned.
	 * 
	 * @returns
	 *  Text defining the input element that can be added to HTML.
	 */
	genElementText(value, elm_id)
	{
		let index = this._options.length;
		let id = ( elm_id ) ? elm_id : MangoUtility.randomChars(8);

		this._elements.push(undefined);
		this._options.push(value);

		if (index == 0)
			this._selected_index = 0;

		let elmText = `<input is="mango-radio-option" option-index="${index}" name="${this._name}" id="${id}"></input>`;
		return elmText;
	}

	/**
	 * Convenience function to generate both a radio option for the group
	 * and a matching label tag.
	 * 
	 * @param {*} value
	 *   The value that should be used when the radio option is selected.
	 * 
	 * @param { string } label_text
	 *   Text for the created label tag.
	 * 
	 * @param { string } elm_id
	 * 	An optional parameter to set the id of the created element. If
	 *   omitted, a random id will be assigned.
	 * 
	 * @returns
	 *  Text defining the input element and label that can be added to HTML.
	 */
	genElementTextAndLabel(value, label_text, elm_id)
	{
		let id = ( elm_id ) ? elm_id : MangoUtility.randomChars(8);
		let label_elm = `<label for="${id}">${label_text}</label>`;

		return `${this.genElementText(value, id)}${label_elm}`;
	}

	get Selected()
	{
		if (this._selected_index <= -1)
			return undefined;
		
		return this._options[this._selected_index];
	}

	set Selected(val)
	{
		let index = this._options.findIndex( (element) => (val == element) );

		if (index > -1 && index != this.selectedIndex )
		{
			this._selected_index = index;
			this._elements[i].checked = true;

			_raiseChangeEvent();
		}
	}

	set onchange(handler)
	{
		this._onchange = handler;
	}
}

MangoRadioGroup._set_index = function(idx)
{
	this._selected_index = idx;
	this._raiseChangeEvent();
};

MangoRadioGroup._byName = new Object();