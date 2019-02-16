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
var xyz;
(function (xyz) {
    var Display3D = Pan3d.Display3D;
    var Scene_data = Pan3d.Scene_data;
    var TooMoveLevel = /** @class */ (function (_super) {
        __extends(TooMoveLevel, _super);
        function TooMoveLevel() {
            var _this = _super.call(this) || this;
            _this._boxA = new xyz.TooJianTouDisplay3DSprite();
            _this._boxB = new xyz.TooJianTouDisplay3DSprite();
            _this._boxC = new xyz.TooJianTouDisplay3DSprite();
            _this._lineA = new xyz.TooLineTri3DSprite();
            _this._lineB = new xyz.TooLineTri3DSprite();
            _this._lineC = new xyz.TooLineTri3DSprite();
            _this._boxA.colorVect = new Vector3D(1, 0, 0);
            _this._boxB.colorVect = new Vector3D(0, 1, 0);
            _this._boxC.colorVect = new Vector3D(0, 0, 1);
            return _this;
        }
        TooMoveLevel.prototype.isHit = function ($e) {
            console.log(this._boxA);
        };
        TooMoveLevel.prototype.update = function () {
            var $m;
            var line50 = 20;
            ;
            this.posMatrix.identity();
            var dis = Vector3D.distance(this._scene.cam3D.postion, this._scene.focus3D);
            dis = dis / 70;
            this.posMatrix.appendScale(dis, dis, dis);
            this._boxA.posMatrix = this.posMatrix.clone();
            this._boxA.posMatrix.prependTranslation(line50, 0, 0);
            this._boxB.posMatrix = this.posMatrix.clone();
            this._boxB.posMatrix.prependTranslation(0, line50, 0);
            this._boxB.posMatrix.prependRotation(90, Vector3D.Z_AXIS);
            ;
            this._boxC.posMatrix = this.posMatrix.clone();
            this._boxC.posMatrix.prependTranslation(0, 0, line50);
            this._boxC.posMatrix.prependRotation(-90, Vector3D.Y_AXIS);
            this._lineA.posMatrix = this.posMatrix.clone();
            this._lineB.posMatrix = this.posMatrix.clone();
            this._lineB.posMatrix.prependRotation(90, Vector3D.Z_AXIS);
            this._lineC.posMatrix = this.posMatrix.clone();
            this._lineC.posMatrix.prependRotation(-90, Vector3D.Y_AXIS);
            Scene_data.context3D.cullFaceBack(false);
            Scene_data.context3D.setWriteDepth(true);
            Scene_data.context3D.setDepthTest(true);
            this._boxA.update();
            this._boxB.update();
            this._boxC.update();
            this._lineA.update();
            this._lineB.update();
            this._lineC.update();
        };
        return TooMoveLevel;
    }(Display3D));
    xyz.TooMoveLevel = TooMoveLevel;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooMoveLevel.js.map