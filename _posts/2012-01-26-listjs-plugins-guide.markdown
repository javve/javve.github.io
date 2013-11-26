---
layout: post
title: "The List.js Plugin Guide"
date: 2012-01-26
hackernews: "http://news.ycombinator.com/item?id=3515850"
categories: listjs
---

<img class="pull-right width33" src="/images/projects/listjs/logo.png">


Version 0.2.0 introduced a new feature of List.js called plugins. This post will guide you through how to use and make plugins.

Plugins are scripts that can be loaded at List.js initiation and then becomes accessible with `listObj.pluginName`. 

There are one plugin bundled with List.js and it is found in `/plugins/paging/list.paging.js` (and `/plugins/paging/list.paging.min.js`). Here is some code that shows how to load it.

{% highlight javascript %}
var options = {
	valueNames: [ 'name', 'category' ],
	page: 3,
	plugins: [
		[ 'paging' ]
	]
};


var listObj = new List('listId', options);
{% endhighlight %}
It is also possible to add options and load multiple instances of tha same plugins (if the plugin itself allows it). 

**Notice**: If the property `name` is added in the plugin option parameter does the plugin become accessible through `listObj.namePropertyValue` (`listObj.paging2` in this example). This is useful when having multiple instances of the same plugin.

{% highlight javascript %}
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
{% endhighlight %}
Read more about the [paging plugin here](http://jonnystromberg.com/listjs-paging-plugin/).


## Make Your Own Plugin

This is everything that is needed to make you own plugin. Notice  the two parameters: `locals` that contains
all hidden/private local variables of List.js, `options` contains the options shown in the example above.

{% highlight javascript %} list.yourPluginName.js
List.prototype.plugins.yourPluginName = function(locals, options) {
	// Do stuff!
};
{% endhighlight %}
The plugin is run after the list is initiated. See the source code of the [paging plugin here](http://jonnystromberg.com/listjs-paging-plugin/).

### Naming
All List.js plugins should be named `list.pluginName.js` or `list.pluginName.min.js`.

### A Good Tip
Use `list.on('updated', yourFancyFunction);` to updated you plugin when the list have been updated.

One other really useful method is `.update()` that updates the list and then triggers the above metioned event (be careful, do not make an infinit loop here).

Remeber that you find all List & Item methods in the [documentation at Github](https://github.com/javve/list/blob/master/README.md).

### Pull requests or links wanted
If you've made a nice, well written and useful plugin, I would be very happy if you [made a pull request](http://github.com/javve/list) so I could bundle it with List.js, or sent me a link so I could add it to [Listjs.com](http://listjs.com) and [Github](http://github.com/javve/list).

