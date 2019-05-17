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
var SkillDandaoPanel = /** @class */ (function (_super) {
    __extends(SkillDandaoPanel, _super);
    function SkillDandaoPanel() {
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
        _this.uiLayaSceneChar = _this.addModelChar();
        _this.uiLayaSceneChar.nameEnable = true;
        _this.uiLayaSceneChar.bloodEnable = true;
        _this.uiLayaSceneChar.set2dPos(200, 200);
        _this.addOther();
        _this.ape.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        _this.loadSkill();
        Pan3d.MathClass.SetShock = false;
        return _this;
    }
    SkillDandaoPanel.prototype.addOther = function () {
        this.attactRole = new layapan.LayaSceneChar();
        this.layaSceneLevel.scene.addMovieDisplay(this.attactRole);
        this.attactRole.setRoleUrl(getRoleUrl("role_0001"));
        this.attactRole.set2dPos(400, 400);
    };
    SkillDandaoPanel.prototype.loadSkill = function () {
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("skill002"));
    };
    SkillDandaoPanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.ape.x = Pan3d.Scene_data.cam3D.offset.x;
        this.ape.y = Pan3d.Scene_data.cam3D.offset.y;
        this.layaSceneLevel.x = this.ape.x;
        this.layaSceneLevel.y = this.ape.y;
        //  this.uiLayaSceneChar.set2dPos(this.ape.x + 200, this.ape.y + 200)
    };
    SkillDandaoPanel.prototype.onStartDrag = function (e) {
        //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
        Pan3d.PathManager.init();
        var $mouse = new Pan3d.Vector2D(this.mouseX - this.ape.x, this.mouseY - this.ape.y);
        var $tx = $mouse.x * scene2d.Override2dEngine.htmlScale;
        var $tz = $mouse.y * scene2d.Override2dEngine.htmlScale / (Math.sin(45 * Math.PI / 180)) * -1;
        this.attactRole.set2dPos($mouse.x, $mouse.y);
        this.playDindianSkill(this.uiLayaSceneChar);
        //  this.layaSceneLevel.scene.playLyf("model/ccav_lyf.txt", new Pan3d.Vector3D($tx, 0, $tz));
    };
    SkillDandaoPanel.prototype.playDindianSkill = function ($char) {
        $char.watch(this.attactRole);
        var $skill = this.layaSceneLevel.scene.skillManager.getSkill(getSkillUrl("erchijinen006"), "skill_0030_2");
        // $skill.actionEnd=true
        if (!$skill.keyAry) {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }
        $skill.needSound = true;
        $skill.configFixEffect($char);
        this.layaSceneLevel.scene.skillManager.playSkill($skill);
    };
    SkillDandaoPanel.prototype.charPlayDanDaoSkill = function ($char) {
        if (!$char._scene.ready) {
            return;
        }
        $char.watch(this.attactRole);
        var $skill = this.layaSceneLevel.scene.skillManager.getSkill(getSkillUrl("dandao1"), "skill_0002_2");
        if (!$skill.keyAry) {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }
        $skill.configTrajectory($char, this.attactRole);
        this.layaSceneLevel.scene.skillManager.playSkill($skill);
    };
    SkillDandaoPanel.prototype.addModelChar = function () {
        var $baseChar = new layapan.LayaSceneChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("erchiyuan006"));
        return $baseChar;
    };
    return SkillDandaoPanel;
}(Laya.Sprite));
//# sourceMappingURL=SkillDandaoPanel.js.map