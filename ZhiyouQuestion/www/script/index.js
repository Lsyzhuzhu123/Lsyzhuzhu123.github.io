
//从本地缓存cookie中取出 petname 值
 var petname = $.cookie('petname');
// alert(petname);

//点击提问按钮
$('#ask').click(function(){
	petname?location.href='ask.html':location.href='login.html';

});

//点击用户图标  判断有没有 petname 决定 user 图片样式和行为
if(petname){
	$('#user').find('span').last().text(petname);
}else{
	$('#user').find('span').last().text('登录').parent().removeAttr('data-toggle').click(function(){
		location.href='login.html';
	});
	
}

//退出登录
$('#logout').click(function(e){
//	e.preventDefault();  将页面的href删除就不需要这句话，若有href就要阻止默认事件
	$.get('/user/logout',function(resData){
		if(resData.code ==1){
			//重新刷新当前页面
			location.reload();
		}
	});
});

//给每个问题点击事件(不能直接使用绑定事件，需要委托事件)
$('.questions').on('click','.media[data-question]',function(){
	// alert('回答：'+$(this).attr('data-question'));
     if(petname){
     	// 要将data-question 的值存到cookie中
     	$.cookie('question',$(this).data('question'));
     	location.href="answer.html";
     }else{
     	location.href="login.html";
     }
})

//获取首页数据
$.get('/question/all',function(resData){
	var htmlStr = '';
	for (var i = 0; i < resData.length; i++) {
		//这里采用Bootstrap 里面的Bootstrap 多媒体对象
		var question = resData[i];
		//最外层
		//new Date(question.time).getTime() 的到的就是毫秒
		htmlStr +='<div class="media" data-question="'+new Date(question.time).getTime()+'">'
		//内层第一块
		htmlStr +='<div class="pull-left"><a>'
		htmlStr += '<img class="media-object" src="../uploads/'+question.petname+'.jpg" onerror="defaultHeaderImage(this)" />'
		htmlStr +='</a></div>'
		//内层第二块
		htmlStr +='<div class="media-body">'
		htmlStr +='<h4 class="media-heading">'+ question.petname +'</h4>'
		htmlStr += question.content
		//question.time是个字符串，而它要的是对象，所以要先转下
		htmlStr +='<div class="media-footing">'+formatdate(new Date(question.time)) +'&#x3000;&#x3000;&#x3000;'+formatIp(question.ip)+'</div>'
		htmlStr +='</div>'
		htmlStr +='</div>';	
		
		if(question.answers){
				//内层 for 循环，遍历问题的答案
			for (var j = 0; j < question.answers.length; j++) {
				var answer = question.answers[j];
				//答案外层
				htmlStr +='<div class="media media-child">'
				//内容第一块
				htmlStr +='<div class="media-body">'
				htmlStr +='<h4 class="media-heading">'+answer.petname+'</h4>'
				htmlStr +=answer.content
				htmlStr +='<div class="media-footing">'+formatdate(new Date(answer.time))+'&#x3000;&#x3000;'+formatIp(answer.ip)+'</div>'
				htmlStr +='</div>',
				//内容第二块
			    htmlStr +='<div class="media-right"><a>'
			    htmlStr += '<img class="media-object" src="../uploads/' +answer.petname+ '.jpg" onerror="defaultHeaderImage(this)" />' //这里的this是实参的，存在的，指的的就是这个本身
		        htmlStr +='</a></div>'
				htmlStr +='</div>'
			}
		}
	   htmlStr +='<hr>'
	}
	$('.questions').html(htmlStr);
});

//封装个方法  解析 date
function formatdate(time){
	var y = time.getFullYear();
	var M = time.getMonth()+1;
	var D = time.getDate();
	var h = time.getHours();
	var m = time.getSeconds();
	M = M < 10 ? '0' + M : M;
	D = D < 10 ? '0' + D : D;
	h = h < 10 ? '0' + h : h;
	m = m < 10 ? '0' + m : m;
	var time = y+'-'+M+'-'+D +' '+h+':'+m;
	return time;
}
//封装个方法  解析 ip
function formatIp(ip){
	if(ip.startsWith('::1')){
		return 'localhost';
	}else{
		return ip.substr(7);
	}
}

function defaultHeaderImage(image){
	$(image).attr('src','../images/user.png');
//	image.src='../images/user.png';
}
