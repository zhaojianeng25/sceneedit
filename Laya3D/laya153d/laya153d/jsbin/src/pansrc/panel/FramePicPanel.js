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
var CombineParticle = Pan3d.CombineParticle;
var CopyBaseLaya3dSprite = /** @class */ (function (_super) {
    __extends(CopyBaseLaya3dSprite, _super);
    function CopyBaseLaya3dSprite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._bloodNum = 0;
        _this._bloodMidNum = 0;
        return _this;
    }
    Object.defineProperty(CopyBaseLaya3dSprite.prototype, "lifenum", {
        get: function () {
            return this._lifenum;
        },
        set: function (value) {
            if (this._lifenum) {
                if (this._lifenum > value) {
                    this._bloodMidNum = (this._lifenum - value) / 100;
                    TweenLite.to(this, 0.5, { bloodMidNum: 0 });
                    this._charBloodVo.num = value;
                }
                else {
                    this.bloodNum = this._lifenum;
                    this._bloodMidNum = (value - this._lifenum) / 100;
                    TweenLite.to(this, 0.5, { bloodMidNum: 0 });
                    TweenLite.to(this, 0.5, { bloodNum: value });
                }
            }
            else {
                if (this._charBloodVo) {
                    this._charBloodVo.num = value;
                    this._charBloodVo.midNum = 0;
                }
            }
            this._lifenum = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyBaseLaya3dSprite.prototype, "bloodNum", {
        get: function () {
            return this._bloodNum;
        },
        set: function (value) {
            this._bloodNum = value;
            if (this._charBloodVo) {
                this._charBloodVo.num = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyBaseLaya3dSprite.prototype, "bloodMidNum", {
        get: function () {
            return this._bloodMidNum;
        },
        set: function (value) {
            this._bloodMidNum = value;
            this._charBloodVo.midNum = value;
            this._charBloodVo.visibleChange = true;
        },
        enumerable: true,
        configurable: true
    });
    return CopyBaseLaya3dSprite;
}(Game2dChar));
var FramePicPanel = /** @class */ (function (_super) {
    __extends(FramePicPanel, _super);
    function FramePicPanel() {
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
        var ddd = _this.addModelChar();
        ddd.set2dPos(330, 220); //坐标
        //  this.uiLayaSceneChar.addPartToPos("name_0", getModelUrl("buff_lyf"), new Pan3d.Vector3D(0, -30, 0))
        // this.uiLayaSceneChar.addPartToPos("name_1", getModelUrl("npcxuanzhon_lyf"), new Pan3d.Vector3D(0, 0, 0))
        _this.ape.on(Pan3d.MouseType.MouseDown, _this, _this.onStartDrag);
        return _this;
    }
    FramePicPanel.prototype.addFramePartice = function () {
        var eee = {};
        //   eee.timeLen = 3000; // 总时间 ;
        //   eee.loop = true;   //是否循环;
        eee.frameScale = 0.2; //整体缩放比例;
        eee.isShow = true; //是否为最上层显示;
        var pathname = getUrlParam("path");
        var effictname = getUrlParam("name");
        if (!getUrlParam("path")) {
            window.location.href = "index.html?path=atlas&name=10101_1&timeLen=1000&loop=true&frameScale=1&x=100&y=100";
        }
        var timeLen = getUrlParam("timeLen");
        var loop = getUrlParam("loop");
        var frameScale = getUrlParam("frameScale");
        var info = {};
        if (getUrlParam("timeLen")) {
            info.timeLen = Number(getUrlParam("timeLen"));
        }
        if (getUrlParam("loop")) {
            info.loop = getUrlParam("loop") == "true";
        }
        if (getUrlParam("frameScale")) {
            info.frameScale = Number(getUrlParam("frameScale"));
        }
        info.loop = false;
        info.isShow = this.isShowBase;
        this.isShowBase = !this.isShowBase;
        console.log(this.isShowBase);
        //  var combineParticle: CombineParticle = layapan.Frame3DAtlasParticle.getFrameParticle(Scene_data.fileRoot + "atlas/", "10101_1", eee)
        var combineParticle = layapan.Frame3DAtlasParticle.getFrameParticle(Scene_data.fileRoot + pathname + "/", effictname, info);
        this.layaSceneLevel.scene.particleManager.addParticle(combineParticle);
        var povsto = new Pan3d.Vector2D(100, 200);
        if (getUrlParam("x")) {
            povsto.x += Number(getUrlParam("x"));
        }
        if (getUrlParam("y")) {
            povsto.y += Number(getUrlParam("y"));
        }
        var povsto = new Pan3d.Vector2D(0, 0);
        var $nScale = 0.25 / scene2d.Override2dEngine.htmlScale;
        var $tx = povsto.x * $nScale;
        var $tz = povsto.y * $nScale / (Math.sin(45 * Math.PI / 180)) * -1;
        combineParticle.x = $tx;
        combineParticle.y = 0;
        combineParticle.z = $tz;
    };
    FramePicPanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x;
        this.layaSceneLevel.y = this.ape.y;
    };
    FramePicPanel.prototype.onStartDrag = function (e) {
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
        this.addFramePartice();
    };
    FramePicPanel.prototype.addModelChar = function () {
        var $baseChar = new CopyBaseLaya3dSprite();
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
    return FramePicPanel;
}(Laya.Sprite));
//# sourceMappingURL=FramePicPanel.js.map