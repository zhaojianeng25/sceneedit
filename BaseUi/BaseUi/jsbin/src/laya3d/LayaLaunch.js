var Browser = Laya.Browser;
var Loader = Laya.Loader;
var LEvent = Laya.Event;
var Stage = Laya.Stage;
var Pan3dByteArray = Pan3d.Pan3dByteArray;
var Laya3dSprite = LayaPan3D.Laya3dSprite;
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
            console.log("here");
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
        LayaLaunch.overrideMethods();
        this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
        Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
        Pan3d.Scene_data.fileuiRoot = "res/";
        Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";
        Laya.stage.scaleMode = "full";
        Pan3d.Engine.init(this._canvas);
        var midBox = new Laya.Box();
        Laya.stage.addChild(midBox);
        var topBox = new Laya.Box();
        Laya.stage.addChild(topBox);
        var spriteA = new Laya3dSprite("res/ui/icon/512.jpg");
        topBox.addChild(spriteA);
        var spriteB = new Laya3dSprite("res/ui/icon/512a.jpg");
        topBox.addChild(spriteB);
        spriteB.pos(525, 200);
        var picA = new Laya.Image("res/ui/icon/lyf_64x.png");
        midBox.addChild(picA);
        picA.scale(0.5, 0.5);
        picA.pos(600, 170);
        var picB = new Laya.Image("res/ui/icon/lyf_64x.png");
        midBox.addChild(picB);
        picB.pos(0, 220);
    };
    LayaLaunch.initCanvas = function ($caves) {
        new LayaLaunch();
    };
    return LayaLaunch;
}());
//# sourceMappingURL=LayaLaunch.js.map