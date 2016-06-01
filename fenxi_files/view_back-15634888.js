var host=$("#adcloud-url").val();
var pHost =""; //回看url
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
var echarts_type_list = [
	'echarts/chart/bar',
	'echarts/chart/line',
	'echarts/chart/pie'
];

var sexPie=[];
var sbPie=[];
var cityBar=[];
var cityNum=[];
//获取回看饼图及柱状图数据
function getViewSexData(sharktimeid,pid){

	sexPie=[];
	sbPie=[];
	cityNum=[];
	cityBar=[];
	//男女饼图
	$.ajax({
		url:'/api/audience?sharktimeid='+sharktimeid+'&pid='+pid,
		dataType:"json",
		type:"get",
		async:false,
		success:function(res){
           if(res.code==3000){
           	sexPie.push(res.data.m);
           	sexPie.push(res.data.w);
            res.data.o !=undefined ? sexPie.push(res.data.o) : sexPie.push(0);
           }else{
           	sexPie.push(0);
           	sexPie.push(0);
            sexPie.push(0);
           }
		}
	});

    //设备饼图
	$.ajax({
		url:'/api/equipment?sharktimeid='+sharktimeid+'&pid='+pid,
		dataType:"json",
		type:"get",
		async:false,
		success:function(res){
           if(res.code==3000){
           	sbPie.push(res.data.ios);
           	sbPie.push(res.data.and);
             res.data.o !=undefined ? sbPie.push(res.data.o) : sbPie.push(0);
           }else{
           	sbPie.push(0);
           	sbPie.push(0);
            sbPie.push(0);
           }
		}
	});

	//地区柱状图
	$.ajax({
		url:'/api/area?sharktimeid='+sharktimeid+'&pid='+pid,
		dataType:"json",
		type:"get",
		async:false,
		success:function(res){
           if(res.code==3000){
            if(res.data == ""){
              cityBar.push("");
              cityNum.push(0);
            }
            else{
              for(var name in res.data){
              	cityBar.push(name);
              	cityNum.push(res.data[name]);
              }
              }
           }

		}
	});
}

//创建回看内容
/**
 * createViewCon
 * @param parent    父级容器对象
 * @param date      起始日期 如:2015-10-10
 * @param time      起始时 间 如:15:51:00
 * @param start     开始时间格式date+time 如 2015-10-10+15:51:00
 * @param end       结束时间格式date+time 如 2015-10-10+15:51:00
 * @param id        sharkTimeId  摇一摇ID
 * @param chid      频道ID
 * @param position  css样式  绝对或相对定位
 * @param is_mark   是否有遮罩层
 */
 var j ={}
