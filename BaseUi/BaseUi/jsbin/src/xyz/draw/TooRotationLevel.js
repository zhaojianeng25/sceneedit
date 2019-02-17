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
    var TooRotationDisplay3DSprite = cctv.TooRotationDisplay3DSprite;
    var TooRotationLevel = /** @class */ (function (_super) {
        __extends(TooRotationLevel, _super);
        function TooRotationLevel(value) {
            var _this = _super.call(this, value) || this;
            _this._roundA = new TooRotationDisplay3DSprite();
            _this._roundB = new TooRotationDisplay3DSprite();
            _this._roundC = new TooRotationDisplay3DSprite();
            _this._roundA.colorVect = new Vector3D(1, 0, 0);
            _this._roundB.colorVect = new Vector3D(0, 1, 0);
            _this._roundC.colorVect = new Vector3D(0, 0, 1);
            return _this;
        }
        TooRotationLevel.prototype.isHit = function (mouseVect2d) {
            this.testHitTemp(this._roundA, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(1, 0, 0)]);
            this.testHitTemp(this._roundB, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 1, 0)]);
            this.testHitTemp(this._roundC, mouseVect2d, [new Vector3D(1, 1, 1), new Vector3D(0, 0, 1)]);
        };
        TooRotationLevel.prototype.onMouseDown = function (mouseVect2d) {
            if (xyz.TooMathHitModel.testHitModel(this._roundA, this._scene, mouseVect2d)) {
                this.selectId = 1;
            }
            else if (xyz.TooMathHitModel.testHitModel(this._roundB, this._scene, mouseVect2d)) {
                this.selectId = 2;
            }
            else if (xyz.TooMathHitModel.testHitModel(this._roundC, this._scene, mouseVect2d)) {
                this.selectId = 3;
            }
        };
        TooRotationLevel.prototype.onMouseUp = function (mouseVect2d) {
            this.lastMousePosV3d = null;
            this.selectId = 0;
        };
        TooRotationLevel.prototype.onMouseMove = function (mouseVect2d) {
            if (this.selectId > 0) {
                var pos = xyz.TooMathHitModel.getCamFontDistent(this._scene, mouseVect2d, 100);
                if (this.lastMousePosV3d) {
                    var addPos = pos.subtract(this.lastMousePosV3d);
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
                        toPos = this.parent.xyzMoveData.modeMatrx3D.transformVector(toPos);
                        this.parent.xyzMoveData.x = toPos.x;
                        this.parent.xyzMoveData.y = toPos.y;
                        this.parent.xyzMoveData.z = toPos.z;
                    }
                }
                this.lastMousePosV3d = pos;
            }
        };
        TooRotationLevel.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.parent.xyzMoveData) {
                this.posMatrix.append(this.parent.xyzMoveData.modeMatrx3D);
            }
            this._roundA.posMatrix = this.posMatrix.clone();
            this._roundB.posMatrix = this.posMatrix.clone();
            this._roundB.posMatrix.prependRotation(90, Vector3D.Z_AXIS);
            this._roundC.posMatrix = this.posMatrix.clone();
            this._roundC.posMatrix.prependRotation(-90, Vector3D.Y_AXIS);
            Scene_data.context3D.renderContext.enable(Scene_data.context3D.renderContext.CULL_FACE);
            Scene_data.context3D.renderContext.cullFace(Scene_data.context3D.renderContext.BACK);
            Scene_data.context3D.setWriteDepth(true);
            Scene_data.context3D.setDepthTest(true);
            this._roundA.update();
            this._roundB.update();
            this._roundC.update();
        };
        return TooRotationLevel;
    }(xyz.TooBaseModelLevel));
    xyz.TooRotationLevel = TooRotationLevel;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooRotationLevel.js.map