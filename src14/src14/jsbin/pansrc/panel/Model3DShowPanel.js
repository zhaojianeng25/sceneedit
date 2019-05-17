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
var Model3DShowPanel = /** @class */ (function (_super) {
    __extends(Model3DShowPanel, _super);
    function Model3DShowPanel() {
        var _this = _super.call(this) || this;
        _this.ape = new BaseWinPanel();
        _this.addChild(_this.ape);
        _this.ape.pos(200, 200);
        _this.layaSceneLevel = new Scene3dLaya3dSprite();
        _this.layaSceneLevel.addMaskUi(664, 520);
        _this.addChild(_this.layaSceneLevel);
        _this.uiLayaSceneChar = _this.addModelChar();
        //this.uiLayaSceneChar.nameEnable = true
        //this.uiLayaSceneChar.bloodEnable = true
        _this.ape.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        _this.ape.on(Pan3d.MouseType.MouseWheel, _this, _this.onMouseWheel);
        _this.addGridLineSprite();
        return _this;
    }
    Model3DShowPanel.prototype.onMouseWheel = function (e) {
        this.layaSceneLevel.camDistance += e.delta;
    };
    Model3DShowPanel.prototype.addGridLineSprite = function () {
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        var $GridLineSprite = new Pan3d.GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);
    };
    Model3DShowPanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x;
        this.layaSceneLevel.y = this.ape.y;
    };
    Model3DShowPanel.prototype.onStartDrag = function (e) {
        //   this.ape.showJumpText(this.layaSceneLevel.scene, new Pan3d.Vector3D(this.uiLayaSceneChar.px, this.uiLayaSceneChar.py, this.uiLayaSceneChar.pz))
        var $pos = this.layaSceneLevel.getGroundPos(Laya.stage.mouseX, Laya.stage.mouseY);
        this.uiLayaSceneChar.moveTopos3d($pos);
    };
    Model3DShowPanel.prototype.addModelChar = function () {
        var $baseChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("gougou"));
        $baseChar.play(Pan3d.CharAction.STANAD);
        return $baseChar;
    };
    return Model3DShowPanel;
}(Laya.Sprite));
//# sourceMappingURL=Model3DShowPanel.js.map