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
var YxChar3d = /** @class */ (function (_super) {
    __extends(YxChar3d, _super);
    function YxChar3d() {
        return _super.call(this) || this;
    }
    YxChar3d.prototype.moveTopos = function (v) {
        this.moveToPosV2d = v;
        var $nmr = this.pixelPos.sub(this.moveToPosV2d);
        this.pRotationY = 180 - Math.atan2($nmr.x, $nmr.y) * 180 / Math.PI;
    };
    YxChar3d.prototype.set2dPos = function ($x, $y) {
        _super.prototype.set2dPos.call(this, $x, $y);
        this.pixelPos = new Pan3d.Vector2D($x, $y);
        this.rotationX = -30;
    };
    return YxChar3d;
}(layapan.LayaSceneChar));
//# sourceMappingURL=YxChar3d.js.map