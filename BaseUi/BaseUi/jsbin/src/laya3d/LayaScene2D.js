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
    var LayaScene2dSceneChar = /** @class */ (function (_super) {
        __extends(LayaScene2dSceneChar, _super);
        function LayaScene2dSceneChar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LayaScene2dSceneChar.prototype.set2dPos = function ($x, $y) {
            var $nScale = 1;
            var $num45 = 45;
            if (this._scene) {
                //如果需要重置有场景的情况下在2D的坐标才会正确
                $nScale = 2 / this._scene.cam3D.scene2dScale;
                $num45 = Math.abs(this._scene.focus3D.rotationX);
            }
            var $tx = $x * $nScale;
            var $tz = $y * $nScale / (Math.sin($num45 * Math.PI / 180)) * -1;
            this._px = $tx;
            this._pz = $tz;
            this.x = $tx;
            this.z = $tz;
        };
        return LayaScene2dSceneChar;
    }(layapan.LayaSceneChar));
    LayaPan3D.LayaScene2dSceneChar = LayaScene2dSceneChar;
    var LayaScene2D = /** @class */ (function (_super) {
        __extends(LayaScene2D, _super);
        function LayaScene2D(value, bfun) {
            if (bfun === void 0) { bfun = null; }
            var _this = _super.call(this, value, bfun) || this;
            _this.addEvents();
            return _this;
        }
        LayaScene2D.prototype.addSceneModel = function () {
            this.sceneManager.cam3D.scene2dScale = 4;
            var $baseChar = new LayaScene2dSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
            $baseChar.set2dPos(100, 100);
            this.mainChar = $baseChar;
        };
        LayaScene2D.prototype.addEvents = function () {
            this.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
            this.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
            Laya.stage.on(Pan3d.MouseType.MouseUp, this, this.onMouseUp);
            Laya.stage.on(Pan3d.MouseType.MouseMove, this, this.onMouseMove);
        };
        LayaScene2D.prototype.onMouseWheel = function (e) {
            this.sceneManager.cam3D.scene2dScale += e.delta / 100;
        };
        LayaScene2D.prototype.onStartDrag = function (e) {
            if (this.mouseY < this.height * 0.2) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            }
            else {
                this.lastMouseVec2d = new Vector2D(this.mouseX, this.mouseY);
                this.lastfocus3D = new Object3D();
                this.lastfocus3D.rotationY = this.sceneManager.focus3D.rotationY;
                this.lastfocus3D.rotationX = this.sceneManager.focus3D.rotationX;
                this.mainChar.set2dPos(this.mouseX, this.mouseY);
            }
        };
        Object.defineProperty(LayaScene2D.prototype, "scene2dScale", {
            get: function () {
                return this.sceneManager.cam3D.scene2dScale;
            },
            enumerable: true,
            configurable: true
        });
        LayaScene2D.prototype.onMouseUp = function (e) {
            this.lastMouseVec2d = null;
        };
        LayaScene2D.prototype.onMouseMove = function (e) {
            if (this.lastMouseVec2d) {
            }
        };
        LayaScene2D.prototype.upData = function () {
            if (this.sceneManager) {
                this.sceneManager.focus3D.rotationX = -45;
                this.sceneManager.focus3D.rotationY = 0;
                var tw = this.sceneManager.cam3D.cavanRect.width;
                var th = this.sceneManager.cam3D.cavanRect.height;
                this.sceneManager.focus3D.x = tw / this.scene2dScale;
                var $num45 = Math.abs(this.sceneManager.focus3D.rotationX); //45度角
                this.sceneManager.focus3D.z = (th / this.scene2dScale) / (Math.sin($num45 * Math.PI / 180)) * -1;
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                _super.prototype.upData.call(this);
            }
        };
        LayaScene2D.prototype.renderToTexture = function () {
            var m = new Matrix3D;
            var tw = this.sceneManager.cam3D.cavanRect.width;
            var th = this.sceneManager.cam3D.cavanRect.height;
            m.appendScale(1 / tw, 1 / th, 1 / 2000);
            m.appendScale(this.scene2dScale, this.scene2dScale, 1);
            this.sceneManager.renderToTexture(m);
        };
        return LayaScene2D;
    }(LayaPan3D.Laya3dSprite));
    LayaPan3D.LayaScene2D = LayaScene2D;
})(LayaPan3D || (LayaPan3D = {}));
//# sourceMappingURL=LayaScene2D.js.map