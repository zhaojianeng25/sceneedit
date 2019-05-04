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
    var Vector2D = Pan3d.Vector2D;
    var LayaScene2dPicSprit = LayaPan3D.LayaScene2dPicSprit;
    var LayaScene2dSceneChar = LayaPan3D.LayaScene2dSceneChar;
    var LayaScene2D = LayaPan3D.LayaScene2D;
    var Game2dDemo = /** @class */ (function (_super) {
        __extends(Game2dDemo, _super);
        function Game2dDemo(value, bfun) {
            if (bfun === void 0) { bfun = null; }
            return _super.call(this, value, bfun) || this;
        }
        Game2dDemo.prototype.initScene = function () {
            _super.prototype.initScene.call(this);
            this.addEvents();
            this.addSceneModel();
        };
        Game2dDemo.prototype.addSceneModel = function () {
            this.sceneManager.cam3D.scene2dScale = 1 + Math.random() * 5;
            var $baseChar = new LayaScene2dSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
            $baseChar.set2dPos(200, 200);
            this.mainChar = $baseChar;
            var rect100 = new Pan3d.Rectangle(0, 0, 100, 100);
            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 4; j++) {
                    this.addGrouandPic("map/5/maps/" + j + "_" + i + ".jpg", new Pan3d.Rectangle(i * rect100.width, j * rect100.height, rect100.width, rect100.height));
                }
            }
        };
        Game2dDemo.prototype.addGrouandPic = function (value, rect) {
            var tempPic = new LayaScene2dPicSprit(value);
            tempPic.set2dPos(rect.x, rect.y);
            tempPic.width = rect.width;
            tempPic.height = rect.height;
            this.sceneManager.addDisplay(tempPic);
            return tempPic;
        };
        Game2dDemo.prototype.addEvents = function () {
            this.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
            this.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
            this.rootpos = new Vector2D(-100, -100);
        };
        Game2dDemo.prototype.onMouseWheel = function (e) {
            if (!this.rootpos) {
                this.rootpos = new Vector2D();
            }
            this.rootpos.x += e.delta;
            this.rootpos.y += e.delta;
            console.log(this.rootpos);
        };
        Game2dDemo.prototype.onStartDrag = function (e) {
            if (this.mouseY < this.height * 0.2) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            }
            else {
                var v2d = this.getMousePos(this.mouseX, this.mouseY);
                console.log("mouseX----", this.mouseX, "mouseY", this.mouseY, "mouseDown", v2d);
                this.mainChar.set2dPos(v2d.x, v2d.y);
            }
        };
        return Game2dDemo;
    }(LayaScene2D));
    base.Game2dDemo = Game2dDemo;
})(base || (base = {}));
//# sourceMappingURL=Game2dDemo.js.map