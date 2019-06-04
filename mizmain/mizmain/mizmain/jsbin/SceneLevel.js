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
var base;
(function (base) {
    var LayaScene2dSceneChar = LayaPan3D.LayaScene2dSceneChar;
    var LayaScene2D = LayaPan3D.LayaScene2D;
    var CanvasScene = /** @class */ (function (_super) {
        __extends(CanvasScene, _super);
        function CanvasScene(value, bfun) {
            if (bfun === void 0) { bfun = null; }
            return _super.call(this, value, bfun) || this;
        }
        CanvasScene.prototype.initScene = function () {
            _super.prototype.initScene.call(this);
            // this.addSceneModel();
        };
        CanvasScene.prototype.addSceneModel = function () {
            this.sceneManager.cam3D.scene2dScale = 2;
            var $baseChar = new LayaScene2dSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
            $baseChar.set2dPos(100, 100);
            $baseChar.rotationY = 180;
        };
        return CanvasScene;
    }(LayaScene2D));
    base.CanvasScene = CanvasScene;
    var SceneLevel = /** @class */ (function (_super) {
        __extends(SceneLevel, _super);
        function SceneLevel(value) {
            var _this = _super.call(this) || this;
            _this._textRect = new Pan3d.Rectangle(0, 0, 512, 512);
            _this._bottomLayer = new Laya.Box;
            _this._midScene3dPic = new CanvasScene(value, function () { });
            _this._topLayer = new Laya.Box;
            _this.addChild(_this._bottomLayer);
            _this.addChild(_this._midScene3dPic);
            _this.addChild(_this._topLayer);
            _this.setSceneCanvas(512, 512);
            return _this;
        }
        SceneLevel.prototype.addMovieDisplay = function ($display) {
            this._midScene3dPic.sceneManager.addMovieDisplay($display);
        };
        //设置背景颜色
        SceneLevel.prototype.setSceneBgColor = function (value) {
            this._midScene3dPic.bgColor = value;
        };
        //设置3D角色比例
        SceneLevel.prototype.setSceneScale = function (value) {
            this._midScene3dPic.sceneManager.cam3D.scene2dScale = value;
            this._bottomLayer.scale(value / 4, value / 4);
            this._topLayer.scale(value / 4, value / 4);
        };
        //设计渲染范围
        SceneLevel.prototype.setSceneCanvas = function (w, h) {
            this._midScene3dPic.scale(w / this._textRect.width, h / this._textRect.height);
        };
        //获取一个名字Label;
        SceneLevel.prototype.getNameLabelVo = function () {
            var temp = new Laya.Label("名字");
            temp.color = "#ff0000";
            temp.fontSize = 30;
            temp.x = 100;
            temp.y = 100;
            this._topLayer.addChild(temp);
            return temp;
        };
        return SceneLevel;
    }(Laya.Box));
    base.SceneLevel = SceneLevel;
})(base || (base = {}));
//# sourceMappingURL=SceneLevel.js.map