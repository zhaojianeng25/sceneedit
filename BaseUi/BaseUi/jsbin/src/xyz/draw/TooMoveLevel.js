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
    var Scene_data = Pan3d.Scene_data;
    var TooMoveLevel = /** @class */ (function (_super) {
        __extends(TooMoveLevel, _super);
        function TooMoveLevel(value) {
            var _this = _super.call(this, value) || this;
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
        TooMoveLevel.prototype.isHit = function (mouseVect2d) {
            this.testHitTemp(this._boxA, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(1, 0, 0)]);
            this.testHitTemp(this._boxB, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 1, 0)]);
            this.testHitTemp(this._boxC, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 0, 1)]);
        };
        TooMoveLevel.prototype.onMouseDown = function (mouseVect2d) {
            if (xyz.TooMathHitModel.testHitModel(this._boxA, this._scene, mouseVect2d)) {
                this.selectId = 1;
            }
            else if (xyz.TooMathHitModel.testHitModel(this._boxB, this._scene, mouseVect2d)) {
                this.selectId = 2;
            }
            else if (xyz.TooMathHitModel.testHitModel(this._boxC, this._scene, mouseVect2d)) {
                this.selectId = 3;
            }
        };
        TooMoveLevel.prototype.onMouseUp = function (mouseVect2d) {
            this.lastMousePosV3d = null;
            this.selectId = 0;
        };
        TooMoveLevel.prototype.onMouseMove = function (mouseVect2d) {
            if (this.selectId > 0) {
                var pos = xyz.TooMathHitModel.getCamFontDistent(this._scene, mouseVect2d, 100);
                if (this.lastMousePosV3d) {
                    var addPos = pos.subtract(this.lastMousePosV3d);
                    console.log("位移", addPos);
                    var toPos = new Vector3D;
                    if (this.parent.xyzMoveData) {
                        switch (this.selectId) {
                            case 1:
                                toPos.x = addPos.x;
                                break;
                            case 2:
                                toPos.y = addPos.y;
                                break;
                            case 3:
                                toPos.z = addPos.z;
                                break;
                            default:
                                break;
                        }
                        // toPos=  this.parent.xyzMoveData.modeMatrx3D.transformVector(toPos)
                        console.log(toPos);
                        var $m = this.parent.xyzMoveData.modeMatrx3D.clone();
                        $m.prependTranslation(toPos.x, toPos.y, toPos.z);
                        var pos = $m.position;
                        this.parent.xyzMoveData.x = pos.x;
                        this.parent.xyzMoveData.y = pos.y;
                        this.parent.xyzMoveData.z = pos.z;
                    }
                }
                this.lastMousePosV3d = pos;
            }
        };
        TooMoveLevel.prototype.update = function () {
            _super.prototype.update.call(this);
            var line50 = 20;
            ;
            if (this.parent.xyzMoveData) {
                this.posMatrix.append(this.parent.xyzMoveData.modeMatrx3D);
            }
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
    }(xyz.TooBaseModelLevel));
    xyz.TooMoveLevel = TooMoveLevel;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooMoveLevel.js.map