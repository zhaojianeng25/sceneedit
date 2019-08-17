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
var core;
(function (core) {
    var TextureRes = Pan3d.TextureRes;
    var UIManager = Pan3d.UIManager;
    var Scene_data = Pan3d.Scene_data;
    var Shader3D = Pan3d.Shader3D;
    var GlReset = Pan3d.GlReset;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var TextureManager = Pan3d.TextureManager;
    var Display3D = Pan3d.Display3D;
    var BaseCavanShader = /** @class */ (function (_super) {
        __extends(BaseCavanShader, _super);
        function BaseCavanShader() {
            return _super.call(this) || this;
        }
        BaseCavanShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        BaseCavanShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        BaseCavanShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor = vec4(1.0,0.0,0.0,1.0); " +
                "}";
            return $str;
        };
        BaseCavanShader.BaseCavanShader = "BaseCavanShader";
        return BaseCavanShader;
    }(Shader3D));
    core.BaseCavanShader = BaseCavanShader;
    var BaseCavanSprite = /** @class */ (function (_super) {
        __extends(BaseCavanSprite, _super);
        function BaseCavanSprite() {
            var _this = _super.call(this) || this;
            _this.initData();
            _this.updateMatrix;
            return _this;
        }
        BaseCavanSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(BaseCavanShader.BaseCavanShader, new BaseCavanShader);
            this.shader = ProgrmaManager.getInstance().getProgram(BaseCavanShader.BaseCavanShader);
            this.program = this.shader.program;
            this.objData = new ObjData;
            var sizeNum = 0.8;
            this.objData.vertices = new Array();
            this.objData.vertices.push(-sizeNum, +sizeNum, 0.9);
            this.objData.vertices.push(+sizeNum, +sizeNum, 0.9);
            this.objData.vertices.push(+sizeNum, -sizeNum, 0.9);
            this.objData.vertices.push(-sizeNum, -sizeNum, 0.9);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 2, 1);
            this.objData.indexs.push(0, 3, 2);
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);
            this.loadTexture();
            this.upToGpu();
        };
        BaseCavanSprite.prototype.loadTexture = function () {
            var $ctx = UIManager.getInstance().getContext2D(128, 128, false);
            $ctx.fillStyle = "rgb(255,255,255)";
            $ctx.fillRect(0, 0, 128, 128);
            this._uvTextureRes = TextureManager.getInstance().getCanvasTexture($ctx);
        };
        BaseCavanSprite.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        BaseCavanSprite.prototype.update = function () {
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return BaseCavanSprite;
    }(Display3D));
    core.BaseCavanSprite = BaseCavanSprite;
    var TextureUint = /** @class */ (function () {
        function TextureUint() {
            this.baseDiplay3dSprite = new BaseCavanSprite();
        }
        TextureUint.getInstance = function () {
            if (!this._instance) {
                this._instance = new TextureUint();
            }
            return this._instance;
        };
        //创建颜色纹理
        TextureUint.prototype.makeColorTexture = function (colorStr, w, h) {
            if (colorStr === void 0) { colorStr = "#ff0000"; }
            if (w === void 0) { w = 1024; }
            if (h === void 0) { h = 1024; }
            var tempRect = new TextureRes();
            tempRect.width = w;
            tempRect.height = h;
            tempRect.texture = Scene_data.context3D.creatTexture(tempRect.width, tempRect.height);
            var ctx = UIManager.getInstance().getContext2D(tempRect.width, tempRect.height, false);
            ctx.fillStyle = colorStr; // text color
            ctx.fillRect(0, 0, tempRect.width, tempRect.height);
            TextureManager.getInstance().updateTexture(tempRect.texture, 0, 0, ctx);
            return tempRect;
        };
        TextureUint.prototype.setFboInfo = function (fbo) {
            var gl = Scene_data.context3D.renderContext;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);
            gl.viewport(0, 0, fbo.width, fbo.height);
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.depthMask(true);
            gl.enable(gl.DEPTH_TEST);
            gl.disable(gl.BLEND); //不用混合模式
            gl.disable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);
            gl.frontFace(gl.CCW);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.clearColor(fbo.color.x, fbo.color.y, fbo.color.z, fbo.color.w);
        };
        TextureUint.prototype.drawTextureToTexture = function () {
            this.depthFBO = new mars3D.MarFBO(1024, 1024);
            this.depthFBO.color = new Vector3D(1.0, 1.0, 1.0, 1.0);
            var gl = Scene_data.context3D.renderContext;
            GlReset.saveBasePrarame(gl);
            this.setFboInfo(this.depthFBO);
            this.drawBaseRectCavan();
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            GlReset.resetBasePrarame(gl);
            return this.depthFBO.texture;
        };
        TextureUint.prototype.drawBaseRectCavan = function () {
            this.baseDiplay3dSprite.update();
        };
        return TextureUint;
    }());
    core.TextureUint = TextureUint;
})(core || (core = {}));
//# sourceMappingURL=TextureUint.js.map