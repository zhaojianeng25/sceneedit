/**
* name
*/
var game;
(function (game) {
    var utils;
    (function (utils) {
        var StringU = /** @class */ (function () {
            function StringU() {
            }
            StringU.substitute = function (str) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                if (str == null)
                    return '';
                // Replace all of the parameters in the msg string.
                var len = rest.length;
                var args;
                if (len == 1 && rest) {
                    args = rest[0];
                    len = args.length;
                }
                else {
                    args = rest;
                }
                for (var i = 0; i < len; i++) {
                    str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
                }
                return str;
            };
            StringU.substitute1 = function (str) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                if (!str)
                    return "";
                var args;
                if (rest.length == 1 && rest[0] == "array")
                    args = rest[0];
                else
                    args = rest;
                if (!args.length)
                    return str;
                var reg = /\{\d+\}/;
                var value, indexStr;
                var index, right;
                value = str;
                str = "";
                while (value.length) {
                    index = value.search(reg);
                    if (index == -1)
                        break;
                    //左
                    str += value.substr(0, index);
                    //匹配
                    right = value.indexOf("}", index);
                    indexStr = value.slice(index, right + 1);
                    index = Number(indexStr.slice(1, -1));
                    if (index < args.length)
                        str += args[index];
                    else
                        str += indexStr;
                    //余
                    value = value.substr(right + 1);
                }
                str += value;
                return str;
            };
            /**
             * 字符串是否为空
             * @param str 字符串
             * @return
             *
             */
            StringU.isEmpty = function (str) {
                return str == null || str.length == 0;
            };
            //去左右空格;  
            StringU.trim = function (char) {
                if (char == null) {
                    return null;
                }
                return this.rtrim(this.ltrim(char));
            };
            //去左空格;   
            StringU.ltrim = function (char) {
                if (char == null) {
                    return null;
                }
                var pattern = /^\s*/;
                return char.replace(pattern, "");
            };
            //去右空格;  
            StringU.rtrim = function (char) {
                if (char == null) {
                    return null;
                }
                var pattern = /\s*$/;
                return char.replace(pattern, "");
            };
            //是否为前缀字符串;  
            StringU.beginsWith = function (char, prefix) {
                return (prefix == char.substring(0, prefix.length));
            };
            //是否为后缀字符串;  
            StringU.endsWith = function (char, suffix) {
                return (suffix == char.substring(char.length - suffix.length));
            };
            //获得查询参数
            StringU.getParameter = function (url, paras) {
                if (!url || url.length == 0)
                    return "";
                var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
                var paraObj = {};
                for (var i = 0; i < paraString.length; i++) {
                    var j = paraString[i];
                    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
                }
                var returnValue = paraObj[paras.toLowerCase()];
                if (!returnValue || typeof (returnValue) == "undefined") {
                    return "";
                }
                else {
                    return returnValue;
                }
            };
            StringU.parameterToObj = function (url) {
                var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
                var paraObj = {};
                for (var i = 0; i < paraString.length; i++) {
                    var j = paraString[i];
                    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
                }
                return paraObj;
            };
            /**
             * 字符串补位，补充左边
             * @param	str 需要补充的字符串
             * @param   char 需要补充的字符串
             * @param	len 最终长度
             * @return
             */
            StringU.paddingLeft = function (str, char, len) {
                var l = len - str.length;
                if (l <= 0) {
                    return str;
                }
                str = String(str);
                //循环填充
                for (var i = 0; i < l; i++) {
                    str = char + str;
                }
                return str;
            };
            // 读取压缩文本
            StringU.readZlibData = function (data) {
                var length = data.readUnsignedInt();
                if (!this._tempBytesArray) {
                    this._tempBytesArray = new ByteArray();
                }
                var byteArray = this._tempBytesArray;
                byteArray.length = length;
                data.readBytes(byteArray, 0, length);
                byteArray.uncompress();
                var str = byteArray.readUTFBytes(byteArray.length);
                byteArray.clear();
                return str;
            };
            /**
             * 通过时间戳的差值获取时间格式
             * @param diff 2个时间戳的差值
             * @param format 获得结果的格式 （例如：yyyy-MM-dd hh:mm:ss）
             */
            StringU.formatDiff = function (diff, format) {
                if (!diff)
                    return null;
                var time = diff / 1000;
                var year = Math.floor(time / 86400 / 365);
                time = time % (86400 * 365);
                var month = Math.floor(time / 86400 / 30);
                time = time % (86400 * 30);
                var day = Math.floor(time / 86400);
                time = time % 86400;
                var hour = Math.floor(time / 3600);
                time = time % 3600;
                var minute = Math.floor(time / 60);
                time = time % 60;
                var second = Math.floor(time);
                var o = {
                    "y+": year,
                    "M+": month,
                    "d+": day,
                    "h+": hour,
                    "m+": minute,
                    "s+": second
                };
                return this.format(o, format);
            };
            /**
             * 将日期格式化
             * @param date 日期对象
             * @param format 获得结果的格式 （例如：yyyy-MM-dd hh:mm:ss）
             */
            StringU.formatDate = function (date, format) {
                if (!date)
                    return null;
                var o = {
                    "y+": date.getFullYear(),
                    "M+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours(),
                    "m+": date.getMinutes(),
                    "s+": date.getSeconds(),
                    "q+": Math.floor((date.getMonth() + 3) / 3),
                    "S+": date.getMilliseconds()
                };
                return this.format(o, format);
            };
            StringU.format = function (o, format) {
                if (format == "") {
                    if (o["d+"] >= 1) {
                        format = "dd天hh小时";
                    }
                    else if (o["d+"] < 1 && o["h+"] > 1) {
                        format = "hh:mm分";
                    }
                    else {
                        format = "mm:ss秒";
                    }
                }
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(format))
                        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return format;
            };
            return StringU;
        }());
        utils.StringU = StringU;
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=StringU.js.map