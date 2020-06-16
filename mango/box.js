
import { Point } from "./math2d.js"

let pxToInt = function(stringPixels)
{
	let numString = stringPixels.substring(0, stringPixels.length - 2);
	return parseInt(numString);
};

/**
 * A class for encapsulating a rectagular two-dimensional area on the
 * screen space of a web page.
 * 
 * A Box has Top, Bottom, Left, and Right extents.  A valid box will have a left extent
 * that is less than or equal to the right extent, and a top extent that is less
 * than or equal to the bottom extent.
 */
export class Box
{
	/**
	 * Generates an invalid Box.
	 */
	constructor()
	{
		this._top = Number.MAX_VALUE;
		this._bottom = Number.MIN_VALUE;
		this._left = Number.MAX_VALUE;
		this._Right = Number.MIN_VALUE;
	}

	/**
	 * Returns true if the box is valid.
	 */
	get Valid()
	{
		return (this._top <= this._bottom && this._left <= this._right);
	}

	set Left(val)
	{
		this._left = val;
	}

	get Left()
	{
		return this._left;
	}

	set Right(val)
	{
		this._right = val;
	}

	get Right()
	{
		return this._right;
	}

	set Top(val)
	{
		this._top = val;
	}

	get Top()
	{
		return this._top;
	}

	set Bottom(val)
	{
		this._bottom = val;
	}

	get Bottom()
	{
		return this._bottom;
	}

	/**
	 * Gets the width of the box.  This will be non-negative even
	 * for an invalid box.
	 */
	get Width()
	{
		return Math.abs(this._right - this._left);
	}

	/**
	 * Gets the height of the box.  This will be non-negative even
	 * for an invalid box.
	 */
	get Height()
	{
		return Math.abs(this._bottom - this._top);
	}

	/**
	 * Gets the center point of the box.
	 */

	get Center()
	{
		return new Point(
			(this._left + this._right) / 2,
			(this._top + this._bottom) / 2
		);
	}

	translate(dx, dy)
	{
		this._left += dx;
		this._right += dx;

		this._top += dy;
		this._bottom += dy;
	}

	/**
	 * Sets the center point of the box by translating it, but keeping its current dimensions.
	 */
	set Center(pt)
	{
		let ctr = this.Center;
		this.translate(ctr.X - pt.X, ctr.Y -pt.Y);
	}

	/**
	 * Sets the top and bottom extents of the box ensuring that these extents
	 * are valid regardless of which parameter is greater.
	 * 
	 * @param { number } v1 
	 * @param { number } v2 
	 */
	setVerticalExtents(v1, v2)
	{
		if (v1 > v2)
		{
			this._top = v2;
			this._bottom = v1;
		}
		else
		{
			this._top = v1;
			this._bottom = v2;
		}
	}

	/**
	 * Sets the left and right extents of the box ensuring that these extents
	 * are valid regardless of which parameter is greater.
	 * 
	 * @param { number } v1 
	 * @param { number } v2 
	 */
	setHorizontalExtents(h1, h2)
	{
		if (h1 > h2)
		{
			this._left = h2;
			this._right = h1;
		}
		else
		{
			this._left = h1;
			this._right = h2;
		}
	}

	makeValid()
	{
		this.setVerticalExtents(this._bottom, this.top);
		this.setHorizontalExtents(this._left, this._right);
	}

	clone()
	{
		let ret = new Box();

		ret._left = this._left;
		ret._right = this._right;
		ret._top = this._top;
		ret._bottom = this._bottom;

		return ret;
	}

	/**
	 * Returns a box that contains both of the passed boxes.  If either box is not
	 * valid, the returned box will be a clone of the other.  If both are not valid,
	 * an invalid box will be returned.
	 * 
	 * @param { Box } box1 
	 * @param { Box } box2 
	 */
	static union(box1, box2)
	{
		let b1valid = box1.Valid;
		let b2valid = box2.Valid;

		if (b1valid && b2valid)
		{
			let ret = new Box();

			ret._left = Math.min(box1._left, box2._left);
			ret._right = Math.max(box1._right, box2._right);
			ret._top = Math.min(box1._top, box2._top);
			ret._bottom = Math.max(box1._bottom, box2._bottom);
		}
		else if (b1valid)
		{
			return box1.clone();
		}
		else if (b2valid)
		{
			return box2.clone();
		}
		else
		{
			return new Box();
		}
	}

	/**
	 * @returns
	 * An object containing boxes representing the element's boundaries
	 * at various levels of the box model relative to the document body.
	 * 
	 * @param { HTMLElement } elm 
	 */
	static elementBounds(elm)
	{
		let nativeRec = elm.getBoundingClientRect();

		let borderRect = new Box();
		borderRect.setVerticalExtents(nativeRec.top + window.scrollY, nativeRec.bottom + window.scrollY);
		borderRect.setHorizontalExtents(nativeRec.left + window.scrollX, nativeRec.right + window.scrollX);

		let Style = getComputedStyle(elm);
		
		let marginTop = pxToInt(Style.marginTop);
		let marginBottom = pxToInt(Style.marginBottom);
		let marginLeft = pxToInt(Style.marginLeft);
		let marginRight = pxToInt(Style.marginRight);

		let paddingTop = pxToInt(Style.paddingTop);
		let paddingBottom = pxToInt(Style.paddingBottom);
		let paddingLeft = pxToInt(Style.paddingLeft);
		let paddingRight = pxToInt(Style.paddingRight);

		let borderTop = pxToInt(Style.borderTopWidth);
		let borderBottom = pxToInt(Style.borderBottomWidth);
		let borderLeft = pxToInt(Style.borderLeftWidth);
		let borderRight = pxToInt(Style.borderRightWidth);

		let paddingRect = new Box();
		paddingRect.setHorizontalExtents(
			borderRect.Right - borderRight,
			borderRect.Left + borderLeft
		);
		paddingRect.setVerticalExtents(
			borderRect.Top + borderTop,
			borderRect.Bottom - borderBottom
		);

		let contentRect = new Box();
		contentRect.setHorizontalExtents(
			paddingRect.Left + paddingLeft,
			paddingRect.Right - paddingRight
		);
		contentRect.setVerticalExtents(
			paddingRect.Bottom - paddingBottom,
			paddingRect.Top + paddingTop
		);

		let marginRect = new Box();
		marginRect.setHorizontalExtents(
			borderRect.Left - marginLeft,
			borderRect.Right + marginRight
		);
		
		marginRect.setVerticalExtents(
			borderRect.Bottom + marginBottom,
			borderRect.Top - marginTop
		);

		return {
			Margin : marginRect,
			Border : borderRect,
			Padding : paddingRect,
			Content : contentRect
		};
	}

	/**
	 * @returns
	 *  A box representing the part of the document visible within the window.
	 */
	static visibleDocument()
	{
		let ret = new Box();
		ret.setVerticalExtents(window.scrollY, window.scrollY + window.innerHeight);
		ret.setHorizontalExtents(window.scrollX, window.scrollX + window.innerWidth);

		return ret;
	}

	/**
	 * @returns
	 *  A box representing the part of the document visible within the window.
	 */
	static window()
	{
		let ret = new Box();
		ret.setVerticalExtents(0, window.innerHeight);
		ret.setHorizontalExtents(0, window.innerWidth);

		return ret;
	}
}

Box.Content = 0;
Box.Padding = 1;
Box.Border = 2;
Box.Margin = 3;