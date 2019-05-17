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
var SanguoRoleVo = /** @class */ (function () {
    function SanguoRoleVo() {
    }
    return SanguoRoleVo;
}());
var SanguoSkillVo = /** @class */ (function () {
    function SanguoSkillVo() {
    }
    return SanguoSkillVo;
}());
var Sanguo3dScenePanel = /** @class */ (function (_super) {
    __extends(Sanguo3dScenePanel, _super);
    function Sanguo3dScenePanel() {
        var _this = _super.call(this) || this;
        _this.skipNum = 0;
        _this.ape = new BaseWinPanel();
        _this.addChild(_this.ape);
        _this.ape.pos(250, 250);
        _this.layaSceneLevel = new Scene3dLaya3dSprite();
        _this.layaSceneLevel.camAotuMove = false;
        _this.layaSceneLevel.camRotationY = 45;
        _this.layaSceneLevel.camDistance = 520;
        _this.addChild(_this.layaSceneLevel);
        _this.layaSceneLevel.addMaskUi(664 - 80, 520 - 80);
        _this.ape.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        _this.ape.on(Pan3d.MouseType.MouseWheel, _this, _this.onMouseWheel);
        _this.roleItem = new Array();
        _this.addBaseRole("wujiang_0001", new Pan3d.Vector3D(-70, 0, -80), 90);
        _this.addBaseRole("wujiang_0002", new Pan3d.Vector3D(-70, 0, -30), 90);
        _this.addBaseRole("wujiang_0003", new Pan3d.Vector3D(-70, 0, +30), 90);
        _this.addBaseRole("wujiang_0014", new Pan3d.Vector3D(-70, 0, +80), 90);
        _this.addBaseRole("npc_0003", new Pan3d.Vector3D(+70, 0, -80), -90);
        _this.addBaseRole("npc_0004", new Pan3d.Vector3D(+70, 0, -30), -90);
        _this.addBaseRole("npc_0005", new Pan3d.Vector3D(+70, 0, +30), -90);
        _this.addBaseRole("npc_0006", new Pan3d.Vector3D(+70, 0, +80), -90);
        _this.skillItem = new Array();
        _this.addSkillToItem("spell_0001", "skill_001");
        _this.addSkillToItem("spell_0002", "skill_002");
        _this.addSkillToItem("spell_0003", "skill_003");
        _this.addSkillToItem("spell_0004", "skill_004");
        _this.addSkillToItem("spell_0005", "skill_005");
        _this.addSkillToItem("spell_0006", "skill_006");
        _this.addSkillToItem("spell_10001", "skill_001_2");
        _this.addSkillToItem("spell_10002", "skill_003_2");
        _this.addSkillToItem("spell_10003", "skill_002_2");
        _this.addSkillToItem("spell_10004", "skill_004_2");
        _this.addSkillToItem("spell_10006", "skill_014_2");
        _this.addGridLineSprite();
        _this.layaSceneLevel.scene.loadScene("1001", _this.mainSceneComplete, _this.mainSceneProgress, _this.mainSceneComplete);
        return _this;
    }
    Sanguo3dScenePanel.prototype.addSkillToItem = function ($skillfile, $effectName) {
        var $vo = new SanguoSkillVo();
        $vo.skillfile = $skillfile;
        $vo.effectName = $effectName;
        this.skillItem.push($vo);
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl($vo.skillfile));
    };
    Sanguo3dScenePanel.prototype.mainSceneComplete = function () {
    };
    Sanguo3dScenePanel.prototype.mainSceneProgress = function (num) {
    };
    Sanguo3dScenePanel.prototype.addGridLineSprite = function () {
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        var $GridLineSprite = new Pan3d.GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);
    };
    Sanguo3dScenePanel.prototype.loadSkill = function () {
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_1"));
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_2"));
    };
    // private uiLayaSceneChar: layapan.LayaSceneChar
    Sanguo3dScenePanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x + 40;
        this.layaSceneLevel.y = this.ape.y + 40;
    };
    Sanguo3dScenePanel.prototype.onMouseWheel = function (e) {
        this.layaSceneLevel.camDistance += e.delta;
    };
    Sanguo3dScenePanel.prototype.onStartDrag = function (e) {
        var $id = this.skipNum++ % this.roleItem.length;
        var $SanguoRoleVo = this.roleItem[$id];
        var $skillVo;
        switch ($SanguoRoleVo.name) {
            case "wujiang_0001":
                $skillVo = this.skillItem[0];
                break;
            case "wujiang_0002":
                $skillVo = this.skillItem[3];
                break;
            case "wujiang_0003":
                $skillVo = this.skillItem[5];
                break;
            case "wujiang_0014":
                $skillVo = this.skillItem[5];
                break;
            default:
                $skillVo = this.skillItem[random(this.skillItem.length)];
                break;
        }
        this.charPlaySkill($SanguoRoleVo.Char, $skillVo.skillfile, $skillVo.effectName);
    };
    Sanguo3dScenePanel.prototype.charPlaySkill = function ($char, $skillfile, $effectName) {
        if (!$char._scene.ready) {
            return;
        }
        var $skill = this.layaSceneLevel.scene.skillManager.getSkill(getSkillUrl($skillfile), $effectName);
        if (!$skill.keyAry) {
            return;
        }
        if ($skill) {
            $skill.reset();
            $skill.isDeath = false;
        }
        $skill.configFixEffect($char);
        this.layaSceneLevel.scene.skillManager.playSkill($skill);
        this.ape.showJumpText(this.layaSceneLevel.scene, new Pan3d.Vector3D($char.px, $char.py, $char.pz));
    };
    Sanguo3dScenePanel.prototype.addModelChar = function () {
        var $baseChar = new layapan.LayaSceneChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5103"));
        $baseChar.setMount("4104");
        $baseChar.setWing("902");
        $baseChar.setWeaponByAvatar(50011);
        $baseChar.play(Pan3d.CharAction.STAND_MOUNT);
        return $baseChar;
    };
    Sanguo3dScenePanel.prototype.addBaseRole = function ($str, $pos, $rotation) {
        if ($str === void 0) { $str = "ms_0001"; }
        if ($pos === void 0) { $pos = null; }
        if ($rotation === void 0) { $rotation = 0; }
        var $baseChar = new layapan.LayaSceneChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl($str));
        if ($pos) {
            $baseChar.px = $pos.x;
            $baseChar.py = $pos.y;
            $baseChar.pz = $pos.z;
        }
        $baseChar.rotationY = $rotation;
        if ($pos.x > 0) {
            $baseChar.scale = 0.7;
        }
        var $vo = new SanguoRoleVo();
        $vo.name = $str;
        $vo.type = 0;
        $vo.Char = $baseChar;
        $baseChar.nameEnable = true;
        $baseChar.bloodEnable = true;
        this.roleItem.push($vo);
    };
    return Sanguo3dScenePanel;
}(Laya.Sprite));
//# sourceMappingURL=Sanguo3dScenePanel.js.map