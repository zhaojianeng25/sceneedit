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
    LayaLaunch.prototype.init = function () {
        this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
        //  Pan3d.Scene_data.fileRoot = "res/";
        Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
        Pan3d.Scene_data.fileuiRoot = "res/";
        Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";
        Pan3d.Engine.init(this._canvas);
        var picA = new Laya.Image("res/ui/icon/lyf_64x.png");
        Laya.stage.addChild(picA);
        picA.pos(800, 300);
        var spriteA = new Laya3dSprite("res/ui/icon/512.jpg");
        Laya.stage.addChild(spriteA);
        var sprite = new Laya3dSprite("res/ui/icon/512a.jpg");
        Laya.stage.addChild(sprite);
        sprite.pos(525, 0);
    };
    LayaLaunch.initCanvas = function ($caves) {
        new LayaLaunch();
    };
    return LayaLaunch;
}());
//# sourceMappingURL=LayaLaunch.js.map