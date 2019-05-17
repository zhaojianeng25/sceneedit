/**
* 同步时间
*/
var game;
(function (game) {
    var Sync = /** @class */ (function () {
        function Sync(app) {
            /*服务器时间 单位秒*/
            this._serverTime = 0;
            /*服务器时间同步的时间单位毫秒*/
            this._ost = 0;
            /*服务器运行时间 单位毫秒*/
            this._systemRunTime = 0;
            /*服务器运行时间同步的时间 单位毫秒*/
            this._osrt = 0;
            /*服务器运行时间同步的时间 单位毫秒*/
            this._oserverRunt = 0;
            /*自然时间的服务器启动时间 单位秒*/
            this._serverStartTime = 0;
            /*时间同步损耗*/
            this._syncLoss = 0;
            this._nextCheckTime = 0;
            this._app = app;
        }
        Object.defineProperty(Sync.prototype, "syncFunc", {
            get: function () {
                return this._syncFunc;
            },
            enumerable: true,
            configurable: true
        });
        //初始化
        Sync.prototype.init = function () {
        };
        /**
         * 更新同步的时间
         */
        Sync.prototype.synctimeUpdate = function (value) {
            if (!value)
                return;
            var date = new Date();
            var time = date.getDate() * 3600000 + date.getMinutes() * 60000 + date.getSeconds() * 1000 + date.getMilliseconds();
            if (time >= value) {
                this._syncLoss = time - value;
            }
            else {
                this._syncLoss = time + 24 * 3600000 - value;
            }
            logd("同步时间消耗：", this._syncLoss);
        };
        /**
         * 服务器同步时间
         */
        Sync.prototype.syncServerTime = function (value) {
            this._serverTime = value;
            this._ost = Laya.timer.currTimer;
            // logd("同步服务器时间",Sync.getTimeStr(this._serverTime*1000),Sync.getTimeStr(this._ost))
        };
        /**
         * 服务器同步时间
         */
        Sync.prototype.syncSystemRunTime = function (value) {
            this._systemRunTime = value;
            this._osrt = Laya.timer.currTimer;
        };
        Object.defineProperty(Sync.prototype, "serverTimeBys", {
            /**
             * 获取当前服务器时间(秒)
             */
            get: function () {
                if (this._serverTime) {
                    // logd("当前服务器时间",Sync.getTimeStr(this._serverTime*1000),Sync.getTimeStr(Laya.timer.currTimer),Sync.getTimeStr(this._ost))
                    return this._serverTime + (Laya.timer.currTimer + this._syncLoss - this._ost) / 1000;
                }
                else {
                    this._hasSyncTime = true;
                    return (new Date()).getTime() / 1000;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sync.prototype, "systemRunTimeByms", {
            /**
             * 获取当前服务器运行时间(毫秒)
             */
            get: function () {
                if (this._systemRunTime) {
                    return (this._systemRunTime + this._syncLoss - this._osrt) + Laya.timer.currTimer;
                }
                else {
                    this._hasSyncTime = true;
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Sync.prototype.update = function (diff) {
            if (this._hasSyncTime) {
                if (this._nextCheckTime > diff) {
                    this._nextCheckTime -= diff;
                }
                else {
                    // this._app.network.call_sync_mstime(0, 0, 0);
                    this._hasSyncTime = false;
                    this._nextCheckTime = 30000;
                }
            }
        };
        /**
         * 获取小时
         * @param value  时间戳毫秒
         */
        Sync.getHours = function (value) {
            this._date.setTime(value);
            return this._date.getHours();
        };
        /**
         * 获取当月天
         * @param value  时间戳毫秒
         */
        Sync.getDays = function (value) {
            this._date.setTime(value);
            return this._date.getDate();
        };
        /**
         * 获取时间字符串 2017-3-20 09:09:10
         * @param value  时间戳毫秒
         */
        Sync.getTimeStr = function (value) {
            this._date.setTime(value);
            return StringU.substitute("{0}-{1}-{2} {3}:{4}:{5}", this._date.getFullYear(), this._date.getMonth() + 1, this._date.getDate(), StringU.paddingLeft(this._date.getHours().toString(), "0", 2), StringU.paddingLeft(this._date.getMinutes().toString(), "0", 2), StringU.paddingLeft(this._date.getSeconds().toString(), "0", 2));
        };
        /**
         * 获取星期几
         * @param value  时间戳毫秒
         */
        Sync.getTimeWeekDay = function (value) {
            this._date.setTime(value);
            return this._date.getDay();
        };
        /**
         * 获取当日时间 秒
         * @param value  时间毫秒
         */
        Sync.getDayTime = function (value) {
            this._date.setTime(value);
            return this._date.getHours() * 60 * 60 + this._date.getMinutes() * 60 + this._date.getSeconds();
        };
        /**
         * 获取时间字符串 09:09:10
         * @param value  时间戳毫秒
         */
        Sync.getTimeShortStr = function (value) {
            this._date.setTime(value);
            return StringU.substitute("{0}:{1}:{2}", this._date.getHours(), this._date.getMinutes(), this._date.getSeconds());
        };
        /**
         * 获取时间字符串 09:09:10:00
         * @param value  时间戳毫秒
         */
        Sync.getTimeShortStr1 = function (value) {
            this._date.setTime(value);
            return StringU.substitute("{0}:{1}:{2}:{3}", this._date.getHours(), this._date.getMinutes(), this._date.getSeconds(), this._date.getMilliseconds());
        };
        /**
         * 获取当日零点时间
         * @param value  时间戳秒
         * @return 返回时间秒
         */
        Sync.getDayZeroTime = function (value) {
            this._date.setTime(value * 1000);
            this._date.setHours(0);
            this._date.setMinutes(0);
            this._date.setSeconds(0);
            this._date.setMilliseconds(0);
            return this._date.getTime() / 1000;
        };
        /**
         * 获取时间字符串 09:09:10
         * @param value  剩余时间秒
         */
        Sync.getTimeShortStr2 = function (value) {
            var h = MathU.parseInt(value / 3600);
            value = MathU.parseInt(value % 3600);
            var m = MathU.parseInt(value / 60);
            var s = MathU.parseInt(value % 60);
            return StringU.substitute("{0}:{1}:{2}", StringU.paddingLeft(h.toString(), "0", 2), StringU.paddingLeft(m.toString(), "0", 2), StringU.paddingLeft(s.toString(), "0", 2));
        };
        /**
         * 获取时间字符串 09:10(分秒)
         * @param value  剩余时间秒
         */
        Sync.getTimeShortStr3 = function (value) {
            var m = MathU.parseInt(value / 60);
            var s = MathU.parseInt(value % 60);
            return StringU.substitute("{0}:{1}", StringU.paddingLeft(m.toString(), "0", 2), StringU.paddingLeft(s.toString(), "0", 2));
        };
        /**
         * 获取时间字符串 09:10(时分)
         * @param value  剩余时间秒
         */
        Sync.getTimeShortStr4 = function (value) {
            var h = MathU.parseInt(value / 3600);
            value = value - h * 3600;
            var m = MathU.parseInt(value / 60);
            return StringU.substitute("{0}:{1}", StringU.paddingLeft(h.toString(), "0", 2), StringU.paddingLeft(m.toString(), "0", 2));
        };
        /**
         * 获取时间字符串 9天9小时9分钟9秒
         * @param value  剩余时间秒
         */
        Sync.getTimeShortStr5 = function (value) {
            var h = MathU.parseInt(value / 3600);
            value = value - h * 3600;
            var d = MathU.parseInt(h / 24);
            h = h - d * 24;
            var m = MathU.parseInt(value / 60);
            var s = MathU.parseInt(value % 60);
            var str = "";
            if (d > 0)
                str += d + "天";
            if (h > 0)
                str += h + "小时";
            if (m > 0)
                str += m + "分钟";
            str += s + "秒";
            return str;
        };
        /**
         * 获取时间字符串 几天或几小时或几分钟或几秒
         * @param value  剩余时间秒
         */
        Sync.getTimeShortStr6 = function (value) {
            var h = MathU.parseInt(value / 3600);
            value = value - h * 3600;
            var d = MathU.parseInt(h / 24);
            if (d > 0)
                return d + "天";
            h = h - d * 24;
            if (h > 0)
                return h + "小时";
            var m = MathU.parseInt(value / 60);
            if (m > 0)
                return m + "分钟";
            var s = MathU.parseInt(value % 60);
            return s + "秒";
        };
        /**
         * 获取时间字符串 10月1日
         * @param value  时间戳秒
         */
        Sync.getTimeStr7 = function (value) {
            this._date.setTime(value * 1000);
            return StringU.substitute("{0}月{1}日", this._date.getMonth() + 1, this._date.getDate());
        };
        /**
         * 获取时间字符串 9天9小时或 9小时9分钟 或 9分钟9秒 如果不足1分钟 显示 53秒
         * @param value  剩余时间秒
         */
        Sync.getTimeShortStr8 = function (value) {
            var h = MathU.parseInt(value / 3600);
            value = value - h * 3600;
            var d = MathU.parseInt(h / 24);
            h = h - d * 24;
            var m = MathU.parseInt(value / 60);
            var s = MathU.parseInt(value % 60);
            var str = "";
            if (d > 0)
                str += d + "天";
            if (h > 0)
                str += h + "小时";
            if (d > 0 && h > 0)
                return str;
            if (m > 0)
                str += m + "分钟";
            if (h > 0 && m > 0)
                return str;
            if (str.length == 0)
                str += s + "秒";
            return str;
        };
        /**
         *获取时间，1200(时，分)
         */
        Sync.getNumTime = function (value) {
            this._date.setTime(value);
            var hours = this._date.getHours() * 100;
            var minutes = this._date.getMinutes();
            var time = hours + minutes;
            return time;
        };
        /**
         * 释放
         */
        Sync.prototype.dispose = function () {
        };
        /**
         * 星期日
         */
        Sync.SUNDAY = 0;
        /**
         * 星期一
         */
        Sync.MONDAY = 1;
        /**
         * 星期二
         */
        Sync.TUESDAY = 2;
        /**
         * 星期三
         */
        Sync.WEDNESDAY = 3;
        /**
         * 星期四
         */
        Sync.THURSDAY = 4;
        /**
         * 星期五
         */
        Sync.FRIDAY = 5;
        /**
         * 星期六
         */
        Sync.SATURDAY = 6;
        /**
         * 一天多少秒
         */
        Sync.DAY_SECONDS = 86400;
        Sync.UTC_SECONDS = 28800;
        //事件
        Sync._date = new Date();
        return Sync;
    }());
    game.Sync = Sync;
})(game || (game = {}));
//# sourceMappingURL=Sync.js.map