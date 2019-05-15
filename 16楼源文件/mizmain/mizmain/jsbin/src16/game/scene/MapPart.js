/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var MapPart = /** @class */ (function () {
            function MapPart(thumSubTexture, url, pkey) {
                this.thumTexture = thumSubTexture;
                this.key = pkey;
                this._assetsLoader = new AssetsLoader();
                var assets = [url];
                this._assetsLoader.load(assets, Handler.create(this, this.onTexutreComplete, assets));
            }
            //缩略图完成事件
            MapPart.prototype.onTexutreComplete = function (url) {
                this.texture = Laya.loader.getRes(url);
            };
            MapPart.prototype.clear = function (checkNow) {
                //贴图数据
                this.texture = null;
                //缩略图
                this.thumTexture = null;
                //素材卸载
                this._assetsLoader.clear(checkNow);
                this._assetsLoader = null;
            };
            // 地图切片宽 	
            MapPart.mapPartWidth = 512;
            // 地图切片高 			
            MapPart.mapPartHeight = 512;
            return MapPart;
        }());
        scene.MapPart = MapPart;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=MapPart.js.map