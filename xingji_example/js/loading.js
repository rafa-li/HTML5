var ResourceLoader = function() {
	var a = this,
		k = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$|\.jpg\?*|\.jpeg\?*|\.png\?*|\.gif\?*|\.bmp\?*/i,
		l = /\.mp4$|\.mp4\?*|\.aac$|\.aac\?*/i,
		m = /\.css$|\.css\?*/i,
		n = /\.js$|\.js\?*/i,
		f = g("head");
	a.loaded = 0;
	a.total = 0;
	a.video = [];
	for (var e = a.interval = 0; e < arguments.length; e++) {
		var c = arguments[e],
			b = 0,
			d = 0,
			h = 0,
			h = k.test(c) ? "1" : l.test(c) ? "2" : m.test(c) ? "3" : n.test(c) ? "4" : 0;
		switch (h) {
			case "1":
				b = new Image;
				b.src = c;
				break;
			case "2":
				d = new video;
				d.preload = "auto";
				d.src = c;
				a.video.push(d);
				break;
			case "3":
				b = document.createElement("link");
				b.setAttribute("href", c);
				b.setAttribute("rel", "stylesheet");
				f.appendChild(b);
				break;
			case "4":
				b = document.createElement("script");
				b.src = c;
				f.appendChild(b);
				break;
			default:
				return !1
		}
		b ? (a.total++, b.addEventListener("load", function() {
			a.loaded++;
			a.onchange()
		}), b.addEventListener("error", function() {
			a.loaded++;
			a.onchange()
		})) : d && (a.total++, "other" == returnPlatform() ? a.loaded++ : function() {
			d.play();
			var b = a.video.length - 1;
			a.video[b].addEventListener("play", function() {
				1 != a.video[b].getAttribute("suspend") && (a.video[b].setAttribute("suspend", 1), this.pause(), a.loaded++, a.onchange())
			}, !1);
			a.video[b].addEventListener("suspend", function() {
				a.loaded++;
				1 != a.video[b].getAttribute("suspend") && a.video[b].setAttribute("suspend", 1);
				a.onchange()
			}, !1);
			a.video[b].addEventListener("error", function() {
				a.loaded++;
				a.onchange()
			}, !1)
		}())
	}
};

var Gpath = 'http://game.gtimg.cn/images/mir/act/a20151026yqh/';
var loader = new ResourceLoader(
	Gpath + 'bg-0.jpg',
	Gpath + 'bg-1.jpg',
	Gpath + 'bg-2.jpg',
	Gpath + 'bg-3.jpg',
	Gpath + 'e-1.jpg',
	Gpath + 'mc-1.jpg',
	Gpath + 'mc-2.png',
	Gpath + 'mc-3.png',
	Gpath + 'mc-4.png',
	Gpath + 'mc-5.png',
	Gpath + 'mc-6.png',
	Gpath + 'mc-7.png',
	Gpath + 'mc-8.png',
	Gpath + 'video-img.jpg',
	Gpath + 'mir.jpg',
	Gpath + 'mc3.mp4'
);