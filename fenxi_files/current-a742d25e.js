$(document).ready(function() {
  setLeftMenu("曝光明细");
  $('#reservation').calendar(
      new Date(defaultStart),
      new Date(defaultEnd),
      theDayAfter(),
      init);
  //显示回看
  // onClickPlay(1, '2015-10-14', '20:42:32');
  //获取统计总数
  requireNum();
  //获取折线图PV数据
  requirePV(null, null, 'time');

  //$('#p_filter').screening('publish');
  //$('#c_filter').screening('channel');
//==================================================[排序]
  $('.order').on('click', function() {
    if ($(this).hasClass('fa-long-arrow-down')) {
      $(this).removeClass('fa-long-arrow-down').addClass('fa-long-arrow-up');
    } else {
      $(this).removeClass('fa-long-arrow-up').addClass('fa-long-arrow-down');
    }
  });
//==================================================[按钮更新数据]
  /* $('.refresh').on('click', function() {
   $('#join_line').empty();
   requireNum();
   //获取折线图PV数据
   requirePV();
   //刷新表格
   requireTable();
   });*/
  /*浏览器发生变化*/
  $(window).resize(function() {
    //TODO  查询真正接口后再操作
    /*load_bar(echarts_type_list[1], option_line_list[(), 'join_line');*/
  });

//==================================================[筛选点击]
  $('.faw').on('click', function() {
    $(this).next('div').toggle();
  });
  //展开收起走势图
  $('#tabShow').on('click', function() {
    var obj = $('#tabShow').find('.fa');
    if (!obj.hasClass('icon-down')) {
      obj.prev('span').html('展开');
      obj.removeClass('icon-up').addClass('icon-down');
      $('.panel-wrapper').stop().slideToggle();
    } else {
      obj.prev('span').html('收起');
      obj.removeClass('icon-down').addClass('icon-up');
      $('.panel-wrapper').stop().slideToggle();
    }
  });

  //回看委托click事件
  $('.body').on('click', '.viewback', function() {
    var parent, date, time, start, end, id, chid, position, is_mark;
    parent = $(this).attr('parent');
    date = $(this).attr('date');
    time = $(this).attr('time');
    start = $(this).attr('start');
    end = $(this).attr('end');
    id = $(this).attr('id');
    chid = $(this).attr('chid');
    position = $(this).attr('position');
    is_mark = $(this).attr('is_mark');
    createViewCon(parent, date, time, start, end, id, chid, position, is_mark);
  });

  /**
   * 入口截图
   */
  $(".body").on("mouseenter", ".enter_point", function() {

    $(this).find(".pic_box").stop().show();
  });

  $(".body").on("mouseleave", ".enter_point", function() {
    $(this).find(".pic_box").stop().hide();
    //$(this).find(".pic_box").css("display", "none");
    /* $(this).find(".pic_box").css("opacity", "0");*/
  });
  //点击中间的图片打开回看
  $('.body').on('click', '.enter_point a', function() {
    $(this).parents('tr').find('.viewback').click()
  });

  $('.body').on('mouseenter', '.pic_box a', function() {
    $(this).addClass('current').siblings().removeClass('current');
  });
  //折线图  时间单位/日期单位
  $('#chartToggle').on('click', '.toggle', function() {
    $(this).siblings().removeClass('current');
    $(this).addClass('current');
    if ($(this).hasClass('onTime')) {
      $('#join_line').empty();
      requirePV.prototype.type = 'time';
      requirePV(defaultStart, defaultEnd, 'time');
    } else {
      $('#join_line').empty();
      requirePV.prototype.type = 'date';
      requirePV(defaultStart, defaultEnd, 'date');
    }
  });

  //选择时间切换
  $('#dateSelect').on('click', 'span', function() {
    $(this).addClass('cur').siblings('span').removeClass('cur');
    var index = $(this).index();
    var start = '';
    var end = '';

    switch (index) {
      case 0:
        start = new Date().Format('yyyy-MM-dd');
        end = new Date().Format('yyyy-MM-dd');
        break;
      case 1:
        end = start = new Date(new Date().setDate(new Date().getDate() - 1)).Format('yyyy-MM-dd');
        break;
      case 2:
        start = new Date(new Date().setDate(new Date().getDate() - 6)).Format('yyyy-MM-dd');
        end = new Date().Format('yyyy-MM-dd');
        break;
      default:
        start = new Date().Format('yyyy-MM-dd');
        end = new Date().Format('yyyy-MM-dd');
        break;
    }
    defaultStart = start;
    defaultEnd = end;
    /*requireLine(ID, start, end);*/
    init(start, end, 0);
    //$('#p_filter').screening('publish', start, end);
    //$('#c_filter').screening('channel', start, end);
    $('#reservation').calendar(
        new Date(start),
        new Date(end),
        theDayAfter(),
        init);
  });
});
function init(start, end, from) {
  t_detial = undefined;
  requireTable.prototype.clear();
  defaultStart = start;
  defaultEnd = end;
  requireNum(start, end);
  //获取折线图PV数据
  var typeToggle = $('#chartToggle').find('.current').html();
  if (typeToggle == '时' || (start == end)) {
    requirePV(defaultStart, defaultEnd, 'time');
  } else {
    requirePV(defaultStart, defaultEnd, 'date');
  }
  $('#join_line').empty();
  if (start == end) {
    $('#chartToggle').hide();
  } else {
    $('#chartToggle').hide();
  }
  //刷新表格
  // requireTable(start, end);

  if (from == undefined) {
    $("#dateSelect span").removeClass("cur");
    $("#reservation").css("border", "1px solid #e67e22")
  } else {
    $("#reservation").css("border", "1px solid #ececec")
  }
  //$('#p_filter').screening('publish', start, end);
  //$('#c_filter').screening('channel', start, end);
}
/**
 * 筛选
 * @param type
 * @param id
 * @param obj
 */
