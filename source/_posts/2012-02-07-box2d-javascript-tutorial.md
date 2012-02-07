---
layout: tutorial
title: "Box2D JaveScript Tutorial"
subtitle: "Uncovering The Magic Behind SilarApp.com"
date: 2012-02-07
hackernews: "http://news.ycombinator.com/item?id=3562244"
categories: box2d-javascript
---

{% render_partial tutorials/box2d-web/index.html %}

This is tutorial is written as a compliment to my [@Sthlmjs](http://twitter.com/sthlmjs) presentation at 7 February 2012. The presentation was called **"Box2D-web - Uncovering The Magic Behind SilarApp"** and refers to the [SilarApp project](/projects/silarapp) that I work in together with [@himynameisjonas](http://twitter.com/himynameisjonas) and [@ingmr](http://twitter.com/ingmr).

[{% img float-right image-right /images/posts/2012/box2d-web/silarapp.jpg %}](http://silarapp.com)

The tutorial explains how to the demo above was made and you can find the source at [Github.com/javve/box2d-javascript](http://github.com/javve/box2d-javascript). I **strongly** encourages you to download the source and look at it while reading this tutorial.

I will go through the demo step by step in order of execution.

## Background
[Box2D](http://box2d.org/) is a open source physics engine originally written by [Erin Catto](https://twitter.com/#!/erin_catto) in C++. Over the years it has been ported to a number of [different languages](http://www.box2d.org/links.html). Today there are two version in JavaScript,  **[Box2d-web](http://code.google.com/p/box2dweb/)** and [Box2d-js](http://box2d-js.sourceforge.net/). The latter one is sadly no longer supported so my suggestion is using the first. It is a direct port from [Box2DFlash 2.1a](http://www.box2dflash.org/) and is the one that this tutorial is using.

## Good things to know
* Box2d does **not** uses pixels, it measures MKS (meters, kilograms, and seconds). This could be a bit weird but no worries! [Read more here](http://blog.zincroe.com/2009/05/units-in-box2d/).
* Box2d only handles convex elements. It is however possible to put together multiple element to create concaves.  
{% img /tutorials/box2d-web/convex.png %}
* Box2D is built to optimally handle dynamic (moving) objects that are 0.1-10 meters, and static (not moving) that are up to 50 meters (yeah, no particle simulations).
* Box2D **only** handles that physics, it does not handles drawing objects. This means that we have to paint the `<canvas>` ourselves (see the **Loop** section). **Notice**: Box2D however provides a debugging feature where it can draw the objects itself, search for `debug` in the demo source to see how to use it.

## Getting started

1. [Download Box2d-web](http://code.google.com/p/box2dweb/downloads/list)
2. Include `box2d-web-2.1.a.3.js` at your page.
3. Create a `<canvas>` with including `height`, `width` and `id`.


``` javascript
<canvas id="box2d-demo" width="960" height="480" backgroundColor="2A3038"></canvas>
<script src="box2d-web-2.1.a.3.js"></script>
```

## Basic demo structure
``` javascript
// First: Create some Box2D shortcuts.

// Initiate all local variables used in this demo

// Handles all initiation stuff (that is not directly related to box2d)
var init = { .. };

// Used for adding boxes and circles
var add = { .. };

// Contains all functions that interacts with Box2d (except those in var loop = {..};
var box2d = { .. };

// Contains the functions that are called over and over again to make stuff move
var loop = { .. };

// Various helpers
var helpers = { .. };

// The base Shape and Box & Circle that share the Shape prototype
var Shape = function(){ .. };
var Circle = function(){ .. };
var Box = function(){ .. };
```

## Initiation
The initiation is done by the `var init = { .. }` object that contains a collection of function that are needed to set up the demo.

It begins with `init.start()` that executes the other functions. 

* Set the `SCALE = 30`. Meaning that all pixel values are divide with 30 to get the size in meters. E.g. the canvas is `740 / 30 =  24.6 m`.
* Initiate the canvas area of which the demo will use.
* Call `box2d.create.world()` to setup the `world` object that "is" Box2D.
``` 
world = new b2World(
	new b2Vec2(0, 10)		// gravity
	, false					// allow sleep
);
```
* Create the default fixture object with `box2d.create.defaultFixture()` which will be used for all shapes (more about fixers later).
* Create walls, ground and roof by simply use the `add.box()` function to add boxes outside the visible area.
* Init callbacks, meaning the ones that are triggered when user clicks on the canvas (more about the mouse-related stuff later).
* Fires of the loop and starts the demo! (read more later in the **Loop** section.

## Adding shapes
When an user clicks on the `<canvas>` the function `add.random()` is called with calls `add.box()` or `add.circle()`. Here is the code for creating a `Circle`.
``` javascript
options.radius = 0.5 + Math.random()*1;
var shape = new Circle(options);
shapes[shape.id] = shape;
box2d.addToWorld(shape);
```
As you can see it first creates a Circle object (that is used to  paint the object on the screen). Then it calls `box2d.addToWorld()` that adds the shape to Box2D. Next section explains how that function works.

### About Box2D Bodies and Fixtures
All elements in Box2D are called **bodies** and each body have once or more **fixtures**. Usually you see it like bodies are containers which have a position and then contains fixtures that have a shape, density, friction and collision control. In this demo all fixtures uses the sam default fixture definition. 

#### Bodies
* Contains fixture(s)
* Position
* Angle
* Static or dynamic

#### Fixtures
* Density
* Friction
* Has a shape
* Collision

Here are the code that handles body and fixture-related stuff in this demo.
``` javascript
// Initiated earlier
var fixDef = new b2FixtureDef;
fixDef.density = 1.0;
fixDef.friction = 0.5;
fixDef.restitution = 0.2;

var box2d = {
    addToWorld: function(shape) {
        var bodyDef = this.create.bodyDef(shape);
        var body = this.create.body(bodyDef);
        if (shape.radius) {
            this.create.fixtures.circle(body, shape);
        } else {
            this.create.fixtures.box(body, shape);
        }
    },
    create: {
        world: function() { .. },
        defaultFixture: function() { .. },
        bodyDef: function(shape) {
            var bodyDef = new b2BodyDef;
    
            if (shape.isStatic == true) {
                bodyDef.type = b2Body.b2_staticBody;
            } else {
                bodyDef.type = b2Body.b2_dynamicBody;
            }
            bodyDef.position.x = shape.x;
            bodyDef.position.y = shape.y;
            bodyDef.userData = shape.id;
            bodyDef.angle = shape.angle;
        
            return bodyDef;
        },
        body: function(bodyDef) {
            return world.CreateBody(bodyDef);
        },
        fixtures: {
            circle: function(body, shape) {
                fixDef.shape = new b2CircleShape(shape.radius);
                body.CreateFixture(fixDef);
            },
            box: function(body, shape) {
                fixDef.shape = new b2PolygonShape;
                fixDef.shape.SetAsBox(shape.width / 2, shape.height / 2);
                body.CreateFixture(fixDef);
            }
        }
    },
    get: function() { … }
};
```

## The loop
The loop is the center of each Box2D application (or other game etc). In this demo it has three steps.
``` javascript 
// On my signal: Unleash hell.
(function hell() {
    loop.step();
    loop.update();
    loop.draw();
    requestAnimFrame(hell);
})();

var loop = {
    step: function() {
        var stepRate = 1 / 60;
        world.Step(stepRate, 10, 10);
        world.ClearForces();
    },
    update: function () {            
        for (var b = world.GetBodyList(); b; b = b.m_next) {
            if (b.IsActive() && typeof b.GetUserData() !== 'undefined' && b.GetUserData() != null) {
                shapes[b.GetUserData()].update(box2d.get.bodySpec(b));
            }
        }
        needToDraw = true;
    },
    draw: function() {
        if (!needToDraw) return;
        if (!debug) ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (var i in shapes) {
            shapes[i].draw(ctx);
        }
        needToDraw = false;
    }
};
```
First one thing: `requestAnimFrame()` is simply a helper function that makes animation smarter. [Read more about it here](http://paulirish.com/2011/requestanimationframe-for-smart-animating/).

1. The first step `loop.step();` tells the Box2D world-object to take one step, and it is here where all the magic happens (moving, collision detection etc).
2. The next step `loop.update();` collects the updates from Box2D and transfer them to our own shapes (`Circle` and `Box`).
3. The last step `loop.draw()` redraws the `<canvas>` with all the updated shapes.

### About drawing
Drawing shapes/object on the screen is done with regular canvas-methods etc. Both `Circle`and `Box` have their own `.draw()` method. I will not explain these in detail, but they basically get the position from the `world` object and then uses it to paint itself on the `canvas` with help of the `ctx`. Here it the `.draw()` method from `Box`.

``` javascript
this.draw = function() {
    ctx.save();
    ctx.translate(this.x * SCALE, this.y * SCALE);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
    ctx.fillStyle = this.color;
    ctx.fillRect(
        (this.x-(this.width / 2)) * SCALE,
        (this.y-(this.height / 2)) * SCALE,
        this.width * SCALE,
        this.height * SCALE
    );
    ctx.restore();
};
```

## Wrapping up
That's it. I hope you liked the tutorial and if you have any questions or suggestions feel free to ping me at Twitter [@javve](http://twitter.com/javve).

Hopefully will I follow up this tutorial with a new one and with more [demos at Github](http://github.com/javve/box2d-javascript). 

## Continue reading
* [Box2D manual](http://www.box2d.org/manual.html) contains a lot of interesting stuff.
* [Seth Ladd's excellent Box2D-web tutorials](http://creativejs.com/2011/09/box2d-javascript-tutorial-series-by-seth-ladd/) (it's from these I learned Box2D-web)
* [Box2D-web performance](http://blog.j15r.com/2011/12/for-those-unfamiliar-with-it-box2d-is.html)