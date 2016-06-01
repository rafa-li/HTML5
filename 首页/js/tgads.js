var tgAds = function(e) {
	this.info = e.info,
	this.pics = [],
	this.imgs = [],
	this.btns = [],
	this.now = 0,
	this.adBtnBox = null ,
	this.box = typeof(e.box) == "string" ? document.getElementById(e.box) : e.box,
	this.autoRun = null ,
	this.onBtns = !1,
	e.pgv && (this.pgv = e.pgv),
	this.u = "http://ossweb-img.qq.com/upload/adw/",
	this.ggID = e.ggID,
	this.ing = !0,
	this.mouse = e.mouse,
	this.pUl = null ,
	this.loadjs("http://game.qq.com/time/qqadv/Info_new_" + e.ggID + ".js", this.letsGo, this)
};
tgAds.prototype.loadjs = function(e, t, n) {
	var r = document.createElement("script")
	  , i = "src"
	  , s = "text/javascript";
	r.setAttribute(i, e),
	r.setAttribute("type", s),
	document.body.appendChild(r),
	(navigator.userAgent.indexOf("MSIE") == -1 ? !1 : !0) ? r.onreadystatechange = function() {
		if (this.readyState && this.readyState == "loading")
			return;
		t(n)
	}
	 : r.onload = function() {
		t(n)
	}
	,
	r.onerror = function() {}
},
tgAds.prototype.getUrlVar = function(url,name){
	var vars = [],
		hash;
	var hashes = url.slice(url.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars[name];
}
,
tgAds.prototype.innerPC = function() {
	var e = document.createElement("div"),
		sendPhp = 'http://apps.game.qq.com/adw_sendclick/api/send_click.php?show_ads=',
		showAdList = [];
	e.className = "adPic",
	this.adBtnBox = document.createElement("div"),
	this.adBtnBox.className = "adBtn";
	for (var t = 0; t < this.info.length; t++) {
		var n = document.createElement("a"),
			f = this.oDataNew["pos" + this.info[t]],
			ggid = this.ggID,
			ddid = this.info[t],
			strHref = f[1],
			strlistdate = f[8],
			pgv = this.pgv,
			/*点击上报增加tas_code上报*/
			tas_code = this.getUrlVar(strHref, 'e_code');
		n.title = decodeURIComponent(this.oDataNew["pos" + this.info[t]][0]),
		n.href = this.oDataNew["pos" + this.info[t]][1],
		n.i = t,
		n.target = "_blank";
		n.onclick = function() {
			pgv && pgvSendClick({hottag:pgv + (this.i + 1)});
			var iImgObj = new Image();
			iImgObj.onload = function() {
				iImgObj = null;
			};
			iImgObj.onerror = function() {
				iImgObj = null;
			};
			iImgObj.src = 'http://apps.game.qq.com/adw_sendclick/api/send_click.php?channel_id=' + ggid + '&banner_id=' + ddid + '&ad_id=' + strlistdate + '&tas_code=' + tas_code + '&ad_url=' + encodeURIComponent(strHref) + '&js_type=1&click_type=2&t=' + (new Date()).getTime()
		};
		t == 0 ? n.style.left = "0" : n.style.left = "100%";
		var r = document.createElement("img");
		if (t < 2)
			r.src = this.u + this.oDataNew["pos" + this.info[t]][2];
		else {
			r.setAttribute("rel", this.u + this.oDataNew["pos" + this.info[t]][2]);
			var i = document.createElement("p");
			i.innerHTML = '<span class="loadI">' + decodeURIComponent("%E6%AD%A3%E5%9C%A8%E5%8A%A0%E8%BD%BD%E4%B8%AD%E2%80%A6%E2%80%A6") + "</span>",
			n.appendChild(i)
		}
		var s = document.createElement("a");
		s.title = decodeURIComponent(this.oDataNew["pos" + this.info[t]][0]),
		s.href = "javascript:void(0)",
		s.innerHTML = t + 1,
		this.rollFnCtr(s, t),
		s.hideFocus = "true",
		n.appendChild(r),
		e.appendChild(n),
		this.adBtnBox.appendChild(s),
		this.pics.push(n),
		this.btns.push(s),
		this.imgs.push(r);
		if (tas_code == null || tas_code == undefined) {
			tas_code = this.getUrlVar(strHref, 'tas_code');
			if (tas_code == null || tas_code == undefined) {
				tas_code = 0;
			}
		}
		
		if (strlistdate == null || strlistdate == undefined) {
			strlistdate = 0;
		}
		var showAdInfo = ggid + '.' + ddid + '.' + strlistdate + '.' + tas_code;
		showAdList.push(showAdInfo);
	}
	var ShowAdStr = showAdList.join("|"),UrlHost = window.location.host;
	if (UrlHost == "x5.qq.com" || UrlHost == "cf.qq.com") {
		var ShowUrl = 'http://apps.game.qq.com/eas/comm/eas.php?m=SendLog&show_ads=' + ShowAdStr + '&click_type=1&t=' + (new Date()).getTime();
	} else {
		var ShowUrl = 'http://apps.game.qq.com/adw_sendclick/api/send_click.php?show_ads=' + ShowAdStr + '&js_type=1&click_type=1&t=' + (new Date()).getTime();
	};
	this.loadjs(ShowUrl, function() {

	});
	this.btns[this.now].className = "on",
	this.box.appendChild(e),
	this.box.appendChild(this.adBtnBox)
}
,
tgAds.prototype.rollFn = function(e) {
	if (this.now == e)
		return;
	e == this.info.length && (e = 0),
	this.imgs[e].src == "" && (this.imgs[e].src = this.imgs[e].getAttribute("rel"));
	if (e > this.now) {
		for (var t = this.now + 1; t < e; t++)
			this.pics[t].style.left = "-100%";
		this.goLeft(this.pics[this.now], this.pics[e], e)
	} else {
		for (var t = e + 1; t < this.now; t++)
			this.pics[t].style.left = "100%";
		this.goRight(this.pics[this.now], this.pics[e], e)
	}
	for (var t = 0; t < this.btns.length; t++)
		this.btns[t].className = "";
	this.btns[e].className = "on"
}
,
tgAds.prototype.goLeft = function(e, t, n) {
	e.style.left = 0,
	t.style.left = "100%",
	this.ing = !1;
	var r = 10
	  , i = this;
	(function() {
		e.style.left = (r - 11) * 10 + "%",
		t.style.left = (r - 1) * 10 + "%",
		r--,
		r > 0 ? setTimeout(arguments.callee, 15) : (i.now = n,
		i.autoRun === null  && i.onBtns != 1 && (i.autoRun = setTimeout(function() {
			i.rollFn(i.now + 1),
			i.stopFn()
		}
		, 4e3)),
		i.ing = !0)
	}
	)()
}
,
tgAds.prototype.goRight = function(e, t, n) {
	e.style.left = 0,
	t.style.left = "-100%",
	this.ing = !1;
	var r = 10
	  , i = this;
	(function() {
		e.style.left = (11 - r) * 10 + "%",
		t.style.left = -(r - 1) * 10 + "%",
		r--,
		r > 0 ? setTimeout(arguments.callee, 15) : (i.now = n,
		i.autoRun === null  && i.onBtns != 1 && (i.autoRun = setTimeout(function() {
			i.rollFn(i.now + 1),
			i.stopFn()
		}
		, 4e3)),
		i.ing = !0)
	}
	)()
}
,
tgAds.prototype.stopFn = function() {
	clearTimeout(this.autoRun),
	this.autoRun = null 
}
,
tgAds.prototype.rollFnCtr = function(e, t) {
	var n = this;
	n.mouse ? e.onmouseover = function() {
		if (!n.ing)
			return;
		n.rollFn(t - 0),
		n.stopFn()
	}
	 : e.onclick = function() {
		if (!n.ing)
			return;
		n.rollFn(t - 0),
		n.stopFn()
	}
}
,
tgAds.prototype.start = function(e) {
	if (!event.touches.length)
		return;
	e.x = event.touches[0].pageX
}
,
tgAds.prototype.move = function(e) {
	event.preventDefault();
	if (!event.touches.length)
		return;
	e.moveW = event.touches[0].pageX - e.x,
	e.pUl.style.webkitTransform = "translateX(" + (e.dist + e.moveW) + "px)"
}
,
tgAds.prototype.end = function(e) {
	if (e.lastW && e.lastW == e.moveW)
		return;
	e.lastW = e.moveW,
	e.liW = e.pics[0].offsetWidth;
	if (e.moveW < 0 && e.now < e.info.length - 1) {
		e.now++;
		if (e.now < e.info.length - 1) {
			var t = e.imgs[e.now + 1];
			t.src == "" && (t.src = t.getAttribute("rel"))
		}
	}
	e.moveW > 0 && (e.now = e.now == 0 ? 0 : e.now - 1),
	e.dist = -e.now * e.liW,
	e.pUl.style.webkitTransform = "translateX(" + e.dist + "px)";
	for (var n = 0; n < e.btns.length; n++)
		e.btns[n].className = "";
	e.btns[e.now].className = "on"
}
,
tgAds.prototype.innerI = function() {
	var e = document.createElement("div");
	e.className = "adBtn",
	this.pUl = document.createElement("ul"),
	this.pUl.style.width = (this.info.length + 1) * 100 + "%",
	this.pUl.className = "adPicUl";
	for (var t = 0; t < this.info.length; t++) {
		var n = document.createElement("li")
		  , r = document.createElement("a")
		  , i = document.createElement("img");
		t < 2 ? i.src = this.u + this.oDataNew["pos" + this.info[t]][2] : i.setAttribute("rel", this.u + this.oDataNew["pos" + this.info[t]][2]),
		r.title = decodeURIComponent(this.oDataNew["pos" + this.info[t]][0]),
		this.pgv ? r.setAttribute("onclick", "window.open('" + this.oDataNew["pos" + this.info[t]][1] + "');pgvSendClick({hottag:'" + this.pgv + (t + 1) + "'});") : r.setAttribute("onclick", "window.open('" + this.oDataNew["pos" + this.info[t]][1] + "')"),
		r.appendChild(i),
		n.appendChild(r),
		n.style.width = 1 / (this.info.length + 1) * 100 + "%",
		this.pUl.appendChild(n);
		var s = document.createElement("a");
		s.hideFocus = "true",
		s.innerHTML = t + 1,
		e.appendChild(s),
		this.pics.push(r),
		this.btns.push(s),
		this.imgs.push(i)
	}
	this.btns[this.now].className = "on",
	this.box.appendChild(this.pUl),
	this.box.appendChild(e),
	this.pUl.addEventListener("touchstart", function() {
		var e = this;
		return function() {
			e.start(e)
		}
	}
	.apply(this), !1),
	this.pUl.addEventListener("touchmove", function() {
		var e = this;
		return function() {
			e.move(e)
		}
	}
	.apply(this), !1),
	this.pUl.addEventListener("touchend", function() {
		var e = this;
		return function() {
			e.end(e)
		}
	}
	.apply(this), !1)
}
,
tgAds.prototype.letsGo = function(e) {
	e.oDataNew = window["oDaTaNew" + e.ggID];
	if (typeof e.info == "string") {
		e.info2 = [];
		for (var t in e.oDataNew)
			if (e.oDataNew[t][5] == e.info) {
				var n = {};
				n.num = e.oDataNew[t][6],
				n.name = t,
				e.info2.push(n)
			}
		e.info2.sort(function(e, t) {
			return e.num - t.num
		}
		),
		e.info = [];
		for (var r = 0; r < e.info2.length; r++)
			e.info.push(e.info2[r].name.replace(new RegExp("pos"), ""))
	}
	navigator.userAgent.toLowerCase().indexOf("ipad") < 0 && navigator.userAgent.toLowerCase().indexOf("iphone") < 0 && navigator.userAgent.toLowerCase().indexOf("android") < 0 ? (e.innerPC(),
	e.autoRun = setTimeout(function() {
		e.rollFn(e.now + 1),
		e.stopFn()
	}
	, 4e3),
	e.box.onmouseover = function() {
		e.stopFn(),
		e.onBtns = !0
	}
	,
	e.box.onmouseout = function() {
		e.autoRun = setTimeout(function() {
			e.rollFn(e.now + 1),
			e.stopFn()
		}
		, 4e3),
		e.onBtns = !1
	}
	) : e.innerI()
}
/*rukkihuang 2012-9-26 130620update*/
/*  |xGv00|e071786efef5940e03d7b274c652f1db */