$(document).ready(function(){
  setLeftMenu("数据概要");

});
//图表类型数组
var echarts_type_list = [
  'echarts/chart/bar',
  'echarts/chart/line',
  'echarts/chart/pie',
  'echarts/chart/radar',
  'echarts/chart/map'
];

var week_list = ['日', '一', '二', '三', '四', '五', '六'];
var host='tvmapi.mall.beta.cctvmall.cn';
var advid = 371;
// var host = window.location.host;
var l =[]
//折线图配置参数数组
var option_line_list = [
  {
    //backgroundColor: '#fff',
    grid: {
      x: 75,
      y: 30,
      x2: 75,
      y2: 80
      //borderWidth:0
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#C0C0C0'
    },
    legend: {
      data: ['曝光','点击'] //, '点击用户'['展现', '点击']
    },
    dataZoom: {
      show: true,
      start: 0
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            //color:'#fff'
          }
        },
        // axisLine: {
        //   show: true
        // },
        // splitLine: {
        //   show: true
        // },
        data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
      }
    ],
    yAxis: [
      {
        type: 'value',

        axisLabel: {
          textStyle: {
            //color:'#fff'
          },
          formatter: '{value}'
        }
      }
    ],
    series: [
     {
        name: '曝光',
        type: 'line',
        data: [110, 44400, 140000, 80000, 120, 100, 666],
        showAllSymbol: true,
        itemStyle:{
            normal : {
                color:"#FF7F50"
            }
        }
      },
      {
        name: '点击',
        type: 'line',
        data: [110, 44400, 140000, 80000, 120, 100, 666],
        showAllSymbol: true,
        itemStyle:{
            normal : {
                color:"#87CEFA"
            }
        }
      }
    ]
  }
];

