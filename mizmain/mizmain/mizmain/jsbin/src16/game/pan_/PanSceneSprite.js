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
var pan;
(function (pan) {
    var PanSceneSprite = /** @class */ (function (_super) {
        __extends(PanSceneSprite, _super);
        function PanSceneSprite() {
            var _this = _super.call(this) || this;
            if (!layapan.LayaScene2dInit.isConfig) {
                layapan.LayaScene2dInit.initData();
            }
            return _this;
        }
        PanSceneSprite.prototype.initData = function () {
            layapan.Pan3dInSideLaya.overrideMethods();
            this.init(null);
            this.scene = new pan.PanScene();
            this.scene.ready = true;
            this.addOther();
        };
        PanSceneSprite.prototype.addOther = function () {
            var $other = new layapan.OtherLayaRectSprite();
            this.addChild($other);
        };
        PanSceneSprite.prototype.init = function (texture, vb, ib) {
            var _this = this;
            if (vb === void 0) { vb = null; }
            if (ib === void 0) { ib = null; }
            // 保证customRender必定执行
            this.frameLoop(1, this, function () {
                _this.graphics.clear();
                _this.graphics.drawLine(0, 0, 1, 0, '#000');
                _this._stat && _this._stat.update();
            });
            this.customRenderEnable = true;
            this.customRender = function (context, x, y) {
                var webGLContext = context.ctx;
                _this._layaRenderIndex = webGLContext._submits._length;
            };
        };
        PanSceneSprite.prototype.upFrame = function () {
            Pan3d.Scene_data.context3D.setWriteDepth(true);
            Pan3d.Scene_data.context3D.setDepthTest(true);
            Pan3d.TimeUtil.update();
            //设置为2D的镜头角度
            Pan3d.Scene_data.focus3D.rotationY = 0;
            Pan3d.Scene_data.focus3D.rotationX = -45;
            Pan3d.Scene_data.cam3D.distance = 250;
            //这是是移动2D的基础坐标
            scene2d.CanvasPostionModel.getInstance().tureMoveV2d = new Pan3d.Vector2D(this.x, this.y);
            scene2d.CanvasPostionModel.getInstance().resetSize();
            Pan3d.Scene_data.context3D.renderContext.clear(Pan3d.Scene_data.context3D.renderContext.DEPTH_BUFFER_BIT); //重置深度
            Pan3d.MathClass.getCamView(Pan3d.Scene_data.cam3D, Pan3d.Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            Pan3d.Scene_data.context3D._contextSetTest.clear();
            this.scene.upFrame();
        };
        PanSceneSprite.prototype.showStat = function () {
            if (!this._stat) {
                var scene = this.scene;
                this._stat = new Stat(scene);
                scene.addFocueEvent(true);
            }
        };
        PanSceneSprite.prototype.hideStat = function () {
            if (this._stat) {
                var scene = this.scene;
                this._stat.destroy();
                this._stat = null;
                scene.removeFocueEvent();
            }
        };
        PanSceneSprite.prototype.destroy = function (destroyChild) {
            this.hideStat();
            this.customRenderEnable = false;
            _super.prototype.destroy.call(this, destroyChild);
        };
        return PanSceneSprite;
    }(layapan.LayaInsideSprite));
    pan.PanSceneSprite = PanSceneSprite;
    var Stat = /** @class */ (function () {
        function Stat(v) {
            this._scene = v;
            this._statSprite = new Sprite();
            this._bgSprite = new Sprite();
            this._bgSprite.alpha = .3;
            this._bgSprite.mouseEnabled = false;
            this._statSprite.addChild(this._bgSprite);
            this._statText = new TextArea();
            this._statText.color = '#FFFFFF';
            this._statText.autoSize = true;
            this._statText.editable = false;
            this._statText.mouseEnabled = false;
            this._statText.width = 150;
            this._statText.x = 10;
            this._statText.y = 10;
            this._statSprite.addChild(this._statText);
            this._statSprite.mouseEnabled = true;
            this._statSprite.on(LEvent.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(LEvent.MOUSE_UP, this, this.onMouseUp);
            this._statSprite.x = (Laya.stage.width - 170) / 2;
            this._statSprite.y = 120; //Laya.stage.height / 2;
            Laya.stage.addChild(this._statSprite);
        }
        Stat.prototype.onMouseDown = function (e) {
            this._statSprite.startDrag();
            e.stopPropagation();
        };
        Stat.prototype.onMouseUp = function (e) {
            this._statSprite.stopDrag();
        };
        Stat.prototype.update = function () {
            var scene = this._scene;
            var text = 'cam3D.distance：' + scene.camDistance;
            text += '\r\nfocus3D.rotationX：' + scene.focus3D.rotationX;
            text += '\r\nfocus3D.rotationY：' + scene.focus3D.rotationY;
            text += '\r\nfocus3D.rotationZ：' + scene.focus3D.rotationZ;
            text += '\r\nfocus3D.x：' + scene.focus3D.x;
            text += '\r\nfocus3D.y：' + scene.focus3D.y;
            text += '\r\nfocus3D.z：' + scene.focus3D.z;
            this._statText.text = text;
            var w = this._statText.width + 20;
            var h = this._statText.height + 20;
            this._statSprite.width = w;
            this._statSprite.height = h;
            this._bgSprite.graphics.clear();
            this._bgSprite.graphics.drawRect(0, 0, w, h, '#000');
        };
        Stat.prototype.destroy = function () {
            Laya.stage.off(LEvent.MOUSE_UP, this, this.onMouseUp);
            this._statSprite.destroy(true);
        };
        return Stat;
    }());
})(pan || (pan = {}));
//# sourceMappingURL=PanSceneSprite.js.map