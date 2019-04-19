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
var BaseWinPanel = /** @class */ (function (_super) {
    __extends(BaseWinPanel, _super);
    function BaseWinPanel() {
        var _this = _super.call(this) || this;
        var $imag = new Laya.Image(Pan3d.Scene_data.fileRoot + "a.png");
        _this.addChild($imag);
        $imag.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        return _this;
    }
    BaseWinPanel.prototype.onStartDrag = function (e) {
        this.startDrag(this.dragRegion, true, 100);
    };
    BaseWinPanel.prototype.showJumpText = function ($scene, $pos) {
        var $jumpVo = new Pan3d.TextJumpUiVo();
        $jumpVo.str = String(random(999));
        $jumpVo.pos = new Pan3d.Vector3D();
        $jumpVo.pos.x = $pos.x;
        $jumpVo.pos.z = $pos.z;
        $jumpVo.pos.y = 30;
        $jumpVo.type = 1;
        $jumpVo.starttime = Pan3d.TimeUtil.getTimer();
        $jumpVo.endtime = Pan3d.TimeUtil.getTimer() + 1200;
        $scene.bloodManager.setJumpNum($jumpVo);
    };
    return BaseWinPanel;
}(Laya.Sprite));
//# sourceMappingURL=BaseWinPanel.js.map