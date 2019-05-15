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
* 音效管理
只能管理20以内的音效，超过20秒会有问题。。。
由于音效播放完后无法正确回调播放完毕，所以统一播放一次，重置回收时间，暂时设置20秒
*/
var game;
(function (game) {
    var data;
    (function (data) {
        var RefSound = /** @class */ (function (_super) {
            __extends(RefSound, _super);
            function RefSound(url) {
                return _super.call(this, url) || this;
            }
            // 获取动画模板素材
            RefSound.Get = function (key) {
                key = Laya.URL.formatURL(key);
                var asset = data.RefAsset.Get(key, false);
                if (!asset) {
                    asset = new RefSound(key);
                    //asset.addTimeOut = RefSound.MAX_FREE_TIME1;
                    data.RefAsset.Set(key, asset);
                    // logd('RefSound playSound  ' + key);
                }
                return asset;
            };
            RefSound.prototype.init = function () {
            };
            RefSound.prototype.playSound = function (url, loops, soundClass, startTime) {
                Laya.SoundManager.playSound(url, loops, undefined, soundClass, startTime);
                // this.retain()
                this._timeOut = Laya.timer.currTimer + RefSound.MAX_FREE_TIME1;
                // logd('RefSound playSound  ' + this.url);
            };
            RefSound.prototype.stopSound = function () {
                Laya.SoundManager.stopSound(this.url);
                this.forceMoveRef();
            };
            // 释放纹理
            RefSound.prototype.destroy = function () {
                Laya.SoundManager.destroySound(this.url);
                // logd('RefSound destroy  ' + this.url);
            };
            RefSound.MAX_FREE_TIME1 = 20000; // 素材超时释放时间
            return RefSound;
        }(data.RefAsset));
        data.RefSound = RefSound;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=RefSound.js.map