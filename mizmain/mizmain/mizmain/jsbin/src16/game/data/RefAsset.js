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
* 引用计数对象
*/
var game;
(function (game) {
    var data;
    (function (data) {
        var RefAsset = /** @class */ (function (_super) {
            __extends(RefAsset, _super);
            function RefAsset(url, isEventProgress) {
                if (isEventProgress === void 0) { isEventProgress = false; }
                var _this = _super.call(this) || this;
                // 引用计数
                _this._refCount = 0;
                // 超时时间
                _this._timeOut = 0;
                // 延长的超时时间
                _this._addTimeOut = 0;
                // 是否准备好
                _this._parseComplete = false;
                _this._isEventProgress = false;
                _this._url = url;
                _this._isEventProgress = isEventProgress;
                _this.init();
                return _this;
            }
            RefAsset.Get = function (key, create, isEventProgress) {
                if (create === void 0) { create = true; }
                if (isEventProgress === void 0) { isEventProgress = false; }
                if (!key || !key.length) {
                    return null;
                }
                key = Laya.URL.formatURL(key);
                var asset = this._refMap[key];
                if (create && !asset) {
                    asset = new RefAsset(key, isEventProgress);
                    asset.addTimeOut = this.MAX_FREE_TIME;
                    this.Set(key, asset);
                }
                return asset;
            };
            RefAsset.Set = function (key, asset) {
                this._refMap[key] = asset;
            };
            RefAsset.update = function (diff) {
                var currTimer = Laya.timer.currTimer;
                if (diff != -1 && currTimer < this._nextTimer) {
                    return;
                }
                this._nextTimer = currTimer + 1000; // 检查频率1秒
                var map = this._refMap;
                for (var key in map) {
                    var obj = map[key];
                    // logd("RefAsset.update", "url", key, "refCount", obj._refCount, "timeOut", obj._timeOut);
                    if (obj.update(currTimer)) {
                        delete map[key];
                    }
                }
            };
            Object.defineProperty(RefAsset.prototype, "addTimeOut", {
                set: function (v) {
                    this._addTimeOut = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RefAsset.prototype, "parseComplete", {
                get: function () {
                    return this._parseComplete;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RefAsset.prototype, "url", {
                get: function () {
                    return this._url;
                },
                enumerable: true,
                configurable: true
            });
            RefAsset.prototype.init = function () {
                var res = Laya.loader.getRes(this._url);
                if (res) {
                    this.complete();
                }
                else {
                    // logd('RefAsset load', this._url);
                    this._onProgressHandler = this._isEventProgress ? Handler.create(this, this.onProgress, null, false) : null;
                    Laya.loader.load(this._url, Handler.create(this, this.onComplete, [true]), this._onProgressHandler);
                }
            };
            RefAsset.prototype.onProgress = function (v) {
                this.event(LEvent.PROGRESS, v);
                // logd("onProgress", v, this._url);
            };
            RefAsset.prototype.onComplete = function () {
                var res = Loader.getRes(this._url);
                if (res) {
                    res.loadByRefAsset = true;
                }
                else {
                    loge('RefAsset onComplete res is null', this._url);
                }
                this.complete();
            };
            RefAsset.prototype.complete = function () {
                this.onProgress(1);
                if (this._onProgressHandler) {
                    this._onProgressHandler.recover();
                    this._onProgressHandler = null;
                }
                this._parseComplete = true;
                this.event(LEvent.COMPLETE);
            };
            // 引用
            RefAsset.prototype.retain = function () {
                this._refCount++;
                this._timeOut = 0;
            };
            // 释放引用
            RefAsset.prototype.release = function (checkNow) {
                if (checkNow === void 0) { checkNow = false; }
                if (this._refCount <= 0) {
                    loge("release error this._reCount <= 0");
                    return;
                }
                this._refCount--;
                if (checkNow) {
                    this.checkNow();
                }
                else {
                    if (this._refCount == 0) {
                        this._timeOut = Laya.timer.currTimer + this._addTimeOut;
                    }
                }
            };
            RefAsset.prototype.forceMoveRef = function () {
                this._refCount = 0;
                this._timeOut = Laya.timer.currTimer + this._addTimeOut;
            };
            RefAsset.prototype.update = function (currTimer) {
                var timeOut = this._timeOut && (currTimer > this._timeOut);
                if (timeOut) {
                    this.destroy();
                }
                return timeOut;
            };
            // 立即检查超时
            RefAsset.prototype.checkNow = function () {
                if (this._refCount == 0) {
                    // 标记过期
                    this._timeOut = Laya.timer.currTimer - 1;
                }
            };
            // 释放纹理
            RefAsset.prototype.destroy = function () {
                if (this._onProgressHandler) {
                    this._onProgressHandler.recover();
                    this._onProgressHandler = null;
                }
                Laya.loader.cancelLoadByUrl(this._url);
                Laya.loader.clearRes(this._url, true);
                // logd("RefTexture.destroy", this._url);
            };
            RefAsset.GENRAL = 1; // 一般素材（文本，， 贴图）
            RefAsset.BUFFER = 2; // 二进制
            RefAsset.TEMPLET = 3; // 骨骼动画模板
            RefAsset.MAX_FREE_TIME = 5000; // 素材超时释放时间
            RefAsset._refMap = {}; // 列表
            RefAsset._nextTimer = 0;
            return RefAsset;
        }(Laya.EventDispatcher));
        data.RefAsset = RefAsset;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=RefAsset.js.map