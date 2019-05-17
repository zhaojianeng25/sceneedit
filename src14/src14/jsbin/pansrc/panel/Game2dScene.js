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
var Scene2dSprite = /** @class */ (function (_super) {
    __extends(Scene2dSprite, _super);
    function Scene2dSprite() {
        var _this = _super.call(this) || this;
        var $imag = new Laya.Image(Pan3d.Scene_data.fileRoot + "672982210469139386.jpg");
        _this.addChild($imag);
        _this.layaSceneLevel = new BaseLaya3dSprite();
        _this.addChild(_this.layaSceneLevel);
        _this.uiLayaSceneChar = _this.addModelChar();
        _this.uiLayaSceneChar.set2dPos(200, 200); //坐标
        _this.uiLayaSceneChar.nameEnable = true;
        _this.uiLayaSceneChar.bloodEnable = true;
        $imag.on(Laya.Event.MOUSE_DOWN, _this, _this.mouseHandler);
        return _this;
    }
    Scene2dSprite.prototype.mouseHandler = function (e) {
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.uiLayaSceneChar.moveTopos(new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY)); //坐标
                this.showJumpText();
                var $a = new Pan3d.Vector3D(Pan3d.Scene_data.cam3D.x, Pan3d.Scene_data.cam3D.y, Pan3d.Scene_data.cam3D.z);
                break;
            default:
                break;
        }
    };
    Scene2dSprite.prototype.showJumpText = function () {
        var $jumpVo = new Pan3d.TextJumpUiVo();
        $jumpVo.str = "122";
        $jumpVo.pos = new Pan3d.Vector3D();
        $jumpVo.pos.x = this.uiLayaSceneChar.px;
        $jumpVo.pos.z = this.uiLayaSceneChar.pz;
        $jumpVo.pos.y = 30;
        $jumpVo.type = random(5);
        $jumpVo.starttime = Pan3d.TimeUtil.getTimer();
        $jumpVo.endtime = Pan3d.TimeUtil.getTimer() + 1200;
        this.layaSceneLevel.scene.bloodManager.setJumpNum($jumpVo);
    };
    Scene2dSprite.prototype.addModelChar = function () {
        var $baseChar = new Game2dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5103"));
        //$baseChar.setMount("4104");
        $baseChar.setWing("902");
        //$baseChar.setWeaponByAvatar(50011);
        $baseChar.set2dPos(600, 200); //坐标
        return $baseChar;
    };
    return Scene2dSprite;
}(Laya.Sprite));
//# sourceMappingURL=Game2dScene.js.map