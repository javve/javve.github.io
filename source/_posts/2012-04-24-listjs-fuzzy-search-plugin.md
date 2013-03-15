---
layout: post
title: "List.js: Fuzzy Search Plugin"
shareText: "Checkout List.js fuzzy search plugin, it's awesome! #listjs #javascript"
date: 2012-04-24
hackernews: "http://news.ycombinator.com/item?id=3883031"
categories: listjs
---

A big thanks to [LuukvE](https://github.com/LuukvE) who made a [commit](https://github.com/LuukvE/list/commit/a75b6ef5649c5fb4232a40ef2f5191d0b57e1ede) from which I could
create this Fuzzy Search plugin.

## The difference between Fuzzy Search and List.js default search
The default search will conduct a time efficient search for an exact match in the content searched, while the fuzzy search will render results depending on if they are included anywhere in the content.

``` javascript
var items = [
    { character: "Guybrush Threepwood", game: "The Secret of Monkey Island" },
    { character: "Manny Calavera", game: "Grim Fandango" },
    { character: "Bernard Bernoulli", game: "Maniac Mansion" }
];

list.search('gu thre'); -> return none
list.fuzzySearch('gu thre') -> return 1 item
```

## Live example
Check out this -> [Listjs.com/examples/fuzzy-search](http://listjs.com/examples/fuzzy-search.html)

## Implementation 
``` html
<div id="list-id">
	<input class="fuzzy-search" />
	<ul class="list">
		/* A bunch of items */
	</ul>
</div>

<script>

var fuzzyOptions = {
    searchClass: "fuzzy-search",
    location: 0,
	distance: 100,
	threshold: 0.4,
    multiSearch: true
};
var options = {
	  valueNames: [ 'name', 'category' ],
	  plugins: [
        [ 'fuzzySearch', fuzzyOptions ]
	  ]
};

var listObj = new List('list-id', options);

// Search manually 
listObj.fuzzySearch('my search');

// Search manually on specific columns
listObj.fuzzySearch('my search', { name: true });

</script>
```

## Options
All options are optional. Simplest implementation is: `plugins: [ [ 'fuzzySearch' ] ]`

* **location** _(Int, default: 0)_  
Approximately where in the text is the pattern expected to be found?
* **distance** _(Int, default: 100)_  
Determines how close the match must be to the fuzzy location (specified above). An exact letter match which is 'distance' characters away from the fuzzy location would score as a complete mismatch. A distance of `0` requires the match be at the exact location specified, a threshold of `1000` would require a perfect match to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
* **threshold** _(Int, default: 0.4)_  
At what point does the match algorithm give up. A threshold of `0.0` requires a perfect match (of both letters and location), a threshold of `1.0` would match anything.
* **multiSearch** _(Boolean, default: true)_  
Subtract arguments from the `searchString` or put `searchString` as only argument