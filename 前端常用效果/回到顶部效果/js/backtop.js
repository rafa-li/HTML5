window.onload = function () {
	var obtn = document.getElementById('btn');
	var clientHeight = document.documentElement.clientHeight;
	var timer = null;
	var istop = true;

	//判断回到顶部滚动中用户是否滚动鼠标滚轮
	window.onscroll = function () {
		//设置滚动大于800时显示回到顶部按钮
		var ostop = document.documentElement.scrollTop || document.body.scrollTop ;
		if (ostop > 800) {
			obtn.style.display = 'block';
		}else{
			obtn.style.display = 'none';
		}

		 if (!istop) {
		 	clearInterval(timer);
		 }
		 istop = false;
	}

	obtn.onclick = function () {
		//设置定时器
		timer = setInterval(function () {		
		//获取滚动条到顶部的高度
		var ostop = document.documentElement.scrollTop || document.body.scrollTop ;
		var speed = Math.floor(-ostop/5);
		document.documentElement.scrollTop = document.body.scrollTop = ostop+speed;
		console.log( ostop-speed)
		istop = true;
		if (ostop == 0) {
			clearInterval(timer);
		}
		},30)
	}

}
