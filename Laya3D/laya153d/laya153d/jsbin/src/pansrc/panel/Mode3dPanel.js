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
var Mode3dPanel = /** @class */ (function (_super) {
    __extends(Mode3dPanel, _super);
    function Mode3dPanel() {
        var _this = _super.call(this) || this;
        _this.ape = new BaseWinPanel();
        _this.addChild(_this.ape);
        _this.ape.pos(250, 250);
        _this.layaSceneLevel = new Scene3dLaya3dSprite();
        _this.layaSceneLevel.scene.changeBloodManager(new layapan.LayaBloodManager);
        _this.layaSceneLevel.camAotuMove = false;
        //    this.layaSceneLevel.camRotationX=40
        _this.addChild(_this.layaSceneLevel);
        _this.layaSceneLevel.addMaskUi(664 - 80, 520 - 80);
        //this.uiLayaSceneChar = this.addModelChar();
        //this.uiLayaSceneChar.nameEnable = true
        //this.uiLayaSceneChar.bloodEnable = true
        //this.ape.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
        //this.ape.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
        _this.addGridLineSprite();
        _this.addModes();
        return _this;
        // this.layaSceneLevel.scene.loadScene("scene011", this.mainSceneComplete, this.mainSceneProgress, this.mainSceneComplete)
    }
    Mode3dPanel.prototype.addModes = function () {
        var _this = this;
        this.layaSceneLevel.scene.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + "model/pantest1.txt", function (groupRes) {
            for (var i = 0; i < groupRes.dataAry.length; i++) {
                var item = groupRes.dataAry[i];
                var display = new Pan3d.Display3DSprite();
                display.setObjUrl(item.objUrl);
                display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                display.dynamic = true;
                _this.layaSceneLevel.scene.addSpriteDisplay(display);
            }
        });
    };
    Mode3dPanel.prototype.onMouseWheel = function (e) {
        this.layaSceneLevel.camDistance += e.delta;
    };
    Mode3dPanel.prototype.mainSceneComplete = function () {
    };
    Mode3dPanel.prototype.mainSceneProgress = function (num) {
    };
    Mode3dPanel.prototype.addGridLineSprite = function () {
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        var $GridLineSprite = new Pan3d.GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);
    };
    Mode3dPanel.prototype.loadSkill = function () {
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_1"));
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_2"));
    };
    Mode3dPanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x + 40;
        this.layaSceneLevel.y = this.ape.y + 40;
    };
    Mode3dPanel.prototype.onStartDrag = function (e) {
        if (this.uiLayaSceneChar.curentAction == Pan3d.CharAction.WALK || this.uiLayaSceneChar.curentAction == Pan3d.CharAction.WALK_MOUNT) {
            this.uiLayaSceneChar.play(Pan3d.CharAction.STANAD);
        }
        else {
            this.uiLayaSceneChar.play(Pan3d.CharAction.WALK);
        }
        this.showJumpText(this.layaSceneLevel.scene, new Pan3d.Vector3D(this.uiLayaSceneChar.px, this.uiLayaSceneChar.py, this.uiLayaSceneChar.pz));
    };
    Mode3dPanel.prototype.showJumpText = function ($scene, $pos) {
        var $jumpVo = new Pan3d.TextJumpUiVo();
        $jumpVo.str = String(random(999));
        $jumpVo.pos = new Pan3d.Vector3D();
        $jumpVo.pos.x = $pos.x;
        $jumpVo.pos.z = $pos.z;
        $jumpVo.pos.y = 30;
        $jumpVo.type = 2;
        $jumpVo.starttime = Pan3d.TimeUtil.getTimer();
        $jumpVo.endtime = Pan3d.TimeUtil.getTimer() + 1200;
        // $scene.bloodManager.setJumpNum($jumpVo);
        $scene.bloodManager.setExpJump256_256Num($jumpVo);
    };
    Mode3dPanel.prototype.addModelChar = function () {
        var $baseChar = new layapan.LayaSceneChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5103"));
        $baseChar.setMount("4104");
        $baseChar.setWing("902");
        $baseChar.setWeaponByAvatar(50011);
        $baseChar.play(Pan3d.CharAction.STAND_MOUNT);
        $baseChar.visible;
        return $baseChar;
    };
    return Mode3dPanel;
}(Laya.Sprite));
//# sourceMappingURL=Mode3dPanel.js.map