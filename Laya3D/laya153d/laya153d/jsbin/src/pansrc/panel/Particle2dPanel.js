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
var Particle2dPanel = /** @class */ (function (_super) {
    __extends(Particle2dPanel, _super);
    function Particle2dPanel() {
        var _this = _super.call(this) || this;
        _this.ape = new BaseWinPanel();
        _this.addChild(_this.ape);
        var $imag = new Laya.Image("res/2dbg.jpg");
        $imag.x = 20;
        $imag.y = 30;
        _this.ape.addChild($imag);
        _this.ape.pos(100, 100);
        _this.layaSceneLevel = new BaseLaya3dSprite();
        _this.addChild(_this.layaSceneLevel);
        _this.uiLayaSceneChar = _this.addModelChar();
        _this.uiLayaSceneChar.nameEnable = true;
        _this.uiLayaSceneChar.bloodEnable = true;
        _this.ape.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        return _this;
    }
    Particle2dPanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x;
        this.layaSceneLevel.y = this.ape.y;
    };
    Particle2dPanel.prototype.onStartDrag = function (e) {
        var $mouse = new Pan3d.Vector2D(this.mouseX - this.ape.x, this.mouseY - this.ape.y);
        var $tx = $mouse.x * scene2d.Override2dEngine.htmlScale;
        var $tz = $mouse.y * scene2d.Override2dEngine.htmlScale / (Math.sin(45 * Math.PI / 180)) * -1;
        this.layaSceneLevel.scene.playLyf("model/texiao001.txt", new Pan3d.Vector3D($tx, 0, $tz));
    };
    Particle2dPanel.prototype.addModelChar = function () {
        var $baseChar = new Game2dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5103"));
        //    $baseChar.setMount("4104");
        //  $baseChar.setWing("902");
        $baseChar.setWeaponByAvatar(50011);
        // $baseChar.play(Pan3d.CharAction.STAND_MOUNT);
        $baseChar.forceRotationY = 145;
        $baseChar.set2dPos(400, 200); //坐标
        return $baseChar;
    };
    return Particle2dPanel;
}(Laya.Sprite));
//# sourceMappingURL=Particle2dPanel.js.map