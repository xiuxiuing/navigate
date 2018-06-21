/**
 * Created by guxingxing on 2017/8/17.
 * 触发事件
 */
"use strict";

// 事件处理对象
var EventUtil = {

    // 添加事件监听
    addEvent: function (element, type, callback) {
        if (typeof element != 'undefined') {
            if (element.addEventListener) {
                element.addEventListener(type, callback, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, callback);
            } else {
                element['on' + type] = callback;
            }
        }
    },

    // 移除事件监听
    remove: function (element, type, callback) {

        if (element.removeEventListener) {
            element.removeEventListener(type, callback, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, callback);
        } else {
            element['on' + type] = null;
        }

    },

    // 跨浏览器获取 event 对象
    getEvent: function (event) {

        return event ? event : window.event;
    },

    // 阻止事件的默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    /*
     * 判断object是否空，未定义或null
     * @param object
     * @return
     */
    objectIsNull: function (obj) {
        if (obj == "" || typeof(obj) == "undefined" || obj == null) {
            return true;
        } else {
            return false;
        }
    },

    /*
     * 正则验证
     * @param s 验证字符串
     * @param type 验证类型 money,china,mobile等
     * @return
     */
    regValidate: function (s, type) {
        var objbool = false;
        var objexp = "";
        switch (type) {
            case 'money': //金额格式,格式定义为带小数的正数，小数点后最多三位
                objexp = "^[0-9]+[\.][0-9]{0,3}$";
                break;
            case 'numletter_': //英文字母和数字和下划线组成
                objexp = "^[0-9a-zA-Z\_]+$";
                break;
            case 'numletter': //英文字母和数字组成
                objexp = "^[0-9a-zA-Z]+$";
                break;
            case 'numletterchina': //汉字、字母、数字组成
                objexp = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
                break;
            case 'email': //邮件地址格式
                objexp = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
                break;
            case 'tel': //固话格式
                objexp = /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
                break;
            case 'mobile': //手机号码
                objexp = "^(13[0-9]|15[0-9]|18[0-9])([0-9]{8})$";
                break;
            case 'decimal': //浮点数
                objexp = "^[0-9]+([.][0-9]+)?$";
                break;
            case 'url': //网址
                objexp = "(http://|https://){0,1}[\w\/\.\?\&\=]+";
                break;
            case 'date': //日期 YYYY-MM-DD格式
                objexp = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
                break;
            case 'int': //整数
                objexp = "^[0-9]*[1-9][0-9]*$";
                break;
            case 'int+': //正整数包含0
                objexp = "^\\d+$";
                break;
            case 'int-': //负整数包含0
                objexp = "^((-\\d+)|(0+))$";
                break;
            case 'china': //中文
                objexp = /^[\u0391-\uFFE5]+$/;
                break;
        }
        var re = new RegExp(objexp);
        if (re.test(s)) {
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * ajax
     * @param type  为post/get提交
     * @param url
     * @param param
     * @param datat 为html,json,text
     * @param callback 回调函数 function callBack(data)
     * @return
     */
    requestAjax: function (type, url, param, callback) {
        var request = $.ajax({
            method: type,
            url: url,
            data: param
        });

        request.done(function (res) {
            callback(false,res);
        });

        request.fail(function (res) {
            callback(true,res);
        });

        request.always(function () {

        });
    },

    /*
     * 去除首尾空格
     * @ value  字符串
     * $.trim(value)   == value.replace(/(^\s*)|(\s*$)/g, "")
     * 去除字符串全部空格： value.replace(/\s+/g, "")
     * */
    replaceValue: function (value) {
        return value.replace(/(^\s*)|(\s*$)/g, "");
    }
};
