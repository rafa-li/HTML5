windou.onload=function () {
	var lis_hd=document.getElementsByClassName("tab-hd-item");
	for(i=0; i<lis.lenght;i++){
		lis[i].mouseover=function() {
			var lis_td=document.getElementsByClassName("col-news");
				lis_td[i].className="col-news dis";
		}
	}
}