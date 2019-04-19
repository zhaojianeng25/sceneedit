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
var WebGL = Laya.WebGL;
var SceneUiPanel = /** @class */ (function (_super) {
    __extends(SceneUiPanel, _super);
    function SceneUiPanel() {
        var _this = _super.call(this) || this;
        var $imag = new Laya.Image(Pan3d.Scene_data.fileRoot + "2dbg.jpg");
        $imag.x = 20;
        $imag.y = 30;
        _this.addChild($imag);
        return _this;
    }
    return SceneUiPanel;
}(Laya.Sprite));
//# sourceMappingURL=Avatar2dUiPanel.js.map