var layout;
(function (layout) {
    var GameUIInstance = /** @class */ (function () {
        function GameUIInstance() {
        }
        return GameUIInstance;
    }());
    layout.GameUIInstance = GameUIInstance;
    var LayerManager = /** @class */ (function () {
        function LayerManager() {
        }
        LayerManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new LayerManager();
            }
            return this._instance;
        };
        LayerManager.prototype.initData = function () {
            this.children = [];
        };
        LayerManager.prototype.addPanel = function ($panel, $isProp) {
            if ($isProp === void 0) { $isProp = false; }
            this.children.push($panel);
        };
        LayerManager.prototype.update = function () {
            Pan3d.Scene_data.context3D.setDepthTest(false);
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].update();
            }
        };
        LayerManager.prototype.resize = function () {
            for (var i = 0; this.children && i < this.children.length; i++) {
                this.children[i].resize();
            }
        };
        LayerManager.prototype.mouseEvetData = function (evt, point) {
            for (var i = this.children.length - 1; i >= 0; i--) {
                var temp = this.children[i].mouseEvetData(evt, point);
                if (temp) {
                    return true;
                }
            }
            return false;
        };
        return LayerManager;
    }());
    layout.LayerManager = LayerManager;
})(layout || (layout = {}));
//# sourceMappingURL=LayerManager.js.map