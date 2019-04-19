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
var Particle3dPanel = /** @class */ (function (_super) {
    __extends(Particle3dPanel, _super);
    function Particle3dPanel() {
        var _this = _super.call(this) || this;
        _this.ape = new BaseWinPanel();
        _this.addChild(_this.ape);
        _this.ape.pos(150, 50);
        _this.layaSceneLevel = new Scene3dLaya3dSprite();
        _this.layaSceneLevel.addMaskUi(664, 520);
        _this.addChild(_this.layaSceneLevel);
        _this.uiLayaSceneChar = _this.addModelChar();
        _this.uiLayaSceneChar.bloodEnable = true;
        _this.uiLayaSceneChar.nameEnable = false;
        _this.uiLayaSceneChar.visible = false;
        _this.uiLayaSceneChar.shadow = true;
        _this.uiLayaSceneChar.px = 100;
        _this.uiLayaSceneChar.pz = 100;
        _this.addGridLineSprite();
        _this.ape.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        scenedis.ModelshowMouseManager.getInstance().addMouseEvent();
        return _this;
    }
    Particle3dPanel.prototype.addGridLineSprite = function () {
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        var $GridLineSprite = new Pan3d.GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);
    };
    Particle3dPanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x;
        this.layaSceneLevel.y = this.ape.y;
    };
    Particle3dPanel.prototype.onStartDrag = function (e) {
        var $pos = this.layaSceneLevel.getGroundPos(Laya.stage.mouseX, Laya.stage.mouseY);
        this.layaSceneLevel.scene.playLyf("model/texiao001.txt", $pos);
    };
    Particle3dPanel.prototype.addModelChar = function () {
        var $baseChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5101"));
        $baseChar.setWing("902");
        $baseChar.setWeaponByAvatar(50011);
        return $baseChar;
    };
    return Particle3dPanel;
}(Laya.Sprite));
//# sourceMappingURL=Particle3dPanel.js.map