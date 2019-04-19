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
var Game3dScene = /** @class */ (function (_super) {
    __extends(Game3dScene, _super);
    function Game3dScene() {
        var _this = _super.call(this) || this;
        _this.ape = new BaseWinPanel();
        _this.addChild(_this.ape);
        _this.ape.pos(250, 250);
        _this.layaSceneLevel = new Scene3dLaya3dSprite();
        _this.layaSceneLevel.scene.changeBloodManager(new layapan.LayaBloodManager);
        _this.addChild(_this.layaSceneLevel);
        // this.layaSceneLevel.addMaskUi(664 - 80, 520 - 80)
        //   this.uiLayaSceneChar = this.addModelChar();
        //this.uiLayaSceneChar.nameEnable = true
        //this.uiLayaSceneChar.bloodEnable = true
        //    this.ape.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
        _this.ape.on(Pan3d.MouseType.MouseWheel, _this, _this.onMouseWheel);
        _this.addGridLineSprite();
        _this.layaSceneLevel.scene.loadScene("scene_20", _this.mainSceneComplete, _this.mainSceneProgress, _this.mainSceneComplete);
        return _this;
    }
    Game3dScene.prototype.onMouseWheel = function (e) {
        this.layaSceneLevel.camDistance += e.delta;
    };
    Game3dScene.prototype.mainSceneComplete = function () {
    };
    Game3dScene.prototype.mainSceneProgress = function (num) {
    };
    Game3dScene.prototype.addGridLineSprite = function () {
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        var $GridLineSprite = new Pan3d.GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);
    };
    Game3dScene.prototype.loadSkill = function () {
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_1"));
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_2"));
    };
    Game3dScene.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x + 40;
        this.layaSceneLevel.y = this.ape.y + 40;
    };
    Game3dScene.prototype.onStartDrag = function (e) {
        // $baseChar.play(Pan3d.CharAction.STANAD);
        this.uiLayaSceneChar.playBfun(Pan3d.CharAction.STANAD, function () {
            console.log("有回调");
        });
        this.uiLayaSceneChar.x = -100;
        this.uiLayaSceneChar.z = 100;
    };
    Game3dScene.prototype.showJumpText = function ($scene, $pos) {
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
    Game3dScene.prototype.addModelChar = function () {
        var $baseChar = new layapan.LayaSceneChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        //$baseChar.setRoleUrl(getRoleUrl("jiemian001"));
        //$baseChar.setWeaponByAvatar(12567)
        $baseChar.setRoleUrl(getRoleUrl("5103"));
        $baseChar.play(Pan3d.CharAction.WALK);
        $baseChar.x = 100;
        return $baseChar;
    };
    return Game3dScene;
}(Laya.Sprite));
//# sourceMappingURL=Game3dScene.js.map