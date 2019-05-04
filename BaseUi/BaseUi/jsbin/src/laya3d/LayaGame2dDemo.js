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
    var LayaGame2dDemo = /** @class */ (function (_super) {
        __extends(LayaGame2dDemo, _super);
        function LayaGame2dDemo(value, bfun) {
            if (bfun === void 0) { bfun = null; }
            return _super.call(this, value, bfun) || this;
        }
        LayaGame2dDemo.prototype.initScene = function () {
            _super.prototype.initScene.call(this);
            this.addEvents();
            this.addSceneModel();
        };
        LayaGame2dDemo.prototype.addSceneModel = function () {
            this.sceneManager.cam3D.scene2dScale = 1 + Math.random() * 5;
            var $baseChar = new LayaPan3D.LayaScene2dSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
            $baseChar.set2dPos(200, 200);
            this.mainChar = $baseChar;
            var rect100 = new Pan3d.me.Rectangle(0, 0, 200, 200);
            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 4; j++) {
                    if (i == j) {
                        this.addGrouandPic("map/5/maps/" + j + "_" + i + ".jpg", new Pan3d.me.Rectangle(i * rect100.width, j * rect100.height, rect100.width, rect100.height));
                    }
                }
            }
        };
        LayaGame2dDemo.prototype.addGrouandPic = function (value, rect) {
            var tempPic = new LayaPan3D.LayaScene2dPicSprit(value);
            tempPic.set2dPos(rect.x, rect.y);
            tempPic.width = rect.width;
            tempPic.height = rect.height;
            this.sceneManager.addDisplay(tempPic);
            return tempPic;
        };
        LayaGame2dDemo.prototype.addEvents = function () {
            this.on(Pan3d.me.MouseType.MouseDown, this, this.onStartDrag);
            this.on(Pan3d.me.MouseType.MouseWheel, this, this.onMouseWheel);
            this.rootpos = new Vector2D(-100, -100);
        };
        LayaGame2dDemo.prototype.upData = function () {
            _super.prototype.upData.call(this);
            if (this.sceneManager.fbo) {
                this.sceneManager.fbo.color.x = 1;
            }
        };
        LayaGame2dDemo.prototype.onMouseWheel = function (e) {
            if (!this.rootpos) {
                this.rootpos = new Vector2D();
            }
            this.rootpos.x += e.delta;
            this.rootpos.y += e.delta;
            console.log(this.rootpos);
        };
        LayaGame2dDemo.prototype.onStartDrag = function (e) {
            if (this.mouseY < this.height * 0.2) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            }
            else {
                var v2d = this.getMousePos(this.mouseX, this.mouseY);
                console.log("mouseX----", this.mouseX, "mouseY", this.mouseY, "mouseDown", v2d);
                this.mainChar.set2dPos(v2d.x, v2d.y);
            }
        };
        return LayaGame2dDemo;
    }(LayaPan3D.LayaScene2D));
    LayaPan3D.LayaGame2dDemo = LayaGame2dDemo;
})(LayaPan3D || (LayaPan3D = {}));
//# sourceMappingURL=LayaGame2dDemo.js.map