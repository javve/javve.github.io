---
layout: post
title: "List.js Plugins"
date: 2012-01-24
comments: true
categories: listjs
---

Version 0.1.5 introduced a new feature of List.js called plugins. This post will guide you through how to use and make plugins.

Plugins are scripts that can be loaded at List.js initiation and then becomes accessible with `listObj.pluginName`. 

There are one plugin bundled with List.js and it is found in `/plugins/paging/list.paging.js` (and `/plugins/paging/list.paging.min.js`). Here is some code that shows how to load it.

``` javascript
var options = {
	valueNames: [ 'name', 'category' ],
	page: 3,
	plugins: [
		[ 'paging' ]
	]
};

var listObj = new List('listId', options);
```

It is also possible to add options and load multiple instances of tha same plugins (if the plugin itself allows it). **Notice**: If the property `name` is added in the plugin option parameter does the plugin become accessible through `listObj.namePropertyValue` (`listObj.paging2` in this example). This is useful when having multiple instances of the same plugin.

``` javascript
var options = {
	valueNames: [ 'name', 'category' ],
	page: 3,
	plugins: [
		[ 'paging' ],
		[ 'paging', {
			name: "paging2",
			pagingClass: "topPaging",
			innerWindow: 1,
			left: 2,
			right: 2
		]
	]
};

var listObj = new List('listId', options);
```

Read more about the [paging plugin here](#).


## Make Your Own Plugin

This is everything that is needed to make you own plugin. Notice  the two parameters: `list` is the actual list that uses the plugin, `options` contains the options shown in the example above.

``` javascript list.yourPluginName.js
List.prototype.plugins.yourPluginName = function(list, options) {
	// Do stuff!
};
```

The plugin is run after the list is initiated. See the source code of the [paging plugin here](#).

### A Good Tip
Use `list.on('updated', yourFancyFunction);` to updated you plugin when the list have been updated.