//饼状图配置参数数组
var option_pie_list = [
  { //0
    title: {
      text: '消费总额',
      subtext: '',
      //sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
      x: 'center',
      y: 'center',
      itemGap: 20,
      textStyle: {
        color: '#777',
        fontFamily: '微软雅黑',
        fontSize: 12,
        fontWeight: 'bolder'
      },
      subtextStyle: {
        color: '#000',
        fontFamily: '微软雅黑',
        fontSize: 18,
        fontWeight: 'bolder'
      }
    },

    tooltip: {
      //trigger: 'item',
      show: true,
      formatter: "{a} <br/>{b} : {d}%",
      position: [30, 0]
    },
    color: ['#D97A81', '#6495ED', '#F7B980', '#e9e9e9','#cccccc'],
    series: [
      {
        name: '最大贡献投放计划',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          normal: {
            label: {show: false},
            labelLine: {show: false}
          }
        },
        data: [
          {value: 0, name: '1'},
          {value: 0, name: '2'},
          {value: 0, name: '3'},
          {value: 0, name: '4'},
          {value: 100, name: '5'}
        ]
      }
    ]
  },
  { //1
    title: {
      text: '消费总额',
      subtext: '',
      //sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
      x: 'center',
      y: 'center',
      itemGap: 20,
      textStyle: {
        color: '#777',
        fontFamily: '微软雅黑',
        fontSize: 12,
        fontWeight: 'bolder'
      },
      subtextStyle: {
        color: '#000',
        fontFamily: '微软雅黑',
        fontSize: 18,
        fontWeight: 'bolder'
      }
    },

    tooltip: {
      //trigger: 'item',
      show: true,
      fontSize: 12,
      formatter: "{a} <br/>{b} : {d}%",
      position: [30, 0]
    },
    color: ['#D97A81', '#6495ED', '#F7B980', '#e9e9e9','#cccccc'],
    series: [
      {
        name: '最大贡献投放计划',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          normal: {
            label: {show: false},
            labelLine: {show: false}
          }
        },
        data: [
          {value: 0, name: '1'},
          {value: 0, name: '2'},
          {value: 0, name: '3'},
          {value: 0, name: '4'},
          {value: 100, name: '5'}
        ]
      }
    ]
  },
  { //2
    title: {
      text: '消费总额',
      subtext: '',
      //sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
      x: 'center',
      y: 'center',
      itemGap: 20,
      textStyle: {
        color: '#777',
        fontFamily: '微软雅黑',
        fontSize: 12,
        fontWeight: 'bolder'
      },
      subtextStyle: {
        color: '#000',
        fontFamily: '微软雅黑',
        fontSize: 18,
        fontWeight: 'bolder'
      }
    },

    tooltip: {
      //trigger: 'item',
      show: true,
       fontSize: 12,
      formatter: "{a} <br/>{b} : {d}%",
      position: [30, 0]
    },
    color: ['#D97A81', '#6495ED', '#F7B980', '#e9e9e9','#cccccc'],
    series: [
      {
        name: '最大贡献投放计划',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          normal: {
            label: {show: false},
            labelLine: {show: false}
          }
        },
        data: [
          {value: 0, name: '1'},
          {value: 0, name: '2'},
          {value: 0, name: '3'},
          {value: 0, name: '4'},
          {value: 100, name: '5'}
        ]
      }
    ]
  },
  { //3
    title: {
      text: '消费总额',
      subtext: '',
      //sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
      x: 'center',
      y: 'center',
      itemGap: 20,
      textStyle: {
        color: '#777',
        fontFamily: '微软雅黑',
        fontSize: 12,
        fontWeight: 'bolder'
      },
      subtextStyle: {
        color: '#000',
        fontFamily: '微软雅黑',
        fontSize: 18,
        fontWeight: 'bolder'
      }
    },

    tooltip: {
      //trigger: 'item',
      show: true,
       fontSize: 12,
      formatter: "{a} <br/>{b} : {d}%",
      position: [30, 0]
    },
    color: ['#D97A81', '#6495ED', '#F7B980', '#e9e9e9','#cccccc'],
    series: [
      {
        name: '最大贡献投放计划',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          normal: {
            label: {show: false},
            labelLine: {show: false}
          }
        },
        data: [
          {value: 0, name: '1'},
          {value: 0, name: '2'},
          {value: 0, name: '3'},
          {value: 0, name: '4'},
          {value: 100, name: '5'}
        ]
      }
    ]
  },
  { //4
    title: {
      text: '消费总额',
      subtext: '',
      //sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
      x: 'center',
      y: 'center',
      itemGap: 20,
      textStyle: {
        color: '#777',
        fontFamily: '微软雅黑',
        fontSize: 12,
        fontWeight: 'bolder'
      },
      subtextStyle: {
        color: '#000',
        fontFamily: '微软雅黑',
        fontSize: 18,
        fontWeight: 'bolder'
      }
    },

    tooltip: {
      //trigger: 'item',
      show: true,
       fontSize: 12,
      formatter: "{a} <br/>{b} : {d}%",
      position: [30, 0]
    },
    color: ['#D97A81', '#6495ED', '#F7B980', '#e9e9e9','#cccccc'],
    series: [
      {
        name: '最大贡献投放计划',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          normal: {
            label: {show: false},
            labelLine: {show: false}
          }
        },
        data: [
          {value: 0, name: '1'},
          {value: 0, name: '2'},
          {value: 0, name: '3'},
          {value: 0, name: '4'},
          {value: 100, name: '5'}
        ]
      }
    ]
  },
  {// 5
     title: {
      show: true,
      text: '访问来源',
      subtext: '',
      //sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
      x: 'center',
      y: 'center',
      itemGap: 20,
      textStyle: {
        color: '#777',
        fontFamily: '微软雅黑',
        fontSize: 12,
        fontWeight: 'bolder'
      },
      subtextStyle: {
        color: '#000',
        fontFamily: '微软雅黑',
        fontSize: 22,
        fontWeight: 'bolder'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {d}% ",
       fontSize: 12,
      position: [30, 0]
    },
    color: ['#DA70D6', '#87CEFA', '#6495ED', '#32CD32', '#FF7F50'],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          normal: {
            label: {show: false},
            labelLine: {show: false}
          }

        },
        data: [
          {value: 100, name: '直接访问'},
          {value: 200, name: '邮件营销'},
          {value: 300, name: '联盟广告'},
          {value: 400, name: '视频广告'},
          {value: 500, name: '搜索引擎'}
        ]
      }
    ]
  },
  {// 6
     title: {
      show: true,
      text: '访问来源',
      subtext: '',
      //sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
      x: 'center',
      y: 'center',
      itemGap: 20,
      textStyle: {
        color: '#777',
        fontFamily: '微软雅黑',
        fontSize: 12,
        fontWeight: 'bolder'
      },
      subtextStyle: {
        color: '#000',
        fontFamily: '微软雅黑',
        fontSize: 22,
        fontWeight: 'bolder'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {d}% ",
       fontSize: 12,
      position: [30, 0]
    },
    color: [ '#FF7F50','#32CD32','#6495ED','#87CEFA','#DA70D6',
                         '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                         '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          normal: {
            label: {show: false},
            labelLine: {show: false}
          }

        },
        data: [
          {value: 100, name: '直接访问'},
          {value: 200, name: '邮件营销'},
          {value: 300, name: '联盟广告'},
          {value: 400, name: '视频广告'},
          {value: 500, name: '搜索引擎'}
        ]
      }
    ]
  }
];

