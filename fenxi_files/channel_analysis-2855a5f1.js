$(".detail_box").css("right",-$(".detail_box").width()-5);

//图表类型数组
var echarts_type_list = [
	'echarts/chart/bar',
	'echarts/chart/line',
	'echarts/chart/pie',
	'echarts/chart/radar',
	'echarts/chart/map'
];
//var host='alpha.adcloud.com';
var host=window.location.host;

var option_bar_list = [
	{
	    tooltip : {
	        trigger: 'item'
	    },
	    grid:{
			x:70,
			y:50,
			x2:100,
			y2:50,
			borderWidth:0
		},
	    xAxis : [
	        {
	            type : 'category',
	            axisLabel:{interval:0},
	            data : [''],
	            axisLine:{
					
				},
				splitLine:{
			　　　　show:false
			　　}
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            axisLine:{
					
				},
				splitNumber:3,
				splitLine:{
			　　　　show:false
			　　}
	        }
	    ],
	    series : [
	        {
	            name:'点击量',
	            type:'bar',
	            data:[''],
	            markPoint : {
	                data : [
	                    
	                ]
	            },
	            markLine : {
	                data : [
	                    
	                ]
	            },
	            itemStyle: {
	                normal: {
	                    color: function(params) {
	                        // build a color map as your need.
	                        var colorList = [
	                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
	                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
	                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
	                        ].reverse();
	                        return colorList[params.dataIndex]
	                    }
	                }
	            }
	        }
	    ]
	}

];

//饼状图配置参数数组
var option_pie_list = [
	{
		
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)",
	        position : [0,0]
	    },
	    legend: {
	        orient : 'vertical',
	        x : 'left',
	        data:[]
	    },
	    //color:['#F7B980','#56C8CA','#B7A3DF','#E9E9E9'],
	    series : [
	        {
	            name:'点击量',
	            type:'pie',
	            radius : ['50%', '70%'],
	            center: ['60%', '50%'],
	            itemStyle : {
	                normal: {
				        label: {show:false},
				        labelLine: {show:false},
				        color:'#ccc'
				        
				    }
	                
	            },
	            data:[
	                {
	                	name:'暂无数据',
	                	value:1,
	                	itemStyle : {
	                		normal : {
						        label : {
						            show : true,
						            position : 'center',
						            formatter : '{b}',
						            textStyle: {
						                baseline : 'bottom',
						                fontSize : 16,
						                color : '#ccc'
						            }
						        },
						        labelLine : {
						            show : false
						        }
						    }
	                	}
	                }
	            ]
	        }
	    ]
	},
	{
		
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)",
	        position : [0,0]
	    },
	    legend: {
	        orient : 'vertical',
	        x : 'left',
	        data:[]
	    },
	    //color:['#F7B980','#56C8CA','#B7A3DF','#E9E9E9'],
	    series : [
	        {
	            name:'点击量',
	            type:'pie',
	            radius : ['50%', '70%'],
	            center: ['60%', '50%'],
	            itemStyle : {
	                normal: {
				        label: {show:false},
				        labelLine: {show:false},
				        color:'#ccc'
				        
				    }
	                
	            },
	            data:[
	                {
	                	name:'暂无数据',
	                	value:1,
	                	itemStyle : {
	                		normal : {
						        label : {
						            show : true,
						            position : 'center',
						            formatter : '{b}',
						            textStyle: {
						                baseline : 'bottom',
						                fontSize : 16,
						                color : '#ccc'
						            }
						        },
						        labelLine : {
						            show : false
						        }
						    }
	                	}
	                }
	            ]
	        }
	    ]
	}
];

//柱状图公共调用 by zy
function load_bar(type,option,bar_id){
	require.config({
	    paths: {
	        echarts: 'http://echarts.baidu.com/build/dist'
	    }
	});
	// 使用
	require(
	    [
			'echarts',
			type
	    ],
	    function (ec) {
			// --- 地图 ---
			var myChart = ec.init(document.getElementById(bar_id));

			myChart.clear();
			myChart.setOption(option, true);

		}
	);
}