function onScreenClick(type, id, obj) {
  $(obj).parent().parent().prev().hide();
  var condition = null;
  if (type == 'publish') {
    condition = 'pid=' + id;
  }
  if (type == 'channel') {
    condition = 'cid=' + id;
  }
  if (!type) {
    return;
  }
  requireTable.prototype.screen = condition;
  requireTable.prototype.oldPage = 1;
  requireTable.prototype.sharking = null;
  requireTable.prototype.offset = 20;
  requireTable(requireTable.prototype.start, requireTable.prototype.end, 20);
}
//==================================================[查询table]
/**
 * @name  requireTable
 * @param start        要查询日期开始时间
 * @param end          要查询日期结束时间
 * @param limit        每页显示条数
 * @param filp         值只有0和1; （1表示下一页，0表示上一页）默认是1,
 * @prototype
 * sharktimeid         查看某个摇一摇时间点的详细数据时需传
 * sharking            接口带回参数，翻页时需传,是返回json里的sharktimeid
 * oldPage             记录上一个页码，为了配合page参数
 * offset              偏移量，从查询数据中取值
 */
function requireTable(start, end, limit) {
  $('.tablebox').find('.table-responsive').loading();
  $('.tablebox tbody').empty();
  /*createpage(0, 0);*/
  var URL = 'http://'+hosts+'/stats/tsdetail?advid=' + advid,
      sharktimeid = requireTable.prototype.sharktimeid,
      sharking = requireTable.prototype.sharking,
      offset = requireTable.prototype.offset,
      screen = requireTable.prototype.screen;
  if (requireTable.prototype.prevSharking.indexOf(sharking) == -1 && sharking) {
    requireTable.prototype.prevSharking.push(sharking);
  }
  ;
  URL += '&sharking=' + (sharking || '');
  if (requirePV.prototype.type == 'time') {
    URL += '&sharktimeid=' + (sharktimeid || '');
  }
  if (!start && !end) {
    start = defaultStart;
    end = defaultEnd;
  }
  if (!sharktimeid) {
    URL += '&start=' + start;
    URL += '&end=' + end;
  }
  if (screen) {
    URL += '&' + screen;
  }
  // URL += '&offset=' + (offset || 0);
  URL += '&count=' + (offset || 0);

  // URL += '&limit=' + (limit || 20);
  var picurl = "http://live.stream.tvmcloud.com/approve/capture?type=iptv";
  //alert(new Date(start))
  var dt;
  if (t_detial == undefined) {
    dt = end_oneh == undefined ? end : end_oneh.substring(6, 20) + ' ' + end_oneh.substring(0, 5)
  } else {
    dt = end_oneh == undefined ? end : t_detial.substring(6, 20) + ' ' + t_detial.substring(0, 5)
  }
  $("#d_detail").html(dt + ' 曝光明细（试试点击曲线上的数据点）')
  // $.ajax({
  //   url: "http://e.tvm.cn/api/screenshot",
  //   type: "GET",
  //   dataType: "JSON",
  //   error: function() {
  //     console.log('获取入口图片失败');
  //     $('.body').emptyRes(8, 'height:160px;background:#fff;');
  //   },
  //   success: function(res) {
  //     picurl = res.msg;

      $.ajax({
        url: URL,
        type: "GET",
        dataType: "JSON",
        error: function() {
          console.log('获取表格失败');
          $('.body').emptyRes(8, 'height:160px;background:#fff;');
          $('.tablebox').find('.table-responsive').removeLoading();
        },
        success: function(res) {
          //console.log(res);
          $('.tablebox').find('.table-responsive').removeLoading();
          if (res.code == 3000) {
            var data = res.data.list;
            requireTable.prototype.sharking = res.data.sharking;
            for (var i = 0; i < data.length; i++) {
              var imgDate = new Date(new Date(data[i].created).Format('yyyy-MM-dd hh:mm:ss'));
              var subDate = new Date(new Date(data[i].created).Format('yyyy-MM-dd'));
              var createDate = new Date(new Date(data[i].created)).getTime();//"2015-10-31 22:04:12";
              var nowDate = new Date(new Date().Format('yyyy-MM-dd')).getTime();
              var minus = parseInt((nowDate - subDate) / 1000 / 60 / 60 / 24);
              var $html = $('<tr>');
              $html.append('<td><a href="javascript:void(0)" target="_blank" class="viewback"' +
                  'parent="body"' +
                  'date="' + data[i].date + '"' +
                  'time="' + data[i].point + '"' +
                  'start="' + data[i].date + '+' + data[i].point + '"' +
                  'end="' + data[i].date + '+' + timeInterval(data[i].date, data[i].point, data[i].interval) + '"' +
                  'id="' + data[i].sharktimeid + '"' +
                  'chid="' + data[i].channelid + '"' +
                  'position="fixed"' +
                  'is_mark="true">' + new Date(data[i].created).Format('MM-dd hh:mm:ss') + '&nbsp;<em class="fa-sliders fa"></em></a></td>');
              $html.append('<td><a href="/publish/keyword/' + data[i].publishid + '" target="_blank">' + data[i].publish + '&nbsp;<em class="fa-sliders fa"></em></a></td>');
              $html.append('<td>' + data[i].channel + '</td>');
              if (minus > 6) {
                $html.append('<td>-</td>');
              } else {
                //<span class="icon-picture icon_pic"></span>
                $html.append('<td style="position:relative" class="enter_point">' + loadImgs(picurl + '_' + imgDate.Format('yyyy-MM-dd hh:mm:ss') + "_" + data[i].sn) + '</td>');
              }
              /*$html.append('<td>' + data[i].column + '</td>');*/
              $html.append('<td class="weixin"><img  onclick="createDetail(this,\'body\')" id="' + data[i].yyyappid + '#&' + data[i].openid + '" style="border-radius: 100%;cursor: pointer;" width="23" height="23" src="' + wexinImg(data[i].headimgurl) + '">&nbsp;' + data[i].nickname.mySubString() + '</td>');
              /* $html.append('<td>' + data[i].onlinetime + '</td>');*/
              $html.append('<td>' + distinctCityName(data[i].province, data[i].city, data[i].area) + '</td>');
              $html.append('<td>' + (data[i].os == 6 ? 'iOS' : 'Android') + '</td>');
              $html.append('<td>' + (data[i].phone + '</td>'));
              $('.tablebox tbody').append($html);
            }
            //分页
            requireTable.prototype.offset = res.data.offset;
            createpage(res.data.total, requireTable.prototype.oldPage);
          } else {
            $('.body').emptyRes(8, 'height:160px;background:#fff;');
            createpage(1, 1);
          }
        }
      });
  //   }
  // });

}
requireTable.prototype.oldPage = 1;
requireTable.prototype.sharking = null;
requireTable.prototype.sharktimeid = '';
requireTable.prototype.offset = 0;
requireTable.prototype.toDay = [];
requireTable.prototype.prevSharking = [''];
requireTable.prototype.clear = function() {
  requireTable.prototype.screen = null;
  requireTable.prototype.oldPage = 1;
  requireTable.prototype.offset = 0;
  requireTable.prototype.sharktimeid = '';
  requireTable.prototype.sharking = null;
  requireTable.prototype.prevSharking = [''];
};
//==================================================[分页]
function createpage(pageCount, current) {
  $.jqPaginator('#pagination', {
    totalPages: (pageCount % 20 == 0 ? pageCount / 20 : Math.floor(pageCount / 20) + 1), //设置最大页 默认为1,
    visiblePages: 1,
    currentPage: current,
    first: '',
    last: '',
    prev: '<li class="prev"><a href="javascript:void(0);"> <\/a><\/li>',
    next: '<li class="next"><a href="javascript:void(0);"> <\/a><\/li>',
    page: '<li class="page"><a href="javascript:void(0);"> {{page}} / {{totalPages}} <\/a><\/li>',
    onPageChange: function(page, type) {

      if (type == 'change') {
        oldPage = requireTable.prototype.oldPage;
        if (oldPage && page < oldPage) {
          requireTable.prototype.offset -= 40;
          requireTable.prototype.sharking = requireTable.prototype.prevSharking[page - 1];
        }
        //requireTable.prototype.oldPage++;
        requireTable.prototype.oldPage = page;
        requireTable();
      }
    }
  });
}

