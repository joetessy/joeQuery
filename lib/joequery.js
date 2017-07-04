/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DomNodeCollection{
  constructor(nodes){
    this.nodes = nodes;
  }

  each(callback){
    this.nodes.forEach(callback);
  }

  html(html) {
    if (typeof html === 'string') {
      this.each(node => node.innerHTML = html);
    } else {
      if (this.nodes.length > 0) {
        return this.nodes[0].innerHTML;
      }
    }
  }

  empty() {
    this.html('');
  }

  append(arg) {
    if (arg instanceof HTMLElement){
      this.each(node => node.innerHTML += arg.outerHTML);
    } else if (typeof arg === 'string'){
      this.each(node => node.innerHTML += arg);
    } else if (typeof arg === "object"){
      this.each( node => arg.each(childNode => {
        node.innerHTML += childNode.outerHTML;
      }));
    }
  }

  attr(name, value) {
    this.each( (node) => {
      node.setAttribute(name, value);
    });
  }

  addClass(className) {
    this.each( node => node.classList.add(className));
  }

  removeClass(className) {
    this.each( node => node.classList.remove(className));
  }

  children(){
    let currentChildren = [];
    this.each(node => {
      const childNodes = Array.from(node.children);
      currentChildren = currentChildren.concat(childNodes);
    });
    return new DomNodeCollection(currentChildren);
  }

  parent(){
    const parents = [];
    this.each(node => {
      if (!parents.includes(node.parentNode)){
        parents.push(node.parentNode);
      }
    });
    return new DomNodeCollection(parents);
  }

  find(arg){
    let result = [];
    this.each( node => {
      result = result.concat(Array.from(node.querySelectorAll(arg)));
    });
    return new DomNodeCollection(result);
  }

  remove(){
    this.each( (el) => el.remove() );
  }

  on(event, callback){
    this.each( (node) => {
      node.callback = callback;
      node.addEventListener(event, callback);
    });
  }

  off(event){
    this.each( (node) => node.removeEventListener(event, node.callback));
  }
}


module.exports = DomNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(0);

let functions = [];
let documentReady = false;

const $l = (arg) => {
  if (typeof arg === 'string'){
    let elementList = document.querySelectorAll(arg);
    let elementArray = Array.from(elementList);
    return new DomNodeCollection(elementArray);
  } else if (arg instanceof HTMLElement) {
    return new DomNodeCollection([arg]);
  } else if (typeof arg === 'function'){
    functions.push(arg);
  }
};

$l.extend = (...objs) => {
  let obj1 = objs[0];
  for (let i = 1; i < objs.length; i++) {
    let currentObject = objs[i];
    for (var key in currentObject) {
      if (currentObject.hasOwnProperty(key)) obj1[key] = currentObject[key];
    }
  }
  return obj1;
};

$l.ajax = (options) => {
  const req = new XMLHttpRequest();
  const defaults = {
    method: 'GET',
    url: '',
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET"){
    options.url += "?" + toQueryString(options.data);
  }
  req.open(options.method, options.url, true);
  req.onload = e => {
    if (req.status === 200) {
      options.success(req.response);
    } else {
      options.error(req.response);
    }
  };
  req.send(JSON.stringify(options.data));
};

const toQueryString = obj => {
  let result = "";
  for(let prop in obj){
    if (obj.hasOwnProperty(prop)){
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};


window.$l = $l;

document.addEventListener( 'DOMContentLoaded', function () {
  documentReady = true;
  functions.forEach( func => func() );
});


/***/ })
/******/ ]);