function createViewCon(parent,date,time,start,end,id,chid,position,is_mark,pid){
    j={
      "parent" : parent,
      "date" : date,
      "time" : time,
      "start" : start,
      "end" : end,
      "id" : id,
      "chid" : chid,
      "position" : position,
      "is_mark" : is_mark,
      "pid":pid
    }
   if($(".back_view")){
   	  $(".back_view").remove();
   }

   	var pos_str = "";
	if(position && position != ''){
		pos_str = "position:"+position+";";
	}

	var top_str = "";
	if( $(document).scrollTop()>$('header').height() ){
		top_str = "top:0;"
	}else{
		top_str = 'top:'+(55-$(document).scrollTop())+'px;';
	}
	var box_shadow = "box-shadow:-3px 0px 3px #000;";

	if( position == "absolute" ){
		top_str = "top:0;"
		box_shadow = "";
	}
    var html=  '<div class="back_view" style="right:-1000px;'+ top_str + pos_str + box_shadow + "" +'">';
    html+='<div class="p_show_tab">收起回看</div>';
    html+='<div class="view_top">';
    html+='<div class="view_video">';
    html+='<div class="video_tit" id="video_tit">';
    html+='</div>';
    html+='<div class="video_player" id="player">';
    html+='</div>';
    html+='</div>';
    html+='<div class="view_count">';
    html+='<div class="v_c_t">';
    html+='<div class="c_t_l">';
    html+='<span>用户属性</span>';
    html+='<div id="pie_chart_viewer" class="chart-pie flot-chart" style="width:98%;height:80%;"></div>';
    html+='</div>';
    html+='<div class="c_t_r">';
    html+='<span>设备系统</span>';
    html+='<div id="pie_chart_system" class="chart-pie flot-chart" style="width:98%;height:80%;"></div>';
    html+='</div>';
    html+='</div>';
    html+='<div class="v_c_d" id="bar_chart_area"></div>';
    html+='</div>';
    html+='</div>';
    html+='<div class="view_down">';
    html+='<div style="float:left;color:#aaa" id="userall"></div>'
    html+='<div class="v-tab" style="display:none">' +
           // '<div class="tabList">'+
           // '<span>全部地区<em class="fa fa-chevron-down"></em></span></div>'+
            '<div class="tabList"><span id="sel_1">不限性别<em class="fa fa-chevron-down"></em></span>'+
            '<ul class="tabType"><li rel="null">不限</li><li rel="1">男</li><li rel="2">女</li></ul>'+'</div>'+
            '<div class="tabList"><span id="sel_2">不限手机系统<em class="fa fa-chevron-down"></em></span>'+
            '<ul class="tabType"><li rel="null">不限</li><li rel="6">iOS</li><li rel="7">Android</li></ul></div>'+
        '</div>';
    //html+='<ul id="jMenu">'+
    //    '<li><a class="fNiv">全部地区</a>'+
    //   '<ul>'+
    //    '<li class="arrow"></li>'+
    //    '<li><a>北京</a>'+
    //    '<ul>'+
    //    '<li><a>朝阳</a></li>'+
    //'<li><a>海淀</a>'+
    //'<ul>'+
    //'<li><a>中关村</a></li>'+
    //'<li><a>海淀</a>'+
    //'<ul>'+
    //'<li><a>Category 1.5</a></li>'+
    //'<li><a>Category 1.5</a></li>'+
    //'<li><a>Category 1.5</a>'+
    //'<ul>'+
    //'<li><a>Category 1.6</a></li>'+
    //'<li><a>Category 1.6</a></li>'+
    //'<li><a>Category 1.6</a></li>'+
    //'<li><a>Category 1.6</a></li>'+
    //'<li><a>Category 1.6</a></li>'+
    //'</ul>'+
    //'</li>'+
    //'</ul>'+
    //'</li>'+
    //'<li><a>Category 1.4</a></li>'+
    //'<li><a>Category 1.4</a></li>'+
    //'</ul>'+
    //'</li>'+
    //'<li><a>Category 1.3</a></li>'+
    //'</ul>'+
    //'</li>'+
    //'<li><a>天津</a></li>'+
    //'<li><a>上海</a>'+
    //'<ul>'+
    //'<li><a>浦东</a>'+
    //'<ul>'+
    //'<li><a>Category 1.4</a></li>'+
    //'<li><a>Category 1.4</a></li>'+
    //'</ul>'+
    //'</li>'+
    //'</ul>'+
    //'</li>'+
    //'<li><a>重庆</a></li>'+
    //'</ul>'+
    //'</li>'+
    //'<li><a class="fNiv">性别</a>'+
    //    '<ul>'+
    //    '<li class="arrow"></li>'+
    //    '<li><a>不限</a>'+
    //    '</li>'+
    //    '<li><a>男</a>'+
    //    '</li>'+
    //    '<li><a>女</a>'+
    //    '</li>'+
    //    '</ul>'+
    //    '</li>'+
    //    '<li><a class="fNiv">手机系统</a>'+
    //    '<ul>'+
    //    '<li class="arrow"></li>'+
    //    '<li><a>不限</a>'+
    //    '</li>'+
    //    '<li><a>ios</a>'+
    //    '</li>'+
    //    '<li><a>android</a>'+
    //    '</li>'+
    //    '</ul>'+
    //    '</li>'+
    //    '</ul>';
    html+='<div class="v_d_con" >';
    html+='<ul id="people_ul">';
    html+='</ul>';
    html+='<div class="panel-body loader-demo" id="d-loader" style="position: fixed;  margin-left: 30%; margin-top: 5%; display: none;">';
    html+='<div class="ball-pulse-sync">';
    html+='<div></div>';
    html+='<div></div>';
    html+='<div></div>';
    html+='</div>';
    html+='</div>';
    html+='<div class="people_right" >';
    html+='<div class="people_bar" >';
    html+='<div class="p_bar"></div>';
    html+='</div>';
    html+='</div>';
    html+='</div>';
    html+='</div>';
    html+='</div>';

    if( position != "absolute" && is_mark )
	html+='<div class="back_mask"></div>';
    $(parent).append(html);

    $(".back_view").css("right",-$(".back_view").width());

	if( $(".back_view").css("position") == "fixed" ){
		$(".back_view").css("top", $("header").height()-$(document).scrollTop()+"px" );
		$(".back_view").css("height", $(window).height()-$("header").height()+$(document).scrollTop() );
	}
	if( $(document).scrollTop() > $("header").height() ){
		$(".back_view").css("top", "0px" );
		$(".back_view").css("height", $(window).height() );
	}

    document.onscroll=mouseWheel;

	function mouseWheel(){
		if( $(document).scrollTop() > $("header").height() ){
			$(".back_view").css("top", "0px" );
			$(".back_view").css("height", $(window).height() );
	    }else{
	    	$(".back_view").css("top", $("header").height()-$(document).scrollTop()+"px" );
			$(".back_view").css("height", $(window).height()-$("header").height()+$(document).scrollTop() );
	    }
	}

  $(".back_view").css("right",-$(".back_view").width()).show();
	//收起回看
	$(".p_show_tab").click(function(){
	   jwplayer("player").pause(true);

	   $(".back_view").css("right",-$(".back_view").width()-5);
	   if($(".back_mask") && is_mark){
	   	  $('.back_mask').remove();
	   }
	});

	var vWidth=$(".video_player").width();
	var vHeight=$(".video_player").height();
    //读取饼图 柱状图数据
    getViewSexData(id,pid);
    //饼状图配置参数数组
    var option_pie_list = [
      {//观众属性
        color:['#5ab1ef','#d87a80','#e9e9e9'],
          calculable : true,
          tooltip : {
             trigger: 'item',
             formatter: "{a} <br/>{b} :{c} ({d}%)",
             position: [0, 0]
          },

          series : [
              {
                  name:'用户属性',
                  type:'pie',
                  radius : ['50%', '70%','5%'],

                  itemStyle : {
                      normal : {
                          label : {
                              show : false
                          },
                          labelLine : {
                              show : false
                          }

                      },
                      emphasis : {
                          label : {
                              show : true,
                              position : 'center',
                              textStyle : {
                                  fontSize : '20',
                                  fontWeight : 'bold'
                              }
                          }
                      }
                  },
                  data:(function(){
                    var sexarr=[];
                    var mJson={value:sexPie[0],name:"男"};
                    var wJson={value:sexPie[1],name:"女"};
                    var oJson={value:sexPie[2],name:"其他"};
                    sexarr.push(mJson);
                    sexarr.push(wJson);
                    sexarr.push(oJson);
                    return sexarr;
                  })()

              }
          ]

      },
      {//设备属性
        color:['#2ec7c9','#ffb980','#e9e9e9'],
          calculable : true,
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} :{c} ({d}%)",
               position: [0, 0]
          },
          series : [
              {
                  name:'设备属性',
                  type:'pie',
                  radius : ['50%', '70%'],

                  itemStyle : {
                      normal : {
                          label : {
                              show : false
                          },
                          labelLine : {
                              show : false
                          }

                      },
                      emphasis : {
                          label : {
                              show : true,
                              position : 'center',
                              textStyle : {
                                  fontSize : '20',
                                  fontWeight : 'bold'
                              }
                          }
                      }
                  },
                  data:(function(){
                    var sbarr=[];
                    var iosJson={value:sbPie[0],name:"iOS"};
                    var andJson={value:sbPie[1],name:"Android"};
                    var oxJson={value:sbPie[2],name:"其他"};
                    sbarr.push(iosJson);
                    sbarr.push(andJson);
                    sbarr.push(oxJson);
                    return sbarr;
                  })()
              }
           ]
      }
    ];
    //地区热度柱状图
    var option_bar_list2 =[
      {// 回看 地区热度图
          //backgroundColor: '#fff',
          tooltip : {
              trigger: 'item'
          },
          grid:{
          x:60,
          y:10,
          x2:10,
          y2:30,
          borderWidth:0
        },

          toolbox: {
              show : false,
              feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {show: true, type: ['line', 'bar']},
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  axisLine:{
              show:false
            },
            splitLine:{
          　　　　show:false
          　　},
                  axisLabel : {
              textStyle:{
                color:'#fff'
              }
            },

                  data :(function(){
                    if(cityBar.length==0){
                      cityBar.push("");
                    }

                    return cityBar;
                  })()
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  axisLine:{
                  show:false
            },
            splitLine:{
          　　　　show:false
          　　},
                  axisLabel : {
              textStyle:{
                color:'#fff'
              }
            }
              }
          ],
          series : [
              {
                  name:'热点地区',
                  type:'bar',
                  barMaxWidth:30,
                        barGap: 30,
                        barCategoryGap : 20,
                  data:(function(){
                    if(cityNum.length==0){
                      cityNum.push(0);
                    }

                    return cityNum;
                  })()
              }
          ]
      }
    ];
    load_bar( echarts_type_list[2], option_pie_list[0], "pie_chart_viewer" );

    load_bar( echarts_type_list[2], option_pie_list[1], "pie_chart_system" );

    load_bar( echarts_type_list[0], option_bar_list2[0], "bar_chart_area" );

    $(".back_view").css("right","0");

    jwplayer("player").setup({
        playlist: [{
            file:'../../../playlists/test_001/stream.m3u8',
            provider:'/assets/lib/Angle3.0/vendor/jwplayer6/HLSProvider6.swf',
            type: 'mp4'
        }],
        width: vWidth,
        height: vHeight,
        primary: "flash",
        aspectratio: "16:9",
        controls: true,
        logo: {
            hide: false
        },
        abouttext: "TVM ENCODER v1.0",
        aboutlink: "#"
    });
    setTimeout(function(){
    	getM3u8(start, end);
    }, 1000);


    //$('#video_tit').html('<span class="v_t_1">栏目回看('+date+' '+time+')</span><span class="v_t_2">查看栏目基本情况</span>')

      //头像
    $("#people_ul").empty();
    var faceOffset=null;
    var loadKey = 0;
    var adcloudUrl = $('#adm-url').val();
    adcloudUrl = '';
    //var adcloudUrl = 'http://dsp.tvm.cn'
    var $offset =0; //页码
    var loadHtml = '';
    var target =[];
    var page= 0;
    if(j.pid){
       var pHost =adcloudUrl+'/api/tsdetail?&sharktimeid='+id+'&start=&end=&limit=84&pid='+j.pid; //url
    }else{
       var pHost =adcloudUrl+'/api/tsdetail?&sharktimeid='+id+'&start=&end=&limit=84'; //url
    }

    $.ajax({
          url:pHost+'&offset=0',
          type:"get",
          dataType:"json",
          success:function(data){
            $("#d-loader").hide();
              if(data.code == 0){
                  $('.v-tab').hide(); //回看筛选显示
                  faceOffset=getoffset(data);
                  createList(data);
              }else{

                  $("#people_ul").html('<div class="backbox"><p>加载失败了...再给一次机会吧？<a href="javascript:createViewCon(j.parent,j.date,j.time,j.start,j.end,j.id,j.chid,j.position,j.is_mark)">重试</a></p> </div>');
              }
          },
          beforeSend:function(xmlHttpRequest){
              $("#d-loader").show();
          },
          error:function(){
              //console.log('error')
              $("#d-loader").hide();
              $("#people_ul").html('暂无数据');
          }
    });

      //加载头像 offset
    function loadLi(data){
      if(loadKey !=0){
          return false;
      }
      loadKey =1;
      $offset = data.data.offset;
      if($offset == 0){
        return
      }
      var $sharking = data.data.sharking;
      var loadUrl = pHost+'&offset='+$offset + '&sharking=' + $sharking ;
       target == "" || target == undefined  ? "" : loadUrl = loadUrl + '&target=' + target
       var $total = data.data.total;
       var $total_page = Math.ceil(parseInt($total)/84);
      //console.log(loadUrl);
        page++;

        if($total_page != page){
            $.ajax({
                url:loadUrl,
                type:"get",
                dataType:"json",
                beforeSend:function(xmlHttpRequest){
                    $("#d-loader").show();
                },
                success:function(data){
                    $("#d-loader").hide();
                    if(data.code == 0){
                        if($sharking !=""){

                            faceOffset=getoffset(data);
                            createList(data);
                            loadKey =0;
                        }
                    }
                }
            });
        }

    }

    function getoffset(obj){
       return obj;
    }

    if($("#people_ul li").length==0){

          var times=setInterval(function(){
              if($("#people_ul li").length !=0){
                  var ulP=$("#people_ul").height();
                  $(".p_bar").height(ulP/90);
                  // scrollBar($(".view_down").get(0),$(".v_d_con").get(0),$("#people_ul").get(0),$(".people_bar").get(0),
                  //     $(".p_bar").get(0),$(".people_right"),function(){
                  //      // alert("a")

                  //         loadLi(faceOffset);
                  //     });

              $(".v_d_con").scroll(function () {
                  console.log(1111)
                 var scrollTop = $(this).scrollTop();
                 var scrollHeight = $("#people_ul").height();
                 var windowHeight = $(this).height();
                 if (scrollTop + windowHeight >= scrollHeight) {
                    //$("#d-loader").show();
                        loadLi(faceOffset);
                    }
                 });
                  clearInterval(times);
              }
          },100);
    }
    function createList(data){
          var $data = data.data.list;
          var $sex = '';
          var $os = '';
          var str="";
          if(data.code == 0){
            $("#userall").html('曝光用户 <span style="color:#fcbe52">'+data.data.total + '</span> ')
              $.each($data,function(i,v){
                  var $created = $created =v.created.substring(11,19);
                  if(v.sex == 1){
                      $sex = '<span class="p_sex"></span>';
                  }else if(v.sex == 2){
                      $sex = '<span class="p_girl"></span>';
                  }else{
                      $sex ='';
                  }
                  if(v.os == 6){
                      $os = 'iOS';
                  }else{
                      $os = 'Android';
                  }

                    var name = v.nickname == undefined ? "" : v.nickname
                    var phone = v.phone == undefined ? "" : v.phone
                    var province = v.province == undefined ? "" : v.province
                    var city = v.city == undefined ? "" : v.city
                    var area = v.area == undefined ? "" : v.area

                  str+='<li  rdm="'+i+'"  id="'+ v.yyyappid+"#&"+ v.openid+'">'+
                      '<img src="'+ v.headimgurl+'/64'+'" alt="头像" onerror="javascript:this.src='+ "'/assets/img/default.png'"+'"/>'+
                      '<div class="headName">'+name+'</div>'+
                      '<span class="award"></span>'+
                      '<div class="p_show"><span class="bot"></span><span class="top"></span>'+
                      '<p class="p_name">'+name+''+$sex+'</p>'+
                      '<p><span class="p_tel">'+ phone +'</span>&nbsp;&nbsp;&nbsp;<span class="p_from">来自'+$os+'</span></p>'+
                      '<p class="p_addr">'+ province+'&nbsp;'+ city+'&nbsp;'+ area +'</p>'+
                          //'<p><span class="p_time" >'+ $created +'</span>摇到<span class="p_award">30元现金券</span></p></div>'+
                      '</li>';


              })
              $("#people_ul").append(str);
              $("#people_ul li").on("mousemove mouseout",function(event){
                  if(event.type=="mousemove"){
                      pmover($(this));
                  }else{
                      pmout($(this));
                  }
              });
          }
    }

    //回看头像tab

    $('.tabList').mouseenter(function(){
        $(this).find('.tabType').slideDown();
    });
    $('.tabList').mouseleave(function(){
        $(this).find('.tabType').slideUp();
    });
    $('.tabList li').on('click',function(){
        $(".v_d_con").scrollTop(0);
      targeta = $(this).attr("rel")
      $(this).parents(".tabList").find("span").attr("rel",targeta).css({"min-width":"60px","text-align":"right"}).html($(this).text() + ' <em class="fa fa-chevron-down"></em>')
        var tabUrl = "";
        var _thisH = $(this).html();
        $offset =0
         target =[]
         $('.tabList span').each(function(){
           t = $(this).attr("rel")
           t == undefined || t=="null" ? "" :  target.push(t)
        })
        // alert(target)
        if( target.length == 0){
            tabUrl = pHost+'&offset=0';
        }else{
        //target = $("#sel_1").attr("rel") +','+$("#sel_2").attr("rel")
           tabUrl = pHost + '&offset=0&target=' + target
        }

        if(_thisH !="其它"){
             $.ajax({
                 url:tabUrl,
                 type:"get",
                 dataType:"jsonp",
                 beforeSend:function(xmlHttpRequest){
                     $("#d-loader").show();
                 },
                 success:function(data){
                     $("#d-loader").hide();
                     if(data.code == 0){
                        $('#people_ul').empty();
                        faceOffset=getoffset(data);
                        createList(data);
                     }
                 }
             })
        }else{
            $('#people_ul').html('暂时无数据');
        }
    })

	function getM3u8(start, end){
		  var m3u8Url = '/publish/getlive?chid='+chid;
		  if (date != undefined) m3u8Url += '&start='+start;
		  if (time != undefined) m3u8Url += '&end='+end;
		  $.ajax({
		        url: m3u8Url,
		        type: "GET",
		        dataType: "JSON",
		        success: function(response){
		            if (response.code==0) {
		                loadStream(response.msg);
		            } else {
		                 loadStream("");
		                return false;
		            }
		        }
		    });
	}

	function loadStream(url){
	    jwplayer("player").load([{
	        file: url,
	        provider:'/assets/lib/Angle3.0/vendor/jwplayer6/HLSProvider6.swf',
	        type: 'mp4'
	    }]);
	    jwplayer("player").play();
	    return false;
    }

	function pmover(obj){
	    var dis=obj.offset().left;
	    var screenW=$(window).width();
	    if(dis>screenW*0.7){
	       obj.find(".p_show").addClass("p_right").stop().show();
	     }else{
	       obj.find(".p_show").addClass("p_left").stop().show();
	     }
	}
	function pmout(obj){
	    var dis=obj.offset().left;
	    var screenW=$(window).width();
	    if(dis>screenW*0.7){
	       obj.find(".p_show").stop().hide();
	     }else{
	       obj.find(".p_show").stop().hide();
	     }

	}

	(function($){
	    //点击头像
		    $(".back_view").on("click","#people_ul li",function(){

		        var This = $(this);

		        createDetail(This,$('.setpublishSecond'),position);

		    });
	})(jQuery)
}