var option_map_list = [
  {
    tooltip: {
      trigger: 'item'
    },
    dataRange: {
      show: false,
      min: 0,
      max: 2500,
      x: 'left',
      y: 'bottom',
      text: ['高', '低'],           // 文本，默认为数值文本
      calculable: true
    },
     dataRange: {
        show : false,
        min: 0,
        max: 100,
        text:['热', '冷'],
        splitNumber:0,
       // color: ['orangered','yellow','lightskyblue']
    },
    series: [

      {
        name: '热点地区',
        type: 'map',
        mapType: 'china',
        itemStyle: {
          normal: {label: {show: false}},
          emphasis: {label: {show: false}}
        },
        data: [
          {name: '北京', value: Math.round(Math.random() * 1000)},
          {name: '天津', value: Math.round(Math.random() * 1000)},
          {name: '上海', value: Math.round(Math.random() * 1000)},
          {name: '重庆', value: Math.round(Math.random() * 1000)},
          {name: '河北', value: Math.round(Math.random() * 1000)},
          {name: '安徽', value: Math.round(Math.random() * 1000)},
          {name: '新疆', value: Math.round(Math.random() * 1000)},
          {name: '浙江', value: Math.round(Math.random() * 1000)},
          {name: '江西', value: Math.round(Math.random() * 1000)},
          {name: '山西', value: Math.round(Math.random() * 1000)},
          {name: '内蒙古', value: Math.round(Math.random() * 1000)},
          {name: '吉林', value: Math.round(Math.random() * 1000)},
          {name: '福建', value: Math.round(Math.random() * 1000)},
          {name: '广东', value: Math.round(Math.random() * 1000)},
          {name: '西藏', value: Math.round(Math.random() * 1000)},
          {name: '四川', value: Math.round(Math.random() * 1000)},
          {name: '宁夏', value: Math.round(Math.random() * 1000)},
          {name: '香港', value: Math.round(Math.random() * 1000)},
          {name: '澳门', value: Math.round(Math.random() * 1000)}
        ]
      }
    ]
  }
];

var option_bar_list = [
  {

    tooltip: {
      trigger: 'item'
    },
    //color:['#FF7F50','#EF7186'],
    grid: {
      x: 30,
      y: 50,
      x2: 10,
      y2: 50,
      borderWidth: 0
    },
    xAxis: [
      {
        type: 'category',
        data: ['IOS', 'Android'],
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '',
        type: 'bar',
        data: [2.0, 4.9],
        itemStyle: {
          normal: {
            color: function(params) {
              // build a color map as your need.
              var colorList = [
                '#C1232B', '#B5C334'
              ];
              return colorList[params.dataIndex]
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{b}\n{c}'
            }
          }
        }

      }
    ]
  }

];

//柱状图公共调用 by zy
function load_bar(type, option, bar_id) {
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
      function(ec) {
        // --- 地图 ---
        var myChart = ec.init(document.getElementById(bar_id));

        myChart.clear();
        myChart.setOption(option, true);

      }
  );
}


////各种图形开始
  var s_date
  var e_date
  var u_type = "hh"
//zzf
$(document).ready(function() {

$("#chartToggle").hide()
var date = new Date().setDate(new Date().getDate() - 6)
var defaultStart = new Date(date).Format('yyyy-MM-dd')
    defaultEnd = new Date(new Date().setDate(new Date().getDate())).Format('yyyy-MM-dd');
    $('#reservation').calendar(new Date(defaultEnd),new Date(defaultEnd), null, init);

   s_date = defaultEnd
   e_date = defaultEnd
//时间切换
 $(".data_line_top>span:gt(0)").click(function(){
    $(".data_line_top>span").removeClass("cur")
    $("#reservation").css("border","1px solid #ececec")
    $(this).addClass("cur")
    var  n_d = $(this).attr("date")
    switch(n_d){
      case "0":
           sd = ed = new Date(new Date().setDate(new Date().getDate())).Format('yyyy-MM-dd')
           break;
      case "1":
           sd = ed= new Date(new Date().setDate(new Date().getDate()-1)).Format('yyyy-MM-dd')
           break;
      case "7":
           sd = new Date(new Date().setDate(new Date().getDate()-6)).Format('yyyy-MM-dd')
           ed = defaultEnd
           break;
    }
    init(sd, ed, 0)
    $('#reservation').calendar(new Date(sd),new Date(ed), null, init);
  })
 $("#chartToggle div").click(function(){
      $("#chartToggle div").removeClass("current")
      $(this).addClass("current")
      // u_type = $(this).hasClass("onTime") ? "time" : "date"
      u_type = $(this).hasClass("onTime") ? "hh" : "dd"
      todayDataLine()
       echartsData()
      todayData()
 })
})
 function init(start, end, s) {
  if(s ==  undefined){
    $(".data_line_top span").removeClass("cur")
    $("#reservation").css("border","1px solid #e67e22")
  }
  start == end ? $("#chartToggle").hide() : $("#chartToggle").show()
     s_date = start
     e_date = end
     todayDataLine()
     echartsData()
     todayData()
 }

 // 今日数据
