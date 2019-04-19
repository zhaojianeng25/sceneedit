/*
class Game2dZipChar extends Game2dChar {
    constructor() {
        super();
    }
    public update(): void {
        super.update();

    }
    public setVcMatrix($mesh: MeshData): void {
        var m: Matrix3D = Scene_data.vpMatrix.clone()

        Scene_data.context3D.setVpMatrix($mesh.material.shader, m.m);

        // m.appendScale(0.2, 0.2, 0.2)
        Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "posMatrix3D", this.posMatrix.m);

    }
    public updateMatrix(): void {
        this.posMatrix.identity();

        this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
        this.posMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS)
        this.posMatrix.appendRotation(30, Vector3D.X_AXIS)
        //  this.posMatrix.appendScale(1, 1,0.2)
        this.posMatrix.appendTranslation(this._x, this._y, this._z);

    }
}
*/
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
var TipsTextPanel = /** @class */ (function (_super) {
    __extends(TipsTextPanel, _super);
    function TipsTextPanel() {
        var _this = _super.call(this) || this;
        _this.skilnum = 0;
        _this.ape = new BaseWinPanel();
        _this.addChild(_this.ape);
        var $imag = new Laya.Image(Pan3d.Scene_data.fileRoot + "2dbg.jpg");
        $imag.x = 20;
        $imag.y = 30;
        _this.ape.addChild($imag);
        _this.ape.pos(100, 100);
        _this.layaSceneLevel = new BaseLaya3dSprite();
        _this.addChild(_this.layaSceneLevel);
        _this.uiLayaSceneChar = _this.addModelChar();
        _this.uiLayaSceneChar.rotationY = 145;
        var ddd = _this.addModelChar();
        ddd.set2dPos(330, 215); //坐标
        ddd.rotationY = 145;
        //  this.uiLayaSceneChar.addPartToPos("name_0", getModelUrl("buff_lyf"), new Pan3d.Vector3D(0, -30, 0))
        // this.uiLayaSceneChar.addPartToPos("name_1", getModelUrl("npcxuanzhon_lyf"), new Pan3d.Vector3D(0, 0, 0))
        _this.ape.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        Pan3d.TimeUtil.addFrameTick(function () {
            if (_this.isCanMove) {
                _this.uiLayaSceneChar.rotationY += 1;
            }
        });
        return _this;
    }
    TipsTextPanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x;
        this.layaSceneLevel.y = this.ape.y;
    };
    TipsTextPanel.prototype.onStartDrag = function (e) {
        this.isCanMove = !this.isCanMove;
        /*
        if (this.uiLayaSceneChar.curentAction == Pan3d.CharAction.WALK || this.uiLayaSceneChar.curentAction == Pan3d.CharAction.WALK_MOUNT) {
            this.uiLayaSceneChar.play(Pan3d.CharAction.STANAD)
        } else {
            this.uiLayaSceneChar.play(Pan3d.CharAction.WALK)
        }
        */
        // this.uiLayaSceneChar.lifenum = random(100)
        //  this.uiLayaSceneChar.lifenum =80
        /*
        this.skilnum++

        switch (this.skilnum) {
            case 1:
                // this.uiLayaSceneChar.addPart(Pan3d.SceneChar.NONE_SLOT, Pan3d.SceneChar.NONE_SLOT, getModelUrl("buff_lyf"))
                this.uiLayaSceneChar.removePart("name_0")
                break
            case 2:
                this.uiLayaSceneChar.removePart("name_1")
                break
            case 3:
                //   this.uiLayaSceneChar.addPart(Pan3d.SceneChar.NONE_SLOT, Pan3d.SceneChar.NONE_SLOT, getModelUrl("buff_lyf"))
                break

        }
        console.log(this.skilnum)
        */
        //this.layaSceneLevel.scene.layaForntPanel.drawDemo(new Pan3d.Vector2D(Laya.stage.mouseX * scene2d.Override2dEngine.htmlScale, Laya.stage.mouseY * scene2d.Override2dEngine.htmlScale))
        var dd = this.layaSceneLevel.scene.layaForntPanel.drawDynamicTextDemo();
        dd.showTime = 1000;
        dd.pos.x = random(600);
        dd.pos.y = random(600);
        dd.alpha = Math.random();
    };
    TipsTextPanel.prototype.addModelChar = function () {
        var $baseChar = new Game2dChar();
        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("100110"));
        //   $baseChar.alpha = 0.5
        //   $baseChar.changeColor = [1, 0, 1, 1]
        //$baseChar.setMount("4104");
        //$baseChar.setWing("902");
        //$baseChar.setWeaponByAvatar(50011);
        //$baseChar.play(Pan3d.CharAction.STAND_MOUNT);
        $baseChar.forceRotationY = 145;
        $baseChar.set2dPos(400, 200); //坐标
        return $baseChar;
    };
    return TipsTextPanel;
}(Laya.Sprite));
//# sourceMappingURL=TipsTextPanel.js.map