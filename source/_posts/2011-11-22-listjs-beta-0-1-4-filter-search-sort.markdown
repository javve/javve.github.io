---
layout: post
title: "List.js Beta 0.1.4: Filter, search and sort!"
date: 2011-11-29
comments: true
categories: listjs
---

Version 0.1.4 of List.js is now released and it contains one major update and one minor.

The **major** one is that filters, search and sort now depend on each other. If you searches in a filtered list, the items hidden by the filter will stay hidden. The same goes if you have searched in a list and then filters the result.

The minor update is that `.filter()` is now used to reset filters instead of `.filter(false)`.

Grab the latest version at [Github.com/javve/list](http://github.com/list/javve)