var startDate = "";
var endDate = "";
var isload = false;
function getAnalysis(day1,day2){

	if(day1 != '' && day2 != ''){

		var s = new Date(day1);
		var e = new Date(day2);
		var day =s.getTime()-e.getTime();
		$('#day_num').html(Math.abs(Math.floor(day/(24*60*60*1000)))+1);

		startDate = day1;
		endDate = day2;
		getDataList(day1,day2,1,20);

		$.ajax({
	    	url:'http://'+host+'/api/stat/chanalysis?week='+day1+"&yester="+day2,
	    	dataType:'json',
	    	type:'get',

	    	success:function(result){
	            var data = result.data;
	            var chartRes = [];
	            var xList = [];
	            var pieList = [];
	            isload = true;

	            for (var i = 0; i < data.length; i++) {
	            	if( i>9 ){
	            		break;
	            	}
	            	var item = {};
	            	item.name = data[i].title;
	            	item.value = parseInt(data[i].pv);
	            	item.percent = data[i].portion;

	            	chartRes.push(item);

	            	if(data.length>5){
	            		if( i != 0 && (i+1)%2==0 ){
	            			xList.push("\n"+item.name);
	            			pieList.push(item.name);
		            	}else{
		            		xList.push(item.name);
		            		pieList.push(item.name);
		            	}
		            	
	            	}else{
	            		xList.push(item.name);
	            		pieList.push(item.name);
	            	}

	            };

				// if( chartRes.length == 0 && isload ){
				// 	chartRes = [''];
				// 	option_bar_list[0].series[0].markPoint = {};
				// 	option_bar_list[0].series[0].markLine = {};
				// 	option_bar_list[0].xAxis[0].axisLine = {show:true};
				// 	option_bar_list[0].yAxis[0].axisLine = {show:true};
				// }
				if( chartRes.length>0 ){
					option_bar_list[0].series[0].markPoint.data = [{type : 'max', name: '最大值'},{type : 'min', name: '最小值'}];
					option_bar_list[0].series[0].markLine.data = {type : 'average', name: '平均值'};
					option_bar_list[0].xAxis[0].axisLine.show = false;
					option_bar_list[0].yAxis[0].axisLine.show = false;

					option_bar_list[0].series[0].data = chartRes;
	            	option_bar_list[0].series[0].name = "曝光";
	            	option_bar_list[0].tooltip.show = true;

				}else{
					chartRes = [''];
					option_bar_list[0].tooltip.show = false;

					option_bar_list[0].series[0].markPoint = {};
					option_bar_list[0].series[0].markLine = {};
					option_bar_list[0].xAxis[0].axisLine = {show:true};
					option_bar_list[0].yAxis[0].axisLine = {show:true};
				}
				// if( xList.length == 0 && isload ){
				// 	xList = [''];
				// }
				if( xList.length>0 ){
					option_bar_list[0].xAxis[0].data = xList;
				}else{
					option_bar_list[0].xAxis[0].data = [''];
				}

	            
	            
	            
	   //          if( pieList.length == 0 && isload ){
	   //          	var labelTop = {
				// 	    normal : {
				// 	        label : {
				// 	            show : true,
				// 	            position : 'center',
				// 	            formatter : '{b}',
				// 	            textStyle: {
				// 	                baseline : 'bottom',
				// 	                fontSize : 16,
				// 	                color : '#ccc'
				// 	            }
				// 	        },
				// 	        labelLine : {
				// 	            show : false
				// 	        }
				// 	    }
				// 	};
	   //          	option_pie_list[0].series[0].itemStyle.normal.color = "#ccc";
				// 	chartRes = [{name:'暂无数据',value:1,itemStyle : labelTop}];
		        	
				// }else{
					
				// }
				if( pieList.length > 0 ){
					option_pie_list[0].series[0].itemStyle.normal.color = function(params) {
	                        // build a color map as your need.
	                        var colorList = [
	                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
	                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
	                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
	                        ].reverse();
	                        return colorList[params.dataIndex]
	                    }
	                option_pie_list[0].legend.data = pieList;
		            
		            option_pie_list[0].series[0].name = "曝光";
		            option_pie_list[0].series[0].data = chartRes;
		             option_pie_list[0].tooltip.show = true;
		            load_bar(echarts_type_list[2], option_pie_list[0], 'data_box_pie');
		           
				}else{
					option_pie_list[1].tooltip.show = false;
					load_bar(echarts_type_list[2], option_pie_list[1], 'data_box_pie');
				}

				load_bar(echarts_type_list[0], option_bar_list[0], 'data_box_bar');
	            
	    	},
	    	error:function(res){
	    		console.log("error");
	    	}

	    });
	}else if(day1 == '' && day2 == ''){
		var date = new Date();
	    startDate = (new Date(date.setDate(date.getDate() - 7))).Format('yyyy-MM-dd');
	    endDate = (new Date(date.setDate(date.getDate() + 6))).Format('yyyy-MM-dd');
	    $('#start').val(startDate);
	    $('#end').val(endDate);
	    $('#day_num').html('7');

	    getAnalysis(startDate,endDate);
	}
}

