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
    var TextureToTextureShader = /** @class */ (function (_super) {
        __extends(TextureToTextureShader, _super);
        function TextureToTextureShader() {
            return _super.call(this) || this;
        }
        TextureToTextureShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        };
        TextureToTextureShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +
                "void main(void)" +
                "{" +
                "   vec4 pos = vec4(v3Pos.xyz,1.0);" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        TextureToTextureShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor = vec4(1.0,0.0,0.0,1.0); " +
                "}";
            return $str;
        };
        TextureToTextureShader.TextureToTextureShader = "TextureToTextureShader";
        return TextureToTextureShader;
    }(Shader3D));
    core.TextureToTextureShader = TextureToTextureShader;
    var TextureUint = /** @class */ (function () {
        function TextureUint() {
            this.makeBaseRectObjdata();
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
        TextureUint.prototype.makeBaseRectObjdata = function () {
            ProgrmaManager.getInstance().registe(TextureToTextureShader.TextureToTextureShader, new TextureToTextureShader);
            this.shader = ProgrmaManager.getInstance().getProgram(TextureToTextureShader.TextureToTextureShader);
            this.objData = new ObjData();
            this.objData.vertices.push(-1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0);
            this.objData.uvs.push(0, 0, 1, 0, 1, 1, 0, 1);
            this.objData.indexs.push(0, 1, 2, 0, 3, 2);
            this.objData.treNum = 6;
            this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
            this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
            this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            this.baseDiplay3dSprite = new Pan3d.BaseDiplay3dSprite();
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
            this.depthFBO.color = new Vector3D(0.0, 1.0, 1.0, 1.0);
            var gl = Scene_data.context3D.renderContext;
            GlReset.saveBasePrarame(gl);
            this.setFboInfo(this.depthFBO);
            this.drawBaseRectCavan();
            this.baseDiplay3dSprite.update();
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            GlReset.resetBasePrarame(gl);
            return this.depthFBO.texture;
        };
        TextureUint.prototype.drawBaseRectCavan = function () {
            Scene_data.context3D.setProgram(this.shader.program);
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
        };
        return TextureUint;
    }());
    core.TextureUint = TextureUint;
})(core || (core = {}));
//# sourceMappingURL=TextureUint.js.map