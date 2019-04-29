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
var LayaPan3D;
(function (LayaPan3D) {
    var Vector2D = Pan3d.Vector2D;
    var Object3D = Pan3d.Object3D;
    var Matrix3D = Pan3d.Matrix3D;
    var LayaScene2D = /** @class */ (function (_super) {
        __extends(LayaScene2D, _super);
        function LayaScene2D(value, bfun) {
            if (bfun === void 0) { bfun = null; }
            var _this = _super.call(this, value, bfun) || this;
            _this.addEvents();
            return _this;
        }
        LayaScene2D.prototype.addEvents = function () {
            this.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
            this.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
            Laya.stage.on(Pan3d.MouseType.MouseUp, this, this.onMouseUp);
            Laya.stage.on(Pan3d.MouseType.MouseMove, this, this.onMouseMove);
        };
        LayaScene2D.prototype.onMouseWheel = function (e) {
            // this.sceneMaager.cam3D.distance += e.delta
        };
        LayaScene2D.prototype.onStartDrag = function (e) {
            if (this.mouseY < this.height * 0.2) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            }
            else {
                this.lastMouseVec2d = new Vector2D(this.mouseX, this.mouseY);
                this.lastfocus3D = new Object3D();
                this.lastfocus3D.rotationY = this.sceneMaager.focus3D.rotationY;
                this.lastfocus3D.rotationX = this.sceneMaager.focus3D.rotationX;
            }
        };
        LayaScene2D.prototype.onMouseUp = function (e) {
            this.lastMouseVec2d = null;
        };
        LayaScene2D.prototype.onMouseMove = function (e) {
            if (this.lastMouseVec2d) {
            }
        };
        LayaScene2D.prototype.upData = function () {
            if (this.sceneMaager) {
                this.sceneMaager.focus3D.rotationX = -45;
                this.sceneMaager.focus3D.rotationY = 0;
                Pan3d.MathClass.getCamView(this.sceneMaager.cam3D, this.sceneMaager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                _super.prototype.upData.call(this);
            }
        };
        LayaScene2D.prototype.renderToTexture = function () {
            var m = new Matrix3D;
            var tw = this.sceneMaager.cam3D.cavanRect.width;
            var th = this.sceneMaager.cam3D.cavanRect.height;
            m.appendScale(1 / tw, 1 / th, 1 / 2000);
            var scalenum = 5;
            m.appendScale(scalenum, scalenum, scalenum);
            this.sceneMaager.renderToTexture(m);
        };
        return LayaScene2D;
    }(LayaPan3D.Laya3dSprite));
    LayaPan3D.LayaScene2D = LayaScene2D;
})(LayaPan3D || (LayaPan3D = {}));
//# sourceMappingURL=LayaScene2D.js.map