var summary = {};
var sortl=""
var orderl = ""
//列表数据
function getDataList(day1,day2,page,offset,sort,order){
	sortl = sort
	orderl = order
	var url = 'http://'+host+'/api/stat/chandata?week='+day1+"&yester="+day2+"&page="+page+"&offset="+offset;
	
	if( !page ){
		page = 1;
	}
	if( !offset ){
		offset = 20;
	}
	if(sort){
		url += "&sort="+sort;
	}
	if(order){
		url += "&order="+order;
	}
	offset = 20;
	//$(".compare_content span input[type='checkbox']").attr("checked",false);
	$.ajax({
    	url:url,
    	dataType:'json',
    	type:'get',

    	success:function(result){
    		 $(".tishi").remove()
            var data = result.data;

            var total = parseInt(data.total);
            var offset = parseInt(data.offset);

            var totalPage = 1;
            if( total <= offset ){
            	totalPage = 1;
            }else{
            	totalPage = Math.floor( (total + (offset - 1)) / offset );
            }
			if(data.count == 0){
				 $(".table-responsive").append("<div class='tishi'>没有符合条件的数据</div>");
				  $(".col_body").empty();
            		$(".summary").empty();
				return
			}
			
            if( checkObj(data) ){
            	var before = data.result;
            	var after = data.momResult;
            	var allSummary = data.allSummary;

            	if( checkObj(before) ){
            		var html = "";
            		var col_arr = ['channel_th_td','pv_th_td','cn_th_td','clickcont_th_td','average_th_td','consumption_th_td'];
            		for( var i in before ){
            			var mompv = before[i].mompv;
            			var momcn = before[i].momcn;
            			var momclickcont = before[i].momclickcont;
            			//var momaverage = before[i].momaverage;
            			var momconsumption = before[i].momconsumption;
            			
            			html += '<tr class="col_row">'+
	                            '<td>'+ '<a href="javascript:;" class="channel_name" id="'+before[i].channel_id+'" >' +before[i].title +'&nbsp;<span class="fa fa-sliders"></span></a></td>';
	                            
	                            html += '<td>'+ before[i].pv +'</td>';
	                            if( mompv != "-" ){
	                            	if( parseFloat(mompv.replace(/%/,""))>0 ){
	                            		html += '<td class="hb_td hb_td_pv red_num">+'+ mompv +'%</td>';
	                            	}else if( parseFloat(mompv.replace(/%/,""))<0 ){
	                            		html += '<td class="hb_td hb_td_pv green_num">'+ mompv +'%</td>';
	                            	}else{
	                            		html += '<td class="hb_td hb_td_pv">'+ mompv +'%</td>';
	                            	}
	                            }else{
	                            	html += '<td class="hb_td hb_td_pv">'+ mompv +'</td>';
	                            }
	                            
	                            html += '<td>'+ before[i].cn +'</td>';
	                            if( momcn != "-" ){
	                            	if( parseFloat(momcn.replace(/%/,""))>0 ){
	                            		html += '<td class="hb_td hb_td_cn red_num">+'+ momcn +'%</td>';
	                            	}else if( parseFloat(momcn.replace(/%/,""))<0 ){
	                            		html += '<td class="hb_td hb_td_cn green_num">'+ momcn +'%</td>';
	                            	}else{
	                            		html += '<td class="hb_td hb_td_cn">'+ momcn +'%</td>';
	                            	}
	                            }else{
	                            	html += '<td class="hb_td hb_td_cn">'+ momcn +'</td>';
	                            }

	                            html += '<td>'+ before[i].consumption +'</td>';
	                            if( momconsumption != "-" ){
	                            	if( parseFloat(momconsumption.replace(/%/,""))>0 ){
	                            		html += '<td class="hb_td hb_td_consumption red_num">+'+ momconsumption +'%</td>';
	                            	}else if( parseFloat(momconsumption.replace(/%/,""))<0 ){
	                            		html += '<td class="hb_td hb_td_consumption green_num">'+ momconsumption +'%</td>';
	                            	}else{
	                            		html += '<td class="hb_td hb_td_consumption">'+ momconsumption +'%</td>';
	                            	}
	                            }else{
	                            	html += '<td class="hb_td hb_td_consumption">'+ momconsumption +'</td>';
	                            }
	                            // html += '<td>'+ before[i].clickcont +'%</td>';
	                            // if( momclickcont != "-" ){
	                            // 	if( parseFloat(momclickcont.replace(/%/,""))>0 ){
	                            // 		html += '<td class="hb_td hb_td_clickcont red_num">+'+ momclickcont +'%</td>';
	                            // 	}else if( parseFloat(momclickcont.replace(/%/,""))<0 ){
	                            // 		html += '<td class="hb_td hb_td_clickcont green_num">'+ momclickcont +'%</td>';
	                            // 	}else{
	                            // 		html += '<td class="hb_td hb_td_clickcont">'+ momclickcont +'%</td>';
	                            // 	}
	                            // }else{
	                            // 	html += '<td class="hb_td hb_td_clickcont">'+ momclickcont +'</td>';
	                            // }
	                            // html += '<td>'+ before[i].average +'</td>';
	                            // if( momaverage != "-" ){
	                            // 	if( parseFloat(momaverage.replace(/%/,""))>0 ){
	                            // 		html += '<td class="hb_td hb_td_average red_num">+'+ momaverage +'%</td>';
	                            // 	}else if( parseFloat(momaverage.replace(/%/,""))<0 ){
	                            // 		html += '<td class="hb_td hb_td_average green_num">'+ momaverage +'%</td>';
	                            // 	}else{
	                            // 		html += '<td class="hb_td hb_td_average">'+ momaverage +'%</td>';
	                            // 	}
	                            // }else{
	                            // 	html += '<td class="hb_td hb_td_average">'+ momaverage +'</td>';
	                            // }
	                            
	                        html += '</tr>';
            		}
            		$(".col_body").html(html);
            	
            		html = "";
            		html += '<tr>'+
            				'<td>全部汇总</td>';

            		html += '<td class="pv_th_td">'+ allSummary[0].pv +'</td>';
                    html += '<td class="sum_hide">&nbsp;</td>';

        			html += '<td class="cn_th_td">'+ allSummary[0].cn +'</td>';
        			html += '<td class="sum_hide">&nbsp;</td>';

        			html += '<td class="consumption_th_td">'+ allSummary[0].consumption +'</td>';
        			html += '<td class="sum_hide">&nbsp;</td>';

           //          html += '<td class="clickcont_th_td">'+ allSummary[0].clickcont +'%</td>';
           //          html += '<td class="sum_hide">&nbsp;</td>';

        			// html += '<td class="average_th_td">'+ allSummary[0].average +'</td>';
        			// html += '<td class="sum_hide">&nbsp;</td>';

            		html += '</tr>';
            		$(".summary").html(html);
            		
            		if( hb_str != "" ){
						var arr = hb_str.split(",");
						for (var i=0;i<arr.length;i++) {
							$(".hb_"+arr[i]).show();
							$(".hb_td_"+arr[i]).show();
							$("."+arr[i]+"_th_td").next().show();
						}
					}
            		
            		//==================================================[分页]
		$.jqPaginator('#pagination', {
            totalPages: parseInt(totalPage),
            visiblePages: 5,
            currentPage: parseInt(data.page),
            first: '',
            last: '',
            prev: '<li class="prev"><a href="javascript:void(0);"> <\/a><\/li>',
            next: '<li class="next"><a href="javascript:void(0);"> <\/a><\/li>',
            page: '<li class="page"><a href="javascript:void(0);"> {{page}}  <\/a><\/li>',
            onPageChange: function (n,y) {
              if(y == "change"){

                getDataList(day1,day2,n,offset,sortl,orderl);
            }
          }
        });
            	}else{
            		$(".col_body").empty();
            		$(".summary").empty();
            	
            	}
            }

    	},
    	error:function(res){
    		console.log("error");
    	}

    });
}


