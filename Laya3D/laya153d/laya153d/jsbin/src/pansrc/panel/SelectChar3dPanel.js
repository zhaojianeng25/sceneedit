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
var SelectChar3dPanel = /** @class */ (function (_super) {
    __extends(SelectChar3dPanel, _super);
    function SelectChar3dPanel() {
        var _this = _super.call(this) || this;
        _this.ape = new BaseWinPanel();
        _this.addChild(_this.ape);
        _this.ape.pos(100, 0);
        _this.layaSceneLevel = new Scene3dLaya3dSprite();
        _this.layaSceneLevel.addMaskUi(664, 520);
        _this.addChild(_this.layaSceneLevel);
        _this.charItem = new Array;
        for (var i = 0; i < 10; i++) {
            var tempChar = _this.addModelChar();
            tempChar.px = -0 + i * 100;
            tempChar.px = random(400) - 200;
            tempChar.pz = random(400) - 200;
            //  tempChar.nameEnable = true;
            // tempChar.bloodEnable = true;
            _this.charItem.push(tempChar);
        }
        _this.addGridLineSprite();
        _this.loadSkill();
        _this.ape.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        scenedis.ModelshowMouseManager.getInstance().addMouseEvent();
        return _this;
    }
    SelectChar3dPanel.prototype.addGridLineSprite = function () {
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        var $GridLineSprite = new Pan3d.GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);
    };
    SelectChar3dPanel.prototype.loadSkill = function () {
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_1"));
        this.layaSceneLevel.scene.skillManager.preLoadSkill(getSkillUrl("jichu_2"));
    };
    SelectChar3dPanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x;
        this.layaSceneLevel.y = this.ape.y;
    };
    SelectChar3dPanel.prototype.onStartDrag = function (e) {
        var $a = new Pan3d.Vector3D(this.layaSceneLevel.copyCam3d.x, this.layaSceneLevel.copyCam3d.y, this.layaSceneLevel.copyCam3d.z);
        var $b = this.layaSceneLevel.getGroundPos(Laya.stage.mouseX, Laya.stage.mouseY);
        for (var i = 0; i < this.charItem.length; i++) {
            var $hit = this.charItem[i].mouseClik($a, $b);
            if ($hit) {
                this.charItem[i].nameEnable = true;
                // this.charItem[i].bloodEnable = true;
            }
        }
    };
    SelectChar3dPanel.prototype.addModelChar = function () {
        var $baseChar = new Game3dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("3015"));
        $baseChar.setWeaponByAvatar(123306);
        return $baseChar;
    };
    return SelectChar3dPanel;
}(Laya.Sprite));
//# sourceMappingURL=SelectChar3dPanel.js.map