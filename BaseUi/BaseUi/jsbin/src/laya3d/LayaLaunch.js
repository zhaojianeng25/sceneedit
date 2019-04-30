var Browser = Laya.Browser;
var Loader = Laya.Loader;
var LEvent = Laya.Event;
var Stage = Laya.Stage;
var Sprite = Laya.Sprite;
var Pan3dByteArray = Pan3d.Pan3dByteArray;
var LayaScene2D = LayaPan3D.LayaScene2D;
var LayaScene3D = LayaPan3D.LayaScene3D;
var LayaLaunch = /** @class */ (function () {
    function LayaLaunch() {
        this.init();
    }
    Object.defineProperty(LayaLaunch.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    LayaLaunch.overrideMethods = function () {
        if (this.inited) {
            return;
        }
        this.inited = true;
        var compatibleLayaRender = function (pan3dFunc) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var v = pan3dFunc.apply(this, args);
            //   console.log("here")
            return v;
        };
        var funA = WebGLRenderingContext.prototype.blendFunc;
        WebGLRenderingContext.prototype.blendFunc = function (sfactor, dfactor) {
            return compatibleLayaRender.call(this, funA, sfactor, dfactor);
        };
        /*
        let ParticleBoneData_setAllByteInfo = Pan3d.ParticleBoneData.prototype.setAllByteInfo;
        Pan3d.ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
            return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
        }
        */
    };
    LayaLaunch.prototype.init = function () {
        // LayaLaunch.overrideMethods()
        var _this = this;
        this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
        Laya.stage.alignV = Stage.ALIGN_LEFT;
        Laya.stage.alignH = Stage.ALIGN_TOP;
        Laya.stage.scaleMode = "full";
        Laya.stage.bgColor = "#232628";
        Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
        Pan3d.Scene_data.fileuiRoot = "res/";
        Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";
        Pan3d.Engine.init(this._canvas);
        var midBox = new Laya.Box();
        Laya.stage.addChild(midBox);
        var topBox = new Laya.Box();
        Laya.stage.addChild(topBox);
        var spriteA = new LayaScene3D("res/ui/icon/256b.png", function () {
            spriteA.scale(2, 1);
        });
        topBox.addChild(spriteA);
        var spriteB = new LayaScene3D("res/ui/icon/256a.png", function () {
            spriteB.scale(1, 2);
        });
        topBox.addChild(spriteB);
        spriteB.pos(0, 250);
        var spriteC = new LayaScene2D("res/ui/icon/512a.jpg", function () {
            spriteC.scale(1, 1);
        });
        topBox.addChild(spriteC);
        spriteC.pos(350, 250);
        var picA = new Laya.Image("res/ui/icon/lyf_64x.png");
        midBox.addChild(picA);
        picA.scale(0.5, 0.5);
        picA.pos(600, 170);
        var picB = new Laya.Image("res/ui/icon/lyf_64x.png");
        midBox.addChild(picB);
        picB.pos(0, 220);
        this.lastTm = Pan3d.TimeUtil.getTimer();
        Laya.stage.frameLoop(1, this, function () {
            var t = Pan3d.TimeUtil.getTimer() - _this.lastTm;
            Pan3d.TimeUtil.START_TIME += t * -2;
            _this.lastTm = Pan3d.TimeUtil.getTimer();
            Pan3d.TimeUtil.update();
            spriteA.upData();
            spriteB.upData();
            spriteC.upData();
        });
    };
    LayaLaunch.initCanvas = function ($caves) {
        new LayaLaunch();
    };
    return LayaLaunch;
}());
//# sourceMappingURL=LayaLaunch.js.map