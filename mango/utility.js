export class MangoUtility
{
	static randomChars(string_length)
	{
		const charset = "abcdefghijklmnopqrstuvwxyz";
		var text = "";
		
		for (var i = 0; i < string_length; i++)
			text += charset.charAt(Math.floor(Math.random() * charset.length));
		
		return text;
	}
}