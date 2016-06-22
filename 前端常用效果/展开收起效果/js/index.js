//原生js实现点击展开收起效果：

// function showdiv() {
// 	document.getElementById('hpn').style.display = "block";
// 	document.getElementById('strHref').innerHTML = "收起-";
// 	document.getElementById('strHref').href = "javascript:hidediv()";
// }

// function hidediv() {
// 	document.getElementById('hpn').style.display = "none";
// 	document.getElementById('strHref').innerHTML = "更多选项+";
// 	document.getElementById('strHref').href = "javascript:showdiv()";
// }

//jquery实现展开收起动画效果,需使用1.8.0之前的jQuery版本
$(document).ready(function() {
    $("#strHref").toggle(function() {
        $("#strHref").text("收起-");

        $("#hpn").show(1000);
    }, function() {
        $("#strHref").text("显示更多+");
        $("#hpn").hide(1000);
    });
});

//广告自动显示及隐藏
var h = 0;

function addH() {
    if (h < 534) {
        h += 2;
        document.getElementById('ad').style.height = h + "px";
    } else {
        return;
    }
    setTimeout('addH()', 10);
}

function subH() {
    if (h > 0) {
        h -= 2;
        document.getElementById("ad").style.height = h + "px";
    } else {
        document.getElementById('ad').style.display = 'none';
    }
    setTimeout('subH()', 10);
}

window.onload = function showAds() {
    addH();
    setTimeout("subH()", 5000);
}

//nextSibling:放回某个元素之后紧跟的元素（处于同一树层级）
//previousSibling:放回某节点之前紧跟的节点（处于同一树层级）
//包含众多空格作为文本节点，因此在我们使用nextSibling和previousSibling时就会出现问题。
//因为FireFox会把文本节点误当做元素节点的兄弟节点来处理。我们可以添加nodeType来判断。
//当上一节点或者是下一节点为文本节点时，就继续寻找，直到找到下一个元素节点。
//  其中nodeType的值主要有以下几种：
// 
// 元素节点的nodeType值为1
// 属性节点的nodeType值为2
// 文本节点的nodeType值为3
function showdiv(obj) {
    var x = obj.parentNode.nextSibling;
    if (x.nodeType != 1) {
        x = x.nextSibling;
    }
    x.style.display = "block";
    obj.parentNode.style.display = "none";
}

function hidediv(obj) {
    obj.parentNode.parentNode.style.display = "none";
    var x = obj.parentNode.parentNode.previousSibling;
    if (x.nodeType != 1) {
        x = x.previousSibling;
    }
    x.style.display = "block";
}
