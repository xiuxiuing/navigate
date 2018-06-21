/**
 * Created by guxingxing on 2017/8/17.
 * 用户添加书签
 * 书签添加数据
 */

"use strict";

  ;!function () {
    var $ = layui.$
        , layer = layui.layer
        , site_content = $('.site-content')
        , site_tree = $('.site-tree');

    // +----------------------------------------------------------------------
    // | @ 添加书签
    // +----------------------------------------------------------------------
    //获取添加书签class属性
    var create_bookmark = site_tree.find('.create_bookmark');
    //添加书签DOM元素
    var _el_create_bookmark;
    for (var i = 0; i < create_bookmark.length; i++) {
        _el_create_bookmark = create_bookmark[i]
    }

    //绑定元素事件
    EventUtil.addEvent(_el_create_bookmark, 'click', function () {
        var event = EventUtil.getEvent();//跨浏览器获取 event 对象
        EventUtil.preventDefault(event); // 阻止默认事件

        //输入层
        layer.prompt({
            title: '添加书签'
        }, function (value, index, elem) {

            //去除首尾空格
            var nameValue = EventUtil.replaceValue(value);

            if (!nameValue) {
                return false;
            }

            //loading
            var Indexes = layer.load(2);

            EventUtil.requestAjax('POST', 'http://jikedaohang.com/index/User/saveNav', {
                name: nameValue,
                desc: nameValue
            }, function (err, res) {
                //关闭loading
                layer.close(Indexes);

                //关闭当前prompt
                layer.close(index);

                //返回值
                if (err) {
                    layer.msg(res.responseText);
                } else {
                    layer.msg(res);
                    setTimeout(function () {
                        location.reload();
                    }, 500);
                }
            });
        });
    });

    // +----------------------------------------------------------------------
    // | @ 添加书签数据
    // +----------------------------------------------------------------------
    var create_bookmark_box_item = site_content.find('.layui-tab-item').find('.create_bookmark_box_item');
    for (var item_i = 0; item_i < create_bookmark_box_item.length; item_i++) {
        EventUtil.addEvent(create_bookmark_box_item[item_i], 'click', function () {
            var _this = $(this);
            var id = _this.parent().parent().parent().children('.layui-tab-title-ul').attr('data-id');

            //显示确认层
            layer.open({
                type: 1,
                title: false, //不显示标题栏
                closeBtn: false,
                area: '300px;',
                shade: 0.1,
                id: 'create_bookmark_box_item', //设定一个id，防止重复弹出
                btn: ['确定', '取消'],
                moveType: 1, //拖拽模式，0或者1
                content:
                '<div class="layui-layer-title" style="cursor: move;">添加「' + _this.parent().parent().parent().find('.layui-tab-li').text() + '」子类</div>' +
                '<div id="" class="layui-bookmark-box-item-content"><input type="text" name="name" class="layui-layer-input" placeholder="名称" value=""></div>' +
                '<div id="" class="layui-bookmark-box-item-content"><input type="text" name="url" class="layui-layer-input" placeholder="URL" value=""></div>' +
                '<div id="" class="layui-bookmark-box-item-content"><input type="text" name="desc" class="layui-layer-input" placeholder="描述" value=""></div>',
                // '<style>.layui-bookmark-box-item-content select {height: 38px;border: 1px solid #e6e6e6;background-color: #fff;border-radius: 2px;width: 240px !important;}</style>'
                /*'<div id="" class="layui-bookmark-box-item-content">' +
                '      <select name="city" class="layui-layer-input">' +
                '        <option value="" disabled>请选择</option>' +
                '        <option value="0">北京</option>' +
                '        <option value="1">上海</option>' +
                '        <option value="2">广州</option>' +
                '        <option value="3">深圳</option>' +
                '        <option value="4">杭州</option>' +
                '      </select>' +
                '</div>'*/
                yes: function (index, layero) {
                    var input = $('.layui-bookmark-box-item-content').find('input');
                    var param = {};
                    for (var i = 0; i < input.length; i++) {
                        if ($(input[i]).attr('name') != 'desc') {
                            if (EventUtil.replaceValue($(input[i]).val()) != '') {
                                param[$(input[i]).attr('name')] = $(input[i]).val();
                            } else {
                                layer.msg('「' + $(input[i]).attr('placeholder') + '」不能为空！');
                                return false;
                            }
                        } else {
                            param[$(input[i]).attr('name')] = $(input[i]).val();
                        }
                    }

                    if (param.url.indexOf('http://') < 0) {
                        if (param.url.indexOf('https://') < 0) {
                            param.url = 'http://' + param.url;
                        }
                    }

                    param.my_book_mark_nav_id = id;

                    var Indexes = layer.load(2);

                    EventUtil.requestAjax('POST', 'http://jikedaohang.com/index/User/saveNavBody', param, function (err, res) {
                        //关闭loading
                        layer.close(Indexes);

                        //关闭当前遮层
                        layer.close(index);

                        //返回值
                        if (err) {
                            layer.msg(res.responseText);
                        } else {
                            layer.msg(res);
                            setTimeout(function () {
                                location.reload();
                            }, 500);

                        }
                    });
                },
                end: function (index) {
                    layer.close(index);
                }
            });
        });
    }

    // +----------------------------------------------------------------------
    // | @ 编辑书签
    // +----------------------------------------------------------------------
    var _el_edit = site_content.find('.layui-tab-title-ul').find('._el_edit');
    for (var x = 0; x < _el_edit.length; x++) {
        EventUtil.addEvent(_el_edit[x], 'click', function () {
            var _this = $(this);
            var id = _this.parent().parent().attr('data-id');

            //输入层
            layer.prompt({
                title: '编辑',
                value: _this.parent().parent().children('.layui-tab-li').text()
            }, function (value, index, elem) {

                //去除首尾空格
                var nameValue = EventUtil.replaceValue(value);

                if (!nameValue) {
                    return false;
                }

                //loading
                var Indexes = layer.load(2);

                EventUtil.requestAjax('POST', 'http://jikedaohang.com/index/User/editNav', {
                    id: id,
                    name: nameValue
                }, function (err, res) {
                    //关闭loading
                    layer.close(Indexes);

                    //关闭当前prompt
                    layer.close(index);

                    //返回值
                    if (err) {
                        layer.msg(res.responseText);
                    } else {
                        layer.msg(res);

                        setTimeout(function () {
                            location.reload();
                        }, 500);
                    }
                });
            });
        });
    }

    // +----------------------------------------------------------------------
    // | @ 删除书签
    // +----------------------------------------------------------------------
    var _el_remove = site_content.find('.layui-tab-title-ul').find('._el_remove');
    for (var y = 0; y < _el_remove.length; y++) {
        EventUtil.addEvent(_el_remove[y], 'click', function () {
            var _this = $(this);
            var id = _this.parent().parent().attr('data-id');
            var is_exist_more = $('.more');

            //删除询问框
            layer.msg('确定要删除' + _this.parent().parent().children('.layui-tab-li').text() + '么？', {
                time: 20000, //20s后自动关闭
                btn: ['明白了', '取消'],
                yes: function (index) {
                    //loading
                    var Indexes = layer.load(2);

                    EventUtil.requestAjax('POST', 'http://jikedaohang.com/index/User/removeNav', {
                        id: id
                    }, function (err, res) {
                        //关闭loading
                        layer.close(Indexes);

                        //关闭当前confirm
                        layer.close(index);

                        //返回值
                        if (err) {
                            layer.msg(res.responseText);
                        } else {
                            if (is_exist_more.length > 0) {
                                history.go(-1);
                            } else {
                                layer.msg(res);
                                setTimeout(function () {
                                    location.reload();
                                }, 500);
                            }
                        }
                    });
                }
            });
        });
    }


}();

