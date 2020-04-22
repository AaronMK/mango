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

			let ContainerElement = document.createElement('div');
			ContainerElement.style.height = "auto";
			ContainerElement.style.minHeight = "min-content";
			ContainerElement.style.width = "auto";
			ContainerElement.style.minWidth = "min-content";

			ContainerElement.append(...Children);

			this.style.display = "inline-grid";
			this.innerHTML = "";

			if (this.hasAttribute("top"))
			{
				this.style.gridTemplateRows = "auto 1fr";
				ContainerElement.style.gridRow = "1";
			}
			else if (this.hasAttribute("middle"))
			{
				this.style.gridTemplateRows = "1fr auto 1fr";
				ContainerElement.style.gridRow = "2";
			}
			else if (this.hasAttribute("bottom"))
			{
				this.style.gridTemplateRows = "1fr auto";
				ContainerElement.style.gridRow = "2";
			}
			else
			{
				this.style.gridTemplateRows = "auto";
				ContainerElement.style.gridRow = "1";
			}

			if (this.hasAttribute("left"))
			{
				this.style.gridTemplateColumns = "auto 1fr";
				ContainerElement.style.gridColumn = "1";
			}
			else if (this.hasAttribute("center"))
			{
				this.style.gridTemplateColumns = "1fr auto 1fr";
				ContainerElement.style.gridColumn = "2";
			}
			else if (this.hasAttribute("right"))
			{
				this.style.gridTemplateColumns = "1fr auto";
				ContainerElement.style.gridColumn = "2";
			}
			else
			{
				this.style.gridTemplateColumns = "auto";
				ContainerElement.style.gridColumn = "1";
			}

			this.append(ContainerElement);

			this._built = true;
		}
	}
}

customElements.define('mango-align', MangoAlign);
