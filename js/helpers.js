


Element.prototype.addEvent = function(type, func) {
	this.addEventListener(type, func);
	return this;
}

Element.prototype.removeEvent = function(type, func) {
	this.removeEventListener(type, func);
	return this;
}

Element.prototype.hasClass = function(str) {
	return this.className.split(' ').indexOf(str) > -1;
}

Element.prototype.addClass = function(str) {
	var names = this.className.split(' ');
	
	if (this.hasClass(str)) return this;
	else {
		this.className += ' ' + str;
		return this;
	}
}

Element.prototype.removeClass = function(str) {
	var names = this.className.split(' ');
	
	if (this.hasClass(str)) {
		names.splice(names.indexOf(str), 1);

		this.className = names.join(' ');
		return this;
	}
	else return this;
}

Element.prototype.toggleClass = function(str) {
	var names = this.className.split(' ');
	
	if (this.hasClass(str)) return this.removeClass(str);
	else return this.addClass(str);
}

Object.prototype.each = function(obj, func) {
	for (var key in obj) {
	
	   if (obj.hasOwnProperty(key)) {
	      var item = obj[key];
	      
	      func(key, item);
	   }
	}
}

Array.prototype.each = function(func) {
	for (var key in this) {
	
	   if (this.hasOwnProperty(key)) {
	      var item = this[key];
	      
	      func (item, key);

	   }
	}
}

Array.prototype.removeClass = function(className) {
	this.each(function(el) {
		el.removeClass(className);
	});
	
	return this;
}

Array.prototype.addClass = function(className) {
	this.each(function(el) {
		el.addClass(className);
	});
	
	return this;
}

Array.prototype.removeEvent = function(type, func) {
	this.each(function(el) {
		el.removeEvent(type, func);
	});
	
	return this;
}

var view = {
	
	/*************************************************************************
		createElement
	**************************************************************************/
	createElement: function(type, options) {
		var el 	= document.createElement(type);
		
		Object.each(options, function(key, value) {
			el.setAttribute(key, value);
		});
		
		return el;
	},
	
	/*************************************************************************
		id
	**************************************************************************/
	id: function(element_id) {
		return document.getElementById(element_id);
	},
	
	/*************************************************************************
		els
	**************************************************************************/
	els: function(oElm, strTagName, strAttributeName, strAttributeValue){
	    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	    var arrReturnElements = new Array();
	    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
	    var oCurrent;
	    var oAttribute;
	    for(var i=0; i<arrElements.length; i++){
	        oCurrent = arrElements[i];
	        oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
	        if(typeof oAttribute == "string" && oAttribute.length > 0){
	            if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
	                arrReturnElements.push(oCurrent);
	            }
	        }
	    }
	    return arrReturnElements;
	},
}

