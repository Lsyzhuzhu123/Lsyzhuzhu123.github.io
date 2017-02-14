// 返回上一页

 $('#goback').click(function(){
 	history.go(-1);
 })
 
 // 返回主页
 $('#home').click(function(){
 	location.href = "index.html";
 });
 
//从 cookie获取要回答问题的参数 question(文件名)
var question = $.cookie('question');
//alert(question);
$('form').submit(function(event){
	event.preventDefault();
	var data = $(this).serialize();
	console.log(data);
	$.post('/question/answer',data,function(resData){
		$('.modal-body').text(resData.message);
		$('#myModal').modal('show').on('hide.bs.modal',function(){
			if(resData ==2){
				location.href='/';
			}
		})
	});
})
