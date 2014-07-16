# CreateDOM - $C()

#### Create DOM Stuctures Easily

__$C()__ is a function that provides a much easier alternative to W3C DOM's _createElement_ function.
You can create DOM sturctures very easily with it.
Everyone who have tried their hand at creating a DOM structure using the W3C method knows that it is not easy.
It is a piece of cake using _innerHTML_.
But when we try it using W3C methods like _document.createElement_, we will find that it takes ten times more time.
So I have created a small function(>50 lines) to do this in a much easier way.

## Example

```javascript
$C({
	div:{
		'class':'newly-added',//Class must be quoted - its a keyword
		code:'This is a code',
		br:'',
		a:{
			href:'http://www.bin-co.com/',
			text:'This is a link'
		},
		hr:'',
		span:{
			'class':'finally',
			text:'Thats all folks.'
		}
	}
},"insert-here");
```

## Problems

You can't use the same tag twice inside an element. I am using a associative array, so the index will be overwritten. This is very troubling if you want to create a list. I have solved this problem - use a list(numerical array in such cases). An example is given below...

### Problem Code

```javascript
$C({ul:{
	li:"First Item",
	li:"Second Item",
	li:"Third  Item",
}},"insert-here");
```

### Solution

```javascript
$C({ul:[
	{li:"First Item"},
	{li:"Second Item"},
	{li:"Third  Item"},
]},"insert-here");
```

## Script Homepage/Origin

[CreateDOM - $C()](http://www.openjs.com/scripts/createdom/)

## Author

[Binny V Abraham](http://binnyva.com/me/)

## License

[BSD License](http://www.openjs.com/license.php)
