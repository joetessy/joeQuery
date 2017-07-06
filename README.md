# joeQuery

joeQuery is a lightweight library featuring DOM manipulation, DOM traversal, event handling, and ajax requests.

##

## Demo

Check out this [Live Demo](https://joetessy.github.io/joeQueryDemo/ "live demo")
live demo of the library! Here you will find a simple CheckList application built with joeQuery.

##

## API

### DOM Manipulation

##### .html(string)
Sets the inner HTML of each element in the ```DOMNodeCollection```to the applied string.

##### .empty()
Removes the innerHTML of each element in the ```DOMNodeCollection```.

##### .remove()
Removes each element in the ```DOMNodeCollection``` from the DOM.

##### .append(arg)
Appends argument as a child to each element in the ```DOMNodeCollection```. Argument can be a ```string```, ```HTMLElement```, or ```DOMNodeCollection```.

##### .attr(name, value)
Sets the attribute ```name = Value``` of each element in the ```DOMNOdeCollection```.

##### .addClass(className)
Adds the passed className as a class to each element in the ```DOMNodeCollection```.

##### .removeClass(className)
Removes the passed className as a class to each element in the ```DOMNodeCollection```.

### DOM Traversal

##### .each(callback)
Iterates through all nodes in the ```DOMNodeCollection``` and applies the callback.

##### .parent()
Returns the parent of each element in the ```DOMNodeCollection```.

##### .children()
Returns a ```DOMNodeCollection``` with the direct children of each element in the original ```DOMNodeCollection```.

##### .find(selector)
Returns the descendants of the ```DOMNodeCollection``` filtered by the passed selector.

### Event Handling

##### .on(event, callback)
Attaches an callback for the passed event each element in the ```DOMNode collection```.

#### .off(event)
Removes event handler for each element in the ```DOMNode collection```.


### Ajax

Sends an HTTP request specified by passed hash options argument. The argument can take a method, url, success callback, and error callback.
