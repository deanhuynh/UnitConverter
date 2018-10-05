//window.addEventListener('load',walk(document.body));
var observer = new MutationObserver(function(mutations) {
	// For the sake of...observation...let's output the mutation to console to see how this all works
	mutations.forEach(function(mutation) {
		walk(document.body);
	});    
});
 
// Notify me of everything!
var observerConfig = {
	attributes: true, 
	childList: true, 
	characterData: true 
};
 
// Node, config
// In this case we'll listen to all changes to body and child nodes
var targetNode = document.body;
observer.observe(targetNode, observerConfig);


function walk(node) 
{
	var ignore = { "STYLE":0, "SCRIPT":0, "NOSCRIPT":0, "IFRAME":0, "OBJECT":0 }
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	
	if (node.nodeName.toLowerCase() == 'input' || node.nodeName.toLowerCase() == 'textarea' 
		|| (node.classList && node.classList.contains('ace_editor'))) { return; }

	if (node.tagName in ignore) return;
	
	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}



function handleText(textNode) 
{
	var conversionList = [[/(?:\d+\skilometers|\d+\skilometer|\d+\skm)/gi, 6.21371],
						  [/(?:\d+\scelcius|\d+\sc\s*\.*)/gi, -1],
						  [/(?:\d+\smeters|\d+\s|\d+\skm)/gi, 6.21371]]
	var v = textNode.nodeValue;
	var re = /(?:\d+\skilometers*|\d+\skm)/gi;
	var word;

	while (word = re.exec(v)) {
		var digit = /\d+/;
		v = v.replace(word, Math.round(digit.exec(word) * 6.21371)/10 + " miles");
		//v = v.replace(word, Math.round(1.1) + " miles");

	}

	//function convert(reList)

	// var words = v.match(/\b(\w+)\b/g);
	// //var words = v.split(" ");

	// if (words) {
	// 	for (var i = 0; i < words.length; i++) {
	// 		if ((words[i] == "kilometer"|"kilometers"|"km") && i > 1 && !isNaN(words[i - 1])) {
	// 			var value = words[i - 1];
	// 			v = v.replace(/(?:value + " kilometers"|value + " kilometers|value + " km")/g, value * 0.621371 + " miles");
	// 			v = v.replace(value + " kilometers", value * 0.621371 + " miles");
	// 		}
	// 	}
	// }

	// v = v.replace(/(?:r|l)/g, "w");
	// v = v.replace(/(?:R|L)/g, "W");
	// v = v.replace(/n([aeiou])/g, 'ny$1');
	// v = v.replace(/N([aeiou])/g, 'Ny$1');
	// v = v.replace(/N([AEIOU])/g, 'Ny$1');
	// v = v.replace(/ove/g, "uv");
	// v = v.replace(/\!+/g, " "+ faces[Math.floor(Math.random()*faces.length)]+ " ");
	
	textNode.nodeValue = v;
}