function todayData() {
  $.ajax({
    url: 'http://' + host + '/stats/trend?advid='+advid+'&tr='+u_type+'&tr_start='+s_date+'&tr_end='+e_date,
    // url: 'http://' + host + '/api/stat/almost?&sdate='+s_date+'&edate='+e_date,
    dataType: 'json',
    type: 'get',
    success: function(result) {

      var most = result.data.most;
     if( most == undefined ){
      $("#most_pubnums, #most_pv, #most_cn, #most_suv, #most_clickrate, #most_new, #most_consumption").html("0")
      return
       }

      var estimate = result.data.estimate;
      var updTime = result.data.updated_at;
      try {
        $("#most_pubnums").html(most.pubnums);
        $("#most_pv").html(most.pv);
        $("#most_suv").html(most.suv);
        $("#most_cn").html(most.cn);
        $("#most_clickrate").html(most.clickrate);
        $("#most_new").html(most.uv);
        $("#new_h").html(most["new"])
        $("#most_consumption").html(most.consumption);
       // $("#estimate_pubnums").html(estimate.pubnums);
       // $("#estimate_pv").html(estimate.pv);
       // $("#estimate_uv").html(estimate.cn);
       // $("#estimate_vv").html(estimate.clickrate);
       // $("#estimate_consumption").html(estimate.consumption);
       // $("#estimate_uv2").html(estimate.uv);
        $("#tip_time").html(updTime);
      } catch (e) {
      }
    },
    error: function(res) {
      console.log("error");
    }
  });
}

// 7天数据趋势
function todayDataLine() {
   $(".no_data").remove();
  $.ajax({
    // url: 'http://' + host + '/api/stat/trend?type='+u_type+'&sdate='+s_date+'&edate='+e_date,
    url: 'http://' + host + '/stats/trend?advid='+advid+'&tr='+u_type+'&tr_start='+s_date+'&tr_end='+e_date,
    dataType: 'json',
    type: 'get',
    success: function(result) {
      var data = result.data;
      var chartRes = [];
      var chartRes2 = [];
      var chartRes3 = [];
      var xList = []

      if(data.length != 0){
        var j =0
          for (var i in data) {
            j++
            var item = {};
            var day = new Date(i).getDay();
            if(u_type == "date" ){
              item.name = i  + '\n' + "星期" + week_list[day]
            }else{
              item.name = i.substr(10,10) + '\n' + i.substr(0,10);
            }
            item.value = data[i].pv == undefined ? 0 : data[i].pv;//浏览
            item.value2 = data[i].cn == undefined ? 0 : data[i].cn;//点击
            //item.value3 = data[i].suv == undefined ? 0 : data[i].suv;//独立用户
            item.interval = data[i].interval == undefined ? 0 : data[i].interval;//浏览
            chartRes.push(item.value );
            chartRes2.push(item.value2);
            //chartRes3.push(item.value3);
            xList.push(item.name);
            l.push(item.interval)
          }
         if(j ==0){
          option_line_list[0].xAxis[0].data = [0]
          option_line_list[0].series[0].data = [0];
          option_line_list[0].series[1].data = [0];//点击
          //option_line_list[0].series[2].data = [0];
          load_bar(echarts_type_list[1], option_line_list[0], 'data_box_line');
          return
          }
      }

    chartRes == "" ? chartRes = "0" : ""
    chartRes2 == "" ? chartRes2 = "0" : ""
    //chartRes3 == "" ? chartRes3 = "0" : ""
      option_line_list[0].series[0].data = chartRes;
      option_line_list[0].series[1].data = chartRes2;
      //option_line_list[0].series[2].data = chartRes3;
      option_line_list[0].xAxis[0].data = xList;
      option_line_list[0].tooltip.formatter = function(d){
       // console.log(d)
         var html = '<div style="padding-bottom:10px;background: #ffffff; color: #333;">';
              html += '<p style="text-align: center;background: #E9E9E9; padding:0 10px;">' + d[0]['1'] + '</p>';
              html += '<table style="width: 100%;" class="msgbox">';
         var Tc=""
           $.each(d,function(i,e){
           if( e['0'] == "曝光" ){
              Tc = "#e67e22"
           }
           else if(e['0'] == "点击"){
              Tc = "#2E91DA"
           }
           else{Tc = "#F7B1AB"}
              html += '<tr>';
              html += '<td class="col-md-6" style="color:'+ Tc +'">'+e['0']+'</td>';
              html += '<td class="col-md-6" style="color:'+ Tc+'; text-align: right;">' + e.data + '</td>';
              html += '</tr>';
            })
              html += '</table>';
              html += '</div>';
        return html
      }
      if (chartRes.length == 7) {
        $("#data_range").html(chartRes[0].name + "至" + chartRes[6].name);
      }
      load_bar(echarts_type_list[1], option_line_list[0], 'data_box_line');
    },
    error: function(res) {
      console.log("error");
    }

  });
}

