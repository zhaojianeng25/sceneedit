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
var Temp3D;
(function (Temp3D) {
    var FBO = /** @class */ (function () {
        function FBO(value, w, h) {
            if (w === void 0) { w = 128; }
            if (h === void 0) { h = 128; }
            var gl = Scene_data.context3D.renderContext;
            this.texture = value;
            this.frameBuffer = gl.createFramebuffer();
            this.depthBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);
            this.width = w;
            this.height = h;
        }
        return FBO;
    }());
    Temp3D.FBO = FBO;
})(Temp3D || (Temp3D = {}));
var LayaLaunchTexture = /** @class */ (function (_super) {
    __extends(LayaLaunchTexture, _super);
    function LayaLaunchTexture(bitmap) {
        var _this = _super.call(this, bitmap) || this;
        LoadManager.getInstance().load(Scene_data.fileRoot + "ui/icon/map_64x.png", LoadManager.IMG_TYPE, function ($img, $info) {
            var tempPanTexture = Pan3d.Scene_data.context3D.getTexture($img);
            _this._baseWebGLTexture = tempPanTexture;
        });
        return _this;
    }
    Object.defineProperty(LayaLaunchTexture.prototype, "source", {
        get: function () {
            return this._baseWebGLTexture;
        },
        enumerable: true,
        configurable: true
    });
    return LayaLaunchTexture;
}(Laya.Texture));
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
        Pan3d.Scene_data.fileRoot = "res/";
        Pan3d.Engine.init(this._canvas);
        var pic = new Laya.Image();
        Laya.stage.addChild(pic);
        pic.x = 300;
        pic.y = 300;
        pic.scale(2, 2);
        this.outImg = pic;
        this.makeLayaBaseText();
        var picA = new Laya.Image("res/ui/icon/lyf_64x.png");
        Laya.stage.addChild(picA);
    };
    LayaLaunch.prototype.makeLayaBaseText = function () {
        var _this = this;
        Laya.loader.load("res/ui/icon/objs_64x.png", Laya.Handler.create(this, function (aa) {
            _this.outImg.texture = aa;
            aa.bitmap.enableMerageInAtlas = false;
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/icon/icon_Folder_64x.png", LoadManager.IMG_TYPE, function ($img, $info) {
                Pan3d.Scene_data.context3D.updateTexture(_this.outImg.texture.source, 0, 0, $img);
                var knum = $img.width / 128;
                _this.outImg.texture.uv = [0, 0, knum, 0, knum, knum, 0, knum];
                _this.initScene();
            });
        }));
    };
    LayaLaunch.prototype.initScene = function () {
        var _this = this;
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        this.sceneMaager = new EdItorSceneManager();
        var temp = new Pan3d.BaseDiplay3dSprite();
        //    this.sceneMaager.addDisplay(temp)
        this.sceneMaager.ready = true;
        this.sceneMaager.cam3D = new Pan3d.Camera3D();
        this.sceneMaager.cam3D.cavanRect = new Pan3d.Rectangle(0, 0, 128, 128);
        this.sceneMaager.cam3D.distance = 100;
        this.sceneMaager.focus3D.rotationY = 0;
        this.sceneMaager.focus3D.rotationX = -45;
        Pan3d.MathClass.getCamView(this.sceneMaager.cam3D, this.sceneMaager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        this.outImg.frameLoop(1, this, function () {
            _this.sceneMaagerUpData();
            //  this.upData()
        });
    };
    LayaLaunch.prototype.saveBasePrarame = function () {
        var gl = Scene_data.context3D.renderContext;
        this.arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
        this.elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
    };
    LayaLaunch.prototype.resetBasePrarame = function () {
        var gl = Scene_data.context3D.renderContext;
        if (this.arrayBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.arrayBuffer);
        }
        if (this.elementArrayBuffer) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementArrayBuffer);
        }
    };
    LayaLaunch.prototype.sceneMaagerUpData = function () {
        this.saveBasePrarame();
        var gl = Scene_data.context3D.renderContext;
        var rect = new Pan3d.Rectangle(0, 0, gl.canvas.width, gl.canvas.height);
        if (this.sceneMaager.fbo) {
            this.sceneMaager.fbo.texture = this.outImg.texture.source;
        }
        // this.sceneMaager.renderToTexture();
        console.log(rect.width, rect.height);
        // gl.viewport(0, 0, rect.width, rect.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        this.resetBasePrarame();
    };
    LayaLaunch.prototype.upData = function () {
        if (!this.fbo) {
            this.fbo = new Temp3D.FBO(this.outImg.texture.source, 256, 256);
        }
        var gl = Scene_data.context3D.renderContext;
        var rect = new Pan3d.Rectangle(0, 0, gl.canvas.width, gl.canvas.height);
        this.updateDepthTexture(this.fbo);
        gl.viewport(0, 0, rect.width, rect.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    };
    LayaLaunch.prototype.updateDepthTexture = function (fbo) {
        var gl = Scene_data.context3D.renderContext;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
        gl.viewport(0, 0, fbo.width, fbo.height);
        gl.clearColor(Math.random(), 20 / 255, 20 / 255, 1.0);
        gl.clearDepth(1.0);
        gl.clearStencil(0.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthMask(true);
        gl.enable(gl.BLEND);
        gl.frontFace(gl.CW);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    };
    LayaLaunch.initCanvas = function ($caves) {
        new LayaLaunch();
    };
    return LayaLaunch;
}());
//# sourceMappingURL=LayaLaunch.js.map