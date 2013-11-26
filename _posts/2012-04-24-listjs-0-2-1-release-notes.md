---
layout: post
title: "List.js 0.2.1: Release notes"
shareText: "Checkout version 0.2.1 of List.js with a Fuzzy Search plugin included."
date: 2012-04-24
hackernews: "http://news.ycombinator.com/item?id=3883035"
categories: listjs
---

<img class="float-right default" src="/images/projects/listjs/logo.png">


## Major changes
* A [Fuzzy Search plugin](/listjs-fuzzy-search-plugin/) is added _Thanks [Luuk van Egeraat](https://github.com/LuukvE) for this [commit](https://github.com/LuukvE/list/commit/a75b6ef5649c5fb4232a40ef2f5191d0b57e1ede)_
* The filter function in `list.filter(filterFunction)` now takes an `Item` instead of `values` which results in greater possibilities, e.g. by using `item.elm`. _Thanks [Bob Spryn](https://github.com/sprynmr)_

## Other changes
* Change plugin functionality so that plugins are created with `Plugin.call(list, locals, options)`, so that plugins extends the List-objects that they are created in.
* Add possibility to initiate with a `element` instead of a `ID`.

## Bug fixes
* Don't break `.hasClass()` if a element doesn't have a class.  _Thanks [Jonas Forsberg](https://github.com/himynameisjonas)_
* Do not require items to contain all `valueNames` on initiation.

_**[Go to Listjs.com](http://listjs.com) and download tha latest version!**_
