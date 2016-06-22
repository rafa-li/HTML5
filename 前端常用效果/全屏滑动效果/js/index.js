// 	闭包的作用:
// 	-避免全局依赖
// 	-避免第三方破坏
// 	-兼容jQuery操作符‘$’和‘jQuery’
// 	(function($){
// 	    do something;
// 	})(jQuery)

// 开发方式：
// 1、类级别组件开发
// 	即给jQuery命名空间下添加新的全局函数，也称为静态方法；
// 	jQuery.myPlugin = function () {
// 		do something
// 	};
// 	例如：$.Ajax()、$.entend()

// 2、对象级别组件开发
// 	即挂在jQuery原型下的方法，这样通过选择器获取的jQuery对象实例也能共享该方法，也称为动态方法；
// 	$.fn.myPlugin = function(){
// 		do something
// 	};
// 	例如：addClass()、attr()等、需要创建实例来调用


// 链式调用：
// 	$("div").next().addClass()....
// 	$.fn.myPlugin = function(){
// 		return this.each(function(){
// 				do something
// 		});
// 	};
// 代码说明：return this 返回当前对象，来维护插件的链式调用
// 		  each 循环实现每个元素的访问

// 单例模式：
// 	$.fn.myPlugin = function(){
// 		var me = $(this),
// 		instance = me.data('myPlugin');
// 		if (!instance) {
// 			me.data('myPlugin', (instance = new myPlugin()));
// 		}
// 	}
// 代码说明：
//  -如果实例存在则不再重新创建实例
//  -利用data() 来存放插件对象的实例

(function($){
	var PageSwitch = (function(){
		function PageSwitch(element ,options){
			this.settins = $.extend(true,$.fn.PageSwitch.default,options||{});
			this.element = element;
			this.init();
		}
		PageSwitch.prototype ={
			init : function () {
				
			}
		}
		return PageSwitch;
	})();
	$.fn.PageSwitch = function(){
		return this.each(function(){
			var me = $(this),
				instane = me.data("PageSwitch");
			if(!instane){
				instance = new PageSwitch(me,options);
				me.data("PageSwitch",instance);
			}
			if ($.type(options) === "string") {
				return instance[options]();
			}
		});
	}
	$.fn.PageSwitch.default = {
		selectors :{
			sections:".sections",
			section:".section",
			page:".pages",
			active:".active"
		},
		index:0,
		easing:"ease",
		duration:500,
		loop:false,
		pagination:true,
		keyboard:true,
		direction:"vertical",
		callback:""

	}
})(jQuery);