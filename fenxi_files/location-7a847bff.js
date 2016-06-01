//图表类型数组
var echarts_type_list = [
	'echarts/chart/bar',
	'echarts/chart/line',
	'echarts/chart/pie',
	'echarts/chart/radar',
	'echarts/chart/map'
];
//var host='alpha.adcloud.com';
// var host=window.location.host;
var host='tvmapi.mall.beta.cctvmall.cn';
var advid = 371;

var option_map_list = [
	{
	    tooltip : {
	        trigger: 'item'
	    },
	    dataRange: {
	    	show:true,
	        min: 1,
	        max: 654321,
	        x: 'left',
	        y: 'bottom',
	        text:['高','低'],           // 文本，默认为数值文本
	        calculable : true,
            hoverLink:false
	    },

	    series : [

	        {
	            name: '曝光',
	            type: 'map',
	            mapType: 'china',
	            itemStyle:{
	                normal:{label:{show:false}},
	                emphasis:{label:{show:false}}
	            },
	            data:[
	                {name: '北京',value: Math.round(Math.random()*1000)}
	            ]
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
				        color: '#ccc'
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
function getAnalysis(day1,day2){

	if(day1 != '' && day2 != ''){

		var s = new Date(day1);
		var e = new Date(day2);
		var day =s.getTime()-e.getTime();
		$('#day_num').html(Math.abs(Math.floor(day/(24*60*60*1000)))+1);

		startDate = day1;
		endDate = day2;
		getDataList(day1,day2,1,10);

		$.ajax({
	   		url:'http://'+host+'/stats/loctrend?advid='+advid+'&tr_start='+day1+"&tr_end="+day2,
	    	//url:'http://'+host+'/api/stat/location?startDate='+day1+'&endDate='+day2+'&page=1&limit=100&levelType=1&order=desc',
	    	dataType:'json',
	    	type:'get',

	    	success:function(result){
	            var data = result.data;
	            var chartRes = [];
	            var pieList = [];
	            var pieData = [];
                option_map_list[0].dataRange.max = "2500";

				if(data && data.length>0){
					for (var i = 0; i < data.length; i++) {
		            	var item = {};
		            	item.name = data[i].name.replace(/省/,'').replace(/市/,'').replace(/自治区/,'').replace(/壮族/,'').replace(/回族/,'').replace(/维吾尔/,'');
		            	item.value = parseInt(data[i].pv);
		            	chartRes.push(item);
						if(i<10){
							pieList.push(item.name);
							pieData.push(item);
						}

		            };

					option_map_list[0].dataRange.max =chartRes[0].value.toString();
				}

	            option_map_list[0].series[0].data = chartRes;

	   //          if( pieList.length == 0 ){
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
				// 	option_pie_list[0].legend.data = pieList;
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


                    option_pie_list[0].series[0].name = "曝光";
                    option_pie_list[0].legend.data = pieList;
                    option_pie_list[0].tooltip.show = true;
                    option_map_list[0].tooltip.show = true;
                }else{
                	option_pie_list[0].tooltip.show = false;
                	option_map_list[0].tooltip.show = false;
                    var labelTop = {
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
                    };
                    option_pie_list[0].series[0].itemStyle.normal.color = "#ccc";
                    option_pie_list[0].legend.data = [];
                    pieData = [{name:'暂无数据',value:1,itemStyle : labelTop}];
                }
                option_pie_list[0].series[0].data = pieData;

	            load_bar(echarts_type_list[4], option_map_list[0], 'data_box_map');
	            load_bar(echarts_type_list[2], option_pie_list[0], 'data_box_pie');
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
//列表数据
var sortl =""
var orderl = ""
function getDataList(day1,day2,page,offset,sort,order){
	var url = 'http://'+host+'/stats/loctrend?advid='+advid+'&tr_start='+day1+"&tr_end="+day2+'&levelType=2';
	sortl = sort
	orderl =order
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
	//$(".compare_content span input[type='checkbox']").attr("checked",false);
	$.ajax({
    	url:url,
    	dataType:'json',
    	type:'get',

    	success:function(result){
    		 $(".tishi").remove()
            var data = result.data;
            var total = parseInt(data.total);
            var offset = 10;

            var totalPage = 1;
            if( total <= offset ){
            	totalPage = 1;
            }else{
            	totalPage = Math.floor( (total + (offset - 1)) / offset );
            }

            if( checkObj(data) ){
            	 $(".tishi").remove()
            	var before = data; // list;
            	// var allSummary = data.summary;

            	if( checkObj(before) ){
            		var html = "";
            		//var col_arr = ['channel_th_td','pv_th_td','cn_th_td','clickcont_th_td','average_th_td','consumption_th_td'];
                    var col_arr = ['channel_th_td','pv_th_td','cn_th_td','clickcont_th_td','consumption_th_td'];    //
            		for( var i=0;i<before.length;i++ ){
                        var clickcont = before[i].clickcont;


                        var mompv = before[i].mompv;
            			var momcn = before[i].momcn;
                        var momclickcont = before[i].momclickcont;
            			var momconsumption = before[i].momconsumption;

            			html += '<tr class="col_row">'+
	                            //'<td style="width:18%">' +before[i].name +'</td>';//<div class="area_div">
	                           '<td style="text-align:left;width:18%">'+ '<div class="area_div"><a href="javascript:;" class="area_name fa fa-caret-right" id="'+before[i].area_id+'_3" ></a>&nbsp;' +before[i].name +'</div></td>';

                                html += '<td>'+ before[i].pv +'</td>';
                                if( mompv != "-" && mompv != undefined){
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
	                            if( momcn != "-" && momcn != undefined){
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
                                if( momconsumption != "-" && momcn != undefined ){
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

                                // html += '<td>'+ clickcont +'%</td>';
                                // if( momclickcont != "-" && momclickcont != undefined){
                                //     if( parseFloat(momclickcont.replace(/%/,""))>0 ){
                                //         html += '<td class="hb_td hb_td_clickcont red_num">+'+ momclickcont +'%</td>';
                                //     }else if( parseFloat(momclickcont.replace(/%/,""))<0 ){
                                //         html += '<td class="hb_td hb_td_clickcont green_num">'+ momclickcont +'%</td>';
                                //     }else{
                                //         html += '<td class="hb_td hb_td_clickcont">'+ momclickcont +'%</td>';
                                //     }
                                // }else{
                                //     html += '<td class="hb_td hb_td_clickcont">'+ momclickcont +'</td>';
                                // }

	                            // html += '<td>'+ before[i].average +'</td>';
	                            // if( momaverage != "-" && momcn != undefined ){
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

           //          var clickcont = allSummary.clickcont;
           //          if(clickcont == 0 || clickcont == "0"){
           //              clickcont += "%";
           //          }
           //  		html = "";
           //  		html += '<tr>'+
           //  				'<td>全部汇总</td>';

           //  		html += '<td class="pv_th_td">'+ allSummary.pv +'</td>';
           //          html += '<td class="sum_hide">&nbsp;</td>';

        			// html += '<td class="cn_th_td">'+ allSummary.cn +'</td>';
        			// html += '<td class="sum_hide">&nbsp;</td>';

           //          html += '<td class="consumption_th_td">'+ allSummary.consumption +'</td>';
           //          html += '<td class="sum_hide">&nbsp;</td>';

           //          // html += '<td class="clickcont_th_td">'+ clickcont +'%</td>';
           //          // html += '<td class="sum_hide">&nbsp;</td>';

        			// // html += '<td class="average_th_td">'+ allSummary.average +'</td>';
        			// // html += '<td class="sum_hide">&nbsp;</td>';

           //  		html += '</tr>';
           //  		$(".summary").html(html);

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
            currentPage: parseInt(page),
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

            }else{
            	 $(".table-responsive").append("<div class='tishi'>没有符合条件的数据</div>");
            	$(".col_body").empty();
            	$(".summary").empty();

            }

    	},
    	error:function(res){
    		console.log("error");
    	}

    });
}

//列表数据
function getAreaList(start,end,pid,level,obj,This){
	if(pid == "undefined") {return}
	var url = 'http://'+host+'/stats/loctrend?area_id='+pid+"&levelType="+level+"&tr_start="+start+"&tr_end="+end;

	$.ajax({
    	url:url,
    	dataType:'json',
    	type:'get',

    	success:function(result){
            var before = result.data.list;

            if( checkObj(before) ){
        		var html = "";
        		//var col_arr = ['channel_th_td','pv_th_td','cn_th_td','clickcont_th_td','average_th_td','consumption_th_td'];
                var col_arr = ['channel_th_td','pv_th_td','cn_th_td','clickcont_th_td','consumption_th_td'];
        		for( var i in before ){
                    var clickcont = before[i].clickcont;
                    // if(clickcont == 0 || clickcont == "0"){
                    //   clickcont += "%";
                    // }

                    var mompv = before[i].mompv;
                    var momcn = before[i].momcn;
        			var momclickcont = before[i].momclickcont == undefined ? "-" : before[i].momclickcont;
        			//var momaverage = before[i].momaverage;
        			var momconsumption = before[i].momconsumption;

        			if(level == 3){
        				html += '<tr class="col_row area_name_'+pid+'" id="'+before[i].area_id+'" style="background:#E8F5F6">';
        				html += '<td style="text-align:left;border-top:0;border-bottom:0;">'+ '<div class="area_div" style="margin-left:30px;">&nbsp;&nbsp;<a href="javascript:;" '
        				html +=  before[i].name == "其它" ?  'class="area_name fa"' : 'class="area_name fa fa-caret-right"'
        				html +=' id="'+before[i].area_id+'_4" ></a>&nbsp;' +before[i].name +'</div></td>';
        			}else if(level == 4){
        				html += '<tr class="col_row area_name_'+pid+' area_name_'+before[i].area_id+'" style="background:#D7EEF8">';
        				html += '<td style="text-align:left;border-top:0;border-bottom:0;">'+ '<div class="area_div" style="margin-left:50px;">&nbsp;&nbsp;&nbsp;&nbsp;' +before[i].name +'</div></td>';
        			}

                        var hb_td = "hb_td";

                        if( hb_str.indexOf("pv") != -1 ){
                            hb_td = "";
                        }else{
                            hb_td = "hb_td";
                        }
                        html += '<td style="border-top:0;border-bottom:0;">'+ before[i].pv +'</td>';
                        if( mompv != "-" && mompv != undefined){
                            if( parseFloat(mompv.replace(/%/,""))>0 ){
                                html += '<td class="'+hb_td+' hb_td_pv red_num" style="border-top:0;border-bottom:0;">+'+ mompv +'%</td>';
                            }else if( parseFloat(mompv.replace(/%/,""))<0 ){
                                html += '<td class="'+hb_td+' hb_td_pv green_num" style="border-top:0;border-bottom:0;">'+ mompv +'%</td>';
                            }else{
                                html += '<td class="'+hb_td+' hb_td_pv" style="border-top:0;border-bottom:0;">'+ mompv +'%</td>';
                            }
                        }else{
                            html += '<td class="'+hb_td+' hb_td_pv" style="border-top:0;border-bottom:0;">'+ mompv +'</td>';
                        }

                        if( hb_str.indexOf("cn") != -1 ){
                        	hb_td = "";
                        }else{
                        	hb_td = "hb_td";
                        }
                        html += '<td style="border-top:0;border-bottom:0;">'+ before[i].cn +'</td>';
                        if( momcn != "-" && momcn != undefined){
                        	if( parseFloat(momcn.replace(/%/,""))>0 ){
                        		html += '<td class="'+hb_td+' hb_td_cn red_num" style="border-top:0;border-bottom:0;">+'+ momcn +'%</td>';
                        	}else if( parseFloat(momcn.replace(/%/,""))<0 ){
                        		html += '<td class="'+hb_td+' hb_td_cn green_num" style="border-top:0;border-bottom:0;">'+ momcn +'%</td>';
                        	}else{
                        		html += '<td class="'+hb_td+' hb_td_cn" style="border-top:0;border-bottom:0;">'+ momcn +'%</td>';
                        	}
                        }else{
                        	html += '<td class="'+hb_td+' hb_td_cn" style="border-top:0;border-bottom:0;">'+ momcn +'</td>';
                        }

                        // if( hb_str.indexOf("clickcont") != -1 ){
                        //     hb_td = "";
                        // }else{
                        //     hb_td = "hb_td";
                        // }
                        // html += '<td style="border-top:0;border-bottom:0;">'+ clickcont+"%" +'</td>';
                        // if( momclickcont != "-" && momclickcont != undefined){
                        //     if( parseFloat(momclickcont.replace(/%/,""))>0 ){
                        //         html += '<td class="'+hb_td+' hb_td_clickcont red_num" style="border-top:0;border-bottom:0;">+'+ momclickcont +'%</td>';
                        //     }else if( parseFloat(momclickcont.replace(/%/,""))<0 ){
                        //         html += '<td class="'+hb_td+' hb_td_clickcont green_num" style="border-top:0;border-bottom:0;">'+ momclickcont +'%</td>';
                        //     }else{
                        //         html += '<td class="'+hb_td+' hb_td_clickcont" style="border-top:0;border-bottom:0;">'+ momclickcont +'%</td>';
                        //     }
                        // }else{
                        //     html += '<td class="'+hb_td+' hb_td_clickcont" style="border-top:0;border-bottom:0;">'+ momclickcont +'</td>';
                        // }

                        // if( hb_str.indexOf("average") != -1 ){
                        // 	hb_td = "";
                        // }else{
                        // 	hb_td = "hb_td";
                        // }
                        // html += '<td style="border-top:0;border-bottom:0;">'+ before[i].average +'</td>';
                        // if( momaverage != "-" && momcn != undefined ){
                        // 	if( parseFloat(momaverage.replace(/%/,""))>0 ){
                        // 		html += '<td class="'+hb_td+' hb_td_average red_num" style="border-top:0;border-bottom:0;">+'+ momaverage +'%</td>';
                        // 	}else if( parseFloat(momaverage.replace(/%/,""))<0 ){
                        // 		html += '<td class="'+hb_td+' hb_td_average green_num" style="border-top:0;border-bottom:0;">'+ momaverage +'%</td>';
                        // 	}else{
                        // 		html += '<td class="'+hb_td+' hb_td_average" style="border-top:0;border-bottom:0;">'+ momaverage +'%</td>';
                        // 	}
                        // }else{
                        // 	html += '<td class="'+hb_td+' hb_td_average" style="border-top:0;border-bottom:0;">'+ momaverage +'</td>';
                        // }

                        if( hb_str.indexOf("consumption") != -1 ){
                        	hb_td = "";
                        }else{
                        	hb_td = "hb_td";
                        }
                        html += '<td style="border-top:0;border-bottom:0;">'+ before[i].consumption +'</td>';
                        if( momconsumption != "-" && momcn != undefined ){
                        	if( parseInt(momconsumption.replace(/%/,""))>0 ){
                        		html += '<td class="'+hb_td+' hb_td_consumption red_num" style="border-top:0;border-bottom:0;">+'+ momconsumption +'%</td>';
                        	}else if( parseInt(momconsumption.replace(/%/,""))<0 ){
                        		html += '<td class="'+hb_td+' hb_td_consumption green_num" style="border-top:0;border-bottom:0;">'+ momconsumption +'%</td>';
                        	}else{
                        		html += '<td class="'+hb_td+' hb_td_consumption" style="border-top:0;border-bottom:0;">'+ momconsumption +'%</td>';
                        	}
                        }else{
                        	html += '<td class="'+hb_td+' hb_td_consumption" style="border-top:0;border-bottom:0;">'+ momconsumption +'</td>';
                        }
                    html += '</tr>';
        		}
        		if( !This.hasClass("fa-caret-right") )
        		$(obj).after(html);

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
	    event.stopPropagation();
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
				/* stuff to do after animation is complete */
				oDiv.css("display","block");
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
		if( !$(this).hasClass("detail_desc") ){
			if( $(this).hasClass("sort_desc") ){
				$(".col_title .fa").removeClass("sort_asc");
				$(".col_title .fa").removeClass("sort_desc");
				$(".col_title .fa").addClass("sort_desc");

				$(this).removeClass("sort_desc");
				$(this).addClass("sort_asc");

				var parent_class = $(this).parent().attr("class");

				getDataList(startDate,endDate,1,10,parent_class,"asc");
			}else if( $(this).hasClass("sort_asc") ){
				$(".col_title .fa").removeClass("sort_asc");
				$(".col_title .fa").removeClass("sort_desc");
				$(".col_title .fa").addClass("sort_desc");

				$(this).removeClass("sort_asc");
				$(this).addClass("sort_desc");

				getDataList(startDate,endDate,1,10,false,"desc");
			}
		}

	});

	//级联
	$(".col_body").on("click",".fa-caret-down",function(){
		var pid = $(this).attr("id").split("_")[0];
		$(".area_name_"+pid).each(function(){
			var id = $(this).attr("id");
			$(".area_name_"+id).remove();
		});
		$(".area_name_"+pid).remove();

		$(this).removeClass("fa-caret-down");
		$(this).addClass("fa-caret-right");
		event.stopPropagation();

	});
	$(".col_body").on("click",".fa-caret-right",function(){
		var pid = $(this).attr("id").split("_")[0];
		var level = $(this).attr("id").split("_")[1];
		var obj = $(this).parent().parent().parent();
		getAreaList(startDate,endDate,pid,level,obj,$(this));
		$(this).removeClass("fa-caret-right");
		$(this).addClass("fa-caret-down");
		event.stopPropagation();

	});

	$('#reservation').calendar(null,null,null,init);

});

//# sourceMappingURL=location.js.map