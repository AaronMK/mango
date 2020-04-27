export class MangoAlign extends HTMLElement
{
	constructor()
	{
		super();

		this._built = false;
	}

	connectedCallback()
	{
		if (!this._built)
		{
			let Children = [];
			for (let i = 0; i < this.childNodes.length; ++i)
				Children.push(this.childNodes[i]);

			this._container = document.createElement('div');
			this._container.style.height = "auto";
			this._container.style.minHeight = "min-content";
			this._container.style.width = "auto";
			this._container.style.minWidth = "min-content";

			this._container.append(...Children);

			this.style.display = "inline-grid";
			this.style.boxSizing = "border-box";
			this.style.margin = "0";

			this.innerHTML = "";

			if (this.hasAttribute("top"))
			{
				this.Align = MangoAlign.Top;
			}
			else if (this.hasAttribute("middle"))
			{
				this.Align = MangoAlign.Middle;
			}
			else if (this.hasAttribute("bottom"))
			{
				this.Align = MangoAlign.Bottom;
			}
			else
			{
				this.style.gridTemplateRows = "auto";
				this._container.style.gridRow = "1";
			}

			/////////////////////////////////

			if (this.hasAttribute("left"))
			{
				this.Align = MangoAlign.Left;
			}
			else if (this.hasAttribute("center"))
			{
				this.Align = MangoAlign.Center;
			}
			else if (this.hasAttribute("right"))
			{
				this.Align = MangoAlign.Right;
			}
			else
			{
				this.style.gridTemplateColumns = "auto";
				this._container.style.gridColumn = "1";
			}

			this.append(this._container);

			this._built = true;
		}
	}

	set Alignment(val)
	{
		if (val == MangoAlign.Left)
		{
			this._container.style.gridColumn = "1";
			this.style.gridTemplateColumns = "auto 1fr";
		}
		else if (val == MangoAlign.Center)
		{
			this._container.style.gridColumn = "2";
			this.style.gridTemplateColumns = "1fr auto 1fr";
		}
		else if (val == MangoAlign.Right)
		{
			this._container.style.gridColumn = "2";
			this.style.gridTemplateColumns = "1fr auto";
		}
		else if (val == MangoAlign.Top)
		{
			this._container.style.gridRow = "1";
			this.style.gridTemplateRows = "auto 1fr";
		}
		else if (val == MangoAlign.Middle)
		{
			this._container.style.gridRow = "2";
			this.style.gridTemplateRows = "1fr auto 1fr";
		}
		else if (val == MangoAlign.Bottom)
		{
			this._container.style.gridRow = "2";
			this.style.gridTemplateRows = "1fr auto";
		}
		else if (val == MangoAlign.None)
		{
			this.style.gridTemplateColumns = "auto";
			this.style.gridTemplateRows = "auto";

			this._container.style.gridColumn = "1";
			this._container.style.gridRow = "1";
		}
	}
}

MangoAlign.None = 0;

MangoAlign.Top = 1;
MangoAlign.Middle = 2;
MangoAlign.Bottom = 3;

MangoAlign.Left = 4;
MangoAlign.Center = 5;
MangoAlign.Right = 6;

customElements.define('mango-align', MangoAlign);
