var Browser = Laya.Browser;
var Loader = Laya.Loader;
var LEvent = Laya.Event;
var Stage = Laya.Stage;
var LoadManager = Pan3d.LoadManager;
var Scene_data = Pan3d.Scene_data;
var TextureRes = Pan3d.TextureRes;
var Pan3dByteArray = Pan3d.Pan3dByteArray;
var WebGLContext = laya.webgl.WebGLContext;
var EdItorSceneManager = maineditor.EdItorSceneManager;
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
        var ParticleBoneData_setAllByteInfo = Pan3d.ParticleBoneData.prototype.setAllByteInfo;
        Pan3d.ParticleBoneData.prototype.setAllByteInfo = function (byte) {
            return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
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
        //  Pan3d.Scene_data.fileRoot = "res/";
        Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
        Pan3d.Scene_data.fileuiRoot = "res/";
        Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";
        Pan3d.Engine.init(this._canvas);
        var midBox = new Laya.Box();
        Laya.stage.addChild(midBox);
        var topBox = new Laya.Box();
        Laya.stage.addChild(topBox);
        var spriteA = new Laya3dSprite("res/ui/icon/512.jpg");
        topBox.addChild(spriteA);
        var sprite = new Laya3dSprite("res/ui/icon/512a.jpg");
        topBox.addChild(sprite);
        sprite.pos(525, 0);
        var picA = new Laya.Image("res/ui/icon/lyf_64x.png");
        midBox.addChild(picA);
        picA.pos(800, 470);
        var picB = new Laya.Image("res/ui/icon/lyf_64x.png");
        midBox.addChild(picB);
        picB.pos(0, 460);
    };
    LayaLaunch.initCanvas = function ($caves) {
        new LayaLaunch();
    };
    return LayaLaunch;
}());
//# sourceMappingURL=LayaLaunch.js.map