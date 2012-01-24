---
layout: post
title: "List.js Beta 0.1.3 release!"
date: 2011-11-29
comments: true
categories: listjs
---

Today a new version of List.js was released. There are **one major change** that you have to be aware of!

The sort buttons now sorts values based on `data-sort=”valueName”` instead of `rel=”valueName”`. The resone for this is basically that rel=”” is not valid at most elements according to W3C.

## Other changes in the 0.1.3 release (from the documentation):

* Added function `.clear()` that removes all items from the list
* Changed the sort function to be based on `data-sort` instead of `rel`
* When sorting one category, all sort-related classes will be removed from the other sort buttons
* Updated `.sort(valueName, sortFunction)` to `.sort(valueName, options)`, see more info in the documentation

Go to [github.com/javve/list](http://github.com/javve/list) to download the latest version (and remember to change your sort button)!