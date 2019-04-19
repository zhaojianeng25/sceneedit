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
var FrameSceneWinPanel = /** @class */ (function (_super) {
    __extends(FrameSceneWinPanel, _super);
    function FrameSceneWinPanel() {
        var _this = _super.call(this) || this;
        var $imag = new Laya.Image("res/pan/background.jpg");
        _this.addChild($imag);
        $imag.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        return _this;
    }
    FrameSceneWinPanel.prototype.onStartDrag = function (e) {
        this.startDrag(this.dragRegion, true, 100);
    };
    return FrameSceneWinPanel;
}(Laya.Sprite));
var Scale2dScenePanel = /** @class */ (function (_super) {
    __extends(Scale2dScenePanel, _super);
    function Scale2dScenePanel() {
        var _this = _super.call(this) || this;
        _this.ape = new BaseWinPanel();
        _this.addChild(_this.ape);
        _this.ape.pos(0, 0);
        _this.layaSceneLevel = new BaseLaya3dSprite();
        _this.addChild(_this.layaSceneLevel);
        _this.uiLayaSceneChar = _this.addModelChar();
        _this.uiLayaSceneChar.nameEnable = true;
        _this.addRandomRole();
        _this.ape.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        _this.ape.on(Pan3d.MouseType.MouseWheel, _this, _this.onMouseWheel);
        return _this;
    }
    Scale2dScenePanel.prototype.onMouseWheel = function (e) {
        //鼠标中键盘控制2D场景的比例
        scene2d.Override2dEngine.htmlScale += (e.delta * 0.01);
        var $cale = scene2d.Override2dEngine.htmlScale * 2;
        this.ape.scale($cale, $cale);
        Pan3d.Engine.resetViewMatrx3D();
    };
    Scale2dScenePanel.prototype.addRandomRole = function () {
        this.roleItem = new Array();
        for (var i = 0; i < 10; i++) {
            var $baseChar = new Game2dChar();
            this.layaSceneLevel.scene.addMovieDisplay($baseChar);
            $baseChar.setRoleUrl(getRoleUrl("dadaoshou"));
            $baseChar.set2dPos(random(500), random(500)); //坐标
            this.roleItem.push($baseChar);
        }
    };
    Scale2dScenePanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x;
        this.layaSceneLevel.y = this.ape.y;
    };
    Scale2dScenePanel.prototype.onStartDrag = function (e) {
        var $v2d = new Pan3d.Vector2D((this.mouseX - this.ape.x), (this.mouseY - this.ape.y));
        this.uiLayaSceneChar = this.roleItem[random(this.roleItem.length)];
        this.uiLayaSceneChar.moveTopos($v2d); //坐标
    };
    Scale2dScenePanel.prototype.addModelChar = function () {
        var $baseChar = new Game2dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5103"));
        $baseChar.setMount("4104");
        $baseChar.setWing("902");
        $baseChar.setWeaponByAvatar(50011);
        $baseChar.play(Pan3d.CharAction.STAND_MOUNT);
        $baseChar.forceRotationY = 145;
        $baseChar.set2dPos(200, 200); //坐标
        return $baseChar;
    };
    return Scale2dScenePanel;
}(Laya.Sprite));
//# sourceMappingURL=Scale2dScenePanel.js.map