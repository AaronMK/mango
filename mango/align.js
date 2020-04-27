export class MangoAlign extends HTMLElement
{
	constructor()
	{
		super();

		this._built = false;
		this._valign = MangoAlign.VNone;
		this._halign = MangoAlign.HNone;
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
				this._valign = MangoAlign.Top;
			}
			else if (this.hasAttribute("middle"))
			{
				this._valign = MangoAlign.Middle;
			}
			else if (this.hasAttribute("bottom"))
			{
				this._valign = MangoAlign.Bottom;
			}

			/////////////////////////////////

			if (this.hasAttribute("left"))
			{
				this._halign = MangoAlign.Left;
			}
			else if (this.hasAttribute("center"))
			{
				this._halign = MangoAlign.Center;
			}
			else if (this.hasAttribute("right"))
			{
				this._halign = MangoAlign.Right;
			}

			this.append(this._container);
			this._built = true;

			this.Alignment = this._valign;
			this.Alignment = this._halign;
		}
	}

	set Alignment(val)
	{
		if (val >= MangoAlign.HNone && val <= MangoAlign.Right )
		{
			this._halign == val;
		}
		else if (val >= MangoAlign.VNone && val <= MangoAlign.Bottom)
		{
			this._valign = val;
		}
		else if (val == MangoAlign.None)
		{
			this._valign = MangoAlign.VNone;
			this._halign = MangoAlign.HNone;
		}

		if (this._built)
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
			else if (val == MangoAlign.HNone)
			{
				this._container.style.gridColumn = "1";
				this.style.gridTemplateColumns = "auto";
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
			else if (val == MangoAlign.VNone)
			{
				this.style.gridTemplateRows = "auto";
				this._container.style.gridRow = "1";
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
}

MangoAlign.None = 0;

MangoAlign.VNone = 1;
MangoAlign.Top = 2;
MangoAlign.Middle = 3;
MangoAlign.Bottom = 4;

MangoAlign.HNone = 5;
MangoAlign.Left = 6
MangoAlign.Center = 7;
MangoAlign.Right = 8;

customElements.define('mango-align', MangoAlign);
