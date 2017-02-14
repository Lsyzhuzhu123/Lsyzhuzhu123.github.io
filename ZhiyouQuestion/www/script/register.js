
// 返回上一页

 $('#goback').click(function(){
 	history.go(-1);
 })
 
 // 返回主页
 $('#home').click(function(){
 	location.href = "index.html";
 });
 
 //提交
 $('form').submit(function(event){
 	//阻止默认事件
 	event.preventDefault();
 	// 比较密码和确认密码是否一致
   var passwords = $('input[type=password]').map(function(){
   	return $(this).val();
   });
   if(passwords[0]!=passwords[1]){
     	$('.modal-body').text('两次密码不一致');
   	    $('#myModal').modal('show');
    	return;
   }
   // 发送注册请求
   // var data = new FormData() 原生获取表单数据   js 代码
   //将作用提交的表单元素的值编译成字符串
   var data = $(this).serialize();
   $.post('/user/register',data,function(resData){
   	$('.modal-body').text(resData.message);
   	//'hide.bs.modal':模态框消失时触发该事件
   	$('#myModal').modal('show').on('hide.bs.modal',function(){
   		if(resData.code==3){
   			location.href='login.html';
   		}
   	})
   })
 })
