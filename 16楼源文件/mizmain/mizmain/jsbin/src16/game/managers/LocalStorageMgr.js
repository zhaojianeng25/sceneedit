var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* 本地缓存管理
*/
var game;
(function (game) {
    var managers;
    (function (managers) {
        var LocalStorageMgr = /** @class */ (function (_super) {
            __extends(LocalStorageMgr, _super);
            function LocalStorageMgr(app) {
                var _this = _super.call(this) || this;
                _this._app = app;
                _this._dicObj = new Object();
                return _this;
                //开启本地存储
                // Laya.LocalStorage.__init__();
                // Laya.LocalStorage.support = true;
            }
            /*指定服务器角色下的本地存储*/
            LocalStorageMgr.prototype.getRoleLocalKey = function (key) {
                return key;
            };
            /**
             * 存储指定键名和键值，字符串类型
             * @param key 键值
             * @param roleSelf 指定玩家
             * @param value 内容
             */
            LocalStorageMgr.prototype.setItem = function (key, value, roleSelf) {
                if (roleSelf === void 0) { roleSelf = false; }
                var event_name = key;
                if (roleSelf)
                    key = this.getRoleLocalKey(key);
                Laya.LocalStorage.setItem(key, value);
                //内存也存下吧
                this._dicObj[key] = value;
                this.event(event_name);
            };
            /**
             * 获取指定键名的值
             * @param key函数
             * @param roleSelf 指定玩家
             * @return 内容
             */
            LocalStorageMgr.prototype.getItem = function (key, roleSelf) {
                if (roleSelf === void 0) { roleSelf = false; }
                if (roleSelf)
                    key = this.getRoleLocalKey(key);
                //先从内存里去找 找不到再去cookie里找
                var value = this._dicObj[key];
                if (!value)
                    value = Laya.LocalStorage.getItem(key);
                return value == null ? "" : value;
            };
            /**
             * 存储指定键名和键值，字符串类型  静态函数
             * @param key 键值
             * @param value 内容
             */
            LocalStorageMgr.setItem = function (key, value) {
                Laya.LocalStorage.setItem(key, value);
            };
            /**
             * 获取指定键名的值 静态函数
             * @param key函数
             * @return 内容
             */
            LocalStorageMgr.getItem = function (key) {
                var value = Laya.LocalStorage.getItem(key);
                return value == null ? "" : value;
            };
            /**
             * 删除指定键名的信息
             * @param key函数
             * @param roleSelf 指定玩家
             * @return 内容
             */
            LocalStorageMgr.prototype.removeItem = function (key, roleSelf) {
                if (roleSelf === void 0) { roleSelf = false; }
                if (roleSelf)
                    key = this.getRoleLocalKey(key);
                Laya.LocalStorage.removeItem(key);
                this._dicObj[key] = null;
            };
            /**
             * 存储指定键名和键值，字符串类型
             * @param key 键值
             * @param roleSelf 指定玩家
             * @param value 内容
             */
            LocalStorageMgr.prototype.setJSON = function (key, value, roleSelf) {
                if (roleSelf === void 0) { roleSelf = false; }
                var event_name = key;
                if (roleSelf)
                    key = this.getRoleLocalKey(key);
                Laya.LocalStorage.setJSON(key, value);
                //内存也存下
                this._dicObj[key] = value;
                this.event(event_name);
            };
            /**
             * 获取指定键名的值
             * @param key函数
             * @param roleSelf 指定玩家
             * @return 内容
             */
            LocalStorageMgr.prototype.getJSON = function (key, roleSelf) {
                if (roleSelf === void 0) { roleSelf = false; }
                if (roleSelf)
                    key = this.getRoleLocalKey(key);
                //先从内存里找下 找不到再去cookie里找
                var value = this._dicObj[key];
                if (!value)
                    value = Laya.LocalStorage.getJSON(key);
                return value;
            };
            /**
             * 存储指定键名和键值，字符串类型  静态方法
             * @param key 键值
             * @param value 内容
             */
            LocalStorageMgr.setJSON = function (key, value) {
                Laya.LocalStorage.setJSON(key, value);
            };
            /**
             * 获取指定键名的值  静态方法
             * @param key函数
             * @return 内容
             */
            LocalStorageMgr.getJSON = function (key) {
                return Laya.LocalStorage.getJSON(key);
            };
            ///////////////////////////////////////
            //key 管理
            /**账号信息 */
            LocalStorageMgr.ACCOUNT = "Account";
            /** 选择的服务器 */
            LocalStorageMgr.SERVER_INFO = "ServerInfo";
            /** 是否游戏静音 */
            LocalStorageMgr.IS_MUTE = "IsMute";
            /** 是否过滤掉上阵和援军 */
            LocalStorageMgr.IS_HIDE = "IsHide";
            return LocalStorageMgr;
        }(Laya.EventDispatcher));
        managers.LocalStorageMgr = LocalStorageMgr;
    })(managers = game.managers || (game.managers = {}));
})(game || (game = {}));
//# sourceMappingURL=LocalStorageMgr.js.map