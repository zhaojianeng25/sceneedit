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
var Skill3dUiPanel = /** @class */ (function (_super) {
    __extends(Skill3dUiPanel, _super);
    function Skill3dUiPanel() {
        var _this = _super.call(this) || this;
        _this.ape = new BaseWinPanel();
        _this.addChild(_this.ape);
        _this.ape.pos(100, 0);
        _this.layaSceneLevel = new Scene3dLaya3dSprite();
        _this.layaSceneLevel.addMaskUi(664, 520);
        _this.addChild(_this.layaSceneLevel);
        _this.uiLayaSceneChar = _this.addModelChar();
        _this.uiLayaSceneChar.nameEnable = true;
        _this.uiLayaSceneChar.bloodEnable = true;
        _this.addGridLineSprite();
        _this.loadSkill();
        _this.ape.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        scenedis.ModelshowMouseManager.getInstance().addMouseEvent();
        return _this;
    }
    Skill3dUiPanel.prototype.addGridLineSprite = function () {
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        var $GridLineSprite = new Pan3d.GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);
    };
    Skill3dUiPanel.prototype.loadSkill = function () {
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("555555"));
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_2"));
    };
    Skill3dUiPanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x;
        this.layaSceneLevel.y = this.ape.y;
    };
    Skill3dUiPanel.prototype.onStartDrag = function (e) {
        this.layaSceneLevel.scene.charPlaySkill(this.uiLayaSceneChar, "jichu_" + (Math.random() > 0.5 ? "1" : "2"));
        var $pos = this.layaSceneLevel.getGroundPos(Laya.stage.mouseX, Laya.stage.mouseY);
        this.uiLayaSceneChar.px = $pos.x;
        this.uiLayaSceneChar.pz = $pos.z;
    };
    Skill3dUiPanel.prototype.addModelChar = function () {
        var $baseChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5101"));
        $baseChar.setWing("902");
        $baseChar.setWeaponByAvatar(50011);
        return $baseChar;
    };
    return Skill3dUiPanel;
}(Laya.Sprite));
//# sourceMappingURL=Skill3dUiPanel.js.map