//==================================================[查询折线图PV]
var week_list = ['日', '一', '二', '三', '四', '五', '六'];
var l = [];
var hosts='tvmapi.mall.beta.cctvmall.cn';
var advid = 371;
function requirePV(start, end, type) {
  $('.echar').find('#join_line').empty().loading();
  var PV_API = '';
  if (!start && !end) {
    start = defaultStart;
    end = defaultEnd;
  }
  if (type == 'time') {
    PV_API = 'http://'+hosts+'/stats/trend?advid='+advid+'&tr=hh';
    PV_API += '&tr_start=' + start;
    PV_API += '&tr_end=' + end;
  } else {
    PV_API = 'http://e.tvm.cn/api/stat/datetrend';
    PV_API += '?startDateTime=' + start;
    PV_API += '&endDateTime=' + end;
  }
  $.ajax({
        url: PV_API,
        dataType: 'json',
        data: '',
        error: function(e) {
          console.log('PV_API error');
        },
        success: function(res) {

          // console.log(res);
          if (res.data && res.code == 3000) {

            var data = res.data;
            var chartRes = [];
            var chartRes2 = [];
            var suv = [];
            var sharktimeId = [];

            var xList = [];

            for (var i in data) {
              var item = {};
              var day = new Date(data[i].date).getDay();
              if (type == "date") {
                requireTable.prototype.toDay.push(data[i].date);
                item.name = data[i].date + '\n' + "星期" + week_list[day]
              } else {
                sharktimeId.push(Object.join(data[i].sharktimeId, ','));
                item.name = data[i].point + '\n' + data[i].date;
              }
              item.value = data[i].cn == undefined ? 0 : data[i].cn;//点击
              item.value2 = data[i].pv == undefined ? 0 : data[i].pv;//浏览
              item.interval = data[i].interval == undefined ? 0 : data[i].interval;//浏览
              //item.suv = data[i].suv == undefined ? 0 : data[i].suv;//浏览
              chartRes.push(item.value);
              chartRes2.push(item.value2);
              //suv.push(item.suv);
              xList.push(item.name);
              l.push(item.interval)
            }

            end_oneh = xList[xList.length - 1];
            try {
              requireTable.prototype.sharktimeid = sharktimeId[sharktimeId.length - 1];
            } catch (e) {
            }
            requireTable();//获取表格
            chartRes2 == "" ? chartRes2 = "0" : "";
            chartRes == "" ? chartRes = "0" : "";
            suv == "" ? suv = "0" : "";
            option_line_list[0].myValue = sharktimeId;
            option_line_list[0].series[0].data = chartRes2.length == 0 ? [0] : chartRes2;
            option_line_list[0].series[1].data = chartRes.length == 0 ? [0] : chartRes;
            //option_line_list[0].series[2].data = suv;
            option_line_list[0].xAxis[0].data = xList.length == 0 ? [''] : xList;
            option_line_list[0].tooltip.formatter = function(d) {
              var d0, d1, d2;
              for (var i = 0; i < d.length; i++) {
                if (d[i]['0'] == '曝光') {
                  d0 = d[i] && d[i].data;
                } else if (d[i]['0'] == '点击') {
                  d1 = d[i] && d[i].data;
                } else {
                  d2 = d[i] && d[i].data;
                }
              }

              var html = '<div style="padding-bottom:10px;background: #ffffff; color: #333;">';
              html += '<p style="text-align: center;background: #E9E9E9; padding:0 10px;">' + d[0]['1'] + '</p>';
              html += '<table style="width: 100%;">';
              if (d0 != undefined) {
                html += '<tr>';
                html += '<td class="col-md-6" style="color:#e67e22">曝光</td>';
                html += '<td class="col-md-6" style="color:#e67e22; text-align: right;">' + d0 + '</td>';
                html += '</tr>';
              }
              if (d1 != undefined) {
                html += '<tr>';
                html += '<td class="col-md-6" style="color: #2E91DA;">点击</td>';
                html += '<td class="col-md-6" style="color: #2E91DA; text-align: right;">' + d1 + '</td>';
                html += '</tr>';
              }
              // if (d2 != undefined) {
              //   html += '<tr>';
              //   html += '<td class="col-md-6" style="color: #F7B1AB;">点击用户</td>';
              //   html += '<td class="col-md-6" style="color: #F7B1AB; text-align: right;">' + d2 + '</td>';
              //   html += '</tr>';
              // }
              html += '</table>';
              html += '</div>';
              return html;
            };

            if (chartRes.length == 7) {
              $("#data_range").html(chartRes[0].name + "至" + chartRes[6].name);
            }
            load_bar(echarts_type_list[1], option_line_list[0], 'join_line');
            $('.echar').find('#join_line').removeLoading();
          } else {
            $('.echar').find('#join_line').removeLoading();
          }
        }
      }
  )
}
requirePV.prototype.type = 'time';
/**
 * 用日期隔断时间轴
 * @param date
 * @param dataPoint
 * @param dataPV
 * @param dataInterval
 * @param sharktimeId
 */
