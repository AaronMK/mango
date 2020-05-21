export class Point
{
	constructor(...args)
	{
		if (args.length == 2)
		{
			this._x = args[0];
			this._y = args[1];
		}
		else
		{
			this._x = 0;
			this._y = 0;
		};
	}

	get X()
	{
		return this._x;
	}

	set X(val)
	{
		this._x = val;
	}

	get Y()
	{
		return this._y;
	}

	set Y(val)
	{
		this._y = val;
	}
}