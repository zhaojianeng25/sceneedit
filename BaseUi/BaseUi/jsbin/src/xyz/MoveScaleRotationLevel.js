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
    var Matrix3D = Pan3d.Matrix3D;
    var MoveScaleRotationLevel = /** @class */ (function (_super) {
        __extends(MoveScaleRotationLevel, _super);
        function MoveScaleRotationLevel() {
            var _this = _super.call(this) || this;
            _this._statceType = xyz.TooMathMoveUint.MOVE_XYZ;
            _this._tooMoveLevel = new xyz.TooMoveLevel;
            _this._tooMoveLevel.parent = _this;
            return _this;
        }
        MoveScaleRotationLevel.prototype.update = function () {
            if (this._xyzMoveData) {
                this._xyzMoveData.modeMatrx3D.identity();
                this._xyzMoveData.modeMatrx3D.appendScale(this._xyzMoveData.scaleX, this._xyzMoveData.scaleY, this._xyzMoveData.scaleY);
                this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationX, Vector3D.X_AXIS);
                this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationY, Vector3D.Y_AXIS);
                this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationZ, Vector3D.Z_AXIS);
                this._xyzMoveData.modeMatrx3D.appendTranslation(this._xyzMoveData.x, this._xyzMoveData.y, this._xyzMoveData.z);
            }
            this._tooMoveLevel.update();
        };
        MoveScaleRotationLevel.prototype.addStage = function () {
            _super.prototype.addStage.call(this);
            this._tooMoveLevel._scene = this._scene;
        };
        MoveScaleRotationLevel.prototype.dataUpDate = function () {
        };
        Object.defineProperty(MoveScaleRotationLevel.prototype, "xyzMoveData", {
            get: function () {
                return this._xyzMoveData;
            },
            set: function (value) {
                this._xyzMoveData = value;
                if (this._xyzMoveData == null) {
                    return;
                }
                this._xyzMoveData.dataUpDate = this.dataUpDate;
                this._xyzMoveData.modeMatrx3D = new Matrix3D;
                this._xyzMoveData.modeMatrx3D.identity();
                this._xyzMoveData.modeMatrx3D.appendScale(this._xyzMoveData.scaleX, this._xyzMoveData.scaleY, this._xyzMoveData.scaleY);
                this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationX, Vector3D.X_AXIS);
                this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationY, Vector3D.Y_AXIS);
                this._xyzMoveData.modeMatrx3D.appendRotation(this._xyzMoveData.rotationZ, Vector3D.Z_AXIS);
                this._xyzMoveData.modeMatrx3D.appendTranslation(this._xyzMoveData.x, this._xyzMoveData.y, this._xyzMoveData.z);
            },
            enumerable: true,
            configurable: true
        });
        MoveScaleRotationLevel.prototype.onMouseMove = function ($e) {
            var mouseVect2d = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y);
            if ($e.buttons == 0) {
                switch (this._statceType) {
                    case xyz.TooMathMoveUint.MOVE_XYZ:
                        this._tooMoveLevel.isHit(mouseVect2d);
                        break;
                    default:
                        break;
                }
            }
            else {
                if ($e.buttons == 1) {
                    switch (this._statceType) {
                        case xyz.TooMathMoveUint.MOVE_XYZ:
                            this._tooMoveLevel.onMouseMove(mouseVect2d);
                            break;
                        default:
                            break;
                    }
                }
            }
        };
        MoveScaleRotationLevel.prototype.onMouseUp = function ($e) {
            var mouseVect2d = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y);
            switch (this._statceType) {
                case xyz.TooMathMoveUint.MOVE_XYZ:
                    this._tooMoveLevel.onMouseUp(mouseVect2d);
                    break;
                default:
                    break;
            }
        };
        MoveScaleRotationLevel.prototype.onMouseDown = function ($e) {
            var mouseVect2d = new Vector2D($e.x - this._scene.cam3D.cavanRect.x, $e.y - this._scene.cam3D.cavanRect.y);
            if ($e.button == 0) {
                switch (this._statceType) {
                    case xyz.TooMathMoveUint.MOVE_XYZ:
                        this._tooMoveLevel.onMouseDown(mouseVect2d);
                        //TooMathHitModel.getMouseMoveV3d(this._scene, mouseVect2d);
                        //TooMathHitModel.getCamFontDistent(this._scene, mouseVect2d,100)
                        break;
                    default:
                        break;
                }
            }
        };
        return MoveScaleRotationLevel;
    }(Display3D));
    xyz.MoveScaleRotationLevel = MoveScaleRotationLevel;
})(xyz || (xyz = {}));
//# sourceMappingURL=MoveScaleRotationLevel.js.map