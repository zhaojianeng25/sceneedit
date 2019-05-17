/**
* 贴图素材
*/
var game;
(function (game) {
    var data;
    (function (data) {
        var AssetsLoader = /** @class */ (function () {
            function AssetsLoader() {
                this._list = [];
            }
            // 设置素材
            AssetsLoader.prototype.load = function (assets, handler) {
                this.clear();
                var parseComplete = true;
                if (assets) {
                    for (var _i = 0, assets_1 = assets; _i < assets_1.length; _i++) {
                        var url = assets_1[_i];
                        var refTexture = data.RefAsset.Get(url);
                        refTexture.retain();
                        this._list.push(refTexture);
                        if (!refTexture.parseComplete) {
                            parseComplete = false;
                            refTexture.once(LEvent.COMPLETE, this, this.onAssetParseComplete);
                        }
                    }
                }
                if (parseComplete) {
                    handler.run();
                }
                else {
                    this._handler = handler;
                }
            };
            // 有贴图解析完成
            AssetsLoader.prototype.onAssetParseComplete = function () {
                if (!this._handler) {
                    return;
                }
                var parseComplete = true;
                for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                    var refTexture = _a[_i];
                    if (!refTexture.parseComplete) {
                        parseComplete = false;
                        break;
                    }
                }
                if (parseComplete) {
                    this._handler.run();
                    this._handler = null;
                }
            };
            // 释放素材
            AssetsLoader.prototype.release = function (url, checkNow) {
                if (checkNow === void 0) { checkNow = false; }
                url = Laya.URL.formatURL(url);
                for (var i = 0; i < this._list.length; i++) {
                    var refAsset = this._list[i];
                    if (refAsset.url == url) {
                        refAsset.release(checkNow);
                        refAsset.off(LEvent.COMPLETE, this, this.onAssetParseComplete);
                        this._list.splice(i, 1);
                        i--;
                    }
                }
            };
            // 清理
            AssetsLoader.prototype.clear = function (checkNow) {
                if (checkNow === void 0) { checkNow = false; }
                for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                    var refTexture = _a[_i];
                    refTexture.release(checkNow);
                    refTexture.off(LEvent.COMPLETE, this, this.onAssetParseComplete);
                }
                this._list.length = 0;
            };
            return AssetsLoader;
        }());
        data.AssetsLoader = AssetsLoader;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=AssetsLoader.js.map