//分页
function page(p){
   $.jqPaginator('#pagination', {
            totalPages: p.total,
            visiblePages: 5,
            currentPage:  p.current,
            first: '',
            last: '',
            prev: '<li class="prev"><a href="javascript:void(0);"> <\/a><\/li>',
            next: '<li class="next"><a href="javascript:void(0);"> <\/a><\/li>',
            page: '<li class="page"><a href="javascript:void(0);"> {{page}}  <\/a><\/li>',
            onPageChange: function (n,y) {
              if(y == "change"){
                 item.page = n
                 dataAjax(item)
            }
          }
        });
 }

// 详情数据
var sorth=""
var orderh = ""
function getDetailList(day1,day2,page,offset,sort,channel_id,order){
	sorth = sort
	orderh = order
	var url = 'http://'+host+'/api/stat/chandetail?week='+day1+"&yester="+day2+"&page="+page+"&offset="+offset+"&cid="+channel_id;
	
	if( !page ){
		page = 1;
	}
	if( !offset ){
		offset = 10;
	}
	if(sort){
		url += "&sort="+sort;
	}
	if(order){
		url += "&order="+order;
	}
	offset = 10;
	$.ajax({
    	url:url,
    	dataType:'json',
    	type:'get',

    	success:function(result){
            var data = result.data;

            var total = parseInt(data.total);
            var offset = parseInt(data.offset);

            var totalPage = 1;
            if( total <= offset ){
            	totalPage = 1;
            }else{
            	totalPage = Math.floor( (total + (offset - 1)) / offset );
            }

            if( checkObj(data) ){
            	var before = data.result;

            	if( checkObj(before) ){
            		var html = "";
            		
            		for( var i=0; i<before.length ; i++ ){
            			html += '<tr class="col_row">'+
	                            '<td>'+ before[i].date +'</td>'+
	                            '<td><a href="javascript:void(0)" class="interval" id="'+ before[i].sharktime_id +'">' + 
	                            '<span>' +before[i].point + '</span><span style="display:none">'+timeInterval(before[i].date, before[i].point, before[i].interval)+'</span>&nbsp;<span class="fa fa-sliders"></span></a></td>'+
	                            '<td>'+ before[i].title +'</td>'+
	                            '<td>'+ before[i].pv +'</td>'+
	                            // '<td>'+ before[i].cn +'</td>'+
	                            // '<td>'+ before[i].clickcont +'</td>'+
	                            '<td>'+ before[i].consumption +'</td>'+
	                        '</tr>';
            		}
            		$(".col_body_detail").html(html);
            		$(".detail_total").html('一共有&nbsp;'+data.total+'&nbsp;条数据');
            		
            		//==================================================[分页]
					// $(".detailPage").createPage({
					//     pageCount: totalPage,
					//     current: data.page,
					//     backFn: function(p) {
					// 		getDetailList(day1,day2,p,offset,sorth,channel_id,orderh);
					//     }
					// });
			$.jqPaginator('.detailPage', {
            totalPages: parseInt(totalPage),
            visiblePages: 5,
            currentPage: parseInt(data.page),
            first: '',
            last: '',
            prev: '<li class="prev"><a href="javascript:void(0);"> <\/a><\/li>',
            next: '<li class="next"><a href="javascript:void(0);"> <\/a><\/li>',
            page: '<li class="page"><a href="javascript:void(0);"> {{page}}  <\/a><\/li>',
            onPageChange: function (n,y) {
              if(y == "change"){

               getDetailList(day1,day2,n,offset,sorth,channel_id,orderh);
            }
          }
        });

            	}else{
            		$(".col_body_detail").empty();
            		$(".detailPage").createPage({
					    pageCount: 1,
					    current: 1,
					    backFn: function(p) {
							getDetailList(day1,day2,p,offset,sorth,channel_id,orderh);
					    }
					});
            	}
            }

    	},
    	error:function(res){
    		console.log("error");
    	}

    });
}

