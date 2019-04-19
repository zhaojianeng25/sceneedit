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
/*
自定义着色器
*/
var Temp3D;
(function (Temp3D) {
    var OtherShader = /** @class */ (function (_super) {
        __extends(OtherShader, _super);
        function OtherShader() {
            var _this = this;
            var vs = "attribute vec2 position;attribute vec2 texcoord;attribute vec4 color;uniform vec2 size;uniform mat4 mmat;varying vec2 v_texcoord;varying vec4 v_color;void main(){vec4 pos =mmat*vec4(position.x,position.y,0,1.0);gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);v_color = color;v_texcoord = texcoord;}";
            var ps = "precision mediump float;varying vec2 v_texcoord;varying vec4 v_color;uniform sampler2D texture;void main(){vec4 t_color = texture2D(texture, v_texcoord);gl_FragColor = t_color;}";
            _this = _super.call(this, vs, ps, "myShader") || this;
            return _this;
        }
        OtherShader.shader = new OtherShader();
        return OtherShader;
    }(Laya.Shader));
    Temp3D.OtherShader = OtherShader;
    var OtherShaderValue = /** @class */ (function (_super) {
        __extends(OtherShaderValue, _super);
        function OtherShaderValue() {
            var _this = _super.call(this, 0, 0) || this;
            var _vlen = 8 * Laya.CONST3D2D.BYTES_PE;
            _this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
            _this.texcoord = [2, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
            _this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 4 * Laya.CONST3D2D.BYTES_PE];
            return _this;
        }
        return OtherShaderValue;
    }(Laya.Value2D));
    Temp3D.OtherShaderValue = OtherShaderValue;
    var OtherLayaRectSprite = /** @class */ (function (_super) {
        __extends(OtherLayaRectSprite, _super);
        function OtherLayaRectSprite() {
            var _this = _super.call(this) || this;
            _this.iNum = 0;
            _this.init(null);
            return _this;
        }
        OtherLayaRectSprite.prototype.init = function (texture, vb, ib) {
            var _this = this;
            if (vb === void 0) { vb = null; }
            if (ib === void 0) { ib = null; }
            this.vBuffer = Laya.VertexBuffer2D.create();
            this.iBuffer = Laya.IndexBuffer2D.create();
            this.ibData = new Uint16Array([]);
            var vbArray;
            var ibArray;
            if (vb) {
                vbArray = vb;
            }
            else {
                vbArray = [];
                var texWidth = 100 + random(20);
                var texHeight = 100 + random(20);
                var red = 1;
                var greed = 1;
                var blue = 1;
                var alpha = 1;
                vbArray.push(0, 0, 0, 0, red, greed, blue, alpha);
                vbArray.push(texWidth, 0, 1, 0, red, greed, blue, alpha);
                vbArray.push(texWidth, texHeight, 1, 1, red, greed, blue, alpha);
                vbArray.push(0, texHeight, 0, 1, red, greed, blue, alpha);
            }
            if (ib) {
                ibArray = ib;
            }
            else {
                ibArray = [];
                ibArray.push(0, 1, 3); //从第一个三角形的顶点索引
            }
            this.iNum = ibArray.length;
            this.vbData = new Float32Array(vbArray);
            this.ibData = new Uint16Array(ibArray);
            this.vBuffer.append(this.vbData);
            this.iBuffer.append(this.ibData);
            this.shaderValue = new OtherShaderValue();
            this.shaderValue.textureHost = null;
            Laya.loader.load("res/ui/icon/lyf_64x.png", Laya.Handler.create(this, function (aa) {
                _this.texture = aa;
                _this.shaderValue.textureHost = _this.texture;
            }));
            this.scale(2, 2);
            this._renderType |= Laya.RenderSprite.CUSTOM; //设置当前显示对象的渲染模式为自定义渲染模式
        };
        OtherLayaRectSprite.prototype.customRender = function (context, x, y) {
            context.ctx.setIBVB(x, y, (this.iBuffer), (this.vBuffer), this.iNum, null, OtherShader.shader, this.shaderValue, 0, 0);
        };
        return OtherLayaRectSprite;
    }(Laya.Sprite));
    Temp3D.OtherLayaRectSprite = OtherLayaRectSprite;
})(Temp3D || (Temp3D = {}));
var LayaLaunchTexture = /** @class */ (function (_super) {
    __extends(LayaLaunchTexture, _super);
    function LayaLaunchTexture(bitmap) {
        var _this = _super.call(this, bitmap) || this;
        LoadManager.getInstance().load(Scene_data.fileRoot + "ui/icon/skill_64x.png", LoadManager.IMG_TYPE, function ($img, $info) {
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
        pic.x = 600;
        pic.y = 300;
        pic.scale(2, 2);
        Laya.loader.load("res/ui/icon/objs_64x.png", Laya.Handler.create(this, function (aa) {
            pic.texture = aa;
            console.log(aa.uv);
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/icon/skill_64x.png", LoadManager.IMG_TYPE, function ($img, $info) {
                Pan3d.Scene_data.context3D.updateTexture(pic.texture.source, pic.texture.source, pic.texture.source, $img);
                var tempPanTexture = Pan3d.Scene_data.context3D.getTexture($img);
                pic.texture.source = tempPanTexture;
                console.log(aa.uv);
                var a = new LayaLaunchTexture(new laya.resource.Bitmap());
                //   pic.texture = a
            });
        }));
        Laya.stage.addChild(new Temp3D.OtherLayaRectSprite());
    };
    LayaLaunch.initCanvas = function ($caves) {
        var main = new LayaLaunch();
    };
    return LayaLaunch;
}());
//# sourceMappingURL=LayaLaunch.js.map