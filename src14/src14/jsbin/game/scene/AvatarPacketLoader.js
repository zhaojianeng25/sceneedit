/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var AvatarPacketLoader = /** @class */ (function () {
            function AvatarPacketLoader(pUrl) {
                this.rootID = 0;
                this.isSuccessful = false;
                this.index = 0;
                this._assetsLoader = new AssetsLoader();
                var assets = [pUrl];
                this._assetsLoader.load(assets, Handler.create(this, this.onComplete, assets));
            }
            AvatarPacketLoader.prototype.onComplete = function (url) {
                this.texture = Laya.loader.getRes(url);
                this.isSuccessful = true;
                //自增
                AvatarPacketLoader.rootID_seed++;
                this.rootID = AvatarPacketLoader.rootID_seed;
            };
            AvatarPacketLoader.prototype.close = function (checkNow) {
                this._assetsLoader.clear(checkNow);
            };
            AvatarPacketLoader.rootID_seed = 0;
            return AvatarPacketLoader;
        }());
        scene.AvatarPacketLoader = AvatarPacketLoader;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=AvatarPacketLoader.js.map