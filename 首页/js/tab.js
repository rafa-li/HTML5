/* tab */
var tabFn = {};
tabFn.Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property]
	}
	return destination
};

tabFn.contains = function(root, el) {
	if (!el) {
		return false
	}
	if (root.compareDocumentPosition) return root === el || !!(root.compareDocumentPosition(el) & 16);
	if (root.contains && el.nodeType === 1) {
		return root.contains(el) && root !== el
	}
	while ((el = el.parentNode))
		if (el === root) return true;
	return false
};

tabFn.getElementsByClassName = function(className, element) {
	var children = (element || document).getElementsByTagName('*');
	var elements = [];
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		var classNames = child.className.split(' ');
		for (var j = 0; j < classNames.length; j++) {
			if (classNames[j] == className) {
				elements.push(child);
				break
			}
		}
	}
	return elements
};

tabFn.addEventSimple = function(obj, evt, fn) {
	if (obj.addEventListener) obj.addEventListener(evt, fn, false);
	else if (obj.attachEvent) obj.attachEvent("on" + evt, fn)
};
tabFn.Bind = function(object, fun) {
	var args = Array.prototype.slice.call(arguments).slice(2);
	return function() {
		return fun.apply(object, args.concat(Array.prototype.slice.call(arguments)))
	}
};
tabFn.TweenFn = {
	Quart: {
		easeOut: function(t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b
		}
	}
};
tabFn.CurrentStyle = function(element) {
	return element.currentStyle || document.defaultView.getComputedStyle(element, null)
};
var tabs = function(id, cls, options) {
	this.container = (typeof id == 'object')  ? id : document.getElementById(id);
	this.panel = tabFn.getElementsByClassName(cls, this.container);
	this.count = this.panel.length;
	this.slider = tabFn.getElementsByClassName("bd", this.container)[0];
	this.Tween = tabFn.TweenFn.Quart.easeOut;
	this.t = this.b = this.c = 0;
	this.timer = null;
	this.index = 0;
	this.setOptions(options);
	this.trigger = this.options.trigger === false ? false : this.container.getElementsByTagName("ul")[0].getElementsByTagName("li");
	this.onStart = this.options.onStart;
	this.event = this.options.event || 'mouseover';
	this.timeout = this.options.timeout;
	this.onFinish = this.options.onFinish;
	this.change = this.options.change;
	this.duration = this.options.duration;
	this.auto = this.options.auto;
	this.pause = this.options.pause || 0;
	this.stop = false;
	this.nextEle = tabFn.getElementsByClassName('next', this.container)[0];
	this.prevEle = tabFn.getElementsByClassName('prev', this.container)[0];
	this.init()
};
tabs.prototype = {
	init: function() {
		this.panel[0].className += " " + this.options.disCls;
		if (this.options.animation) {
			this.container.className += " " + this.options.animation
		}
		if (this.options.animatio && this.options.animation == "fade") {
			this.switchTo(0)
		}
		if(this.trigger){
			this.trigger[0].className += " " + this.options.currCls;
			for (var i = 0; i < this.count; i++) {
				(function(index, that) {
					tabFn.addEventSimple(that.trigger[index], that.event, function() {
						clearTimeout(that.timer);
						that.timer = setTimeout(function() {
							that.switchTo(index)
						}, that.timeout)
					})
				})(i, this)
			}
		}
		if (this.options.auto) {
			(function(that) {
				tabFn.addEventSimple(that.container, "mouseout", function(e) {
					clearTimeout(that.timer);
					evt = e || window.event;
					relateNode = evt.relatedTarget || evt.toElement;
					if (!tabFn.contains(that.container, relateNode)) {
						that.auto = true;
						that.timer = setTimeout(tabFn.Bind(that, that.next), that.pause)
					}
				});
				tabFn.addEventSimple(that.container, "mouseover", function() {
					if (that.auto) {
						that.auto = false
					}
				})
			})(this)
		}
		if (this.auto) {
			this.timer = setTimeout(tabFn.Bind(this, this.next), this.pause)
		}
		if(this.nextEle){
			(function(that){
				tabFn.addEventSimple(that.nextEle,'click',function(){
					that.next()
				})
				tabFn.addEventSimple(that.prevEle,'click',function(){
					that.prev();
				})
			})(this)
		}
	},
	setOptions: function(options) {
		this.options = {
			timeout: 100,
			currCls: "on",
			disCls: "dis",
			event: "mouseover",
			duration: 25,
			change: 350,
			auto: false,
			onFinish: function() {},
			animation: null,
			pause: 3000
		};
		tabFn.Extend(this.options, options || {})
	},
	stopSwitch : function(){
		this.stop = true;
	},
	goonSwitch : function(){
		this.stop = false;
	},
	switchTo: function(n) {
		if(this.stop) return false;
		clearTimeout(this.timer);
		n < 0 && (n = this.count - 1) || n >= this.count && (n = 0);
		if (this.index == n) {
			return
		}
		if(this.trigger){
			this.trigger[this.index].className = this.trigger[this.index].className.replace(this.options.currCls, "");
			this.trigger[n].className += " " + this.options.currCls;
		}
		if (!this.options.animation) {
			this.panel[this.index].className = this.panel[this.index].className.replace(this.options.disCls, "")
		};
		if (this.options.animation && (this.options.animation == "slide")) {
			this.target = -Math.abs(this.change) * n;
			this.t = 0;
			this.b = parseInt(tabFn.CurrentStyle(this.slider)["left"]);
			this.c = this.target - this.b;
			this.slide()
		} else if (this.options.animation && (this.options.animation == "fade")) {
			this.panel[n].style.zIndex = 2;
			this.fade(this.panel[this.index], 0, 3);
			this.panel[this.index].style.zIndex = 1;
			this.fade(this.panel[n], 100, 3);
			this.panel[n].style.zIndex = 3
		} else {
			this.panel[n].className += " " + this.options.disCls;
			if (this.auto) {
				this.timer = setTimeout(tabFn.Bind(this, this.next), this.pause)
			}
		}
		this.onFinish(this.index, n, this.panel[n]);
		this.index = n
	},
	next: function() {
		var n = this.index + 1;
		this.switchTo(n)
	},
	prev: function() {
		var n = this.index - 1;
		this.switchTo(n)
	},
	slide: function() {
		if (this.c && this.t < this.duration) {
			this.slider.style.left = Math.round(this.Tween(this.t++, this.b, this.c, this.duration)) + 'px';
			setTimeout(tabFn.Bind(this, this.slide), 10)
		} else {
			this.slider.style.left = this.target + 'px';
			if (this.auto) {
				this.timer = setTimeout(tabFn.Bind(this, this.next), this.pause)
			}
		}
	},
	fade: function(element, transparency, speed, callback) {
		if (typeof(element) == 'string') element = document.getElementById(element);
		if (!element.effect) {
			element.effect = {};
			element.effect.fade = 0
		}
		clearInterval(element.effect.fade);
		var speed = speed || 1;
		var start = (function(elem) {
			var alpha;
			if (navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
				alpha = elem.currentStyle.filter.indexOf("opacity=") >= 0 ? (parseFloat(elem.currentStyle.filter.match(/opacity=([^)]*)/)[1])) + '' : '100'
			} else {
				alpha = 100 * elem.ownerDocument.defaultView.getComputedStyle(elem, null)['opacity']
			}
			return alpha
		})(element);
		var self = this;
		element.effect.fade = setInterval(function() {
			start = start < transparency ? Math.min(start + speed, transparency) : Math.max(start - speed, transparency);
			element.style.opacity = start / 100;
			element.style.filter = 'alpha(opacity=' + start + ')';
			if (Math.round(start) == transparency) {
				element.style.opacity = transparency / 100;
				element.style.filter = 'alpha(opacity=' + transparency + ')';
				clearInterval(element.effect.fade);
				if (self.auto && transparency == 100) {
					self.timer = setTimeout(tabFn.Bind(self, self.next), self.pause)
				}
			}
		}, 20)
	}
};
var TGTabs = {
	init : function(a){
		var b = ((typeof(a) == 'object') ? a : document.getElementById(a)) || document,
			arrAllEls = b.getElementsByTagName('*'),allLen = arrAllEls.length,curEl = null,index = 0;
		for(var i =0;i<allLen;i++){
			curEl = arrAllEls[i];
			if(curEl.getAttribute('data-tab')){
				this.tabs[index] = {};
				this.tabs[index].o = curEl;
				this.tabs[index].auto = (curEl.getAttribute('data-tab').split(',')[0].indexOf('auto')) == -1 ? false : true;
				this.tabs[index].els = curEl.getAttribute('data-tab').split(',')[1] || "tab-panel";
				this.tabs[index].event = curEl.getAttribute('data-tab').split(',')[2] || '';
				index++;
			}
		}
		this.initTabs();
		var	grids = tabFn.getElementsByClassName('grid',document),gridLen = grids.length;
		for(var i = 0;i < gridLen;i++){
			grids[i].style.height = grids[i].offsetHeight + 'px';
		}
	},
	tabs : [],
	initTabs : function(){
		var l = this.tabs.length;
		var tab_hds = tabFn.getElementsByClassName('grid-tab-hd',document),len = tab_hds.length;
		for(var i = 0;i<len;i++){
			var ele_lis = tab_hds[i].getElementsByTagName('li'),lis_len = ele_lis.length;
			for(var j = 0;j < lis_len;j++){
				ele_lis[j].style.width = (1/lis_len * 100)+'%';
			}
			ele_lis[j-1].className = 'last_li';
		}
		for(var i = 0;i<l;i++){
			var el = this.tabs[i];
			this.tabs[i].tab = new tabs(el.o,el.els,{
				auto : el.auto,
				event : el.event,
				onFinish : function(x,y){
					var more = tabFn.getElementsByClassName('more',this.container);
					if(more.length > 0){
						more[0].href = this.container.getElementsByTagName('a')[y].href;
					}
				}
			});
		}
	}
}
TGTabs.init();