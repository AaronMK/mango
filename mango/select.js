export class MangoSelect extends HTMLElement
{
	constructor()
	{
		super();

		this.style.display = "inline-grid";

		this._Options = [];
		this._onChange = undefined;
		this._elmSelect = document.createElement('select');
		this._elmSelect.style.cssText = "grid-row: 1; grid-column: 1;";

		this.append(this._elmSelect);

		this._elmSelect.onchange = this._RaiseChangeEvent.bind(this);
	}

	_RaiseChangeEvent(origEvt)
	{
		let currSel = this.Value;

		if (this._onChange)
			this._onChange(currSel);

		var event = new CustomEvent(
			"change",
			{
				detail: currSel
			}
		);

		this.dispatchEvent(event);

		if ( origEvt )
			origEvt.stopPropagation();
	}

	connectedCallback()
	{
	}

	/**
	 * Adds an option to the select element.
	 * 
	 * @param {*} text 
	 *   The text to show for the option.
	 * 
	 * @param {*} value 
	 *   The value to associate for the option.
	 */
	addOption(text, value)
	{
		let send_change = ( this._Options.length == 0);

		let elm_option = document.createElement('option');
		elm_option.text = text;

		this._Options.push(value);
		this._elmSelect.add(elm_option, this._Options.length - 1);

		if ( send_change )
			this._RaiseChangeEvent();
	}

	/**
	 * Adds options by using the properties in the passed object to add options
	 * to the select.  The property names will be added as the text for the option
	 * and the values for the property will be the associated value.
	 * 
	 * @param { object } obj
	 */
	addOptions(obj)
	{
		let names = Object.getOwnPropertyNames(obj);

		for(let i = 0; i < names.length; ++i)
			this.addOption(names[i], obj[names[i]]);
	}

	/**
	 * Gets the value of the current selection.
	 */
	get Value()
	{
		return this._Options[this._elmSelect.selectedIndex];
	}

	/**
	 * Sets the currently selected value, or throws an exception if none of the
	 * options represent that value. This does NOT look at the text of the options.
	 */
	set Value(val)
	{
		if (val == this.Value)
			return;

		for(let i = 0; i < this._Options.length; ++i)
		{
			if (this._Options[i] == val)
			{
				this._elmSelect.selectedIndex = i;
				this._RaiseChangeEvent();

				return;
			}
		}

		throw new Error("Value not found.");
	}

	/**
	 * Sets the change handler.  Changes in the selection will cause the handler to
	 * be called with the new value as its single argument.
	 */
	set onchange(func)
	{
		this._onChange = func;
	}
}

customElements.define('mango-select', MangoSelect);