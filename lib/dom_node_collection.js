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