/*function insertArray(date,dataPoint,dataPV,dataInterval,sharktimeId) {
 for (var i = 1; i < date.length&&date.length>=1; i++) {
 var large = new Date(date[i]);
 var small = new Date(date[i - 1]);
 if(large>small){
 dataPoint.splice(i,0,date[i]);
 date.splice(i,0,'');
 dataPV.splice(i,0,1);
 dataInterval.splice(i,0,1);
 sharktimeId.splice(i,0,1);
 }
 }
 }*/
//==================================================[更新时间]
function refreshTime() {
  var localTime = new Date();
  var beginTime = new Date(
      (new Date())
          .setMinutes((new Date()).getMinutes() - 10));
  $('.newDateTime span').html(localTime.Format('yyyy-MM-dd hh:mm:ss'));
  $('.timeAround').html('当前曝光（' + beginTime.Format('yyyy-MM-dd') + ' 00:00:00 至 ' + localTime.Format('hh:mm') + '）');
}
//==================================================[查询投放总数]
function requireNum(start, end) {
  //更新时间
  /*refreshTime();*/
  // 'http://' + host + '/stats/trend?advid='+advid+'&tr='+u_type+'&tr_start='+s_date+'&tr_end='+e_date,
  var URL_NUMBER = 'http://'+hosts+'/stats/trend?advid='+advid+'&tr=hh';
  if (!start && !end) {
    start = defaultStart;
    end = defaultEnd;
  }
  URL_NUMBER += '&tr_start=' + start;
  URL_NUMBER += '&tr_end=' + end;
  $.ajax({
    url: URL_NUMBER,
    type: 'get',
    dataType: 'json',
    error: function() {
      console.log('统计数字接口报错');
    },
    success: function(res) {
      //console.log(res);
      var pubnum = 0,
          pv = 0,
          cn = 0,
          uv = 0,
          suv = 0,
          user = 0,
          newUser = 0,
          clickcount = 0;
      if (res.data.showData instanceof  Object) {
        try {
          pubnum = res.data.showData.pubnums;
          pv = res.data.showData.pv;
          cn = res.data.showData.cn;
          uv = res.data.showData.uv;
          suv = res.data.showData.suv;
          user = res.data.showData.new;
          newUser = res.data.showData.portion;
          clickcount = res.data.showData.clickcont;
        } catch (e) {
          console.log('没有返回结果');
        }
      }
      $('.clickcont').html(clickcount + '%');
      $('.pubnum').html(pubnum);
      $('._pv').html(pv);
      $('.cn').html(cn);
      $('.suv').html(suv);
      $('.new').html(uv);
      $('.newUser').html('(新用户:' + user + ')');
    }
  });
}
//==================================================[图表类型数组]
var echarts_type_list = [
  'echarts/chart/bar',
  'echarts/chart/line',
  'echarts/chart/pie'
];
//==================================================[折线图配置参数数组]
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
      data: ['曝光', '点击']//, '点击用户'
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
        data: [110, 444, 140, 80, 120, 100, 666],
        showAllSymbol: true,
        itemStyle: {
          normal: {
            color: "#FF7F50"
          }
        }
      },
      {
        name: '点击',
        type: 'line',
        data: [110, 44400, 140000, 80000, 120, 100, 666],
        showAllSymbol: true,
        itemStyle: {
          normal: {
            color: "#87CEFA"
          }
        }
      }
    ]
  }
];
//==================================================[柱状图公共调用 by zy]
var t_detial;
var end_oneh;
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
        myChart.on('click', function(value) {
          requireTable.prototype.clear();
          // console.log(this._option.myValue[value.dataIndex]);
          requireTable.prototype.sharktimeid = this._option.myValue[value.dataIndex];

          /*requireTable.prototype.oldPage = 1;
           requireTable.prototype.sharking = null;
           requireTable.prototype.offset = 0;*/
          $('#pagination').empty();
          //console.log(value.name)
          t_detial = value.name

          if (requirePV.prototype.type == 'time') {

            requireTable();
          } else {

            requireTable(requireTable.prototype.toDay[value.dataIndex], requireTable.prototype.toDay[value.dataIndex], 20);
          }
          //console.log(value);
        })
      }
  );
}
//==================================================[点击回看按钮事件]//点击回看
function onClickPlay(channelId, date, time) {
  //jwplayer播放
  act_view(date, time);
  //echar
  showChar(11913);
}
/*jwplayer用到的函数 { */
function act_view(date, time) {
  var vWidth = $('.video_player').width();
  var vHeight = $('.video_player').height();
  $(".col_detail").css("right", -$(".col_detail").width());
  $(".back_view").css("right", "0");
  jwplayer("player").setup({
    playlist: [{
      file: '../../../playlists/test_001/stream.m3u8',
      provider: '/assets/lib/Angle3.0/vendor/jwplayer6/HLSProvider6.swf',
      type: 'mp4'
    }],
    width: vWidth,
    height: vHeight,
    primary: "flash",
    aspectratio: "16:9",
    // image: "http://saas.tvm.cn/manage/static/images/video.jpg",
    controls: false,
    // skin: "http://saas.tvm.cn/manage/static/jwplayer6/vapor.xml",
    logo: {
      hide: true
    },
    abouttext: "TVM ENCODER v1.0",
    aboutlink: "#"
  });
  //jwplayer("player").onComplete(function(){
  setTimeout(getM3u8(date, time, 1), 1000);
  //})
}
function getM3u8(date, time, chid) {
  var m3u8Url = '/publish/getlive?chid=' + chid;
  if (date != undefined) {
    m3u8Url += '&date=' + date;
  }
  if (time != undefined) {
    m3u8Url += '&time=' + time;
  }
  $.ajax({
    url: m3u8Url,
    type: "GET",
    dataType: "JSON",
    success: function(response) {
      //console.log(response);
      if (response.code == 0) {
        loadStream(response.msg);
      } else {
        loadStream("");
        return false;
      }
    }
  });
}
function loadStream(url) {
  jwplayer("player").load([{
    file: url,
    provider: '/assets/lib/Angle3.0/vendor/jwplayer6/HLSProvider6.swf',
    type: 'mp4'
  }]);
  jwplayer("player").play();
  return false;
}
/* } */
//饼状图配置参数数组
//数组1是sexPie 数组2是sbPie
var option_pie_list = function(arr) {
  return [
    {//观众属性
//backgroundColor: '#fff',
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: '男女比例',
          type: 'pie',
          radius: '75%',
          center: ['50%', '50%'],
          itemStyle: {
            normal: {
              label: {
                position: 'inner',
                formatter: '{b} ({d}%)'
              },
              labelLine: {
                show: false
              },
              color: function(params) {
                var colorList = [
                  '#fbbc55', '#ee7473'
                ];
                return colorList[params.dataIndex]
              }
            }
          },
          // data:[
          //     {value:335, name:'男'},
          //     {value:310, name:'女'}
          // ]
          data: (function() {
            var sexarr = [];
            var mJson = {value: arr[0], name: "男"};
            var wJson = {value: arr[1], name: "女"};
            sexarr.push(mJson);
            sexarr.push(wJson);
            return sexarr;
          })()
        }
      ]
    },
    {//设备属性
//backgroundColor: '#fff',
      tooltip: {
        trigger: 'item',
        formatter: function() {
          console.log(arguments);
        } /*"{a} <br/>{b} : {c} ({d}%)"*/
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '75%',
          center: ['50%', '50%'],
          itemStyle: {
            normal: {
              label: {
                position: 'inner',
                formatter: '{b} ({d}%)'
              },
              labelLine: {
                show: false
              },
              color: function(params) {
                var colorList = [
                  '#02b0c2', '#7a4790', '#c35682'
                ];
                return colorList[params.dataIndex]
              }
            }
          },
          showAllSymbol: true,
          symbolSize: function(value) {
            //console.log(value);
            return value[0];
          },
          data: (function() {
            var sbarr = [];
            var iosJson = {value: arr[0], name: "ios"};
            var andJson = {value: arr[1], name: "android"};
            sbarr.push(iosJson);
            sbarr.push(andJson);
            return sbarr;
          })()
        }
      ]
    }
  ];
};
//地区热度柱状图
var option_bar_list2 = function(cityNum) {
  return {// 回看 地区热度图
    //backgroundColor: '#fff',
    tooltip: {
      trigger: 'item'
    },
    grid: {
      x: 30,
      y: 10,
      x2: 10,
      y2: 30,
      borderWidth: 0
    },
    toolbox: {
      show: false,
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        },
        data: (function() {
          return cityBar;
        })()
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
        },
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        }
      }
    ],
    series: [
      {
        name: '使用量',
        type: 'bar',
        barMaxWidth: 30,
        barGap: 30,
        barCategoryGap: 20,
        data: (function() {
          return cityNum;
        })()
      }
    ]
  }
};
/* 饼状图和柱状图 */
function showChar(channelId) {
  var sexPie = [];
  var sbPie = [];
  var cityBar = [];
  var cityNum = [];
  //TODO 临时注销
  //getViewSexData($(this).attr("id"));//现在没有数据
  getViewSexData(channelId);//现在没有数据
//  getViewSexData(9569);
  load_bar(echarts_type_list[2], option_pie_list(sexPie)[0], "pie_chart_viewer");
  load_bar(echarts_type_list[2], option_pie_list(sbPie)[1], "pie_chart_system");
  load_bar(echarts_type_list[0], option_bar_list2(cityNum), "bar_chart_area");
  event.preventDefault();
}
//获取回看饼图及柱状图数据
function getViewSexData(sharktimeid) {
  sexPie = [];
  sbPie = [];
  cityNum = [];
  cityBar = [];
  //男女饼图
  $.ajax({
    url: 'http://e.tvm.cn/api/audience?sharktimeid=' + sharktimeid,
    dataType: "json",
    type: "get",
    async: false,
    success: function(res) {
      if (res.code == 3000) {
        sexPie.push(res.data.m);
        sexPie.push(res.data.w);
        res.data.o != undefined ? sexPie.push(res.data.o) : sexPie.push(0);
      } else {
        sexPie.push(0);
        sexPie.push(0);
        sexPie.push(0);
      }
    },
    error: function() {
      console.log('给数组赋值出错');
    }
  });
  //设备饼图
  $.ajax({
    url: 'http://e.tvm.cn/api/equipment?sharktimeid=' + sharktimeid,
    dataType: "json",
    type: "get",
    async: false,
    success: function(res) {
      if (res.code == 3000) {
        sbPie.push(res.data.ios);
        sbPie.push(res.data.and);
        res.data.o != undefined ? sbPie.push(res.data.o) : sbPie.push(0);
      } else {
        sbPie.push(0);
        sbPie.push(0);
        sbPie.push(0);
      }
    }
  });
  //地区柱状图
  $.ajax({
    url: 'http://e.tvm.cn/api/area?sharktimeid=' + sharktimeid,
    dataType: "json",
    type: "get",
    async: false,
    success: function(res) {
      if (res.code == 3000) {
        for (var name in res.data) {
          cityBar.push(name);
          cityNum.push(res.data[name]);
        }
      }
    }
  });
}
//收起详情
$(".p_show_tab").click(function() {
  $(".back_view").css("right", -$(".back_view").width());
});

