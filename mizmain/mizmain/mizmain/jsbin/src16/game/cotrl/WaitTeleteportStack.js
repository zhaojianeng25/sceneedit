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
* 传送栈
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var WaitTeleteportStack = /** @class */ (function (_super) {
            __extends(WaitTeleteportStack, _super);
            function WaitTeleteportStack(app, toMapid, dstX, dstY, par) {
                var _this = _super.call(this, app) || this;
                /*传送超时纠错*/
                _this._timeOut = 20000;
                // 传送最短时间
                _this._timeMust = _this._timeOut - 1400;
                _this._toMapid = toMapid;
                _this._toX = dstX;
                _this._toY = dstY;
                _this._par = par;
                _this._mapAssetInfo = _this._sceneObjectMgr.mapAssetInfo;
                return _this;
            }
            WaitTeleteportStack.prototype.initialize = function () {
                if (!_super.prototype.initialize.call(this)) {
                    return false;
                }
                // 标记为传送中
                this._controller.isTeleporting = true;
                // 清理选中对象
                this._sceneObjectMgr.selectOid = 0;
                // 进入地图前需要加载的素材
                var assets;
                if (!assets) {
                    assets = [];
                }
                var skin = game.Path.ui + 'load/loading0.jpg';
                assets.push(skin);
                this._assetsLoader = new AssetsLoader();
                this._assetsLoader.load(assets, Handler.create(this, this.onComplete));
                return true;
            };
            WaitTeleteportStack.prototype.onJoinMapResult = function (mapid) {
                this._toMapid = mapid;
                this._app.sceneRoot && this._app.sceneRoot.waitTeleteport(true);
            };
            WaitTeleteportStack.prototype.onComplete = function (url) {
                this.callTeleport();
            };
            WaitTeleteportStack.prototype.callTeleport = function () {
                this._sceneObjectMgr.joinFakeMap(this._toMapid, this._toX, this._toY);
            };
            WaitTeleteportStack.prototype.finalize = function () {
                if (this._assetsLoader) {
                    this._assetsLoader.clear();
                    this._assetsLoader = null;
                }
                this._mapAssetInfo = null;
                this._controller.isTeleporting = false;
                _super.prototype.finalize.call(this);
            };
            WaitTeleteportStack.prototype.update = function (diff) {
                this._timeOut -= diff;
                if (this._timeOut < 0) {
                    return true;
                }
                if (this._timeOut > this._timeMust) {
                    return false;
                }
                if (!this._sceneObjectMgr.mapInfo)
                    return false;
                //等待地图数据下载
                if (this._mapAssetInfo.id != this._toMapid || !this._mapAssetInfo.isInited)
                    return false;
                var mainUnit = this._sceneObjectMgr.mainUnit;
                if (!mainUnit)
                    return false;
                return mainUnit.mapid == this._toMapid;
            };
            return WaitTeleteportStack;
        }(cotrl.BaseStack));
        cotrl.WaitTeleteportStack = WaitTeleteportStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=WaitTeleteportStack.js.map