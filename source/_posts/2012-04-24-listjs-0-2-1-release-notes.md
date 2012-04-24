---
layout: post
title: "List.js 0.2.1: Release notes"
shareText: "Checkout version 0.2.1 of List.js with a Fuzzy Search plugin included."
date: 2012-04-24
hackernews: "http://news.ycombinator.com/item?id=3515820"
categories: listjs
---

{% img float-right default /images/projects/listjs/listjs-logo.jpg %}


## Major changes
* A [Fuzzy Search plugin](/listjs-fuzzy-search-plugin/) is added
* The filter function in `list.filter(filterFunction)` now takes an `Item` instead of `values` which results in greater possibilities, e.g. by using `item.elm`. _Thanks [Bob Spryn](https://github.com/sprynmr)

## Other changes
* Change plugin functionality so that plugins are created with `Plugin.call(list, locals, options)?, so that plugins extends the List-objects that they are created in.
* Add possibility to initiate with a `element` instead of a `ID`.

## Bug fixes
* Don't break `.hasClass()` if a element doesn't have a class.
* Do not require items to contain all `valueNames` on initiation.

_**[Go to Listjs.com](http://listjs.com) and download tha latest version!**_