//==================================================[微信默认头像]
function wexinImg(src) {
  try {
    if (src.indexOf('default.png') > -1) {
      return src;
    } else if (src == '') {
      return 'http://q.cdn.mtq.tvm.cn/yao/images/default.png';
    } else {
      return src += '/46';
    }
  } catch (e) {
  }
}

//==================================================[查询筛选]
/**
 * @name  screening
 * @param type        筛选种类 publish || channel
 * @param startDate   开始日期
 * @param lastDate    结束日期
 */
$.fn.screening = function(type, startDate, lastDate) {
  var _self = $(this);
  var URL = 'http://e.tvm.cn/api/stat/screening?';
  var arr = [];
  if (type) {
    arr.push('type=' + type);
  }
  if (startDate) {
    arr.push('sdate=' + startDate);
  }
  if (lastDate) {
    arr.push('edate=' + lastDate);
  }
  URL += arr.join('&');

  $.ajax({
    url: URL,
    dataType: 'json',
    data: '',
    error: function(e) {
      console.log('screening error');
    },
    success: function(res) {
      if (res.code == '3000') {
        var data = res.data;
        for (var i in data) {
          $(_self)
              .next('.status_drop')
              .children('.p_menu')
              .append(
              '<li><a href="#" value=' + data[i].id + '>' + data[i].title + '</a></li>'
          );
        }
      }
    }
  })
};

