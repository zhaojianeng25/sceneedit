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
var buff;
(function (buff) {
    var CharTitleUiVo = Pan3d.CharTitleUiVo;
    var Scene_data = Pan3d.Scene_data;
    var UIManager = Pan3d.UIManager;
    var TextureManager = Pan3d.TextureManager;
    var Vector3D = Pan3d.Vector3D;
    var UIData = Pan3d.UIData;
    var UiDraw = Pan3d.UiDraw;
    var BuffTitleUiVo = /** @class */ (function (_super) {
        __extends(BuffTitleUiVo, _super);
        function BuffTitleUiVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BuffTitleUiVo.prototype.makeData = function () {
            if (this._data) {
                this._buffTitleMesh = this._data;
                var rec = this.parent.uiAtlas.getRec(this.textureStr);
                var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                for (var i = 0; i < this._buffTitleMesh.buffarr.length; i++) {
                    var picId = this._buffTitleMesh.buffarr[i];
                    UiDraw.cxtDrawImg(ctx, "TYPE" + picId, new Pan3d.Rectangle(30 * i, 0, 32, 32), UIData.publicUi); //逐个绘制BUFF图片，取公共图片。对应可自行设置参数
                }
                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            }
        };
        BuffTitleUiVo.prototype.update = function () {
            if (this._buffTitleMesh) {
                if (this._buffTitleMesh.needDraw) {
                    this.makeData();
                    this._buffTitleMesh.needDraw = false;
                }
                if (this._buffTitleMesh.pos) {
                    if (this._buffTitleMesh.visible) {
                        if (this.needUpData(this._buffTitleMesh.pos)) {
                            var m = Scene_data.cam3D.cameraMatrix.clone();
                            m.append(Scene_data.viewMatrx3D);
                            var p = m.transformVector(this._buffTitleMesh.pos);
                            this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                            this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2;
                            this.oldPos.x = this._buffTitleMesh.pos.x;
                            this.oldPos.y = this._buffTitleMesh.pos.y;
                        }
                    }
                    else {
                        this.ui.x = 10000;
                    }
                }
                if (this._buffTitleMesh.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        };
        return BuffTitleUiVo;
    }(CharTitleUiVo));
    buff.BuffTitleUiVo = BuffTitleUiVo;
    var BuffTitleMesh = /** @class */ (function (_super) {
        __extends(BuffTitleMesh, _super);
        function BuffTitleMesh() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BuffTitleMesh.prototype.destory = function () {
            this.pos = null;
            this._num = null;
            this.clear = true;
        };
        Object.defineProperty(BuffTitleMesh.prototype, "buffarr", {
            get: function () {
                return this._num;
            },
            set: function (value) {
                this._num = value;
                this.needDraw = true;
            },
            enumerable: true,
            configurable: true
        });
        return BuffTitleMesh;
    }(Pan3d.baseMeshVo));
    buff.BuffTitleMesh = BuffTitleMesh;
    var BuffThreeModel = /** @class */ (function () {
        function BuffThreeModel($scene) {
            this._scene = $scene;
            this._buffDis2DUI = new Pan3d.Dis2DUIContianerPanel(BuffTitleUiVo, new Pan3d.Rectangle(0, 0, 256, 32), 10);
            this._scene.bloodManager.uiContianerItem.push(this._buffDis2DUI);
        }
        BuffThreeModel.prototype.getCharTitleMeshVo = function (value) {
            var $vo = new BuffTitleMesh;
            $vo.buffarr = value;
            $vo.pos = new Vector3D(0, 50, 0);
            this._buffDis2DUI.showTemp($vo);
            return $vo;
        };
        return BuffThreeModel;
    }());
    buff.BuffThreeModel = BuffThreeModel;
    var BuffThreePanel = /** @class */ (function (_super) {
        __extends(BuffThreePanel, _super);
        function BuffThreePanel() {
            var _this = _super.call(this) || this;
            _this.ape = new BaseWinPanel();
            _this.addChild(_this.ape);
            var $imag = new Laya.Image("res/2dbg.jpg");
            $imag.x = 20;
            $imag.y = 30;
            _this.ape.addChild($imag);
            _this.ape.pos(100, 100);
            _this.layaSceneLevel = new BaseLaya3dSprite();
            _this.addChild(_this.layaSceneLevel);
            _this.buffThreeModel = new BuffThreeModel(_this.layaSceneLevel.scene);
            _this.uiLayaSceneChar = _this.addModelChar();
            _this.uiLayaSceneChar.nameEnable = true;
            _this.uiLayaSceneChar.bloodEnable = true;
            _this.ape.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
            return _this;
        }
        BuffThreePanel.prototype.render = function (context, x, y) {
            _super.prototype.render.call(this, context, x, y);
            this.layaSceneLevel.x = this.ape.x;
            this.layaSceneLevel.y = this.ape.y;
        };
        BuffThreePanel.prototype.onStartDrag = function (e) {
            /*
            if (this.uiLayaSceneChar.curentAction == Pan3d.CharAction.WALK || this.uiLayaSceneChar.curentAction == Pan3d.CharAction.WALK_MOUNT) {
                this.uiLayaSceneChar.play(Pan3d.CharAction.STANAD)
            } else {
                this.uiLayaSceneChar.play(Pan3d.CharAction.WALK)
            }
            */
            this.uiLayaSceneChar.moveTopos(new Pan3d.Vector2D(this.mouseX - this.ape.x, this.mouseY - this.ape.y)); //坐标
            this.ape.showJumpText(this.layaSceneLevel.scene, new Pan3d.Vector3D(this.uiLayaSceneChar.px, this.uiLayaSceneChar.py, this.uiLayaSceneChar.pz));
            this.showBuff();
            /*
            var $mouse: Pan3d.Vector2D = new Pan3d.Vector2D(this.mouseX - this.ape.x, this.mouseY - this.ape.y)
            var $tx: number = $mouse.x * layapan.LayaOverride2dEngine.htmlScale;
            var $tz: number = $mouse.y * layapan.LayaOverride2dEngine.htmlScale / (Math.sin(45 * Math.PI / 180)) * -1;
            this.layaSceneLevel.scene.playLyf("model/qigan.txt", new Pan3d.Vector3D($tx, 0, $tz), random(360));
            */
        };
        BuffThreePanel.prototype.showBuff = function () {
            var $buff = this.buffThreeModel.getCharTitleMeshVo([2, 2, 3]); //创BUFF编号，
            $buff.pos = new Vector3D(this.uiLayaSceneChar.px, this.uiLayaSceneChar.py, this.uiLayaSceneChar.pz); //给定创建位置
            console.log("字定义BUFF");
            Pan3d.TimeUtil.addTimeOut(1000, function () {
                $buff.clear = true; //清理这个对象
                $buff = null; //相当于销毁
            });
        };
        BuffThreePanel.prototype.addModelChar = function () {
            var $baseChar = new Game2dChar();
            this.layaSceneLevel.scene.addMovieDisplay($baseChar);
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            $baseChar.setMount("4104");
            $baseChar.setWing("902");
            $baseChar.setWeaponByAvatar(50011);
            $baseChar.play(Pan3d.CharAction.STAND_MOUNT);
            $baseChar.forceRotationY = 145;
            $baseChar.set2dPos(400, 200); //坐标
            return $baseChar;
        };
        return BuffThreePanel;
    }(Laya.Sprite));
    buff.BuffThreePanel = BuffThreePanel;
})(buff || (buff = {}));
//# sourceMappingURL=BuffThreePanel.js.map