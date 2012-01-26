---
layout: post
title: "The List.js Paging Plugin"
date: 2012-01-26
categories: listjs
---

The List.js paging plugin is bundled with the script and is located in `/plugins/paging/list.paging.js` and [click here](http://listjs.com/examples/paging.html) if you want to see it in action. To use the plugin just include the .js file at your page and do like this:

``` html
<div id="listId">
	<ul class="list">
		/* A bunch of items */
	</ul>
	<ul class="paging"></ul>
</div>

<script>
var options = {
	valueNames: [ 'name', 'category' ],
	page: 3,
	plugins: [
		[ 'paging' ]
	]
};

var listObj = new List('listId', options);
</script>
```

And the paging that gets created looks _**kinda**_ like this:

``` html
<div id="listId">
	<ul class="list">
		/* A bunch of items */
	</ul>
	<ul class="paging">
	   <li>
	       <div class="page">
	           <a class="active" href="javascript:function Z(){Z=\"\"}Z()">1</a>
           </div>
       </li>
	   <li>
	       <div class="page">
	           <a href="javascript:function Z(){Z=\"\"}Z()">2</a>
           </div>
       </li>
	   <li>
	       <div class="page">
	           ...
           </div>
       </li>
	</ul>
</div>
```

There are som options available thought.

* **name** _(String, default: "paging")_  
Default option for all plugins. Defines how to access the plugin from the list object `listObj.pluginName`.

* **pagingClass** _(String, default: "paging")_  
The class that defines which `ul` that should contain the paging (must be inside the list container)

* **innerWindow** _(Int, default: 2)_  
How many pages should be visible on each side of the current page.  
`innerWindow: 2` ... 3 4 **5** 6 7 ...  
`innerWindow: 1` ... 4 **5** 6 ...

* **outerWindow** _(Int, default: 0)_  
How many pages should be visible on from the beginning and from the end of the paging.  
`outerWindow: 0` ... 3 4 **5** 6 7...  
`outerWindow: 2` 1 2 ... 4 5 **6** 7 8 ... 11 12

* **left** _(Int, default: 0)_  
Same as `outerWindow` but only from left.
`outerWindow: 2` and `left: 1` 1 ... 4 5 **6** 7 8 ... 11 12

* **right** _(Int, default: 0)_  
Same as `left` but from right.

**Notice**: The number of items at each page are decided by the List.js own property `page`. To set this just add `page: Number` to the option object sent into the List.js constructor (as been done in both of the examples at this page).

## Two pagings

``` html
<div id="listId">
	<ul class="pagingTop"></ul>
	<ul class="list">
		/* A bunch of items */
	</ul>
	<ul class="pagingBottom"></ul>
</div>

<script>
var pagingTopOptions = { 
	name: "pagingTop", 
	pagingClass: "pagingTop",
	outerWindow: 2
};
var pagingBottomOptions = { 
	name: "pagingBottom", 
	pagingClass: "pagingBottom",
	innerWindow: 3,
	left: 2,
	right: 4
};
var listOptions = {
	valueNames: [ 'name', 'category' ],
	page: 3,
	plugins: [
		[ 'paging', pagingTopOptions],
		[ 'paging', pagingBottomOptions]
	]
};

var listObj = new List('listId', listOptions);
</script>
```
