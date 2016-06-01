var host = $("#adcloud-url").val();

//柱状图公共调用 by zy
function load_bar_temp(type, option, bar_id) {
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

function createDetail(obj, parent, position) {
  if ($('.member_box')) {
    $('.member_box').remove();
  }

  var pos_str = "";
  if (position && position != '') {
    pos_str = "position:" + position + ";";
  }

  var top_str = "";
  if ($(document).scrollTop() > $('header').height()) {
    top_str = "top:0;"
  } else {
    top_str = 'top:' + (55 - $(document).scrollTop()) + 'px;';
  }
  var box_shadow = "box-shadow:-3px 0px 3px #000;";

  if (position == "absolute") {
    top_str = "top:0;";
    box_shadow = "";
  }

  var html = '<div class="member_box" style="right:-1000px;' + top_str + pos_str + box_shadow + "" + '">    ';
  html += '          <div class="member_show_tab">收起详情</div>';
  html += '          <div class="box_top">';
  //html += '              <div class="contact"><img src="/assets/img/contact.png" alt="与他对话" /></div>';
  html += '          </div>';
  html += '          <div class="box_bottom">';
  html += '              <div class="left_area fl">';
  html += '                  <div class="header"><img id="head_photo" src="/assets/img/car5.png" /></div>';
  html += '                  <div class="username" id="user_name">南瓜啃冰</div>';
  html += '                  <div class="detail" id="area"></div>';
  html += '                  <div class="detail" id="phone_system"></div>';
  html += '                  <div class="detail" id="user_phone"></div>';
  html += '                  <div class="map_box">';
  html += '                      <div class="logo">我的地理坐标</div>';
  html += '                      <div id="baidu_map"></div>';
  html += '                  </div>';
  html += '              </div>';
  html += '              <div class="right_area fl">';
  html += '                  <div class="top">';
  html += '                      <div class="item">';
  html += '                          <div class="num"></div>';
  html += '                          <div class="action">打开摇一摇</div>';
  html += '                      </div>';
  html += '                      <div class="item">';
  html += '                          <div class="num"></div>';
  html += '                          <div class="action">互动抽奖</div>';
  html += '                      </div>';
  html += '                      <div class="item no_margin">';
  html += '                          <div class="num"></div>';
  html += '                          <div class="action">观看视频</div>';
  html += '                      </div>';
  html += '                      <div class="clear"></div>';
  html += '                  </div>';
  html += '                  <div class="bottom">';
  html += '                      <div class="title">我的行为轨迹</div>';
  html += '                      <div class="content">';
  html += '                      </div>';
  html += '                  </div>';
  html += '              </div>';
  html += '          </div>';
  html += '      </div>';
  if (position != "absolute") {
    html += '<div class="back_mask"></div>';
  }

  if (!parent || parent.length == 0) {
    $("body").append(html);
  } else {
    $(parent).append(html);
  }

  //会员详情
  /*$(".member_box").css("top",$(document).scrollTop());*/
  $(".member_box").css("right", -$(".member_box").width());

  if ($(".member_box").css("position") == "fixed") {
    $(".member_box").css("top", $("header").height() - $(document).scrollTop() + "px");
    $(".member_box").css("height", $(window).height() - $("header").height() + $(document).scrollTop());
  }
  if ($(document).scrollTop() > $("header").height()) {
    $(".member_box").css("top", "0px");
    $(".member_box").css("height", $(window).height());
  }

  // if(document.addEventListener){
  //     document.addEventListener('DOMMouseScroll',mouseWheel,false);
  // }
  document.onscroll = mouseWheel;

  function mouseWheel() {
    if ($(document).scrollTop() > $("header").height()) {
      $(".member_box").css("top", "0px");
      $(".member_box").css("height", $(window).height());
    } else {
      $(".member_box").css("top", $("header").height() - $(document).scrollTop() + "px");
      $(".member_box").css("height", $(window).height() - $("header").height() + $(document).scrollTop());
    }
  }

  //收起详情
  $(".member_show_tab").click(function() {
    $(".member_box").css("right", -$(".member_box").width() - 5);
    $('.back_mask').remove();
  });

  $(".right_area .bottom .content").loading();
  //loading($(".right_area .bottom .content"));

  var bg_index = 1;//Math.round(Math.random()*2+1);
  $(".member_box").css("background-image", "url(/assets/img/user_box_bg" + bg_index + ".jpg)");
  $(".member_box").css("right", "0");
  var id = $(obj).attr("id");
  var arr = id.split("#&");

  if (arr.length < 10) {
    var yyyappid = arr[0];
    var openid = arr[1];
    console.log(yyyappid + "---" + openid);
    $.ajax({
      url: '/api/getinfo?yyyappid=' + yyyappid + '&openid=' + openid,
      dataType: 'json',
      type: 'get',
      async: false,

      success: function(result) {
        var data = result;
        if (data.errcode == 1 || !checkObj(data)) {

        } else {

          var nickname = data.nickname;
          var header = data.header;
          if (header.indexOf("default") == -1) {
            header += "/132";
          }
          var phone = data.phone;
          var jingdu = data.lng;
          var weidu = data.lat;
          var sex = data.sex;
          var os = data.os;
          var province = data.province;
          var city = data.city;
          var area = data.area;
          arr = [];

          arr.push(nickname);
          arr.push(header);
          arr.push(phone);
          arr.push(jingdu);
          arr.push(weidu);
          arr.push(sex);
          arr.push(os);
          arr.push(province);
          arr.push(city);
          arr.push(area);
          arr.push(yyyappid);
          arr.push(openid);
        }

      },
      error: function(res) {
        console.log("error");
        $('.member_box').remove();
        $('.back_mask').remove();
        swal("暂无该用户信息");
        return;
      }

    });
  }

  behavior(arr[10], arr[11]);

  var param = {};
  param.lng = arr[3];
  param.lat = arr[4];

  if (arr[1].indexOf('default') == -1) {
    $("#head_photo").attr("src", arr[1].replace(/64/, "132"));
  } else {
    $("#head_photo").attr("src", arr[1]);
  }

  $("#user_name").html(arr[0]);
  if (arr[5] == '男') {
    $("#user_name").append('&nbsp;<img src="/assets/img/user_nan.png"></img>');
  }
  if (arr[5] == '女') {
    $("#user_name").append('&nbsp;<img src="/assets/img/user_nv.png"></img>');
  }

  if (arr[6] != '' && arr[6] != 'undefined') {
    $("#phone_system").html("来自" + arr[6]);
  } else {
    $("#phone_system").remove();
  }

  if (arr[2] != '' && arr[2] != 'undefined') {
    $("#user_phone").html(arr[2].substring(0, 3) + "****" + arr[2].substring(7, 11));
  } else {
    $("#user_phone").remove();
  }

  $("#area").empty();
  if (arr[7] != '' && arr[7] != 'undefined') {
    $("#area").append('<span class="area">' + arr[7] + '</span>');
  } else {
    $("#area").remove();
  }

  if (arr[8] != '' && arr[8] != 'undefined') {
    if (arr[8].indexOf("北京") > -1 || arr[8].indexOf("天津") > -1 || arr[8].indexOf("上海") > -1 || arr[8].indexOf("重庆") > -1) {
      $("#area").append('·<span class="area">' + arr[8].replace(/特别行政区/, "") + '市</span>');
    } else {
      $("#area").append('·<span class="area">' + arr[8].replace(/特别行政区/, "") + '</span>');
    }

  }
  if (arr[9] != '' && arr[9] != 'undefined') {
    $("#area").append('·<span class="area">' + arr[9] + '</span>');
  }

  param.header = arr[1];
  param.province = arr[7];
  param.city = arr[8];
  param.area = arr[9];

  load_real_map("baidu_map", param);

}

function behavior(yyyappid, openid) {
  $.ajax({
    url: '/ajax/behavior?yyyappid=' + yyyappid + '&openid=' + openid,
    dataType: 'json',
    type: 'get',

    success: function(result) {
      var data = result.msg;
      var index = 0;

      if (data != '' && data.length != 0) {
        var playNum = data.playNum ? data.playNum : 0;
        var drawNum = data.drawNum ? data.drawNum : 0;
        var viewNum = data.viewNum ? data.viewNum : 0;

        $(".num").eq(0).html(viewNum);
        $(".num").eq(1).html(drawNum);
        $(".num").eq(2).html(playNum);

        var list = data.behavior;
        var html = "";
        if (list && list.length > 0) {
          for (var i = 0; i < list.length; i++) {
            html += '<div class="list_row">';
            html += '<div class="time">' + list[i].time.replace(/2015-/, "") + '&nbsp;&nbsp;' + list[i].title + '</div>';
            html += '</div>';
          }
          ;
        }
        $(".right_area .bottom .content").removeLoading();
        $(".right_area .bottom .content").html(html);
      }

    },
    error: function(res) {
      console.log("error");
      if ($(".member_box")) {
        $('.member_box').remove();
        $('.back_mask').remove();
      }
    }

  });
}

// 加载百度地图
function load_real_map(id, param) {
  var point = new BMap.Point(param.lng, param.lat);
  // 百度地图API功能
  var map = new BMap.Map(id);    // 创建Map实例
  map.centerAndZoom(point, 14);  // 初始化地图,设置中心点坐标和地图级别
  map.enableScrollWheelZoom(false);     //开启鼠标滚轮缩放
  var marker = new BMap.Marker(point);
  map.addOverlay(marker);

  // 复杂的自定义覆盖物
  // function ComplexCustomOverlay(point, text, mouseoverText){
  //   this._point = point;
  //   this._text = text;
  //   this._overText = mouseoverText;
  // }javascript:;
  // var box=null;
  // ComplexCustomOverlay.prototype = new BMap.Overlay();
  // ComplexCustomOverlay.prototype.initialize = function(map){
  //   this._map = map;
  //   var div = this._div = box = document.createElement("div");
  //   div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
  //   div.style.MozUserSelect = "none";
  //   div.className = "icon_box";

  //   var that = this;

  //   var arrow = this._arrow = document.createElement("div");
  //   arrow.style.position = "absolute";
  //   arrow.style.width = "11px";
  //   arrow.style.height = "10px";
  //   arrow.style.top = "22px";
  //   arrow.style.left = "10px";
  //   arrow.style.overflow = "hidden";
  //   arrow.style.display = "none";
  //   div.appendChild(arrow);

  //   map.getPanes().labelPane.appendChild(div);

  //   return div;
  // }
  // ComplexCustomOverlay.prototype.draw = function(){
  //   var map = this._map;
  //   var pixel = map.pointToOverlayPixel(this._point);
  //   this._div.style.left = pixel.x - 30 - parseInt(this._arrow.style.left) + "px";
  //   this._div.style.top  = pixel.y - 42 + "px";
  // }

  // var myCompOverlay = new ComplexCustomOverlay(point);

  // map.addOverlay(myCompOverlay);

}

function checkObj(obj) {
  var flag = false;
  for (var i in obj) {
    flag = true;
  }
  return flag;
}

//==================================================[loading]
$.fn.loading = function() {
  if ($(this).find('.ball-pulse-sync').length == 0) {
    var html = '';
    html = '<div class="ball-pulse-sync hide_loading"><div></div><div></div><div></div></div>';
    $(this).append(html);
  }
};
$.fn.removeLoading = function() {
  $(this).find('.ball-pulse-sync').remove();
};
//
//function loading(obj){
//	var html = '';
//	html = '<div class="ball-pulse-sync hide_loading"><div></div><div></div><div></div></div>';
//	$(obj).append(html);
//}
/**
 * disinctCityname
 * @param province  省
 * @param city      市
 * @param area      区
 * @returns {string}
 * 如果省和市一样 则取市-区
 */
function distinctCityName(province, city, area) {
  if (province == '' && city == '' && area == '') {
    return '-';
  }

  if (province != '' && city != '' && (province != city)) {
    return province + ' - ' + city;
  }

  if (city != '' && area != '') {
    return city + ' - ' + area;
  }

  if (city != '') {
    return city;
  }

  if (area != '') {
    return area;
  }

  if (province != '') {
    return province;
  } else {
    return '-';
  }
}
/**
 * @name  筛选screening
 * @param type        筛选种类 publish || channel
 * @param startDate   开始日期
 * @param lastDate    结束日期
 */
$.fn.screening = function(type, startDate, lastDate, pid) {
  var _self = $(this);
  var URL = '/api/stat/screening?';
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
  if (pid) {
    arr.push('pid=' + pid);
  }
  URL += arr.join('&');
  $.ajax({
        url: URL,
        dataType: 'json',
        async: false,
        error: function(e) {
          console.log('screening error');
        }

        ,
        success: function(res) {
          if (res.code == '3000') {
            var data = res.data;
            $(_self).next('.status_drop').children('.p_menu').empty();
            for (var i in data) {
              $(_self)
                  .next('.status_drop')
                  .children('.p_menu')
                  .append(
                  '<li><a href="javascript:void(0)" ' +
                  'onclick="onScreenClick(\'' + type + '\',\'' + data[i].id + '\',this)" ' +
                  '>' + data[i].title + '</a></li>'
              );
            }
          }
        }
      }
  )
};
/**
 * 点击空白关闭筛选
 */
$(document).click(function(e) {
  //console.log(e);
  if (e.target && e.target.getAttribute('class') != 'fa fa-filter faw') {
    $('.status_drop').hide();
  }
});

/**
 * 解决火狐不支持直接传字符串
 * @param str
 * @returns {*}
 * 如字符串有问题则返回当前日期
 */
function fireFoxDate(str) {
  //2015-10-22 00:17:31
  var ar1 = str.replace(' ', '-').replace(/:/g, '-').split('-');

  if (ar1.constructor != Array && ar1.length == 0) {
    return new Date();
  }

  var date = {};
  for (var i = 0; i < ar1.length; i++) {
    date[i] = ar1[i];
  }

  return new Date(date[0], date[1], date[2], date[3], date[4], date[5]);
}

/**
 * 计算播放时长
 * @param year
 * @param time
 * @param interval
 */
function timeInterval(year, time, interval) {
  var d = '';
  if (window.navigator.userAgent.indexOf('Firefox') != -1) {
    d = fireFoxDate(year + ' ' + time);
  } else {
    d = new Date(year + ' ' + time);
  }
  d.setSeconds(d.getSeconds() + parseInt(interval));
  return new Date(d).Format('hh:mm:ss');
}

/**
 * calendar
 * @param callback   回调函数
 */
$.fn.calendar = function(startDate, endDate, maxDate, callback, minDate) {
  var defaultDate = new Date().setDate(new Date().getDate());
  var defaultDate2 = new Date().setDate(new Date().getDate() - 1);
  var date = new Date().setDate(new Date().getDate() - 7);
  var options = {
    startDate: startDate || new Date(date),
    endDate: endDate || new Date(defaultDate2).Format('yyyy-MM-dd'),
    //maxDate: maxDate || new Date(defaultDate).Format('yyyy-MM-dd')
  };
  if (maxDate) {
    options.maxDate = maxDate;
  }
  if (minDate) {
    options.minDate = minDate;
  }
  $(this).val(options.startDate.Format('yyyy-MM-dd') + ' - ' + new Date(options.endDate).Format('yyyy-MM-dd'));
  $(this).daterangepicker(options, function(start, end, label) {
    days(start, end);
    // $('.days').html(end-start-);
    callback && callback(new Date(start).Format('yyyy-MM-dd'), new Date(end).Format('yyyy-MM-dd'));
  });
};

/**
 * 省市区
 */
function userMap(obj) {

  var map = {};
  //console.log(obj.data);
  map.defaultObj = {
    data: '数据',
    main: '放HTML的ID',
    results: 'placeResult',
    compaireName: '',
    compaireVal: '',
    confirmRes: '结果集合'
  };
  if (obj.data && obj.data.title == '地区') {
    return;
  }

  map.data = obj.data;

  map.dataID = null;

  map.main = document.getElementById(obj.main);

  map.resultBox = document.getElementById(obj.results);

  map.confirmRes = document.getElementById(obj.confirmRes);

  map.callbackRes = obj.callbackRes;

  map.callbackClick = obj.callbackClick;

  map.hideAll = obj.hideAll == 'hide' ? 'hide' : 'show';

  map.searchInput = function() {
    /*if(obj.searchInput){*/
    return document.getElementById('search');
    /*}*/
  };

  map.init = function() {
    map.areaHTML();
    $($(map.resultBox)).on('click', '.result', function() {
      map.bindEvent_result(this);
    });
    map.compareDate();

    $(map.searchInput()).on('input', function() {
      if ($(this).val() != '') {
        map.searchEvent($(this).val());
      }
    })
  };

  //把HTML汇总，并添加到table里
  map.table = function(child) {
    var $table = document.getElementById('placeTable');
    if (!$table) {
      $table = document.createElement('table');
      $table.setAttribute('id', 'placeTable');
    }

    if ($table.querySelector('.' + child.getAttribute('class'))) {
      $table.querySelector('.' + child.getAttribute('class')).remove();
    }

    $table.appendChild(child);
    map.main.appendChild($table);
    return $table
  };
  //生成地区级HTML
  map.areaHTML = function() {
    var $tr = document.createElement('tr');
    $tr.setAttribute('class', 'area');
    var $td = document.createElement('td');
    var $tdName = document.createElement('td');

    $tdName.innerHTML = '地区:';

    if (map.hideAll == 'show') {
      var $span = document.createElement('span');
      $span.innerHTML = '不限地区';
      $span.setAttribute('class', 'all cur');
      $td.appendChild($span);
      $tr.appendChild($td);
    }

    for (var i in map.data) {
      var $span = document.createElement('span');
      //大区要带上当前级下所有省市
      $span.setAttribute('data-level', i);
      $span.setAttribute('data-name', i);
      $span.innerHTML = i;
      $td.appendChild($span);
    }

    if (map.hideAll == 'show') {
      $td.setAttribute('colspan', '2');
    } else {
      $tr.appendChild($tdName);
    }
    $tr.appendChild($td);
    $($tr).off('click', 'span');

    $($tr).on('click', 'span', function(e) {
      if ($(this).hasClass('all')) {
        map.allClearCur();
        $(this).siblings('span').removeClass('cur').removeClass('active');
        $(this).addClass('cur');
        map.clearChildLevel('area');
        map.createResult();
      } else {
        $(this).prevAll('.all').removeClass('cur');
        map.bindEvent_Area(this);
      }
      e.preventDefault();
    });
    //  搜索  {
    if (obj.showSelect) {
      $td.appendChild(map.createSelect());
    }
    //    }

    map.table($tr);
  };
  //创建搜索框
  map.createSelect = function() {
    var $div_select = document.createElement('div');
    $div_select.style.cssText = 'display:inline-block; position:relative;';

    var $input = document.createElement('input');
    $input.setAttribute('type', 'search');
    $input.setAttribute('id', 'searchInput');
    $input.setAttribute('class', 'form-control');
    $input.setAttribute('placeholder', '搜索城市名称');
    $input.style.cssText = '' +
        'width:170px;' +
        'height:20px;' +
        'line-height:20px;' +
        'padding-left:0;' +
        'background:url(/assets/img/search.png) no-repeat right center;' +
        'background-size:18px';

    $($input).on('click', function() {
      $('#resList').show();
    });

    $(window).on('click', function(e) {
      var obj = $(e.target);
      if (obj.parents('#selectBox').length == 0) {
        $('#resList').hide();
      }
    });

    $($input).on('input', function() {
      if ($(this).val() != '') {
        map.searchEvent($(this).val());
      } else {
        $('#resList').empty();
      }
    });

    $div_select.appendChild($input);
    $div_select.setAttribute('id', 'selectBox');

    var $select = document.createElement('ul');
    $($select).on('click', 'li', function() {
      for (var i in map.data) {
        map.resListEvent(map.data[i], $(this).attr('id'));
      }
      map.createResult()
    });
    $select.setAttribute('id', 'resList');
    $select.style.cssText = '' +
        'display:none;' +
        'position:absolute;' +
        'z-index:1;left:0;' +
        'top:20px;' +
        'width:140px;' +
        'max-height:100px;' +
        'overflow-y:auto;' +
        'background:#fff';
    $div_select.appendChild($select);
    return $div_select;
  };
  //大区要带上当前级下所有省市
  map.eachProvince = function(data) {
    var str = [];
    for (var i in data) {
      str.push(data[i].id);
    }
    return str.join('_');
  };
  //生成省级HTML
  map.ProvinceHTML = function(_this) {
    var data = map.data[$(_this).html()];
    var $tr = document.createElement('tr');
    $tr.setAttribute('class', 'province');
    var $td = document.createElement('td');
    var $tdName = document.createElement('td');
    $tdName.innerHTML = '省:';

    /* var $span = document.createElement('span');
     $span.innerHTML = '不限省';
     $span.setAttribute('class', 'all');
     $span.setAttribute('data-level', $(_this).html());
     $td.appendChild($span);
     $tr.appendChild($td);*/

    var flag = true;
    for (var i in data) {
      var $span = document.createElement('span');
      $span.innerHTML = data[i].name;
      $span.setAttribute('data-level', $(_this).html() + '-' + data[i].id);
      $span.setAttribute('data-name', $(_this).html() + '-' + data[i].name);
      if (data[i].current && data[i].current == 1) {
        $span.setAttribute('class', 'cur');
        flag = false;
      }
      $td.appendChild($span);
    }
    if (flag) {
      $($tr).find('.all').addClass('cur');
    }
    $tr.appendChild($tdName);
    $tr.appendChild($td);
    $($tr).on('click', 'span', function() {
      /* if ($(this).hasClass('all')) {
       map.unlimited(data);
       $(this).siblings('span').removeClass('cur').removeClass('active');
       $(this).addClass('cur');
       map.clearChildLevel('province');
       map.createResult();
       } else {
       $(this).prevAll('.all').removeClass('cur');*/
      map.bindEvent_Province(this);
      /*   }*/

    });
    //console.log($tr);
    map.table($tr);
  };
  //市级HTML
  map.cityHTML = function(_this) {
    var levelArray = _this.getAttribute('data-level').split('-');
    var nameArray = _this.getAttribute('data-name').split('-');
    var level = levelArray.join('-');
    var name = nameArray.join('-');

    var $tr = document.createElement('tr');
    $tr.setAttribute('class', 'city');

    var $td = document.createElement('td');
    var $tdName = document.createElement('td');
    $tdName.innerHTML = '市:';

    var data = map.findData(levelArray);

    var $span = document.createElement('span');
    $span.innerHTML = '不限市';
    $span.setAttribute('class', 'all');
    $span.setAttribute('data-level', level);
    $td.appendChild($span);
    $tr.appendChild($td);

    var flag = true;

    for (var i in data) {
      var $span = document.createElement('span');
      $span.innerHTML = data[i].name;
      $span.setAttribute('data-level', level + '-' + data[i].id);
      $span.setAttribute('data-name', name + '-' + data[i].name);
      if (data[i].current && data[i].current == 1) {
        $span.setAttribute('class', 'cur');
        flag = false;
      }
      /*$span.setAttribute('line', level + '-' + i);*/
      $td.appendChild($span);
      $tr.appendChild($tdName);
      $tr.appendChild($td);
    }
    if (flag) {
      $($tr).find('.all').addClass('cur');
    }
    $($tr).on('click', 'span', function() {
      if ($(this).hasClass('all')) {
        map.unlimited(data);
        $(this).siblings('span').removeClass('cur').removeClass('active');
        $(this).addClass('cur');
        map.clearChildLevel('city');
        map.createResult();
      } else {
        $(this).prevAll('.all').removeClass('cur');
        map.bindEvent_City(this);
      }

    });
    map.table($tr);
  };
  //区级HTML
  map.zoneHTML = function(_this) {
    var levelArray = _this.getAttribute('data-level').split('-');
    var nameArray = _this.getAttribute('data-name').split('-');
    var level = levelArray.join('-');
    var name = nameArray.join('-');
    var $tr = document.createElement('tr');
    $tr.setAttribute('class', 'zone');
    var $td = document.createElement('td');
    var $tdName = document.createElement('td');
    $tdName.innerHTML = '区/县:';

    var data = map.findData(levelArray);
    var $span = document.createElement('span');
    $span.innerHTML = '不限区/县';
    $span.setAttribute('class', 'all');
    $span.setAttribute('data-level', level);
    $td.appendChild($span);
    $tr.appendChild($td);
    var flag = true;
    for (var i in data) {
      var $span = document.createElement('span');
      $span.innerHTML = data[i].name;
      $span.setAttribute('data-level', level + '-' + data[i].id);
      $span.setAttribute('data-name', name + '-' + data[i].name);

      if (data[i].current && data[i].current == 1) {
        $span.setAttribute('class', 'cur');
        flag = false;
      }
      $td.appendChild($span);
      $tr.appendChild($tdName);
      $tr.appendChild($td);
    }
    if (flag) {
      $($tr).find('.all').addClass('cur');
    }
    $($tr).on('click', 'span', function() {
      if ($(this).hasClass('all')) {
        map.unlimited(data);
        $(this).siblings('span').removeClass('cur');
        $(this).addClass('cur');
        map.createResult();
      } else {
        $(this).prevAll('.all').removeClass('cur');
        map.bindEvent_zone(this);
      }
    });
    map.table($tr);
  };
  //大区级的事件
  map.bindEvent_Area = function(_this) {
    map.clearChildLevel('area');
    map.ProvinceHTML(_this);

    map.checkStatus(_this);
    map.createResult(_this);

  };
  //省级的事件
  map.bindEvent_Province = function(_this) {
    map.clearChildLevel('Province');
    map.cityHTML(_this);
    //看总结果是否超过20个
    if (map.restrict(_this)) {
      map.checkStatus(_this);
      map.createResult(_this);
    }
  };
  //市级的时间
  map.bindEvent_City = function(_this) {
    map.clearChildLevel('city');
    map.zoneHTML(_this);
    //看总结果是否超过20个
    if (map.restrict(_this)) {
      map.checkStatus(_this);
      map.createResult(_this);
    }
  };
  //区级事件
  map.bindEvent_zone = function(_this) {
    //看总结果是否超过20个
    if (map.restrict(_this)) {
      map.checkStatus(_this);
      map.createResult(_this);
    }
  };
  //点击不限,清除已选地区
  map.unlimited = function(levelData) {
    for (var i in levelData) {
      levelData[i].current = 0;
      if (levelData[i].data) {
        map.unlimited(levelData[i].data);
      }
    }
  };
  //删除结果事件
  map.bindEvent_result = function(_this) {
    var dataDel = $(_this).attr('data-level').toString().split('-');
    map.recursionDel(map.data[dataDel[0]], dataDel[dataDel.length - 1]);
    $(_this).remove();
    //清掉样式
    $(map.main).find('span[data-level=' + $(_this).attr('data-level') + ']').removeClass('cur');
    map.createResult();
  };
  /*
   * 1.搜索输入的文字--遍历查找
   * 2.找到后，在挨个向上查找添加current
   * */
  map.searchEvent = function(searchStr) {
    $('#resList').empty();
    for (var i in map.data) {
      map.searchName(map.data[i], searchStr);
    }
  };
  map.resListEvent = function(data, id) {
    for (var i in data) {
      if (data[i].id == id) {
        data[i].current = 1;
        return true;
      } else {
        if (data[i].data) {
          if (map.resListEvent(data[i].data, id)) {
            data[i].current = 1;
            return true;
          }
        }

      }
    }
  };
  map.searchName = function(data, searchStr) {
    for (var i in data) {
      if (data[i].name.indexOf(searchStr) > -1) {
        var $li = document.createElement('li');
        $li.style.cssText = '' +
            'height:20px;' +
            'text-overflow: ellipsis; ' +
            'white-space: nowrap; ' +
            'overflow: hidden;';
        $li.setAttribute('title', data[i].name);
        $li.setAttribute('id', data[i].id);
        $($li).html(data[i].name);
        $('#resList').append($li);
      }
      if (data[i].data) {
        map.searchName(data[i].data, searchStr);
      }
    }
  };
  //通过所属层级level找到最终数据--向下查找
  map.findData = function(levelArray) {
    var data = map.data[levelArray[0]];
    levelArray.splice(0, 1, null);
    for (var i in levelArray) {
      for (var n in data) {
        if (data[n].id == levelArray[i]) {
          data = data[n].data;
          break;
        }
      }
    }
    return data;
  };
  //清除子级HTML
  map.clearChildLevel = function(nowLevel) {
    var level = ['area', 'province', 'city', 'zone'];
    var nowIndex = level.indexOf(nowLevel.toLowerCase());
    if (nowIndex > -1) {
      level.splice(nowIndex, 1, null)
    }
    var obj = document.getElementById('placeTable');
    for (var i = nowIndex; i < level.length; i++) {
      try {
        obj.querySelector('.' + level[i]).remove();
      } catch (e) {
      }
    }
  };
  //添加状态
  map.checkStatus = function(_this) {
    $(_this).addClass('cur');
    if ($(_this).parents('tr').attr('class') == 'area') {
      $(_this).addClass('active cur').siblings().removeClass('active cur');
    } else {
      if (_this) {
        if ($(_this).parents('tr').attr('class') != 'zone') {
          $(_this).addClass('active').siblings().removeClass('active');
        }

        var la = _this.getAttribute('data-level').toString().split('-');
        var data = map.data[la[0]];
        //循环给map.data对应的添加current属性
        for (var i = 1; i < la.length; i++) {
          map.data[la[0]] = map.recursionAdd(data, la[i]);
        }
        //高亮当前点击有关系的节点
        //console.log(_this);
        var parentNode = _this.dataset.level.split('-');
        var lenght = parentNode.length;
        for (var i = 0; i < lenght - 1; i++) {
          parentNode.pop();
          var obj = $('#placeTable ').find('span[data-level=' + parentNode.join("-") + ']');
          for (var n = 0; n < obj.length; n++) {
            if (!$(obj[n]).hasClass('all')) {
              $(obj[n]).addClass('cur active');
            }
          }
        }
      }
    }
  };
  //限制结果数量
  map.restrict = function(_this) {
    var result = $('#area').val().split(',');
    var arr = $(_this).attr('data-level').split('-');
    var flag = false;
    if (result.length >= 20) {
      if ($(_this).siblings('.cur').length != 0) {
        flag = false;
      } else {
        arr = arr.splice(1, arr.length - 2);
        var now_thisId = arr.join('-');
        for (var i = 0; i < result.length; i++) {
          if (result[i].indexOf(now_thisId) != -1) {
            flag = true;
            break;
          }
        }
      }

    }
    else {
      flag = true;
    }
    return flag;

  }
  //添加current
  map.recursionAdd = function(data, id) {
    for (var i in data) {
      if (data[i].id == id) {
        data[i].current = 1;
      } else {
        if (data[i].data) {
          data[i].data = map.recursionAdd(data[i].data, id);
        }
      }
    }
    return data;
  };
  //递归删除
  map.recursionDel = function(dataSource, delID) {
    for (var i in dataSource) {
      if (dataSource[i].id == delID) {
        dataSource[i].current = 0;
        return;
      } else {
        if (dataSource[i].data) {
          map.recursionDel(dataSource[i].data, delID);
        }
      }
    }

  };
  //完全删除
  map.allClearCur = function() {
    for (var i in map.data) {
      map.unlimited(map.data[i]);
    }
  };
  //获得有效数据集合
  map.recursionGet = function(data, type) {
    var obj = {};
    for (var i in data) {
      if (data[i].current && data[i].current == 1) {
        obj[data[i][type]] = null;
        if (data[i].data) {
          obj[data[i][type]] = map.recursionGet(data[i].data, type);
        }
      }
    }
    var n = 0;
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        n++;
      }
    }
    if (n == 0) {
      return null;
    } else {
      return obj;
    }
  };
  //遍历有效数据
  map.recursionShow = function(data, str, arr) {
    for (var i in data) {
      var newstr = '';
      newstr += str + '-' + i;
      if (data[i] != null) {
        map.recursionShow(data[i], newstr, arr);
      } else {
        arr.push(newstr);
      }
    }
  };
  //添加新结果
  map.createResult = function(_this) {
    var data = map.data;

    var dataName = {};
    var dataVal = {};
    for (var i in data) {
      var res = map.recursionGet(data[i], 'name');
      var resVal = map.recursionGet(data[i], 'id');
      if (res != null) {
        dataName[i] = res;
        dataVal[i] = resVal;
      }
    }

    var arr = [];
    var arrVal = [];
    for (var i in dataName) {
      map.recursionShow(dataName[i], i, arr);
      map.recursionShow(dataVal[i], i, arrVal);
    }

    //判断是否有显示结果的回调函数
    if (typeof(map.callbackRes) == 'function') {
      map.callbackRes(arr, arrVal);
    } else {
      map.resultBox.innerHTML = '';
      //要提交的结果
      var $hidden = map.confirmRes;
      var buildStr = [];
      for (var n = 0; n < arr.length; n++) {
        var $div = document.createElement('div');
        $div.setAttribute('class', 'result');
        $div.setAttribute('data-level', arrVal[n]);
        $div.setAttribute('data-name', arr[n]);
        $div.innerHTML = arr[n];

        var $span = document.createElement('span');
        $span.setAttribute('class', 'closed');
        $span.innerHTML = 'x';
        $div.appendChild($span);
        map.resultBox.appendChild($div);

        buildStr.push(arrVal[n].substring(arrVal[n].indexOf('-') + 1, arrVal[n].length));
      }
      $hidden.setAttribute('value', buildStr.join(','));
      if (map.callbackClick) {
        map.callbackClick(arr, arrVal);
      }
    }
  };
  //匹配数据，添加结果
  map.compareDate = function() {
    if (obj.compareName && obj.compareVal) {
      for (var i = 0; i < obj.compareName.length; i++) {
        var name = obj.compareName;
        var val = obj.compareVal;

        name[i] = name[i].substring(name[i].indexOf('-') + 1, name[i].length);
        val[i] = val[i].substring(val[i].indexOf('-') + 1, val[i].length).split('-');
        for (var n = 0; n < val[i].length; n++) {
          for (var item in map.data) {
            map.recursionAdd(map.data[item], val[i][n]);
          }
        }
        /*//添加到结果----开始
         var $div = document.createElement('div');
         $div.setAttribute('class', 'result');
         $div.setAttribute('data-level', obj.compareVal[i]);
         $div.setAttribute('data-name', obj.compareName[i].replace(/,/g, '-'));
         $div.innerHTML = name[i].replace(/,/g, '-');

         var $span = document.createElement('span');
         $span.setAttribute('class', 'closed');
         $span.innerHTML = 'x';
         $div.appendChild($span);
         map.resultBox.appendChild($div);
         //添加到结果----结束*/
      }
      map.createResult();
    }
  };
  map.init();
}
$.fn.emptyRes = function(colCount, style) {
  var $tr = document.createElement('tr');
  var $td = document.createElement('td');
  $td.setAttribute('colspan', colCount);
  $td.style.cssText = style;
  $td.innerHTML = '没有相关数据';
  $tr.appendChild($td);
  $(this).append($tr);
};

//# sourceMappingURL=user_detail.js.map
/*
 * 日期最大日期需要+1天
 * */
function theDayAfter() {
  return new Date(new Date().setDate(new Date().getDate() + 1));
}

//# sourceMappingURL=user_detail.js.map