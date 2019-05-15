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
var game;
(function (game) {
    var data;
    (function (data) {
        /*
        * 预加载
        */
        var PreLoad = /** @class */ (function (_super) {
            __extends(PreLoad, _super);
            function PreLoad() {
                var _this = _super.call(this) || this;
                _this._loadMap = {};
                _this._loadCount = 0;
                _this._totalCount = 0;
                return _this;
            }
            Object.defineProperty(PreLoad.prototype, "totalCount", {
                get: function () {
                    return this._totalCount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PreLoad.prototype, "loadCount", {
                get: function () {
                    return this._loadCount;
                },
                enumerable: true,
                configurable: true
            });
            PreLoad.prototype.load = function (url, type) {
                var _this = this;
                // logd('PreLoad', url, type);
                var asset = this._loadMap[url];
                if (asset) {
                    return;
                }
                switch (type) {
                    case data.RefAsset.GENRAL:
                        asset = data.RefAsset.Get(url);
                        break;
                    case data.RefAsset.TEMPLET:
                        asset = data.RefTemplet.Get(url);
                        break;
                    default:
                        return;
                }
                asset.retain();
                if (!asset.parseComplete) {
                    asset.once(LEvent.COMPLETE, this, function () {
                        _this._loadCount++;
                        _this.event(LEvent.CHANGED);
                    });
                }
                else {
                    this._loadCount++;
                }
                this._loadMap[url] = asset;
                this._totalCount++;
            };
            // 删除预加载
            PreLoad.prototype.clear = function (url, cancelLoad) {
                if (cancelLoad === void 0) { cancelLoad = false; }
                var asset = this._loadMap[url];
                if (!asset) {
                    return;
                }
                if (asset.parseComplete) {
                    this._loadCount--;
                }
                asset.release(cancelLoad);
                delete this._loadMap[url];
                this._totalCount--;
            };
            return PreLoad;
        }(Laya.EventDispatcher));
        data.PreLoad = PreLoad;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PreLoad.js.map