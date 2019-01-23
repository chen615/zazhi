/**
 *  全局函数处理
 */
var car2 = {
    /****************************************************************************************************/
    /*  对象私有变量/函数返回值/通用处理函数
     *****************************************************************************************************/
    /*************************
     *  = 对象变量，判断函数
     *************************/
    _bg: $(".bg"),
    _bg_start: function () {
        car2._bg.on('touchstart mousedown', car2._bg_touch_start);
        car2._bg.on('touchmove mousemove', car2._bg_touch_move);
        car2._bg.on('touchend mouseup', car2._bg_touch_end);
    },
    // 页面切换停止
    _bg_stop: function () {
        car2._bg.off('touchstart mousedown');
        car2._bg.off('touchmove mousemove');
        car2._bg.off('touchend mouseup');
    },
    // page触摸移动start
    _bg_touch_start: function (e) {

        $(".bgs").hide();

    },
    _exit: $(".exit"),
    _exit_start: function () {
        car2._exit.on('touchstart mousedown', car2._exit_touch_start);
        car2._exit.on('touchmove mousemove', car2._exit_touch_move);
        car2._exit.on('touchend mouseup', car2._exit_touch_end);
    },
    // 页面切换停止
    _exit_stop: function () {
        car2._exit.off('touchstart mousedown');
        car2._exit.off('touchmove mousemove');
        car2._exit.off('touchend mouseup');
    },
    // page触摸移动start
    _exit_touch_start: function (e) {

        $("#pic1").hide();
        $("#rock1 li").removeClass("pic1");
        $("#left1").hide();
        $("#right1").hide();
        $(this).hide();


    },
    // 页面切换开始
    _tochStart_rockX: 0,
    _tochStart_rockY: 0,
    _touchDeltaXRock: 0,
    _movePosition_rock: null,
    _movePosition_c_rock: null,
    _rockNow: 6,
    cur_len_pic2: 7,
    _windowHeight: $(window).height(),					// 设备屏幕高度
    _windowWidth: $(window).width(),


    len_pic2: $("#rock2 li").size(),               //第十个页面中动画图片的数量
    _rock: $("#rock2 li"),                         //第十个页面动画对象

    dt: 1,
    audio_p: 0,
    statr_down_pic2: 0,
    down_x_pic2: 0,
    move_x_pic2: 0,
    statr_down_y_pic2: 0,
    down_y_pic2: 0,
    move_y_pic2: 0,
    is_move_pic2: false,
    rock_start: function () {
        car2._rock.on('touchstart mousedown', car2.rock_touch_start);
        car2._rock.on('touchmove mousemove', car2.rock_touch_move);
        car2._rock.on('touchend mouseup', car2.rock_touch_end);
    },
    // 页面切换停止
    rock_stop: function () {
        car2._rock.off('touchstart mousedown');
        car2._rock.off('touchmove mousemove');
        car2._rock.off('touchend mouseup');
    },
    // page触摸移动start
    rock_touch_start: function (e) {

        car2.down_x_pic2 = e.touches.item(0).pageX;
        car2.statr_down_pic2 = car2.down_x_pic2;
        car2.down_y_pic2 = e.touches.item(0).pageY;
        car2.statr_down_y_pic2 = car2.down_y_pic2;
    },
    // page触摸移动move
    rock_touch_move: function (e) {
        e.preventDefault();
        car2.move_x_pic2 = e.touches.item(0).pageX - car2.down_x_pic2;
        car2.down_x_pic2 = e.touches.item(0).pageX;
        car2.move_y_pic2 = e.touches.item(0).pageY - car2.down_y_pic2;
        car2.down_y_pic2 = e.touches.item(0).pageY;
    },
    // page触摸移动判断方向 	
    // page触摸移动end
    rock_touch_end: function (e) {
        car2.move_x_pic2 = car2.down_x_pic2 - car2.statr_down_pic2;
        if (car2.move_x_pic2 < -10 && (car2.move_y_pic2 < 50 && car2.move_y_pic2 > -50)) {
            car2.animates_pic2_left()
        } else if (car2.move_x_pic2 > 10 && (car2.move_y_pic2 < 50 && car2.move_y_pic2 > -50)) {
            car2.animates_pic2_right()
        }
    },
    _submit: $(".submit"),
    _events: {},									// 自定义事件---this._execEvent('scrollStart');
    _windowHeight: $(window).height(),					// 设备屏幕高度
    _windowWidth: $(window).width(),
    _rotateNode: $('.p-ct'),						    // 旋转体
    _page: $('.m-page'),							// 模版页面切换的页面集合
    _pageNum: $('.m-page').size(),					// 模版页面的个数
    _pageNow: 0,									// 页面当前的index数
    _pageNext: null,									// 页面下一个的index数
    _touchStartValY: 0,									// 触摸开始获取的第一个值
    _touchDeltaY: 0,									// 滑动的距离
    _moveStart: true,									// 触摸移动是否开始
    _movePosition: null,									// 触摸移动的方向（上、下）
    _movePosition_c: null,									// 触摸移动的方向的控制
    _mouseDown: false,								// 判断鼠标是否按下
    _moveFirst: true,
    _moveInit: false,
    _firstChange: false,
    _map: $('.ylmap'),							// 地图DOM对象
    _mapValue: null,									// 地图打开时，存储最近打开的一个地图
    _mapIndex: null,									// 开启地图的坐标位置
    _audioNode: $('.u-audio'),						// 声音模块
    _audio: null,									// 声音对象
    _audio_val: true,									// 声音是否开启控制	
    _elementStyle: document.createElement('div').style,	// css属性保存对象
    _UC: RegExp("Android").test(navigator.userAgent) && RegExp("UC").test(navigator.userAgent) ? true : false,
    _weixin: RegExp("MicroMessenger").test(navigator.userAgent) ? true : false,
    _iPhoen: RegExp("iPhone").test(navigator.userAgent) || RegExp("iPod").test(navigator.userAgent) || RegExp("iPad").test(navigator.userAgent) ? true : false,
    _Android: RegExp("Android").test(navigator.userAgent) ? true : false,
    _IsPC: function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },

    /***********************
     *  = gobal通用函数
     ***********************/
    // 判断函数是否是null空值
    _isOwnEmpty: function (obj) {
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                return false;
            }
        }
        return true;
    },
    // 微信初始化函数
    _WXinit: function (callback) {
        if (typeof window.WeixinJSBridge == 'undefined' || typeof window.WeixinJSBridge.invoke == 'undefined') {
            setTimeout(function () {
                this.WXinit(callback);
            }, 200);
        } else {
            callback();
        }
    },
    // 判断浏览器内核类型
    _vendor: function () {
        var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
            transform,
            i = 0,
            l = vendors.length;

        for (; i < l; i++) {
            transform = vendors[i] + 'ransform';
            if (transform in this._elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
        }
        return false;
    },
    // 判断浏览器来适配css属性值
    _prefixStyle: function (style) {
        if (this._vendor() === false) return false;
        if (this._vendor() === '') return style;
        return this._vendor() + style.charAt(0).toUpperCase() + style.substr(1);
    },
    // 判断是否支持css transform-3d（需要测试下面属性支持）
    _hasPerspective: function () {
        var ret = this._prefixStyle('perspective') in this._elementStyle;
        if (ret && 'webkitPerspective' in this._elementStyle) {
            this._injectStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function (node, rule) {
                ret = node.offsetLeft === 9 && node.offsetHeight === 3;
            });
        }
        return !!ret;
    },
    _translateZ: function () {
        if (car2._hasPerspective) {
            return ' translateZ(0)';
        } else {
            return '';
        }
    },

    // 判断属性支持是否
    _injectStyles: function (rule, callback, nodes, testnames) {
        var style, ret, node, docOverflow,
            div = document.createElement('div'),
            body = document.body,
            fakeBody = body || document.createElement('body'),
            mod = 'modernizr';

        if (parseInt(nodes, 10)) {
            while (nodes--) {
                node = document.createElement('div');
                node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                div.appendChild(node);
            }
        }
        style = ['&#173;', '<style id="s', mod, '">', rule, '</style>'].join('');
        div.id = mod;
        (body ? div : fakeBody).innerHTML += style;
        fakeBody.appendChild(div);
        if (!body) {
            fakeBody.style.background = '';
            fakeBody.style.overflow = 'hidden';
            docOverflow = docElement.style.overflow;
            docElement.style.overflow = 'hidden';
            docElement.appendChild(fakeBody);
        }
        ret = callback(div, rule);
        if (!body) {
            fakeBody.parentNode.removeChild(fakeBody);
            docElement.style.overflow = docOverflow;
        } else {
            div.parentNode.removeChild(div);
        }

        return !!ret;
    },
    // 自定义事件操作
    _handleEvent: function (type) {
        if (!this._events[type]) {
            return;
        }
        var i = 0,
            l = this._events[type].length;
        if (!l) {
            return;
        }
        for (; i < l; i++) {
            this._events[type][i].apply(this, [].slice.call(arguments, 1));
        }
    },
    // 给自定义事件绑定函数
    _on: function (type, fn) {
        if (!this._events[type]) {
            this._events[type] = [];
        }
        this._events[type].push(fn);
    },
    //禁止滚动条
    /*_scrollStop		: function(){
     //禁止滚动
     $(window).on('touchmove.scroll',this._scrollControl);
     $(window).on('scroll.scroll',this._scrollControl);
     },*/
    //启动滚动条
    _scrollStart: function () {
        //开启屏幕禁止
        $(window).off('touchmove.scroll');
        $(window).off('scroll.scroll');
    },
    //滚动条控制事件
    _scrollControl: function (e) {
        e.preventDefault();
    },

    /**************************************************************************************************************/
    /*  关联处理函数
     ***************************************************************************************************************/
    /**
     *  单页面-m-page 切换的函数处理
     *  -->绑定事件
     *  -->事件处理函数
     *  -->事件回调函数
     *  -->事件关联函数【
     */
    // 页面切换开始
    page_start: function () {
        car2._page.on('touchstart mousedown', car2.page_touch_start);
        car2._page.on('touchmove mousemove', car2.page_touch_move);
        car2._page.on('touchend mouseup', car2.page_touch_end);
    },
    move_start: function () {
        car2._page.on('touchstart mousedown', car2.move_touch_start);
        car2._page.on('touchmove mousemove', car2.move_touch_move);
        car2._page.on('touchend mouseup', car2.move_touch_end);
    },
    oldX: 0,
    _boxheight: 0,
    moveObj: null,
    stagemove: false,
    move_touch_start: function (e) {
        car2.parallax_acrolling();
        car2.stagemove = true;
        oldX = e.pageY;
    },
    move_touch_move: function (e) {
        e.preventDefault();
        if (!car2.stagemove) return;
        car2.movePagem(e.pageY - oldX, false)
    },
    move_touch_end: function (e) {

        car2.stagemove = false;
        var kuai = oldX - e.pageY;
        if (kuai > 500) {
            //下一页
            car2.movePagem(-20000, true);
        } else if (kuai < -500) {
            //上一页
            car2.movePagem(20000, true);
        } else {
            //回复原样	
            car2.movePagem(0, true);

        }

    },
    //视差滚动插件
    parallax_acrolling: function () {
        moveObj = new Array();
        var obj = $(".st").eq(0).find("div");
        for (var i = 0; i < obj.length; i++) {
            moveObj.push(obj.eq(i));
            obj.eq(i).attr("data-position-top", obj.eq(i).position().top);
        }
        ;

    },

    movePagem: function (x, b) {
        if (moveObj != null) {
            for (var i = 0; i < moveObj.length; i++) {
                var _y = parseInt(moveObj[i].attr("data-position-top"));
                var _index = parseInt(moveObj[i].attr("data-speed"));
                if (b) {
                    moveObj[i].addClass("move2");
                } else {
                    moveObj[i].removeClass("move2");
                }
                moveObj[i].css({
                    "top": _y + x / _index * 0.3
                });
            }
            ;

        }

    },
    // 页面切换停止
    page_stop: function () {
        car2._page.off('touchstart mousedown');
        car2._page.off('touchmove mousemove');
        car2._page.off('touchend mouseup');
    },

    // page触摸移动start
    page_touch_start: function (e) {
        if (car2.audio_p == 0) {

            car2._audio.play();
            car2.audio_p++;
        } else {

        }

        if (e.type == "touchstart") {
            car2._touchStartValY = window.event.touches[0].pageY;
        } else {
            car2._touchStartValY = e.pageY || e.y;
            car2._mouseDown = true;
        }

        car2._moveInit = true;

        // start事件
        car2._handleEvent('start');
    },

    // page触摸移动move
    page_touch_move: function (e) {
        e.preventDefault();

        if (!car2._moveStart) return;
        if (!car2._moveInit) return;
        // 设置变量值
        var $self = car2._page.eq(car2._pageNow),
            h = parseInt($self.height()),
            moveP,
            scrollTop,
            node = null,
            move = false;

        // 获取移动的值
        if (e.type == "touchmove") {
            moveP = window.event.touches[0].pageY;
            move = true;
        } else {
            if (car2._mouseDown) {
                moveP = e.pageY || e.y;
                move = true;
            } else return;
        }
        // 获取下次活动的page
        node = car2.page_position(e, moveP, $self);

        // page页面移动 		
        car2.page_translate(node);

        // move事件
        car2._handleEvent('move');
    },

    // page触摸移动判断方向
    page_position: function (e, moveP, $self) {
        var now, next;
        // 设置移动的距离
        if (moveP != 'undefined') car2._touchDeltaY = moveP - car2._touchStartValY;
        // 设置移动方向
        car2._movePosition = moveP - car2._touchStartValY > 0 ? 'down' : 'up';
        if (car2._movePosition != car2._movePosition_c) {
            car2._moveFirst = true;
            car2._movePosition_c = car2._movePosition;
        } else {
            car2._moveFirst = false;
        }
        // 设置下一页面的显示和位置        
        if (car2._touchDeltaY <= 0) {
            if ($self.next('.m-page').length == 0) {
                car2._pageNext = 0;
            } else {
                car2._pageNext = car2._pageNow + 1;
            }
            next = car2._page.eq(car2._pageNext)[0];
        } else {
            if ($self.prev('.m-page').length == 0) {
                if (car2._firstChange) {
                    car2._pageNext = car2._pageNum - 1;
                } else {
                    return;
                }
            } else {
                car2._pageNext = car2._pageNow - 1;
            }
            next = car2._page.eq(car2._pageNext)[0];
        }
        now = car2._page.eq(car2._pageNow)[0];
        node = [next, now];
        // move阶段根据方向设置页面的初始化位置--执行一次
        if (car2._moveFirst) init_next(node);

        function init_next(node) {
            var s, l, _translateZ = car2._translateZ();
            car2._page.removeClass('action');
            $(node[1]).addClass('action').removeClass('f-hide');
            car2._page.not('.action').addClass('f-hide');
            // 模版高度适配函数处理
            car2.height_auto(car2._page.eq(car2._pageNext), 'true');
            // 显示对应移动的page
            $(node[0]).removeClass('f-hide').addClass('active');
            // 设置下一页面的显示和位置        
            if (car2._movePosition == 'up') {
                s = parseInt($(window).scrollTop());
                if (s > 0) l = $(window).height() + s;
                else l = $(window).height();
                node[0].style[car2._prefixStyle('transform')] = 'translate(0,' + l + 'px)' + _translateZ;
                $(node[0]).attr('data-translate', l);

                $(node[1]).attr('data-translate', 0);
            } else {
                node[0].style[car2._prefixStyle('transform')] = 'translate(0,-' + Math.max($(window).height(), $(node[0]).height()) + 'px)' + _translateZ;
                $(node[0]).attr('data-translate', -Math.max($(window).height(), $(node[0]).height()));

                $(node[1]).attr('data-translate', 0);
            }
        }

        return node;
    },
    // page触摸移动设置函数
    page_translate: function (node) {
        // 没有传值返回

        if (!node) return;
        var _translateZ = car2._translateZ(),
            y_1, y_2, scale,
            y = car2._touchDeltaY;
        // 切换的页面移动
        if ($(node[0]).attr('data-translate')) y_1 = y + parseInt($(node[0]).attr('data-translate'));
        node[0].style[car2._prefixStyle('transform')] = 'translate(0,' + y_1 + 'px)' + _translateZ;

        // 当前的页面移动
        if ($(node[1]).attr('data-translate')) y_2 = y + parseInt($(node[1]).attr('data-translate'));
        scale = 1 - Math.abs(y * 0.2 / $(window).height());
        y_2 = y_2 / 5;
        node[1].style[car2._prefixStyle('transform')] = 'translate(0,' + y_2 + 'px)' + _translateZ + ' scale(' + scale + ')';
    },
    // page触摸移动end
    // EVENT_scroll:function(e){
    // 	var _point =0;
    // 	var _movePoint = $('.show_3').scrollTop();
    // 		if(_movePoint >= 2358 - parseInt($(window).height())){
    // 			car2.page_start();
    //                car2._scrollStop(); 
    // 		  car2.page_stop(); 	
    // 		}else if(_movePoint <= 0){

    // 			car2.page_start();
    //                car2._scrollStop(); 
    // 		}
    // },
    page_touch_end: function (e) {
        car2._moveInit = false;
        car2._mouseDown = false;
        if (!car2._moveStart) return;
        if (!car2._pageNext && car2._pageNext != 0) return;
        car2._moveStart = false;
        // 确保移动了
        if (Math.abs(car2._touchDeltaY) > 10) {
            car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = 'all .3s';
            car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = 'all .3s';
        }
        // 页面切换
        if (Math.abs(car2._touchDeltaY) >= 100) {
            car2.page_success();

            if (car2._pageNext == 1) {

                //car2.page_stop();
                $(".show_3").height(parseInt($(window).height())).show("slow");
                //car2._scrollStart();
                //$('.show_3').on('touchend mouseup scroll',car2.EVENT_scroll);

                //$('.p38, .p37, .p39').on('click',function(){
                //var s,l,_translateZ = car2._translateZ();
                //var _node =[car2._page.eq(2),car2._page.eq(3)]
                //s = parseInt($(window).scrollTop());
                //if(s>0) l = $(window).height()+s;
                //else l = $(window).height();
                //_node[0].style[car2._prefixStyle('transform')] = 'translate(0,'+l+'px)'+_translateZ;
                //	$(_node[0]).attr('data-translate',l);
                //$(_node[1]).attr('data-translate',0);


                //car2._page.eq(car2._pageNow)[0].find('.st3').style[car2._prefixStyle('transform')] = 'translate(0,100px,0)';
                //	$(".st3").hide("slow");
                // $(".show_3").height(parseInt($(window).height())).show("slow");
                //	car2._scrollStart();
                //$('.show_3').on('touchend mouseup scroll',car2.EVENT_scroll);
                //car2._page.eq(2).addClass('f-hide')
                //car2._page.eq(3).removeClass('f-hide').addClass('active'); 

                //})
                //	$('.scroll_off').on('touchend mouseup scroll',car2.EVENT_scroll);
            }

            //if(car2._pageNext==3){
            //	car2.page_stop();
            //    car2._scrollStart();
            //	$('.scroll_off').on('touchend mouseup scroll',car2.EVENT_scroll);
            //}
            if (car2._pageNext != 7) {
                $("#pic1").hide();
                $("#rock1 li").removeClass("pic1");
                $("#left1").hide();
                $("#right1").hide();
                $(".exit").hide();
            }
            if (car2._pageNext != 4) {
                //car2.page_stop();	
            }
            if (car2._pageNext == 7) {// 10页禁			
                //car2._page.off('touchstart mousedown');
                //car2._page.off('touchmove mousemove');
                //car2._page.on('touchstart mousedown',car2.page_touch_start);
               // car2._page.on('touchmove mousemove', car2.page_touch_move);
               // car2._page.off('touchend mouseup');
            }
        } else if (Math.abs(car2._touchDeltaY) > 10 && Math.abs(car2._touchDeltaY) < 100) {	// 切换失败		

            car2.page_fial();
        } else {									// 没有切换
            car2.page_fial();
        }
        // end事件
        car2._handleEvent('end');
        // 注销控制值
        car2._movePosition = null;
        car2._movePosition_c = null;
        car2._touchStartValY = 0;
    },
    // 切换成功
    page_success: function () {
        var _translateZ = car2._translateZ();
        // 下一个页面的移动
        car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,0)' + _translateZ;
        // 当前页面变小的移动
        var y = car2._touchDeltaY > 0 ? $(window).height() / 5 : -$(window).height() / 5;
        var scale = 0.8;
        car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = 'translate(0,' + y + 'px)' + _translateZ + ' scale(' + scale + ')';

        // 成功事件
        car2._handleEvent('success');
    },

    // 切换失败
    page_fial: function () {
        var _translateZ = car2._translateZ();

        // 判断是否移动了
        if (!car2._pageNext && car2._pageNext != 0) {
            car2._moveStart = true;
            car2._moveFirst = true;
            return;
        }

        if (car2._movePosition == 'up') {
            car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,' + $(window).height() + 'px)' + _translateZ;
        } else {
            car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,-' + $(window).height() + 'px)' + _translateZ;
        }
        car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = 'translate(0,0)' + _translateZ + ' scale(1)';

        // fial事件
        car2._handleEvent('fial');
    },

    /**
     *  对象函数事件绑定处理
     *  -->start touch开始事件
     *  -->mov   move移动事件
     *  -->end   end结束事件
     */
    haddle_envent_fn: function () {
        // 当前页面移动，延迟加载以后的图片
        car2._on('start', car2.lazy_bigP);
        // 当前页面移动
        car2._on('move', function () {

        });
        // 切换失败事件
        car2._on('fial', function () {
            setTimeout(function () {
                car2._page.eq(car2._pageNow).attr('data-translate', '');
                car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = '';
                car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = '';
                car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = '';
                car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = '';
                car2._page.eq(car2._pageNext).removeClass('active').addClass('f-hide');
                car2._moveStart = true;
                car2._moveFirst = true;
                car2._pageNext = null;
                car2._touchDeltaY = 0;
                car2._page.eq(car2._pageNow).attr('style', '');
            }, 300)
        })
        // 切换成功事件
        car2._on('success', function () {
            // 判断最后一页让，开启循环切换
            if (car2._pageNext == 0 && car2._pageNow == car2._pageNum - 1) {
                car2._firstChange = true;
            }
            // 判断是否是最后一页，让轻APP关联页面隐藏
            if (car2._page.eq(car2._pageNext).next('.m-page').length != 0) {
                car2.lightapp_intro_hide(true);
            }
            setTimeout(function () {
                // 设置富文本的高度
                car2.Txt_init(car2._page.eq(car2._pageNow));
                // 判断是否为最后一页，显示或者隐藏箭头
                if (car2._pageNext == car2._pageNum - 1) $('.u-arrow').addClass('f-hide');
                else  $('.u-arrow').removeClass('f-hide');
                car2._page.eq(car2._pageNow).addClass('f-hide');
                car2._page.eq(car2._pageNow).attr('data-translate', '');
                car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = '';
                car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = '';
                car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = '';
                car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = '';
                // 初始化切换的相关控制值
                $('.p-ct').removeClass('fixed');
                car2._page.eq(car2._pageNext).removeClass('active');
                car2._page.eq(car2._pageNext).removeClass('fixed');
                car2._pageNow = car2._pageNext;
                car2._moveStart = true;
                car2._moveFirst = true;
                car2._pageNext = null;
                car2._page.eq(car2._pageNow).attr('style', '');
                car2._page.eq(car2._pageNow).removeClass('fixed');
                car2._page.eq(car2._pageNow).attr('data-translate', '');
                car2._touchDeltaY = 0;
                // 切换成功后，执行当前页面的动画---延迟200ms
                setTimeout(function () {
                    if (car2._page.eq(car2._pageNow).hasClass('bigTxt-bd')) return;
                    car2._page.removeClass('z-animate').eq(car2._pageNow).addClass('z-animate');
                }, 20)
                // 隐藏图文组件的文本
                $('.j-detail').removeClass('z-show');
                $('.txt-arrow').removeClass('z-toggle');
                // 切换停止视频的播放
                $('video').each(function () {
                    if (!this.paused) this.pause();
                })
                // 设置富文本的高度
                car2.Txt_init(car2._page.eq(car2._pageNow));
                // 判断是否滑动最后一页，并让轻APP介绍关联页面贤淑
                if (car2._page.eq(car2._pageNow).next('.m-page').length == 0) {
                    car2.lightapp_intro_show();
                    car2.lightapp_intro();
                }
            }, 300)

        })
    },
    /**
     *  media资源管理
     *  -->绑定声音控制事件
     *  -->函数处理声音的开启和关闭
     *  -->异步加载声音插件（延迟做）
     *  -->声音初始化
     *  -->视频初始化
     *  -->声音和视频切换的控制
     */
    // 声音初始化
    audio_init: function () {
        // media资源的加载
        var options_audio = {
            loop: true,
            preload: "auto",
            src: car2._audioNode.attr('data-src')
        }
        car2._audio = new Audio();
        for (var key in options_audio) {
            if (options_audio.hasOwnProperty(key) && (key in car2._audio)) {
                car2._audio[key] = options_audio[key];
            }
        }
        //  car2._audio.load();
        car2.audio_play();
    },

    // 声音事件绑定
    audio_addEvent: function () {
        if (car2._audioNode.length <= 0) return;
        // 声音按钮点击事件
        var txt = car2._audioNode.find('.txt_audio'),
            time_txt = null;
        car2._audioNode.find('.btn_audio').on('click', car2.audio_contorl);

        // 声音打开事件
        $(car2._audio).on('play', function () {
            car2._audio_val = false;
            audio_txt(txt, true, time_txt);
            $('.audio_open').removeClass('audio_close');
            $('.audio_open').addClass('open');

            // 开启音符冒泡
            //$.fn.coffee.start();
            //$('.coffee-steam-box').show(500);
        })
        // 声音关闭事件
        $(car2._audio).on('pause', function () {
            audio_txt(txt, false, time_txt)
            $('.audio_open').addClass('audio_close');
            $('.audio_open').removeClass('open');

            // 关闭音符冒泡
            //$.fn.coffee.stop();
            //$('.coffee-steam-box').hide(500);
        })
        function audio_txt(txt, val, time_txt) {
            if (val) txt.text('打开');
            else txt.text('关闭');

            if (time_txt) clearTimeout(time_txt);

            txt.removeClass('z-move z-hide');
            time_txt = setTimeout(function () {
                txt.addClass('z-move').addClass('z-hide');
            }, 1000)
        }
    },
    // 声音控制函数
    audio_contorl: function () {
        if (!car2._audio_val) {
            car2.audio_stop();
        } else {
            car2.audio_play();
        }
    },

    // 声音播放
    audio_play: function () {
        car2._audio_val = false;
        if (car2._audio) car2._audio.play();
    },

    // 声音停止
    audio_stop: function () {
        car2._audio_val = true;
        if (car2._audio) car2._audio.pause();
    },

    // 视频初始化
    video_init: function () {
        // 视频
        $('.j-video').each(function () {
            var option_video = {
                controls: 'controls',
                preload: 'none',
                // poster : $(this).attr('data-poster'),
                width: $(this).attr('data-width'),
                height: $(this).attr('data-height'),
                src: $(this).attr('data-src')
            }

            var video = $('<video class="f-hide"></video>')[0];

            for (var key in option_video) {
                if (option_video.hasOwnProperty(key) && (key in video)) {
                    video[key] = option_video[key];
                }
                this.appendChild(video);
            }

            var img = $(video).prev();

            $(video).on('play', function () {
                img.hide();
                $(video).removeClass('f-hide');
            });

            $(video).on('pause', function () {
                img.show();
                $(video).addClass('f-hide');
            });
        })

        $('.j-video .img').on('click', function () {
            var video = $(this).next()[0];

            if (video.paused) {
                $(video).removeClass('f-hide');
                video.play();
                $(this).hide();
            }
        })
    },

    //处理声音和动画的切换
    media_control: function () {
        if (!car2._audio) return;
        if ($('video').length <= 0) return;

        $(car2._audio).on('play', function () {
            $('video').each(function () {
                if (!this.paused) {
                    this.pause();
                }
            });
        });

        $('video').on('play', function () {
            if (!car2._audio_val) {
                car2.audio_contorl();
            }
        });
    },

    // media管理初始化
    media_init: function () {
        // 声音初始化
        car2.audio_init();

        // 视频初始化
        car2.video_init();

        // 绑定音乐加载事件
        car2.audio_addEvent();

        // 音频切换
        car2.media_control();
    },

    /**
     *  图片延迟加载功能
     *  -->替代需要延迟加载的图片
     *  -->优化加载替代图片
     *  -->切换功能触发图片的延迟加载
     *  -->替代图片为400*400的透明大图片
     */
    /* 图片延迟加载 */
    lazy_img: function () {
        var lazyNode = $('.lazy-img');
        lazyNode.each(function () {
            var self = $(this);
            if (self.is('img')) {
                self.attr('src', 'img/loading.gif');
            } else {
                // 把原来的图片预先保存下来
                var position = self.css('background-position'),
                    size = self.css('background-size');

                self.attr({
                    'data-position': position,
                    'data-size': size
                });

                if (self.attr('data-bg') == 'no') {
                    self.css({
                        'background-repeat': 'no-repeat'
                    })
                }

                self.css({
                    'background-image': 'url(img/loading.gif)',
                    'background-size': '120px 120px',
                    'background-position': 'center'
                })

                if (self.attr('data-image') == 'no') {
                    self.css({
                        'background-image': 'none'
                    })
                }
            }
        })
    },

    // 开始加载前三个页面
    lazy_start: function () {
        // 前三个页面的图片延迟加载
        setTimeout(function () {
            for (var i = 0; i < 3; i++) {
                var node = $(".m-page").eq(i);
                if (node.length == 0) break;
                if (node.find('.lazy-img').length != 0) {
                    car2.lazy_change(node, false);
                    // 飞出窗口的延迟
                    if (node.attr('data-page-type') == 'flyCon') {
                        car2.lazy_change($('.m-flypop'), false);
                    }
                } else continue;
            }
        }, 200)
    },

    // 加载当前后面第三个
    lazy_bigP: function () {
        for (var i = 3; i <= 5; i++) {
            var node = $(".m-page").eq(car2._pageNow + i);
            if (node.length == 0) break;
            if (node.find('.lazy-img').length != 0) {
                car2.lazy_change(node, true);
                // 飞出窗口的延迟
                if (node.attr('data-page-type') == 'flyCon') {
                    car2.lazy_change($('.m-flypop'), false);
                }
            } else continue;
        }
    },

    // 图片延迟替换函数
    lazy_change: function (node, goon) {
        // 3d图片的延迟加载
        if (node.attr('data-page-type') == '3d') car2.lazy_3d(node);

        // 飞出窗口的延迟
        if (node.attr('data-page-type') == 'flyCon') {
            var img = $('.m-flypop').find('.lazy-img');
            img.each(function () {
                var self = $(this),
                    srcImg = self.attr('data-src');

                $('<img />')
                    .on('load', function () {
                        if (self.is('img')) {
                            self.attr('src', srcImg)
                        }
                    })
                    .attr("src", srcImg);
            })
        }
        // 其他图片的延迟加载
        var lazy = node.find('.lazy-img');
        lazy.each(function () {
            var self = $(this),
                srcImg = self.attr('data-src'),
                position = self.attr('data-position'),
                size = self.attr('data-size');

            if (self.attr('data-bg') != 'no') {
                $('<img />')
                    .on('load', function () {
                        if (self.is('img')) {
                            self.attr('src', srcImg)
                        } else {
                            self.css({
                                'background-image': 'url(' + srcImg + ')',
                                'background-position': "left top",
                                'background-size': "100%"
                            })
                        }
                        // 判断下面页面进行加载
                        if (goon) {
                            for (var i = 0; i < $(".m-page").size(); i++) {
                                var page = $(".m-page").eq(i);
                                if ($(".m-page").find('.lazy-img').length == 0) continue
                                else {
                                    car2.lazy_change(page, true);
                                }
                            }
                        }
                    })
                    .attr("src", srcImg);

                self.removeClass('lazy-img').addClass('lazy-finish');
            } else {
                if (self.attr('data-auto') == 'yes') self.css('background', 'none');
            }
        })
    },


    /**************************************************************************************************************/
    /*  单个处理函数
     ***************************************************************************************************************/
    /**
     * 单个函数处理-unit
     * -->高度的计算
     * -->文本的展开
     * -->文本的收起
     * -->输入表单的操作
     * -->微信的分享提示
     */
    // 根据设备的高度，来适配每一个模版的高度，并且静止滑动
    // --文档初始化计算
    // --页面切换完成计算
    height_auto: function (ele, val) {
        ele.children('.page-con').css('height', 'auto');
        var height = $(window).height();

        // 需要解除固定高度的page卡片
        var vial = true;
        if (!vial) {
            if (ele.height() <= height) {
                ele.children('.page-con').height(height + 2);
                if ((!$('.p-ct').hasClass('fixed')) && val == 'true') $('.p-ct').addClass('fixed');
            } else {
                car2._scrollStart();
                if (val == 'true') $('.p-ct').removeClass('fixed');
                ele.children('.page-con').css('height', '100%');
                return;
            }
        } else {
            ele.children('.page-con').height(height + 2);
            if ((!$('.p-ct').hasClass('fixed')) && val == 'true') $('.p-ct').addClass('fixed');
        }
    },

    // 富文本的设置
    Txt_init: function (node) {
        if (node.find('.j-txt').length <= 0) return;
        if (node.find('.j-txt').find('.j-detail p').length <= 0) return;

        node.find('.j-txt').each(function () {
            var txt = $(this).find('.j-detail'),
                title = $(this).find('.j-title'),
                arrow = title.find('.txt-arrow'),
                p = txt.find('p'),
                height_t = parseInt(title.height()),
                height_p = parseInt(p.height()),
                height_a = height_p + height_t;

            if ($(this).parents('.m-page').hasClass('m-smallTxt')) {
                if ($(this).parents('.smallTxt-bd').index() == 0) {
                    txt.css('top', height_t);
                } else {
                    txt.css('bottom', height_t);
                }
            }

            txt.attr('data-height', height_p);
            $(this).attr('data-height-init', height_t);
            $(this).attr('data-height-extand', height_a);

            p[0].style[car2._prefixStyle('transform')] = 'translate(0,-' + height_p + 'px)';
            if ($(this.parentNode).hasClass('z-left')) p[0].style[car2._prefixStyle('transform')] = 'translate(0,' + height_p + 'px)';

            txt.css('height', '0');
            arrow.removeClass('z-toggle');
            $(this).css('height', height_t);
        })
    },

    // 富文本组件点击展开详细内容
    bigTxt_extand: function () {
        $('body').on('click', '.j-title', function () {
            if ($('.j-detail').length <= 0) return;

            // 定位
            var detail = $(this.parentNode).find('.j-detail');
            $('.j-detail').removeClass('action');
            detail.addClass('action');
            if ($(this).hasClass('smallTxt-arrow')) {
                $('.smallTxt-bd').removeClass('action');
                detail.parent().addClass('action');
            }

            // 设置
            if (detail.hasClass('z-show')) {
                detail.removeClass('z-show');
                detail.css('height', 0);
                $(this.parentNode).css('height', parseInt($(this.parentNode).attr('data-height-init')));
            }
            else {
                detail.addClass('z-show');
                detail.css('height', parseInt(detail.attr('data-height')));
                $(this.parentNode).css('height', parseInt($(this.parentNode).attr('data-height-extand')));
            }

            $('.j-detail').not('.action').removeClass('z-show');
            $('.txt-arrow').removeClass('z-toggle');

            detail.hasClass('z-show') ? ($(this).find('.txt-arrow').addClass('z-toggle')) : ($(this).find('.txt-arrow').removeClass('z-toggle'))
        })
    }(),

    // 文本点击其他地方收起
    Txt_back: function () {
        $('body').on('click', '.m-page', function (e) {
            e.stopPropagation();

            // 判断
            var node = $(e.target);
            var page = node.parents('.m-page');
            var txtWrap = node.parents('.j-txtWrap').length == 0 ? node : node.parents('.j-txtWrap');
            if (page.find('.j-txt').find('.j-detail p').length <= 0) return;
            if (page.find('.j-txt').length <= 0 || node.parents('.j-txt').length >= 1 || node.hasClass('bigTxt-btn') || node.parents('.bigTxt-btn').length >= 1) return;

            // 定位
            var detail = txtWrap.find('.j-detail');
            $('.j-detail').removeClass('action');
            detail.addClass('action');
            $('.j-detail').not('.action').removeClass('z-show');

            // 设置
            txtWrap.each(function () {
                var detail = $(this).find('.j-detail');
                var arrow = $(this).find('.txt-arrow');
                var txt = $(this).find('.j-txt');

                if (detail.hasClass('z-show')) {
                    detail.removeClass('z-show');
                    detail.css('height', 0);
                    txt.css('height', parseInt(txt.attr('data-height-init')));
                } else {
                    detail.addClass('z-show');
                    detail.css('height', parseInt(detail.attr('data-height')));
                    txt.css('height', parseInt(txt.attr('data-height-extand')));
                }

                detail.hasClass('z-show') ? (arrow.addClass('z-toggle')) : (arrow.removeClass('z-toggle'));
            })
        })
    }(),

    // 表单显示，输入
    input_form: function () {
        $('body').on('click', '.book-bd .bd-form .btn', function () {
            var type_show = $(this).attr("data-submit");
            if (type_show == 'true') {
                return;
            }

            var heigt = $(window).height();

            $(document.body).css('height', heigt);
            car2.page_stop();
            car2._scrollStart();
            // 设置层级关系-z-index
            car2._page.eq(car2._pageNow).css('z-index', 15);

            $('.book-bg').removeClass('f-hide');
            $('.book-form').removeClass('f-hide');
            setTimeout(function () {
                $('.book-form').addClass('z-show');
                $('.book-bg').addClass('z-show');
            }, 50)

            $('.book-bg').off('click');
            $('.book-bg').on('click', function (e) {
                e.stopPropagation();

                var node = $(e.target);

                if (node.parents('.book-form').length >= 1 && !node.hasClass('j-close-img') && node.parents('.j-close').length <= 0) return;

                $('.book-form').removeClass('z-show');
                $('.book-bg').removeClass('z-show');
                setTimeout(function () {
                    $(document.body).css('height', '100%');
                    car2.page_start();
                    car2._scrollStop();
                    // 设置层级关系-z-index
                    car2._page.eq(car2._pageNow).css('z-index', 9);

                    $('.book-bg').addClass('f-hide');
                    $('.book-form').addClass('f-hide');
                }, 500)
            })
        })
    }(),

    sex_select: function () {
        var btn = $('#j-signUp').find('.sex p');
        var strongs = $('#j-signUp').find('.sex strong');
        var input = $('#j-signUp').find('.sex input');

        btn.on('click', function () {
            var strong = $(this).find('strong');
            strongs.removeClass('open');
            strong.addClass('open');

            var value = $(this).attr('data-sex');
            input.val(value);
        })
    }(),

    // 显示轻APP按钮
    lightapp_intro_show: function () {
        $('.market-notice').removeClass('f-hide');
        setTimeout(function () {
            $('.market-notice').addClass('show');
        }, 100)
    },

    // 隐藏轻APP按钮
    lightapp_intro_hide: function (val) {
        if (val) {
            $('.market-notice').addClass('f-hide').removeClass('show');
            return;
        }

        $('.market-notice').removeClass('show');
        setTimeout(function () {
            $('.market-notice').addClass('f-hide')
        }, 500)
    },

    // 轻APP介绍弹窗关联
    lightapp_intro: function () {
        // 点击按钮显示内容
        $('.market-notice').off('click');
        $('.market-notice').on('click', function () {
            $('.market-page').removeClass('f-hide');
            setTimeout(function () {
                $('.market-page').addClass('show');
                setTimeout(function () {
                    $('.market-img').addClass('show');
                }, 100)
                car2.lightapp_intro_hide();
            }, 100)

            // 禁止滑动
            car2.page_stop();
            car2._scrollStop();
        });

        // 点击窗口让内容隐藏
        $('.market-page').off('click');
        $('.market-page').on('click', function (e) {
            if ($(e.target).hasClass('market-page')) {
                $('.market-img').removeClass('show');
                setTimeout(function () {
                    $('.market-page').removeClass('show');
                    setTimeout(function () {
                        $('.market-page').addClass('f-hide');
                    }, 200)
                }, 500)
                car2.lightapp_intro_show();

                // 禁止滑动
                car2.page_start();
                car2._scrollStart();
            }
        });
    },

    // 微信的分享提示
    wxShare: function () {
        $('body').on('click', '.bigTxt-btn-wx', function () {
            var img_wx = $(this).parent().find('.bigTxt-weixin');

            img_wx.addClass('z-show');
            car2.page_stop();

            img_wx.on('click', function () {
                $(this).removeClass('z-show');
                car2.page_start();

                $(this).off('click');
            })
        })
    }(),

    // loading显示
    loadingPageShow: function () {
        $('.u-pageLoading').show();
    },

    // loading隐藏
    loadingPageHide: function () {
        $('.u-pageLoading').hide();
    },

    // 对象私有变量刷新
    refresh: function () {
        $(window).height = $(window).height();
        car2._windowWidth = $(window).width();
    },

    /**************************************************************************************************************/
    /*  函数初始化
     ***************************************************************************************************************/
    /**
     *  相关插件的启动
     */
    //插件启动函数
    plugin: function () {


        car2.start_callback();
    },


    // 蒙板插件回调函数处理
    start_callback: function () {
        // 隐藏蒙板

        // 开启window的滚动
        car2._scrollStart();

        // 开启页面切换
        car2.page_start();
        car2.rock_start();
        car2.share_start();
        car2.share_start2();
        car2.share3_start();
        car2.pic1_start();
        car2.a71_start();
        car2.a72_start();
        car2.a73_start();
        car2.a74_start();
        car2.a75_start();
        car2.a76_start();
        car2.a77_start();
        car2.a78_start();
        car2.a79_start();
        car2.a710_start();
        car2.a711_start();
        car2.a712_start();
        car2._bg_start();
        car2._exit_start();

        // 箭头显示
        $('.u-arrow').removeClass('f-hide');
        //$(".u-arrow").show();
        // 播放声音
        if (!car2._audio) return;
        car2._audioNode.removeClass('f-hide');
        car2._audio.play();

        // 声音启动
        $(document).one("touchstart", function () {
            car2._audio.play();
        });
    },

    /**
     * app初始化
     */
    // 样式适配
    styleInit: function () {
        // 禁止文版被拖动
        document.body.style.userSelect = 'none';
        document.body.style.mozUserSelect = 'none';
        document.body.style.webkitUserSelect = 'none';

        // 判断设备的类型并加上class
        if (car2._IsPC()) $(document.body).addClass('pc');
        else $(document.body).addClass('mobile');
        if (car2._Android) $(document.body).addClass('android');
        if (car2._iPhoen) $(document.body).addClass('iphone');

        // 判断是否有3d
        if (!car2._hasPerspective()) {
            car2._rotateNode.addClass('transformNode-2d');
            $(document.body).addClass('no-3d');
        }
        else {
            car2._rotateNode.addClass('transformNode-3d');
            $(document.body).addClass('perspective');
            $(document.body).addClass('yes-3d');
        }

        // 图片延迟加载的处理
        this.lazy_img();

        // 设置富文本的高度
        car2.Txt_init(car2._page.eq(car2._pageNow));

        // 模版提示文字显示
        setTimeout(function () {
            $('.m-alert').find('strong').addClass('z-show');
        }, 1000)

        $('.u-arrow').on('touchmove', function (e) {
            e.preventDefault()
        })

        $('.p-ct').height($(window).height());
        $('.m-page').height($(window).height());
        $('#j-mengban').height($(window).height());
        $('.translate-back').height($(window).height());
    },

    // 对象初始化
    init: function () {

        // 样式，标签的渲染
        // 对象操作事件处理
        this.styleInit();
        this.haddle_envent_fn();

        // 插件加载
        car2.plugin();

        // 禁止滑动
        // this._scrollStop();

        // 绑定全局事件函数处理
        // $(window).on('resize',function(){
        // 	car2.refresh();
        // })

        $('input[type="hidden"]').appendTo($('body'));

        // 图片预先加载
        $('<img />').attr('src', $('#r-cover').val());
        $('<img />').attr('src', $('.m-fengye').find('.page-con').attr('data-src'));

        // loading执行一次
        var loading_time = new Date().getTime();

        $(window).on('load', function () {
            var now = new Date().getTime();
            var loading_end = false;
            var time;
            var time_del = now - loading_time;

            if (time_del >= 2200) {
                loading_end = true;
            }

            if (loading_end) {
                time = 0;
            } else {
                time = 2200 - time_del;
            }
            $(".u-arrow").show();
            // loading完成后请求
            setTimeout(function () {

                // 模版提示隐藏
                setTimeout(function () {
                    $('.m-alert').addClass('f-hide');
                }, 1000)

                // 显示正面
                $('#j-mengban').addClass('z-show');

                // 显示封面内容
                setTimeout(function () {
                    $('.translate-back').removeClass('f-hide');
                    setTimeout(function () {
                        car2._page.eq(car2._pageNow).addClass('z-animate');
                    }, 1000);
                    $('.m-fengye').removeClass('f-hide');
                    car2.height_auto(car2._page.eq(car2._pageNow), 'true');
                }, 1000)

                // media初始化
                car2.media_init();

                // 延迟加载后面三个页面图片
                car2.lazy_start();

                $('.p-ct').height($(window).height());
                $('.m-page').height($(window).height());
                $('#j-mengban').height($(window).height());
                $('.translate-back').height($(window).height());

                //表单提交
                car2.submitUser();
                //获得地址
                car2.getUserInfor();

            }, time)
        })
    },
    share: $(".s11_t"),
    share_start: function () {
        car2.share.on('touchstart mousedown', car2.share_touch_start);
        car2.share.on('touchmove mousemove', car2.share_touch_move);
        car2.share.on('touchend mouseup', car2.share_touch_end);
    },

    share_touch_end: function (e) {
        e.preventDefault();
        $("#share").show();
    },

    share2: $("#share"),

    share_start2: function () {
        car2.share2.on('touchstart mousedown', car2.share_touch_start2);
        car2.share2.on('touchmove mousemove', car2.share_touch_move2);
        car2.share2.on('touchend mouseup', car2.share_touch_end2);
    },
    share_touch_end2: function (e) {
        // alert("3344")
        e.preventDefault();
        $("#share").hide();
    },
    share3: $(".s12_t"),
    share3_start: function () {
        car2.share3.on('touchstart mousedown', car2.share3_touch_start);
        car2.share3.on('touchmove mousemove', car2.share3_touch_move);
        car2.share3.on('touchend mouseup', car2.share3_touch_end);
    },
    share3_touch_end: function (e) {

        if (e.clipboardData) {
            alert("111")
        } else if (window.clipboardData) {
            alert("222");
        }
        ;

        //alert(clipboardData);

        //e.preventDefault();   
        //alert(window.clipboardData.getData('text'));
        // var html="aaaaa";
        /// alert(window.clipboardData.getData("Text"));
        //window.clipboardData.setData('text', html); 
        // var obj=document.getElementById("a71");  
        // alert(obj);
        // alert(clipboardData.getData('Text'));
        // if (window.clipboardData){
        //	 alert(clipboardData.getData('Text'));
        // }else{
        //	 alert("222222222");
        // }
        // alert(window.location.href)


    },
    aaa: function () {

        //window.clipboardData.setData("Text","oiiiiiiii");  
    },
    pic1: $("#pic1"),
    statr_down_pic1: 0,
    down_x_pic1: 0,
    move_x_pic1: 0,
    statr_down_y_pic1: 0,
    down_y_pic1: 0,
    move_y_pic1: 0,
    is_move_pic1: false,
    len_pic1: $("#rock1 li").size(),
    cur_len_pic1: 1,
    pic1_play: 1,
    pic1_start: function () {
        car2.pic1.on('touchstart mousedown', car2.pic1_touch_start);
        car2.pic1.on('touchmove mousemove', car2.pic1_touch_move);
        car2.pic1.on('touchend mouseup', car2.pic1_touch_end);
    },
    pic1_touch_start: function (e) {
        car2.pic1_play = 1;
        if (e.touches.length > 1) {
            return;

        } else {
            car2.down_x_pic1 = e.touches.item(0).pageX;
            car2.statr_down_pic1 = car2.down_x_pic1;
            car2.down_y_pic1 = e.touches.item(0).pageY;
            car2.statr_down_y_pic1 = car2.down_y_pic1;
        }
    },
    pic1_touch_move: function (e) {
        e.preventDefault();
        if (e.touches.length > 1) {
            return;

        } else {
            car2.move_x_pic1 = e.touches.item(0).pageX - car2.down_x_pic1;
            car2.down_x_pic1 = e.touches.item(0).pageX;
            car2.move_y_pic1 = e.touches.item(0).pageY - car2.down_y_pic1;
            car2.down_y_pic1 = e.touches.item(0).pageY;
        }
    },
    pic1_touch_end: function (e) {
        if (car2.pic1_play > 1) {
            return;
        } else {
            car2.pic1_play++;
        }
        // alert("sdsd");
        car2.move_x_pic1 = car2.down_x_pic1 - car2.statr_down_pic1;
        car2.move_y_pic1 = car2.down_y_pic1 - car2.statr_down_y_pic1;
        if (car2.move_x_pic1 < -10) {

            car2.animates_pic1_left()

        } else if (car2.move_x_pic1 > 10) {

            car2.animates_pic1_right()

        }
    },
    animates_pic1_left: function () {
        $("#rock1 li").each(function () {
            if ($(this).hasClass("pic1")) {
                car2.cur_len_pic1 = $(this).index() + 1;
            }
        })
        if (car2.cur_len_pic1 >= car2.len_pic1) {
            car2.cur_len_pic1 = car2.len_pic1
        } else {
            car2.cur_len_pic1++;
            $("#pic1 #rock1").css("left", -(car2._windowWidth * (car2.cur_len_pic1 - 1)) + "px");
            $("#pic1 ul li").eq(car2.cur_len_pic1 - 1).addClass("pic1").siblings().removeClass("pic1")

        }
    },
    animates_pic1_right: function () {

        $("#pic1 ul li").each(function () {
            if ($(this).hasClass("pic1")) {
                car2.cur_len_pic1 = $(this).index() + 1;
            }
        })
        if (car2.cur_len_pic1 <= 1) {
            car2.cur_len_pic1 = 1;
        } else {
            car2.cur_len_pic1--;
            $("#pic1 #rock1").css("left", -(car2._windowWidth * (car2.cur_len_pic1 - 1)) + "px");
            $("#pic1 ul li").eq(car2.cur_len_pic1 - 1).addClass("pic1").siblings().removeClass("pic1")
        }
    },
    a71: $("#a71"),
    a72: $("#a72"),
    a73: $("#a73"),
    a74: $("#a74"),
    a75: $("#a75"),
    a76: $("#a76"),
    a77: $("#a77"),
    a78: $("#a78"),
    a79: $("#a79"),
    a710: $("#a710"),
    a711: $("#a711"),
    a712: $("#a712"),
    a71_start: function () {
        car2.a71.on('touchstart mousedown', car2.a71_touch_start);
        car2.a71.on('touchmove mousemove', car2.a71_touch_move);
        car2.a71.on('touchend mouseup', car2.a71_touch_end);
    },

    a72_start: function () {
        car2.a72.on('touchstart mousedown', car2.a72_touch_start);
        car2.a72.on('touchmove mousemove', car2.a72_touch_move);
        car2.a72.on('touchend mouseup', car2.a72_touch_end);
    },
    a73_start: function () {
        car2.a73.on('touchstart mousedown', car2.a73_touch_start);
        car2.a73.on('touchmove mousemove', car2.a73_touch_move);
        car2.a73.on('touchend mouseup', car2.a73_touch_end);
    },
    a74_start: function () {
        car2.a74.on('touchstart mousedown', car2.a74_touch_start);
        car2.a74.on('touchmove mousemove', car2.a74_touch_move);
        car2.a74.on('touchend mouseup', car2.a74_touch_end);
    },
    a75_start: function () {
        car2.a75.on('touchstart mousedown', car2.a75_touch_start);
        car2.a75.on('touchmove mousemove', car2.a75_touch_move);
        car2.a75.on('touchend mouseup', car2.a75_touch_end);
    },
    a76_start: function () {
        car2.a76.on('touchstart mousedown', car2.a76_touch_start);
        car2.a76.on('touchmove mousemove', car2.a76_touch_move);
        car2.a76.on('touchend mouseup', car2.a76_touch_end);
    },
    a77_start: function () {
        car2.a77.on('touchstart mousedown', car2.a77_touch_start);
        car2.a77.on('touchmove mousemove', car2.a77_touch_move);
        car2.a77.on('touchend mouseup', car2.a77_touch_end);
    },
    a78_start: function () {
        car2.a78.on('touchstart mousedown', car2.a787_touch_start);
        car2.a78.on('touchmove mousemove', car2.a78_touch_move);
        car2.a78.on('touchend mouseup', car2.a78_touch_end);
    },
    a79_start: function () {
        car2.a79.on('touchstart mousedown', car2.a79_touch_start);
        car2.a79.on('touchmove mousemove', car2.a79_touch_move);
        car2.a79.on('touchend mouseup', car2.a79_touch_end);
    },
    a710_start: function () {
        car2.a710.on('touchstart mousedown', car2.a710_touch_start);
        car2.a710.on('touchmove mousemove', car2.a710_touch_move);
        car2.a710.on('touchend mouseup', car2.a710_touch_end);
    },
    a711_start: function () {
        car2.a711.on('touchstart mousedown', car2.a711_touch_start);
        car2.a711.on('touchmove mousemove', car2.a711_touch_move);
        car2.a711.on('touchend mouseup', car2.a711_touch_end);
    },
    a712_start: function () {
        car2.a712.on('touchstart mousedown', car2.a712_touch_start);
        car2.a712.on('touchmove mousemove', car2.a712_touch_move);
        car2.a712.on('touchend mouseup', car2.a712_touch_end);
    },
    a71_touch_end: function (e) {
        e.preventDefault();
        $("#pic1").show();
        $("#pic1 #rock1").css("left", -(car2._windowWidth * (1 - 1)) + "px");
        $("#pic1 ul li").eq(0).addClass("pic1");
        $("#left1").show();
        $("#right1").show();
        $(".exit").show();

    },
    a72_touch_end: function (e) {
        e.preventDefault();
        $("#pic1").show();
        $("#pic1 #rock1").css("left", -(car2._windowWidth * (2 - 1)) + "px");
        $("#pic1 ul li").eq(1).addClass("pic1");
        $("#left1").show();
        $("#right1").show();
        $(".exit").show();
    },
    a73_touch_end: function (e) {
        e.preventDefault();
        $("#pic1").show();
        $("#pic1 #rock1").css("left", -(car2._windowWidth * (3 - 1)) + "px");
        $("#pic1 ul li").eq(2).addClass("pic1");
        $("#left1").show();
        $("#right1").show();
        $(".exit").show();
    },
    a74_touch_end: function (e) {
        e.preventDefault();
        $("#pic1").show();
        $("#pic1 #rock1").css("left", -(car2._windowWidth * (4 - 1)) + "px");
        $("#pic1 ul li").eq(3).addClass("pic1");
        $("#left1").show();
        $("#right1").show();
        $(".exit").show();
    },
    a75_touch_end: function (e) {
        e.preventDefault();
        $("#pic1").show();
        $("#pic1 #rock1").css("left", -(car2._windowWidth * (5 - 1)) + "px");
        $("#pic1 ul li").eq(4).addClass("pic1");
        $("#left1").show();
        $("#right1").show();
        $(".exit").show();
    },
    a76_touch_end: function (e) {
        e.preventDefault();
        $("#pic1").show();
        $("#pic1 #rock1").css("left", -(car2._windowWidth * (6 - 1)) + "px");
        $("#pic1 ul li").eq(5).addClass("pic1");
        $("#left1").show();
        $("#right1").show();
        $(".exit").show();
    },
    a77_touch_end: function (e) {
        e.preventDefault();
        $("#pic1").show();
        $("#pic1 #rock1").css("left", -(car2._windowWidth * (7 - 1)) + "px");
        $("#pic1 ul li").eq(6).addClass("pic1");
        $("#left1").show();
        $("#right1").show();
        $(".exit").show();
    },
    a78_touch_end: function (e) {
        e.preventDefault();
        $("#pic1").show();
        $("#pic1 #rock1").css("left", -(car2._windowWidth * (8 - 1)) + "px");
        $("#pic1 ul li").eq(7).addClass("pic1");
        $("#left1").show();
        $("#right1").show();
        $(".exit").show();
    },
    a79_touch_end: function (e) {
        e.preventDefault();
        $("#pic1").show();
        $("#pic1 #rock1").css("left", -(car2._windowWidth * (9 - 1)) + "px");
        $("#pic1 ul li").eq(8).addClass("pic1");
        $("#left1").show();
        $("#right1").show();
        $(".exit").show();
    },
    a710_touch_end: function (e) {
        e.preventDefault();
        $("#pic1").show();
        $("#pic1 #rock1").css("left", -(car2._windowWidth * (10 - 1)) + "px");
        $("#pic1 ul li").eq(9).addClass("pic1");
        $("#left1").show();
        $("#right1").show();
        $(".exit").show();
    },
    a711_touch_end: function (e) {
        e.preventDefault();
        $("#pic1").show();
        $("#pic1 #rock1").css("left", -(car2._windowWidth * (11 - 1)) + "px");
        $("#pic1 ul li").eq(10).addClass("pic1");
        $("#left1").show();
        $("#right1").show();
        $(".exit").show();
    },
    a712_touch_end: function (e) {
        e.preventDefault();
        $("#pic1").show();
        $("#pic1 #rock1").css("left", -(car2._windowWidth * (12 - 1)) + "px");
        $("#pic1 ul li").eq(11).addClass("pic1");
        $("#left1").show();
        $("#right1").show();
        $(".exit").show();
    },
    request: function (paras) {
        var url = location.href;
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {}
        for (i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        var returnValue = paraObj[paras.toLowerCase()];
        if (typeof(returnValue) == "undefined") {
            return "";
        } else {
            return returnValue;
        }
    },
    messageStr: function () {
        //邮件地址
        function checkEmail(str) {
            var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
            if (re.test(str)) {
                return true;
            } else {
                alert("错误");
            }
        }

        //验证手机
        function checkMobile(str) {
            var re = /^1\d{10}$/;
            if (re.test(str)) {
                return true;
            } else {
                alert("错误");
            }
        }
    },
    _userTime: null,
    _userAdd: null,
    _userTel: null,
    getUserInfor: function () {
        /*$.ajax({
            url: "http://agent.cctvmall.cn/reg/interface/invitation_user.php",
            type: "GET",
            dataType: "jsonp",
            data: {uid: car2.request("id")},
            success: function (json) {
                if (json.msg == "success") {
                    car2._userTime = json.data.time;
                    car2._userAdd = json.data.address;
                    car2._userTel = json.data.tel;
                    $("#user-time").html(car2._userTime);
                    $("#user-add").html(car2._userAdd);
                    $("#user-tel").html(car2._userTel);
                } else {
                    $("#user-time").html("2016-9-13 9点");
                    $("#user-add").html("北京");
                    $("#user-tel").html("010-57348638");
                }
            }
        });*/
    },


    submitUser: function () {
        var subMs = $(".submit_ms");
        var participants,
            contact,
            company_name,
            trade;


        car2._submit.on("click", function () {
            participants = $("input[name='uname']").val();
            contact = $("input[name='tel']").val();
            company_name = $("input[name='corporate']").val();
            trade = $("input[name='job']").val();

            if (participants == "" && contact == "" && company_name == "") {

                subMs.addClass("submit_ms_show")
                    .html("请您填写真实的信息");

                setTimeout(function () {
                    subMs.removeClass("submit_ms_show")
                }, 3000);
                return false;

            } else {

                $.ajax({
                    url: "http://www.cctvmall.com/invitation/addcontact",
                    type: "post",
                    dataType: "yzyp",
                    data: {
                        id: car2.request("id"),
                        area: car2.request("area"),
                        participants: participants,//姓名
                        contact: contact,//电话
                        company_name: company_name,//企业名称
                        trade: trade,//行业
                        dl_tel: car2._userTel,
                        dl_add: car2._userAdd,
                        dl_time: car2._userTime
                    },
                    success: function (json) {
                        if (json.msg == "数据保存成功") {
                            setTimeout(function () {
                                car2._page.eq(car2._pageNow).addClass("page_end")
                            }, 1000);
                            setTimeout(function () {
                                window.location.reload();
                            }, 4500);
                        } else {
                            subMs.addClass("submit_ms_show")
                                .html(json.msg);
                            setTimeout(function () {
                                subMs.removeClass("submit_ms_show")
                            }, 3000);
                        }
                    }
                });
            }
        });


    },
    cctvMall: function (itms) {
        var interval, $this = itms;

        function start() {
            var step = 400; // 显示间隔 从第一个开始显示到第二个开始显示
            var p = 0;      //记数器
            clearInterval(interval); //清除定时器

            var blocks = $this.find("[data-index]");

            var orders = [];
            $.each(blocks, function () {
                orders.push(+$(this).data('index'));
                var oldObj = $(this);
                oldObj.attr("data-duration", oldObj.css("transition-duration"))
                    .css({"opacity": 0, "transition-duration": "0ms"});
                if (oldObj.data('left')) {
                    oldObj.css('marginLeft', oldObj.data('left') + 'px');

                }
                if (oldObj.data('top')) {
                    oldObj.css('marginTop', oldObj.data('top') + 'px');
                }
                if (!oldObj.data('top') && !oldObj.data('left')) { // 默认
                    oldObj.css('marginTop', '-30px');
                }
            });
            orders.sort(function (a, b) {//从大到小排序
                return b - a;
            });
            var maxOrder = orders[0];
            interval = setInterval(fn, step);
            fn();

            function fn() {
                p++;
                if (p > maxOrder || !maxOrder) {
                    clearInterval(interval);
                    return;
                }
                ;
                var block = blocks.filter('[data-index="' + p + '"]');
                block.css({
                    "transition-duration": block.data('duration'),
                    'marginTop': '0px',
                    'marginLeft': '0px',
                    "opacity": 1
                }, 1000);
            };
        };
        start();
    }


};
car2.init();