function scrollBar(menu,menu_l,lanmu,scroll_bar,bar,menu_r,fn){
    var oDivMain=menu;
    var oDiv=menu_l;
    var oLeft=lanmu;
    var oRight=scroll_bar;
    var oBar=bar;

   if(oLeft.offsetHeight>oDiv.offsetHeight){

       menu_r.show();
          addMouseWheel(oDivMain,function(down){

            var t=oBar.offsetTop;
          if(down){
              t+=30;
          }else{
              t-=30;
          }
          setHeight(t);

        });
   }else{
      menu_r.hide();
   }

	function setHeight(t){
	      if(t<0){
	        t=0;
	      }else if(t>oRight.offsetHeight-oBar.offsetHeight){
	        t=oRight.offsetHeight-oBar.offsetHeight;
	      }
	      oBar.style.top=t+'px';
	      var sacl=t/(oRight.offsetHeight-oBar.offsetHeight);
	      oLeft.style.top=-sacl*(oLeft.offsetHeight-oDiv.offsetHeight)+'px';
	      if(fn){
	          var oBarH =oBar.offsetTop+oBar.offsetHeight;
	          var oRh = oRight.offsetHeight;
	        if(oBarH >= oRh){
	             fn();
	        }
	      }
	}
}

function addMouseWheel(obj,fn){
  if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
    obj.addEventListener('DOMMouseScroll',fnWheel,false);
  }else{
    obj.onmousewheel=fnWheel;
  }

  function fnWheel(ev){
      var oEvent=ev||event;
    var down=true;
        down=oEvent.wheelDelta?(oEvent.wheelDelta<0):(oEvent.detail>0);
        fn&&fn(down);
    oEvent.preventDefault&&oEvent.preventDefault();
    return false;
  }
}

//拖拽滚动条
function drag(obj,parentObj,lanmu,menu_l){
    var oDiv=menu_l;
    var oLeft=lanmu;
    var oRight=parentObj;
    var oBar=obj;

    var disY=0;
    obj.onmousedown=function(ev){
    var oEvent=ev||event;
    disY=oEvent.clientY-obj.offsetTop;
    document.onmousemove=function(ev){
      var oEvent=ev||event;
      var parentHeight=oRight.offsetHeight;
      var t=oEvent.clientY-disY;
      setHeight(t);
    }
    document.onmouseup=function(){
      document.onmousemove=null;
      document.onmouseup=null;
      obj.releaseCapture&&obj.releaseCapture();
    };
    obj.setCapture&&obj.setCapture();
    return false;
  };

  function setHeight(t){
      if(t<0){
        t=0;
      }else if(t>oRight.offsetHeight-oBar.offsetHeight){
        t=oRight.offsetHeight-oBar.offsetHeight;
      }
      oBar.style.top=t+'px';
      var sacl=t/(oRight.offsetHeight-oBar.offsetHeight);
      oLeft.style.top=-sacl*(oLeft.offsetHeight-oDiv.offsetHeight)+'px';
    }
}

//# sourceMappingURL=view_back.js.map