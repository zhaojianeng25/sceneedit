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
* 骨骼动画模板素材
*/
var game;
(function (game) {
    var data;
    (function (data) {
        var RefTemplet = /** @class */ (function (_super) {
            __extends(RefTemplet, _super);
            function RefTemplet(url) {
                return _super.call(this, url) || this;
            }
            // 获取动画模板素材
            RefTemplet.Get = function (key) {
                key = Laya.URL.formatURL('scene/sk/' + key + ".sk");
                var asset = data.RefAsset.Get(key, false);
                if (!asset) {
                    asset = new RefTemplet(key);
                    data.RefAsset.Set(key, asset);
                }
                return asset;
            };
            RefTemplet.prototype.init = function () {
                var _this = this;
                this._factory = new Templet();
                this._factory.once(LEvent.COMPLETE, this, function () {
                    _this._parseComplete = true;
                    _this.event(LEvent.COMPLETE);
                });
                this._factory.loadAni(this._url);
            };
            RefTemplet.prototype.buildArmature = function (aniMode) {
                return this._factory.buildArmature(aniMode);
            };
            // 释放纹理
            RefTemplet.prototype.destroy = function () {
                this._factory.destroy();
                this._factory = null;
                _super.prototype.destroy.call(this);
            };
            return RefTemplet;
        }(data.RefAsset));
        data.RefTemplet = RefTemplet;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=RefTemplet.js.map