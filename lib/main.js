const DomNodeCollection = require("./dom_node_collection.js");

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
