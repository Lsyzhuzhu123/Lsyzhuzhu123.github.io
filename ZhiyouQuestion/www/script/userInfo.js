// 返回上一页

 $('#goback').click(function(){
 	history.go(-1);
 })
 
 // 返回主页
 $('#home').click(function(){
 	location.href = "index.html";
 });
 
//上传头像的请求
$('form').submit(function(event){
	event.preventDefault();
	//获取表单数据
//	var data = $(this).serialize();  数据无法传递过来
    var data = new FormData(this);
	$.post({
		url:'/user/photo',
		data:data,
		contentType:false,
		processData:false,
		success:function(resData){
			$('.modal-body').text(resData.message);
			$('#myModal').modal('show');
		}
	})
})
