---
layout: post
title: "List.js 0.2.0: Plugins and Paging"
shareText: "Checkout the new awesome List.js with plugins and paging by @javve"
date: 2012-01-26
comments: true
categories: listjs
---

_**[Go to Listjs.com](http://listjs.com) and download tha latest version!**_
{% img float-right default /images/projects/listjs/listjs-logo.jpg %}

This is a release many have been waiting on! Beta 0.2.0 includes several large improvments and I will go through them one by one.  

## Plugins!
The biggest update in List.js 0.2.0 is the support for plugins. With plugin it gets much easier to make scripts that integrate with List.js. [Read more »](/listjs-plugins-guide/)

## Paging Plugin
The first plugin includes the most wanted feature in List.js history (haha). Paging! [Read more about the paging plugin »](/listjs-paging-plugin/)

## Better options for initization of empty lists
A new option for initiating empty lists have been added. Now you can use a html-string in the `item` options. Example shown here:
``` javascript
<div id="hacker-list">
    <ul class="list"></ul>
</div>

<script>
    var options = {
        item: '<li><h3 class="name"></h3><p class="city"></p></li>'
    };

    var values = [
        { name: 'Jonny', city:'Stockholm' }
        , { name: 'Jonas', city:'Berlin' }
    ];

    var hackerList = new List('hacker-list', options, values);
</script>
```
**Notice**: this do not work with `<tr>`.

## New initization options
* **page** _(int, default: 200)_ have replaced `maxVisibleItemsCount` and represents how many items that should be visible at the same time.
* **i** _(int, default: 0)_ defines which item should be the first visble.
* **plugins** _(array, default: undefined)_ defines which plugins this instance of the List should use. [Read more about plugins »](/listjs-plugins-guide/)

## New properties
* **visibleItems** _(array)_ Returns the currently visible items.
* **matchingItems** _(array)_ Returns the items matching the currently active searches and filters, it could there by contains non visible items. If no active searches and filters does `.matchingItems` contain same items as `.items`
* **searched** _(boolean)_ Returns `true` if there are a active search in the list.
* **filtered** _(boolean)_ Returns `true` if there are a active filter in the list.
* **plugins** _(object)_ Returns the _plugins_ that could be initiated (to interact with active plugins use `listObj.pluginName`).

## New methods
* Replaced `.addAsync(items)` with `.add(items, callback)`. 
* **show()** 
Shows `page` number of items from `i`. Use for paging etc.
``` javascript
itemsInList = [
	{ id: 1, name: "Jonny" }
	, { id: 2, name "Gustaf" }
	, { id: 3, name "Jonas" }
	, { id: 4, name "Egon" }
	, { id: 5, name "Frank" }
	, { id: &, name "Ester" }
];
    	
listObj.show(4, 3); -> Display item 4,5,6 
```
* **update()** 
Updates the current state of the list. Meaning that if you for instance hides some items with `itemObj.hide()` method then you have to call `listObj.update()` if you want the paging to update.
* **on(event, callback)**  
Execute `callback` when list have been updated (triggered by `update()`, which is used by a lot of methods).

## New Item methods
* **matching()** 
Returns true if the item match the current filter and searches. Visible items always matches, but matching items are not always visible.
* **visible()**
Returns boolean. True if the item is visible. Visible items always matches, but matching items are not always visible.

## Various
* Fixed IE7 bug in helper `hasClass()`, `addClass()` and `removeClass()`.
* Fix searching with null and undefined values + using `searchString = 0`



That was it! Pretty exciting right? Looking forward do see some awesome plugins!

_**[Go to Listjs.com](http://listjs.com) and download tha latest version!**_