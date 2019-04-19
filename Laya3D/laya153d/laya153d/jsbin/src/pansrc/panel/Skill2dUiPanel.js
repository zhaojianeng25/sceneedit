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
var Skill2dUiPanel = /** @class */ (function (_super) {
    __extends(Skill2dUiPanel, _super);
    function Skill2dUiPanel() {
        var _this = _super.call(this) || this;
        _this.ape = new BaseWinPanel();
        _this.addChild(_this.ape);
        var $imag = new Laya.Image("res/2dbg.jpg");
        $imag.x = 20;
        $imag.y = 30;
        _this.ape.addChild($imag);
        _this.ape.pos(150, 150);
        _this.layaSceneLevel = new BaseLaya3dSprite();
        _this.addChild(_this.layaSceneLevel);
        _this.ape.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        return _this;
    }
    Skill2dUiPanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x;
        this.layaSceneLevel.y = this.ape.y;
        //  this.uiLayaSceneChar.set2dPos(this.ape.x + 200, this.ape.y + 200)
    };
    Skill2dUiPanel.prototype.onStartDrag = function (e) {
        //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
        this.ape.showJumpText(this.layaSceneLevel.scene, new Pan3d.Vector3D(0, 0, 0));
    };
    return Skill2dUiPanel;
}(Laya.Sprite));
//# sourceMappingURL=Skill2dUiPanel.js.map