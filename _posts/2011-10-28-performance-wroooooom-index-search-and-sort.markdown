---
layout: post
title: "Performance, wroooooom! Index, search and sort thousands of items"
date: 2011-10-28
comments: true
categories: listjs
---

There have been some questions about List.js performance. 
How many items can it handle? How fast is the indexing, 
sorting and searching in larger lists?

Today I have an answer: Try it yourself at [http://listjs.com/examples/performance-test.html](http://listjs.com/examples/performance-test.html)

But for you who just want some quick stats have I done 
some benchmarking myself.  
**Important**: All these stats are based on first runs 
(read more about first runs in the last paragraph of 
this blog post). And I have a new Macbook Pro and Chrome, 
so these stats are first run-**best cases**):

## Indexing

* Index 100 items á 3 value names ~ **5 ms**
* Index 1000 items á 3 value names ~ **50 ms**
* Index 10 000 items á 3 value names ~ **360 ms**

## Searching

* Search for a 4 char string in all values in 100 items á 3 value names ~ **7 ms**
* Search for a 4 char string in all values in 1000 items á 3 value names ~ **90 ms**
* Search for a 4 char string in all values in 10 000 items á 3 value names ~ **800 ms**

## Sorting

* Sort 100 items ~ **9 ms**
* Sort 1000 items ~ **90 ms**
* Sort 10 000 items ~ **1 600 ms**

## Adding

* Add 100 items to list with 1 item ~ **8 ms**
* Add 1000 items to list with 1 item ~ **14 ms**
* Add 10 00 items to list with 1 item ~ **30 ms**

One thing worth mentioning when it comes to List.js and performance is that the default settings (changeable) only allows 200 items to be visible at the same time. This is to boost performance and helps A LOT for larger list.

(Hint: In future releases the handling of larger lists will be much smoother, promis)

One other thing worth mentioning is that modern browsers (like Chrome, Safari, 
Firefox) optimizes complex JavaScript at runtime which means that all scripts 
get MUCH faster the second time they are called. The data above are all based 
on first runs. **Searching in 10 000 takes e.g 18 ms the second time compared 
to 800 the first.**