function checkObj(obj){
	var flag = false;
	for(var i in obj){
		flag = true;
	}
	return flag;
}


/**
 * calendar
 * @param callback   回调函数
 */
$.fn.calendar = function(startDate, endDate, maxDate, callback) {
  var defaultDate = new Date().setDate(new Date().getDate());
  var defaultDate2 = new Date().setDate(new Date().getDate());
  var date = new Date().setDate(new Date().getDate() );
  var options = {
    startDate: startDate || new Date(date),
    endDate: endDate || new Date(defaultDate2).Format('yyyy-MM-dd'),
    maxDate: maxDate || new Date(defaultDate).Format('yyyy-MM-dd')
  };
  $(this).val(options.startDate.Format('yyyy-MM-dd') + ' - ' + new Date(options.endDate).Format('yyyy-MM-dd'));
  $(this).daterangepicker(options, function(start, end, label) {
    days(start, end);
   // $('.days').html(end-start-);
    callback && callback(new Date(start).Format('yyyy-MM-dd'), new Date(end).Format('yyyy-MM-dd'));
  });
};

/**
 * @name days
 * @param start 起始日期
 * @param end   结束日期
 * 用来计算时间筛选的天数
 */
function days(start, end) {
  var s = new Date(start);
  var e = new Date(end);
  var day = s.getTime() - e.getTime();
  var num = (Math.abs(Math.floor(day / (24 * 60 * 60 * 1000))) );
  $('.days').html('共' + num + '天数据').show();

}
 function init(start, end, s) {
  if(s ==  undefined){
    $(".data_line_top span").removeClass("cur")
    $("#reservation").css("border","1px solid #e67e22")
  }
     s_date = start
     e_date = end
     getAnalysis(s_date,e_date);
 }

