(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();
				//上一页
				if(args.current > 1){

					obj.append('<a href="javascript:void(0);" class="prevPage"></a>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled1" ></span>');/*xx*/
				}
				//中间页码
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
				}
				if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				var start = args.current -2,end = parseInt(args.current)+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
						}else{
							obj.append('<span class="current">'+ start +'</span>');
						}
					}
				}
				if(parseInt(args.current) + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
				}
				//下一页
				if(args.current < args.pageCount){
					obj.append('<a href="javascript:;" class="nextPage"></a>');
				}else{
					obj.remove('.nextPage');
					obj.append('<span class="disabled2"></span>');
				}
				//跳转
			
				// if(args.pageCount==1){
				// 	obj.append("<label>跳转到：</label><input type='text' name='page' class='numtext'/><input type='button' name='go' value='GO' class='go' disabled/>");
				// }else{
				// 		obj.append("<label>跳转到：</label><input type='text' name='page' class='numtext'/><input type='button' name='go' value='GO' class='go'/>");
				// }
			
			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.off("click");
				$(".numtext").unbind("keydown");
				obj.on("click","a.tcdNumber",function(){
					var current = parseInt($(this).html());
					ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
						//Tajax($(".seaName").val(),0,gid,p);
					}
				});
				//上一页
				obj.off("click","a.prevPage")
				obj.on("click","a.prevPage",function(){
					var current = parseInt(obj.children("span.current").html());
					ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
					
					if(typeof(args.backFn)=="function"){
						
						args.backFn(current-1);
					}
				});
				//下一页
				obj.off("click","a.nextPage");
				obj.on("click","a.nextPage",function(){
					var current = parseInt(obj.children(".current").html());
					ms.fillHtml(obj,{"current":parseInt(current)+1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1);
					}
				});
				//go
				obj.on("click",".go",function(){
					if(obj.children(".numtext").val()!=""){
						var num=obj.children(".numtext").val();
						if(isNaN(num))
						{
							return false;
						}
						if(num<1)
							num=1;
						else if(num>args.pageCount)
						num=args.pageCount;
						var current = parseInt(num);
						if(current>args.pageCount){
	                    	return;
	                    }
						ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
						if(typeof(args.backFn)=="function"){
							args.backFn(current);
						}
					}
				});
				obj.on("keydown",".numtext",function(event){
                    if(event.keyCode=="13"){
					   $(".go").click();
					}
				});
				
			})();
		}
	}
	$.fn.createPage = function(options){
		var args = $.extend({
			pageCount : 10,
			current : 1,
			backFn : function(){}

		},options);
		ms.init(this,args);
	}
})(jQuery);
//# sourceMappingURL=page.js.map