function echartsData(flag,column_name){

    if(!flag){
        flag = "cn";
        column_name = "点击";
    }

    //地图
  $.ajax({
    url: 'http://' + host + '/stats/address?advid='+advid+'&tr_start='+s_date+'&tr_end='+e_date,
    dataType: 'json',
    type: 'get',
    success: function(result) {
       $("#data_rows4").html("");
      var data = result.data;
      var chartRes = [];
      var chartResFive = [];

      for (var i in data.all) {
        var item = {};
        item.name = data.all[i].shortname;
        item.value = data.all[i].pv;
        item.cn = data.all[i].cn;
        /*item.percent = data[i].portion;*/
        chartRes.push(item);
      }

      for (var i in data.topFive) {
        var item = {};
        item.name = data.topFive[i].shortname;
        item.value = data.topFive[i].pv;
        item.cn = data.topFive[i].cn;
        // item.percent = data.topFive[i].clickcont;
        chartResFive.push(item);
      }
      $.each(chartResFive,function(i,e){
        if(e.name == undefined){
          chartResFive.splice(i,1)
        }
      })
      $.each(chartRes,function(i,e){
        if(e.name == undefined){
          chartRes.splice(i,1)
        }
      })

   //  option_map_list[0].color =  ['orangered','yellow','lightskyblue']
     option_map_list[0].series[0].data = chartRes;
      var html = "";
      if (chartRes.length > 0) {

        option_map_list[0].dataRange.max = chartRes[0].value;
      var n=0
        for (var i = 0; i < chartResFive.length; i++) {
           chartResFive[i].value == 0 ?  n = n+1 : ""
          html += '<tr>';
          if (i < 5) {
            html += '<td>' + (i + 1) + '</td>';
          } else {
            html += '<td>&nbsp</td>';
          }
          html += '<td>' + chartResFive[i].name + '</td>' +
              '<td>' + chartResFive[i].value + '</td>' +
              '<td>' + chartResFive[i].cn + '</td>' +
              // '<td><div class="gray_area"><div class="red_area" style="width:' + chartResFive[i].percent + '"></div></div></td>' +
              // '<td>' + chartResFive[i].percent + '</td>' +
              '</tr>';
        }

        option_map_list[0].tooltip.show = true;
        $("#data_rows4").html(html);
         n == 6  ?  option_map_list[0].color = ['#CCCCCC', '#999999', '#666666'] : ""
           option_map_list[0].series[0].data = chartRes;
      }
       else {
        html = '<div class="no_data">暂无数据</div>';
        $("#chart_info4").append(html);
        option_map_list[0].tooltip.show = false;
      }

      load_bar(echarts_type_list[4], option_map_list[0], 'chart4');
    },
    error: function(res) {
      console.log("error");
    }

  });

//最大贡献频道
  $.ajax({
    url: 'http://' + host + '/api/stat/channel?sdate='+s_date+'&edate='+e_date,
    dataType: 'json',
    type: 'get',
    success: function(result) {
      $("#data_rows2").html("");
      var data = result.data;
      var chartRes = [];
      var html = "";
      var color_arr = ['orange_box1', 'green_box3', 'purple_box','gray_box1','gray_box1'];

      for (var i in data) {
        var item = {};
        item.name = data[i].channelTitle.substr(0,4);
        item.nameall = data[i].channelTitle;
        item.value = data[i].pv;
        item.percent = data[i].degree;
        item.cn = data[i].cn;
        chartRes.push(item);
      }
      var n =0
      var pie = {}
          pie.color=  ['#F7B980', '#56C8CA', '#B7A3DF','#d97a81', '#E9E9E9','#cccccc']
      if(chartRes.length > 0){
         for (var i = 0; i < chartRes.length; i++) {
         chartRes[i].value == 0 ?  n = n+1 : ""
          html += '<tr>';
          if (i < 5) {
            html += '<td>' + (i + 1) + '</td>';
          } else {
            html += '<td>&nbsp</td>';
          }
          html += '<td><span class="' + color_arr[i] + '" style="background-color:'+ pie.color[i]+'"></span></td>';
          if (chartRes[i].name.length > 10) {
            html += '<td title="' + chartRes[i].nameall + '">' + chartRes[i].nameall.substring(0, 10) + '...' + '</td>';
          } else {
            html += '<td>' + chartRes[i].nameall + '</td>';
          }
          html += '<td>' + chartRes[i].value + '</td>' +
                  '<td>' + chartRes[i].cn + '</td>' +
              // '<td>' + chartRes[i].percent + '%</td>' +
              '</tr>';
        }

        $("#data_rows2").html(html);
        pie.title = "最大贡献投放频道"
          pie.l = chartRes.length
          pie.n = n
          pie.id="chart2"
          viewback(pie, chartRes,0)
      }
      else{
          errorback("#chart_info2","chart2")
      }

    },
    error: function(res) {
        errorback("#chart_info2","chart2")
    }

  });

//最大贡献投放计划 0
  $.ajax({
    url: 'http://' + host + '/api/stat/contribution?sdate='+s_date+'&edate='+e_date,
    dataType: 'json',
    type: 'get',
    success: function(result) {

     $("#data_rows1").html("");
      var data = result.data;
      var chartRes = [];
     // option_pie_list[0].title.subtext = result.data.totalAmount;
      var color_arr = ['red_box1', 'blue_box', 'orange_box1','gray_box1','gray_box1'];
      for (var i in data.top) {
        var item = {};
        item.name = data.top[i].title.substr(0,5);
        item.nameall = data.top[i].title;
        item.value = data.top[i].pv;
        item.percent = data.top[i].clickcont;
        item.cn = data.top[i].cn;
        chartRes.push(item);
      }
      $.each(chartRes,function(i,e){
       e.name == undefined ? chartRes.splice(i,1) : ""
      })
       var pie = {}
          pie.color=['#D97A81', '#6495ED', '#F7B980', '#56c8ca','#e9e9e9']
       if(chartRes.length > 0){
         var html = "";
        var n = 0
        for (var i = 0; i < chartRes.length; i++) {
          chartRes[i].value == 0 ?  n = n+1 : "" //如果全是0的判断
          html += '<tr>';
            html += '<td>' + (i + 1) + '</td>';
          html += '<td><span class="' + color_arr[i] + '" style="background-color:'+pie.color[i]+'"></span></td>';
          html += '<td>' + chartRes[i].nameall + '</td>';
          html += '<td>' + chartRes[i].value + '</td>';
          html += '<td>' + chartRes[i].cn + '</td>' +
              // '<td>' + chartRes[i].percent + '</td>' +
              '</tr>';
        }
      $("#data_rows1").html(html);
          pie.title = "最大贡献投放计划"
          pie.l = chartRes.length
          pie.n = n
          pie.id="chart1"
          viewback(pie, chartRes,1)
      }
      else{
        errorback("#chart_info1","chart1")
      }
    },
    error: function(res) {
      errorback("#chart_info1","chart1")
    }

  });
function viewback(j,d,i){
          option_pie_list[i].color = j.color
          option_pie_list[i].title.text = option_pie_list[i].series[0].name = j.title;
          option_pie_list[i].tooltip.show = true;
          if(j.l == j.n){
            d = [{value: 100}]
            option_pie_list[i].color= ['#cccccc']
            option_pie_list[i].tooltip.show = false;
          }
        option_pie_list[i].series[0].data = d;
        load_bar(echarts_type_list[2], option_pie_list[i], j.id);
}
//覆盖人群 0
  $.ajax({
    url: 'http://' + host + '/stats/population?advid='+advid+'&tr_start='+s_date+'&tr_end='+e_date,
    dataType: 'json',
    type: 'get',
    success: function(result) {
      $("#data_rows5").html("");
      var data = result.data;
      var chartRes = [];
      if(data) {
        for (var i in data) {
          var item = {};
          item.name = data[i].title;
          item.value = data[i].pv;
          item.percent = data[i].clickrate;
          item.cn = data[i].cn;
          chartRes.push(item);
        }
      }
      var html = "";
      var sex_arr = ['nan', 'nv'];
      var pie = {}
      if (chartRes.length > 0) {
       pie.color = chartRes[0].name == "女性" ? ['#D97A81', '#6495ED', '#e9e9e9'] : ['#6495ED', '#D97A81', '#e9e9e9']
        var n =0
        for (var i = 0; i < chartRes.length; i++) {

           chartRes[i].value == 0 ?  n = n+1 : ""
          html += '<tr>' +
              '<td>' + (i + 1) + '</td>';
          html += '<td>' + chartRes[i].name + '&nbsp; </td>';//<img src="/assets/img/' + sex_arr[i] + '.png" alt="">
          html += '<td>' + chartRes[i].value + '</td>';
          html += '<td>' + chartRes[i].cn + '</td>' +
              // '<td><div class="gray_area"><div style="width:' + chartRes[i].percent + '; background-color:'+pie.color[i]+'"></div></div></td>' +
              // '<td>' + chartRes[i].percent + '</td>' +
              '</tr>';
        }
        $("#data_rows5").html(html);
          pie.title = "覆盖人群"
          pie.l = chartRes.length
          pie.n = n
          pie.id="chart5"
          viewback(pie, chartRes,2)
      }
      else {
        errorback("#chart_info5",'chart5')
      }
    },
    error: function(res) {
      console.log("error");
      errorback("#chart_info5",'chart5')
    }
  });
//设备 0
  $.ajax({
    url: 'http://' + host + '/stats/equipment?advid='+advid+'&tr_start='+s_date+'&tr_end='+e_date,
    dataType: 'json',
    type: 'get',
    success: function(result) {
      $("#data_rows6").html("");
      var data = result.data;
      var chartRes = [];
      if(data) {
        for (var i in data) {
          var item = {};
          item.name = data[i].title;
          item.value = data[i].pv;
          item.percent = data[i].clickrate;
          item.cn = data[i].cn;
          chartRes.push(item);
        }
      }
      var html = "";
      var pie = {}
          pie.color= [ '#F3F39D', '#C8E49C', '#E9E9E9']
      if (chartRes.length > 0) {
        var n=0
        for (var i = 0; i < chartRes.length; i++) {
           chartRes[i].value == 0 ?  n = n+1 : ""
         if(  chartRes[i].value != undefined){
          html += '<tr>';
          html += '<td>' + (i + 1) + '</td>';
          html += '<td>' + chartRes[i].name + '</td>' +
              '<td>' + chartRes[i].value + '</td>' +
              '<td>' + chartRes[i].cn + '</td>' +
              // '<td><div class="gray_area"><div style="width:' + chartRes[i].percent + '; background-color:'+pie.color[i]+'"></div></div></td>' +
              // '<td>' + chartRes[i].percent + '</td>' +
              '</tr>';
           }
        }
        $("#data_rows6").html(html);
          pie.title = "设备系统"
          pie.l = chartRes.length
          pie.n = n
          pie.id="chart6"
          viewback(pie, chartRes,3)
      }
      else {
         errorback("#chart_info6",'chart6')
      }
    },
    error: function(res) {
      console.log("error");
      errorback("#chart_info6",'chart6')
    }
  });
//运营商 0
  $.ajax({
    url: 'http://' + host + '/stats/operator?advid='+advid+'&tr_start='+s_date+'&tr_end='+e_date,
    dataType: 'json',
    type: 'get',
    success: function(result) {
      $("#data_rows7").html("");
      var data = result.data;
      var chartRes = [];
      if(data) {
        for (var i in data) {
          var item = {};
          item.name = data[i].title.substr(0,4);
          item.value = data[i].pv;
          item.percent = data[i].clickrate;
          item.cn = data[i].cn;
          chartRes.push(item);
        }
      }
      var html = "";
      var pie = {}
          pie.color= [ '#C1232B','#B5C334','#FCCE10','#e9e9e9']
      if (chartRes.length > 0) {
        var n =0
        for (var i = 0; i < chartRes.length; i++) {
           chartRes[i].value == 0 ?  n = n+1 : ""
          html += '<tr>';
          html += '<td>' + (i + 1) + '</td>';
          html += '<td>' + chartRes[i].name + '</td>' +
              '<td>' + chartRes[i].value + '</td>' +
              '<td>' + chartRes[i].cn + '</td>' +
              // '<td><div class="gray_area"><div  style="width:' + chartRes[i].percent + ';background-color:'+pie.color[i]+'" ></div></div></td>' +
              // '<td>' + chartRes[i].percent + '</td>' +
              '</tr>';
        }
        $("#data_rows7").html(html);
          pie.title = "运营商"
          pie.l = chartRes.length
          pie.n = n
          pie.id="chart7"
          viewback(pie, chartRes,4)
      }
      else {
          errorback("#chart_info7",'chart7')
      }
    },
    error: function(res) {
      console.log("error");
      errorback("#chart_info7",'chart7')
    }
  });


//卡券 0
  // $.ajax({
  //   url: 'http://' + host + '/api/stat/card?sdate=' + s_date + '&edate=' + e_date,  ///stat/operator?sdate='+s_date+'&edate='+e_date,
  //   dataType: 'json',
  //   type: 'get',
  //   success: function(result) {
  //     $("#data_rows3").html("");
  //     var data = result.data;
  //     var chartRes = [];
  //     for (var i in data) {
  //         var item = {};
  //         item.name = data[i].title.substr(0,5);
  //         item.value = data[i].cn;
  //         item.percent = data[i].num;
  //         chartRes.push(item);
  //     }


  //     var html = "";
  //     var pie = {}
  //         pie.color= [ '#FF7F50','#32CD32','#6495ED','#87CEFA','#DA70D6',
  //                        '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
  //                        '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0']
  //     if (chartRes.length > 0) {
  //       var n =0
  //       for (var i = 0; i < chartRes.length; i++) {
  //         var num = chartRes[i].percent == "*" ? "无限" : chartRes[i].percent
  //          chartRes[i].value == 0 ?  n = n+1 : ""
  //         html += '<tr>';
  //         html += '<td>' + (i + 1) + '</td>';
  //         html += '<td><span class="orange_box" style="background-color:'+pie.color[i]+'"></span></td>'
  //         html += '<td>' + chartRes[i].name + '</td>' +
  //             '<td title="'+ chartRes[i].value +'">' + chartRes[i].value.substring(0, 10) + '</td>' +
  //         //    '<td>' + num + '</td>' +
  //             '<td>&nbsp;</td>' +
  //             '</tr>';
  //       }
  //       $("#data_rows3").html(html);
  //         pie.title = "链接/商品/任务"
  //         pie.l = chartRes.length
  //         pie.n = n
  //         pie.id="chart3"
  //         viewback(pie, chartRes,6)
  //     }
  //     else {
  //         errorback("#chart_info3",'chart3')
  //     }
  //   },
  //   error: function(res) {
  //     console.log("error");
  //     errorback("#chart_info3",'chart3')
  //   }
  // });
}

