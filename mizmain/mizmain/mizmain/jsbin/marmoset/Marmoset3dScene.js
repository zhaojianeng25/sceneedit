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
var marmoset;
(function (marmoset) {
    var Vector2D = Pan3d.Vector2D;
    var Object3D = Pan3d.Object3D;
    var MouseType = Pan3d.MouseType;
    var Laya3dSprite = LayaPan3D.Laya3dSprite;
    var LayaSceneChar = layapan_me.LayaSceneChar;
    var Marmoset3dScene = /** @class */ (function (_super) {
        __extends(Marmoset3dScene, _super);
        function Marmoset3dScene(value, bfun) {
            if (bfun === void 0) { bfun = null; }
            var _this = _super.call(this, value, bfun) || this;
            _this.addEvents();
            _this.addBaseChar();
            marmoset.embed('res/karen1.mview', { width: 200, height: 200, autoStart: true, fullFrame: false, pagePreset: false });
            return _this;
        }
        Marmoset3dScene.prototype.addBaseChar = function () {
            var $baseChar = new LayaSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
        };
        Marmoset3dScene.prototype.addEvents = function () {
            this.on(MouseType.MouseDown, this, this.onStartDrag);
            this.on(MouseType.MouseWheel, this, this.onMouseWheel);
            Laya.stage.on(MouseType.MouseUp, this, this.onMouseUp);
            Laya.stage.on(MouseType.MouseMove, this, this.onMouseMove);
        };
        Marmoset3dScene.prototype.onMouseWheel = function (e) {
            this.sceneManager.cam3D.distance += e.delta;
        };
        Marmoset3dScene.prototype.onStartDrag = function (e) {
            if (this.mouseY < 30) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            }
            else {
                this.lastMouseVec2d = new Vector2D(this.mouseX, this.mouseY);
                this.lastfocus3D = new Object3D();
                this.lastfocus3D.rotationY = this.sceneManager.focus3D.rotationY;
                this.lastfocus3D.rotationX = this.sceneManager.focus3D.rotationX;
            }
        };
        Marmoset3dScene.prototype.onMouseUp = function (e) {
            this.lastMouseVec2d = null;
        };
        Marmoset3dScene.prototype.onMouseMove = function (e) {
            if (this.lastMouseVec2d) {
                this.sceneManager.focus3D.rotationY = this.lastfocus3D.rotationY - (this.mouseX - this.lastMouseVec2d.x);
                this.sceneManager.focus3D.rotationX = this.lastfocus3D.rotationX - (this.mouseY - this.lastMouseVec2d.y) / 10;
            }
        };
        Marmoset3dScene.prototype.upData = function () {
            if (this.sceneManager) {
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                _super.prototype.upData.call(this);
            }
        };
        return Marmoset3dScene;
    }(Laya3dSprite));
    marmoset.Marmoset3dScene = Marmoset3dScene;
})(marmoset || (marmoset = {}));
//# sourceMappingURL=Marmoset3dScene.js.map