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
    var MoveScaleRotationLevel = /** @class */ (function (_super) {
        __extends(MoveScaleRotationLevel, _super);
        function MoveScaleRotationLevel() {
            var _this = _super.call(this) || this;
            _this._moveDisplay3DSprite = new xyz.TooMoveLevel;
            return _this;
        }
        MoveScaleRotationLevel.prototype.update = function () {
            this._moveDisplay3DSprite.update();
        };
        MoveScaleRotationLevel.prototype.addStage = function () {
            _super.prototype.addStage.call(this);
            this._moveDisplay3DSprite._scene = this._scene;
        };
        return MoveScaleRotationLevel;
    }(Display3D));
    xyz.MoveScaleRotationLevel = MoveScaleRotationLevel;
})(xyz || (xyz = {}));
//# sourceMappingURL=MoveScaleRotationLevel.js.map