$(document).ready(function() {
  todayData();
  todayDataLine();
  echartsData();

    // 显示计划浮层
    $(".sel_btn").on("click",function(){
      if( $(this).children('span').hasClass("fa-caret-down") ){
        $(this).children('span').removeClass("fa-caret-down");
        $(this).children('span').addClass("fa-caret-up");
      }else if( $(this).children('span').hasClass("fa-caret-up") ){
        $(this).children('span').removeClass("fa-caret-up");
        $(this).children('span').addClass("fa-caret-down");
      }

      var oDiv = $(".sort_content");
      if(!oDiv.hasClass('show_')){
        oDiv.css("display","block");

        oDiv.removeClass("hide_");
        oDiv.addClass("show_");
      }else{
        oDiv.css("display","none");
        oDiv.removeClass("show_");
        oDiv.addClass("hide_");
      }
      event.stopPropagation();
    });
//导出
    $(".msgbox_down .close ,.msgbox_down .cancel").click(function(){
      $(".bodybg_hover").hide()
    })
    $("#out_report").click(function(){
      $(".bodybg_hover").show();
      var day = 1;
      if( $(".cur").length>0 ){
          if( $(".cur").attr("date") == "7" ){
              day = 7;
          }
      }else{
          day = GetDateDiff( $("#reservation").val().split(" - ")[0],$("#reservation").val().split(" - ")[1],"day" );
      }
      var time = '<span class="from">'+$("#reservation").val().split(" - ")[0]+'</span>至<span class="target">'+$("#reservation").val().split(" - ")[1]+'</span>';
      $(".report_tip").html("确定导出 "+time+", 共"+day+"天的账户报告?");
      // $(".msgbox_down .from").val(day(7))
      // $(".msgbox_down .end").val(day(0))
    })

    $(".msgbox_down .msgtab li").click(function(){
      $(".msgbox_down .msgtab li").removeClass("on")
      $(this).addClass("on")
      days=$(this).attr("rel")
      switch(days){
       case "7": $(".msgbox_down .from").val(day(7))
        break;
       case  "15": $(".msgbox_down .from").val(day(15))
        break;
       case "30": $(".msgbox_down .from").val(day(30))
        break;
      }
    })
    $(".msgbox_down .outreport").click(function(){
      sdata = $(".msgbox_down .from").text();
      edata = $(".msgbox_down .target").text();
      window.location.href = 'http://' + host + '/api/export?startdate='+sdata+'&enddate='+edata
      t=setTimeout("$('.bodybg_hover').hide()",3000)
  //   $.ajax({
  //      url: 'http://' + host + '/api/export?startdate='+sdata+'&enddate='+day(0),
  //      dataType: 'json',
  //      type: 'get',
  //      success: function(result) {
  //       if(result.code){
  //         alert("出错啦！")
  //       }
  //       else{
  //         $(".bodybg_hover").hide()
  //       }
  //      },
  //      error: function(res) {
  //      console.log("error");
  //   }
  // });
    })
//导出 end
});

