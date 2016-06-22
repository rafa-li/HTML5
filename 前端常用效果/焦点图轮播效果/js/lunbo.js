window.onload = function () {
	var container = document.getElementById('container');
	var list = document.getElementById('list');
	var	buttons = document.getElementById('buttons').getElementsByTagName('span');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var index = 1;
	var animated = false;


// 小圆点对应图片亮起
	function showButton() {
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].className == 'on') {
				buttons[i].className = '';
				break;
			}

		}
		buttons[index - 1].className = 'on';
	}
//切换功能
	function animate(offset) {
		animated = true;
		var newleft= parseInt(list.style.left) + offset;
		var time = 300;//位移总时间
		var interval = 10;//位移间隔时间
		var speed = offset/(time/interval);//每次位移量
		function go() {
			if ( (speed < 0 && parseInt(list.style.left) > newleft) || (speed > 0 && parseInt(list.style.left) < newleft) )  {
				list.style.left = parseInt(list.style.left) + speed + 'px';
				setTimeout(go,interval);
			}
			else{
				animated = false;
				list.style.left = newleft + 'px';
				if (newleft > -300) {
					list.style.left = -1800 +'px';
				}
				if (newleft < -1800) {
					list.style.left = -300 + 'px';
				}
			}
		}
		go();
	}

//点击小圆点切换
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function () {
			if (this.className == 'on') {
				return;
			}
			var myIndex = parseInt(this.getAttribute('index'));
			var offset = -300 * (myIndex-index);
			if (!animated) {	
				animate(offset);
				index = myIndex;
				showButton();
			}
		}
	}	

	//自动播放功能
	function play() {
		timer = setInterval(function () {
			next.onclick();
		},3000);
	}
	function stop() {
		clearInterval(timer);
	}

next.onclick = function(){
		if (index == 6) {
			index = 1;
		}
		else{
			index += 1;
		}
		showButton();
		if (!animated) {
			animate(-300);
		}
		
	}
prev.onclick = function(){
		if (index == 1) {
			index = 6;
		}
		else{
			index -= 1;
		}
		showButton();
		if (!animated) {
			animate(300);
		}
		
	}

container.onmouseover = stop;
container.onmouseout = play;
play();

}