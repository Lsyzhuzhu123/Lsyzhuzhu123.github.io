
// 返回上一页

 $('#goback').click(function(){
 	history.go(-1);
 });
 
 // 返回主页
 $('#register').click(function(){
 	location.href = "register.html";
 });
 
//提交
 $('form').submit(function(event){
 	//阻止默认事件
 	event.preventDefault();
 
   // 发送登录请求
   // var data = new FormData() 原生获取表单数据   js 代码
   //将作用提交的表单元素的值编译成字符串
   var data = $(this).serialize();
   $.post('/user/login',data,function(resData){
   	$('.modal-body').text(resData.message);
   	 $('#myModal').modal('show');
   	//'hide.bs.modal':模态框消失时触发该事件
   	$('#myModal').modal('show').on('hide.bs.modal',function(){
   		if(resData.code==3){
   			location.href='index.html';
   		}
   	})
   })
 })