function day(n){
  n == 0 ? n : n = n-1
 d = new Date(new Date().setDate(new Date().getDate()-n)).Format('yyyy-MM-dd')
 return d;
}

function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime);      //开始时间
    var eTime = new Date(endTime);  //结束时间
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt( Math.abs(eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}

function checkObj(obj){
    var flag = false;
    for(var i in obj){
        flag = true;
        break;
    }
    return flag;
}
function errorback(div,chart){
   var html = '<div class="no_data">暂无数据</div>';
      $(div).append(html);
      var chartRes =[ {value: 100}];
      option_pie_list[0].color=["#cccccc"]
      option_pie_list[0].title.text = '暂无数据';
      option_pie_list[0].title.subtext = '';
      option_pie_list[0].tooltip.show = false;
      option_pie_list[0].series[0].data = chartRes;
      load_bar(echarts_type_list[2], option_pie_list[0], chart);
}

$.fn.calendar = function(startDate, endDate, maxDate, callback) {
  var defaultDate = new Date().setDate(new Date().getDate());
  var defaultDate2 = new Date().setDate(new Date().getDate() - 1);
  var date = new Date().setDate(new Date().getDate() - 7);
  var options = {
    startDate: startDate || new Date(date),
    endDate: endDate || new Date(defaultDate2).Format('yyyy-MM-dd'),
    maxDate: maxDate || new Date(defaultDate).Format('yyyy-MM-dd')
  };
  $(this).val(options.startDate.Format('yyyy-MM-dd') + ' - ' + new Date(options.endDate).Format('yyyy-MM-dd'));
  $(this).daterangepicker(options, function(start, end, label) {
    //days(start, end);
    // $('.days').html(end-start-);
    callback && callback(new Date(start).Format('yyyy-MM-dd'), new Date(end).Format('yyyy-MM-dd'));
  });
};

//# sourceMappingURL=outline.js.map