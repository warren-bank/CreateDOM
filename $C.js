/*
 * author
 *     name:    Binny V Abraham
 *     email:   moc.liamg@avynnib
 *     url:     http://binnyva.com/me/
 * script
 *     name:    CreateDOM - $C()
 *     summary: Create DOM Stuctures Easily
 *     url:     http://www.openjs.com/scripts/createdom/
 * license
 *     name:    BSD License
 *     url:     http://www.openjs.com/license.php
 */

function $C(dom,id) {
	if(!id) var id = "";//The ID argument is optional
	//Most *necessary* HTML tags - make sure not to include any tags that is also a valid attribute name - eg 'cite'
	var valid_tags = ",p,div,span,strong,em,u,img,pre,code,br,hr,a,script,link,table,tr,td,h1,h2,h3,h4,h5,h6,sup,sub,"+
		"ul,ol,li,dd,dl,dt,form,input,textarea,legend,label,fieldset,select,option,blockquote,";//Begining and ending commas are intentional - don't remove them
	var html = new Array();
	var non_alapha = new RegExp(/_\d*$/);
	for(var tag in dom) {
		var child = false;
		if(isNaN(tag)) { //Associative array
			var attributes = dom[tag];
		} else { //It's a list
			var tagname = "";
			var attributes = "";
			for(var tagname in dom[tag]) {
				attributes = dom[tag][tagname];
			}
			tag = tagname;
		}
		
		tag = tag.replace(non_alapha,"");//Remove the numbers at the end
		var ele = document.createElement(tag);
		//If the given attribute is a string, it is a text node
		if(typeof(attributes) == "string") child = document.createTextNode(attributes);
		else if(attributes) {//If it an array...
			for(var att in attributes) {
				var value = "";
				if(isNaN(att)) { //Associative array
					value = attributes[att];
				} else { //It's a list
					for(var index in attributes[att]) {
						value = attributes[att][index];
					}
 					att = index;
				}

				att = att.replace(non_alapha,"");//Remove the numbers at the end - to solve the problem of non unique indexes
				if(valid_tags.indexOf(","+att+",") != -1) { //If the attribute is a valid tag,
					//Find the dom sturcture of that tag.
					var node = new Object;
					node[att] = value;
					ele.appendChild($C(node,""));// :RECURSION:
				}
				else if(att == "text") child = document.createTextNode(value);//The text in the tag
				//else ele.setAttribute(att,value);
			}
		}

		if(child && attributes) ele.appendChild(child);//Append the child if it exists
		html.push(ele);
	}

	if(!id) {//If no node is given, return the created node.(Exits the function)
		if(html.length == 1) return html[0];
		return html;
	}
	//If a node/id was given, append the created elements to that element.
	var node = id;
	if(typeof id == "string") node = document.getElementById(id);//If the given argument is an id.
	for(var i=0;el=html[i],i<html.length;i++) node.appendChild(el);
}