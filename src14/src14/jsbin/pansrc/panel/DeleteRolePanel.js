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
var DeleteRolePanel = /** @class */ (function (_super) {
    __extends(DeleteRolePanel, _super);
    function DeleteRolePanel() {
        var _this = _super.call(this) || this;
        _this.isDele = true;
        _this.ape = new BaseWinPanel();
        _this.addChild(_this.ape);
        _this.ape.pos(100, 0);
        _this.layaSceneLevel = new Scene3dLaya3dSprite();
        _this.layaSceneLevel.addMaskUi(664, 520);
        _this.addChild(_this.layaSceneLevel);
        _this.roleItem = new Array();
        _this.roleItem.push(_this.addModelChar(new Pan3d.Vector3D(-100, 0, 0)));
        _this.roleItem.push(_this.addModelChar(new Pan3d.Vector3D(-50, 0, 0)));
        _this.roleItem.push(_this.addModelChar(new Pan3d.Vector3D(0, 0, 0)));
        _this.roleItem.push(_this.addModelChar(new Pan3d.Vector3D(50, 0, 0)));
        _this.roleItem.push(_this.addModelChar(new Pan3d.Vector3D(100, 0, 0)));
        _this.addGridLineSprite();
        _this.loadSkill();
        _this.ape.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        _this.ape.on(Pan3d.MouseType.MouseWheel, _this, _this.onMouseWheel);
        return _this;
    }
    DeleteRolePanel.prototype.onMouseWheel = function (e) {
        this.layaSceneLevel.camDistance += e.delta;
    };
    DeleteRolePanel.prototype.addGridLineSprite = function () {
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        var $GridLineSprite = new Pan3d.GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);
    };
    DeleteRolePanel.prototype.loadSkill = function () {
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_1"));
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_2"));
    };
    DeleteRolePanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x;
        this.layaSceneLevel.y = this.ape.y;
    };
    DeleteRolePanel.prototype.onStartDrag = function (e) {
        if (this.isDele) {
            if (this.roleItem.length) {
                var $char = this.roleItem.pop();
                this.layaSceneLevel.scene.removeMovieDisplay($char);
            }
            if (this.roleItem.length == 0) {
                this.isDele = false;
            }
        }
        else {
            var $pos = this.layaSceneLevel.getGroundPos(Laya.stage.mouseX, Laya.stage.mouseY);
            var $char = this.addModelChar(new Pan3d.Vector3D(this.roleItem.length * 50 - 100, 0, 0));
            $char.px = $pos.x;
            $char.pz = $pos.z;
            this.roleItem.push($char);
            if (this.roleItem.length >= 5) {
                this.isDele = true;
            }
        }
    };
    DeleteRolePanel.prototype.addModelChar = function ($pos) {
        var $baseChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("5101"));
        $baseChar.setWing("902");
        $baseChar.setMount("4104");
        $baseChar.setWeaponByAvatar(50011);
        $baseChar.play(Pan3d.CharAction.STANAD);
        $baseChar.px = $pos.x;
        $baseChar.py = $pos.y;
        $baseChar.pz = $pos.z;
        $baseChar.bloodEnable = true;
        $baseChar.nameEnable = true;
        return $baseChar;
    };
    return DeleteRolePanel;
}(Laya.Sprite));
//# sourceMappingURL=DeleteRolePanel.js.map