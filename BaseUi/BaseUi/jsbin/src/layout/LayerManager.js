var layout;
(function (layout) {
    var Scene_data = Pan3d.Scene_data;
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
        LayerManager.prototype.addPanel = function ($panel, $level) {
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
        LayerManager.prototype.getObjectsUnderPoint = function (evt) {
            for (var i = this.children.length - 1; i >= 0; i--) {
                var temp = this.children[i].getObjectsUnderPoint(evt);
                if (temp) {
                    return temp;
                }
            }
            return null;
        };
        LayerManager.prototype.mouseEvetData = function (evt, point) {
            var tf = false;
            for (var i = this.children.length - 1; i >= 0; i--) {
                if (!tf) {
                    tf = this.children[i].mouseEvetData(evt, point);
                }
            }
            var $uistageTemp = Scene_data.uiStage.interactiveEvent(evt);
            if (!tf) {
                Scene_data.uiBlankStage.interactiveEvent(evt);
                return $uistageTemp;
            }
            else {
                return true;
            }
        };
        return LayerManager;
    }());
    layout.LayerManager = LayerManager;
})(layout || (layout = {}));
//# sourceMappingURL=LayerManager.js.map