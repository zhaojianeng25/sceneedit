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
            this.sceneManager.cam3D.scene2dScale = 2;
            var $baseChar = new LayaPan3D.LayaScene2dSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
            $baseChar.set2dPos(200, 200);
            this.mainChar = $baseChar;
            var rect100 = new Pan3d.Rectangle(0, 0, 200, 200);
            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 4; j++) {
                    this.addGrouandPic("map/5/maps/" + j + "_" + i + ".jpg", new Pan3d.Rectangle(i * rect100.width, j * rect100.height, rect100.width, rect100.height));
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
            this.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
            this.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
            this.rootpos = new Vector2D(50, 50);
        };
        LayaGame2dDemo.prototype.onMouseWheel = function (e) {
            // this.sceneManager.cam3D.scene2dScale += e.delta / 100;
            if (!this.rootpos) {
                this.rootpos = new Vector2D();
            }
            this.rootpos.x += e.delta;
            this.rootpos.y += e.delta;
        };
        LayaGame2dDemo.prototype.onStartDrag = function (e) {
            if (this.mouseY < this.height * 0.2) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            }
            else {
                var hitPos = new Vector2D(this.mouseX * this.scaleX, this.mouseY * this.scaleY);
                if (this.rootpos) {
                    var $num45 = Math.abs(this.sceneManager.focus3D.rotationX); //45度角
                    hitPos.x += this.rootpos.x * this.scaleX;
                    hitPos.y += this.rootpos.y / (Math.sin($num45 * Math.PI / 180));
                }
                this.mainChar.set2dPos(hitPos.x, hitPos.y);
                // this.bgPicSprite.set2dPos(this.mouseX * this.scaleX, this.mouseY * this.scaleY)
            }
        };
        return LayaGame2dDemo;
    }(LayaPan3D.LayaScene2D));
    LayaPan3D.LayaGame2dDemo = LayaGame2dDemo;
})(LayaPan3D || (LayaPan3D = {}));
//# sourceMappingURL=LayaGame2dDemo.js.map