var data_list = {};
var hb_str = "";
var s_date;
var e_date;
var u_type = "time";
$(document).ready(function () {
	setLeftMenu("投放分析");

	var date = new Date().setDate(new Date().getDate() - 6)
var defaultStart = new Date(date).Format('yyyy-MM-dd')
    defaultEnd = new Date(new Date().setDate(new Date().getDate())).Format('yyyy-MM-dd');
    $('#reservation').calendar(new Date(defaultStart),new Date(defaultEnd), null, init);
     
   s_date = defaultEnd;
   e_date = defaultEnd;
   getAnalysis(s_date,e_date);
//时间切换
 $(".data_line_top span:gt(0)").click(function(){
    $(".data_line_top span").removeClass("cur")
    $("#reservation").css("border","1px solid #ececec")
    $(this).addClass("cur")
    var  n_d = $(this).attr("date")
    switch(n_d){
      case "0": 
           d = new Date(new Date().setDate(new Date().getDate())).Format('yyyy-MM-dd');
           init(d, d, 0);
           $('#reservation').calendar(new Date(d),new Date(d), null, init);
           break;
      case "1":
           d = new Date(new Date().setDate(new Date().getDate()-1)).Format('yyyy-MM-dd');
           init(d, d, 0);
           $('#reservation').calendar(new Date(d),new Date(d), null, init);
           break;
      case "7":
           d = new Date(new Date().setDate(new Date().getDate()-6)).Format('yyyy-MM-dd');
           init(d, defaultEnd,0);
           $('#reservation').calendar(new Date(d),new Date(defaultEnd), null, init);
           break;
    }
  })

    //展开收起走势图
    $('#tabShow').on('click', function() {
	    var obj = $('#tabShow').find('.fa');
	    if (!obj.hasClass('icon-down')) {
	        obj.prev('span').html('展开');
	        obj.removeClass('icon-up').addClass('icon-down');
	        $('.charts_box').slideToggle(400);
	    } else {
	        obj.prev('span').html('收起');
	        obj.removeClass('icon-down').addClass('icon-up');
	        $('.charts_box').slideToggle(400);
	    }
    })

    $('.t_cl').on('click', function() {
	    $(this).next('div').toggle();
	});

	// 显示比较指标浮层
	var oDiv = $(".compare_content");
	$(".compare>span").on("click",function(){
		if( $(this).hasClass("fa-caret-down") ){
			$(this).removeClass("fa-caret-down");
			$(this).addClass("fa-caret-up");
			oDiv.css("display","block");
			oDiv.animate(
			{
				opacity: 1
			},
			500,
			function() {
				oDiv.css("display","block");
				/* stuff to do after animation is complete */
			});
			oDiv.removeClass("hide_");
			oDiv.addClass("show_");
		}else if( $(this).hasClass("fa-caret-up") ){
			$(this).removeClass("fa-caret-up");
			$(this).addClass("fa-caret-down");
			oDiv.animate(
			{
				opacity: 0
			},
			500,
			function() {
				/* stuff to do after animation is complete */
				oDiv.css("display","none");
			});
			oDiv.removeClass("show_");
			oDiv.addClass("hide_");
		}

		event.stopPropagation();
	});

	// 比较指标
	var evTimeStamp = 0;
	$(".compare_content span input[type='checkbox']").on("click",function(event){
		var now = new Date();
        if (now - evTimeStamp < 100) {
        	event.stopPropagation();
            return;
        }

		if( $(this).attr("checked") == "checked" ){
			var cla = $(this).attr("class");

			$(this).attr("checked",false);
			$(".hb_"+cla).hide();
			$(".hb_td_"+cla).hide();
			$("."+cla+"_th_td").next().hide();
			
			hb_str = hb_str.replace(","+cla,"");
			hb_str = hb_str.replace(cla,"");
		}else{
			var cla = $(this).attr("class");

			$(this).attr("checked",true);
			$(".hb_"+cla).show();
			$(".hb_td_"+cla).show();
			$("."+cla+"_th_td").next().show();
			
			if( hb_str == "" ){
				hb_str += cla;
			}else{
				hb_str += ",";
				hb_str += cla;
			}

		}

		evTimeStamp = now;
		event.stopPropagation();
	});
	
	// 排序
	$(".fa").on("click",function(){
			var parent_class = $(this).parent().attr("class");
		if( !$(this).hasClass("detail_desc") ){
			if( $(this).hasClass("sort_desc") ){
				$(".col_title .fa").removeClass("sort_asc");
				$(".col_title .fa").removeClass("sort_desc");
				$(".col_title .fa").addClass("sort_desc");
				$(this).removeClass("sort_desc");
				$(this).addClass("sort_asc");
				getDataList(startDate,endDate,1,20,parent_class,"asc");
			}else if( $(this).hasClass("sort_asc") ){
				$(".col_title .fa").removeClass("sort_asc");
				$(".col_title .fa").removeClass("sort_desc");
				$(".col_title .fa").addClass("sort_desc");
				$(this).removeClass("sort_asc");
				$(this).addClass("sort_desc");
		
				getDataList(startDate,endDate,1,20,parent_class,"desc");
			}
		}
		
	});
	// 明细排序
	$("body").on("click",".detail_desc",function(){
		if( $(this).hasClass("sort_desc") ){
			$(".col_title_detail .fa").removeClass("sort_asc");
			$(".col_title_detail .fa").removeClass("sort_desc");
			$(".col_title_detail .fa").addClass("sort_desc");
			
			$(this).removeClass("sort_desc");
			$(this).addClass("sort_asc");
			
			var parent_class = $(this).parent().attr("class");
			
			getDetailList(startDate,endDate,1,10,parent_class,now_channel,"asc");
		}else if( $(this).hasClass("sort_asc") ){
			$(".col_title_detail .fa").removeClass("sort_asc");
			$(".col_title_detail .fa").removeClass("sort_desc");
			$(".col_title_detail .fa").addClass("sort_desc");
			
			$(this).removeClass("sort_asc");
			$(this).addClass("sort_desc");
			
			getDetailList(startDate,endDate,1,10,sorth,now_channel,"desc");
		}
	});

	// 隐藏比较指标
//	$(document).on('click', function(event) {
//
//		var oDiv = $(".compare_content");
//		oDiv.animate(
//		{
//			opacity: 0
//		},
//		1000,
//		function() {
//			/* stuff to do after animation is complete */
//		});
//		oDiv.removeClass("show_");
//		oDiv.addClass("hide_");
//
//	});
	
	var now_channel = "";
	// 点击频道名称
	$(".col_body").on("click",".channel_name",function(){
		if( $("#detail_box") ){
			$("#detail_box").remove();
		}
		
		var top_str = "";
		if( $(document).scrollTop()>$('header').height() ){
			top_str = "top:0;"
		}else{
			top_str = 'top:'+(55-$(document).scrollTop())+'px;';
		}
		var html = "";
		html += '<div class="detail_box" id="detail_box" style="'+ top_str +'">';
	        html += '<div class="member_show_tab">收起明细</div>';
	        html += '<div class="detail_top">';
	            html += '媒体分析<span class="j_right">></span>投放明细(<span id="detail_name"></span>)';
	        html += '</div>';
		    html += '<div class="panel panel-default tablebox" style="margin-bottom:10px;padding: 0px 20px;border-style: none;">';
		        
		        html += '<div class="table_head"><span id="detail_start"></span> 至 <span id="detail_end" style="margin-right: 20px;"></span>共<span id="detail_day"></span>天投放明细：</div>';
				html += '<div class="panel-heading" style="border:0px;border-bottom: 1px solid #D7D7D7;height:1px;background: #fff;padding: 0;margin: 0;"></div>';
		        html += '<div class="panel-body">';
		            
		            html += '<div class="table-responsive">';
		                html += '<table class="table table-striped table-bordered table-hover">';
		                    html += '<thead>';
		                        html += '<tr class="col_title_detail">';
		                            html += '<th>投放日期</th>';
		                            html += '<th class="point">时间';
		                                html += '<em class="fa sort_desc detail_desc"></em>';
		                            html += '</th>';
		                            html += '<th class="title">栏目';
		                                html += '<em class="fa sort_desc detail_desc"></em>';
		                            html += '</th>';
		                            html += '<th class="pv">曝光';
		                                html += '<em class="fa sort_desc detail_desc"></em>';
		                            html += '</th>';
		                            // html += '<th class="cn">点击量';
		                            //     html += '<em class="fa sort_desc detail_desc"></em>';
		                            // html += '</th>';
		                            // html += '<th class="clickcont">点击率';
		                            //     html += '<em class="fa sort_desc detail_desc"></em>';
		                            // html += '</th>';
		                            html += '<th class="consumption">总消费(元)';
		                                html += '<em class="fa sort_desc detail_desc"></em>';
		                            html += '</th>';
		
		                        html += '</tr>';
		                    html += '</thead>';
		                    html += '<tbody class="col_body_detail">';
		
		                    html += '</tbody>';
		                    
		                html += '</table>';
		            html += '</div>';
		            
		        html += '</div>';
		        html += '<div class="panel-footer">';
		            html += '<div class="detailPage"></div>';
		            html += '<div class="detail_total fl"></div>';
		        html += '</div>';
		    html += '</div>';
		    
	    html += '</div>';
		$("body").append(html);

		var id = $(this).attr("id");
		now_channel = id;
		getDetailList(startDate,endDate,1,10,false,id);
		
		$("body").append('<div class="back_mask"></div>');
		$(".detail_box").show();
		$(".detail_box").css("right","0");
		// 详情
		$("#detail_name").html( $(this).text().trim() );
	    $("#detail_start").html( startDate );
	    $("#detail_end").html( endDate );
	    var s = new Date(startDate);
		var e = new Date(endDate);
		var day = s.getTime() - e.getTime();
		var num = (Math.abs(Math.floor(day / (24 * 60 * 60 * 1000)))+1 );
	    $("#detail_day").html( num );

		if( $(".detail_box").css("position") == "fixed" ){
			$(".detail_box").css("top", $("header").height()-$(document).scrollTop()+"px" );
			$(".detail_box").css("height", $(window).height()-$("header").height()+$(document).scrollTop() );
		}
		if( $(document).scrollTop() > $("header").height() ){
			$(".detail_box").css("top", "0px" );
			$(".detail_box").css("height", $(window).height() );
		}

		//收起详情
		$(".member_show_tab").click(function(){
		    $(".detail_box").css("right",-$(".detail_box").width()-5);
	        $('.back_mask').remove();
		});
	})
	document.onscroll=mouseWheel;
	
	function mouseWheel(){
		if( $(document).scrollTop() > $("header").height() ){
			$(".detail_box").css("top", "0px" );
			$(".detail_box").css("height", $(window).height() );
	    }else{
	    	$(".detail_box").css("top", $("header").height()-$(document).scrollTop()+"px" );
			$(".detail_box").css("height", $(window).height()-$("header").height()+$(document).scrollTop() );
	    }
	}
	
	$("body").on("click",".interval",function(){
		var id = $(this).attr("id");
		var date = $(this).parent().prev().text();
		var time = $(this).find("span").eq(0).text();
		var start = date+"+"+time;
		var end = date+"+"+$(this).find("span").eq(1).text();
		createViewCon($('body'),date,time,start,end,id,now_channel,"fixed",false);
	})

	$('#reservation').calendar(null,null,null,init);

});

//# sourceMappingURL=channel_analysis.js.map