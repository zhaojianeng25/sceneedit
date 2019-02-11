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
            // this.addLeftPanel(new Rectangle(500, 200, 200, 200))
            // this.addLeftPanel(new Rectangle(0, 0, 200, 200))
        };
        LayerManager.prototype.addLeftPanel = function (rect) {
            var temp = new layout.Panel;
            temp.x = rect.x;
            temp.y = rect.y;
            temp.width = rect.width;
            temp.height = rect.height;
            this.children.push(temp);
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
            for (var i = 0; i < this.children.length; i++) {
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