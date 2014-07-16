# CreateDOM - $C()

#### Create DOM Stuctures Easily

__$C()__ is a function that provides a much easier alternative to W3C DOM's _createElement_ function.

__$C()__ is light-weight and turns the process of constructing DOM structures into one that is easy and intuitive.

## Features

  * enables the declaration of an entire DOM tree into a single data structure.
  * this data structure consists of a plain object with key/value pairs.
    a key can either represent:
      * an html tag
      * a text node
  * when the key represents an html tag, then the value can contain:
	  *	falsy - when the tag has no attributes or children
	  * a nested plain object with key/value pairs.
        a key can either represent:
          * a boolean "condition", to indicate whether this tag should be ignored
          * a text node
          * a nested child html tag
          * otherwise: an html attribute
      * a string - to add a child text node.
        this is short-hand notation for: {"text": value}

## Notes

  * when a "condition" attribute is used, it's much more efficient to always include it as the first attribute.
    doing so prevents the creation of nested/child DOM nodes,
    belonging to other attributes that were processed before reaching the "condition",
    which would only be discarded when the condition evaluates to false.

## Issue/Workaround

  * the process of mapping a DOM tree into an object representation results in a problem.
    * a DOM node can contain multiple child nodes of the same type

      > ex: `<node><div class="foo"></div><div class="bar"></div></node>`
    * a hash table (javascript object) can only contain one value for each unique key

     > ex: `{"div":{"class":"foo"},"div":{"class":"bar"}}`

     > => this hash table only has one key and, consequently, only one value; the other is lost.

  * to work around this issue, there are two options:
    1. (my preference) is to:
        * make keys unique by appending an underscore ("_") and any (unsigned) integer you like

          > ex: `{"div_1":{"class":"foo"},"div_2":{"class":"bar"}}`
        * the script simply removes this trailing pattern from all keys before processing them
    2. (legacy) is to:
        * replace an object with an array
        * wrap each object attribute into a new object (having only a single attribute),
          and pushing this object into the array

## Example #01

```javascript
$C({
	"span" : {
		"condition"		: (name !== null),
		"class"			: "name_wrapper",
		"span"			: {
			"class"		: "name",
			"span"		: {
				"class"	: "expand_button"
			},
			"text"		: name
		},
		"text"			: " : "
	},
	"div" : {
		"class"			: "value",
		"b_1"			: sym[0],
		"ul"			: {
			"class"		: "children"
		},
		"b_2"			: sym[1],
		"text"			: {
			"condition"	: (!is_last),
			"text"		: ","
		}
	}
},parent_element,document);
```

things to note:

  * the resulting DOM tree is going to look like:

```AsciiDoc
parent_element
  span.name_wrapper
    span.name
      span.expand_button
      textnode
    textnode
  div.value
    b
      textnode
    ul.children
    b
      textnode
    textnode
```
        
  * use of "condition" by:
    * `parent_element > span.name_wrapper`
    * `parent_element > div.value > textnode:last-child`

    each of these nodes passes a boolean value that dynamically determines whether or not these nodes (and any trees that may root from these nodes) are created.

  * the creation of two `<b>` within:
    * `parent_element > div.value`

    this is done using the methodology of appending `_\d+`

  * the textnodes contained within each of the `<b>` nodes are created implicitely,
    simply by passing the text as the value.

  * __parent_element__ can be passed as either:
    * a string that contains the id of a DOM node

      > ex: 'foobar'
    * a DOM Element

      > ex: `document.getElementById('foobar')`
      * when passed in this way, it doesn't matter if the DOM element is currently attached to the DOM.

        > ex:
```javascript
var detached_parent_element = document.createElement('div');
$C({"text":"hello world"},detached_parent_element,document);
document.body.appendChild(detached_parent_element);
```

## Example #02

```javascript
$C({ul:[
	{li:"First Item"},
	{li:"Second Item"},
	{li:"Third  Item"},
]},"insert-here");
```

things to note:

  * this uses the 2nd (legacy) workaround methodology.
  * _parent_element_ in this case is a string, which must be a DOM node "id".
  * _document_ is not being specified, so window.document will be used to create all Elements.

## Closing Comments

  * In most situations, jQuery will already be available and adding yet-another script to the page will be unnecessary.
  * My particular use-case was one in which I wanted to keep the code base as minimal as possible,
    and there were no pre-loaded libraries to leverage (writing Firefox add-ons).
    That being said, I actually do prefer this syntax;
    it feels much more natural and streamline to me, than writing nested .append() statements.
    Also, any logical "condition" would interrupt chaining.