/**
 * mySubString
 * @returns {string}
 * JS截取字符串加省略号
 */
String.prototype.mySubString = function() {
  try {
    var len = $(this).length;
    if (len < 4) {
      return this.valueOf();
    }
    return this.valueOf().substring(0, 4) + '...';
  } catch (e) {
    return this.valueOf();
  }
};

//# sourceMappingURL=current.js.map

//==================================================[加载入口图片]
function loadImgs(id) {
  /*var id = $(this).attr("id");*/
  var picurl = id.split("_")[0];
  var createDate = id.split("_")[1];
  var sn = id.split("_")[2];

  var create_ts = Date.parse(createDate);
  var before_ts = create_ts - (1000 * 10);
  var after_ts = create_ts + (1000 * 10);
  create_ts = create_ts / 1000;
  before_ts = before_ts / 1000;
  after_ts = after_ts / 1000;

  var html = "";
  html += '<div class="pic_box">';
  html += '<a href="javascript:void(0)">' +
      '<img class="jietu" src="' + picurl + '&channel=' + sn + '&time=' + create_ts + '" />' +
      '<div>' + new Date(before_ts * 1000).Format('hh:mm:ss') + '</div>' +
      '</a>';
  html += '<a href="javascript:void(0)" class="current">' +
      '<img class="jietu " src="' + picurl + '&channel=' + sn + '&time=' + before_ts + '" />' +
      '<div>' + new Date(create_ts * 1000).Format('hh:mm:ss') + '</div>' +
      '</a>';
  html += '<a href="javascript:void(0)">' +
      '<img class="jietu" src="' + picurl + '&channel=' + sn + '&time=' + after_ts + '" />' +
      '<div>' + new Date(after_ts * 1000).Format('hh:mm:ss') + '</div>' +
      '</a>';
  html += '</div>';
  return html;
}

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
  $('.days').html('共' + (Math.abs(Math.floor(day / (24 * 60 * 60 * 1000)))) + '天数据').show();
}

Date.prototype.Format = function(fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};
var date = new Date().setDate(new Date().getDate() - 6),
    defaultStart = new Date().Format('yyyy-MM-dd'),
    defaultEnd = new Date().Format('yyyy-MM-dd');

//==================================================[给对象创造一个类似数组的join方法]
Object.join = function(obj, str) {
  var arr = [];
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      arr.push(obj[i]);
    }
  }
  return arr.join(str);
};
//==================================================[给String创建一个截取字符串并带上省略号]
String.prototype.mySub = function(str) {
  if (typeof str != 'string') {
    return str;
  }
  if (str.length > 5) {

  }
}

//# sourceMappingURL=current.js.map