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
var depth;
(function (depth) {
    var Scene_data = Pan3d.Scene_data;
    var Shader3D = Pan3d.Shader3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var GlReset = Pan3d.GlReset;
    var MarFBO = /** @class */ (function (_super) {
        __extends(MarFBO, _super);
        function MarFBO(w, h) {
            if (w === void 0) { w = 128; }
            if (h === void 0) { h = 128; }
            return _super.call(this, w, h) || this;
        }
        return MarFBO;
    }(Pan3d.FBO));
    depth.MarFBO = MarFBO;
    var MarmosetLightVoShader = /** @class */ (function (_super) {
        __extends(MarmosetLightVoShader, _super);
        function MarmosetLightVoShader() {
            return _super.call(this) || this;
        }
        MarmosetLightVoShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "vPosition");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        MarmosetLightVoShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 vPosition;" +
                "attribute vec2 u2Texture;" +
                "uniform mat4 viewMatrix3D;" +
                "varying vec2 d;\n" +
                "varying vec2 jG; \n" +
                "void main(void)" +
                "{" +
                "   d = vec2(u2Texture.x, u2Texture.y);" +
                "vec4 vt0= vec4(vPosition, 1.0);" +
                "vt0 = viewMatrix3D * vt0;" +
                "jG=vt0.zw;" +
                "gl_Position = vt0;" +
                "gl_Position.y = max(gl_Position.y,0.1);" +
                "}";
            return $str;
        };
        MarmosetLightVoShader.prototype.getFragmentShaderString = function () {
            var $str = "precision highp  float;\n" +
                "uniform sampler2D tAlbedo;\n" +
                "varying vec2 d;\n" +
                "varying vec2 jG; \n" +
                "vec3 jH(float v){\n" +
                "vec4 jI = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\n" +
                "jI = fract(jI);\n" +
                "jI.xyz -= jI.yzw * (1.0 / 255.0);\n" +
                "return jI.xyz;\n" +
                "} \n" +
                "vec4 pack (float depth) {\n" +
                "depth=depth*0.5+0.5;\n" +
                " vec4 bitShift = vec4(1.0, 255.0, 255.0 * 255.0, 255.0 * 255.0 * 255.0);\n" +
                " vec4 bitMask = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);\n" +
                "vec4 rgbaDepth = fract(depth * bitShift);  \n" +
                "rgbaDepth -= rgbaDepth.yzww * bitMask;  \n" +
                "return rgbaDepth;\n" +
                "}\n" +
                "float unpack( vec4 rgbaDepth) {" +
                " vec4 bitShift = vec4(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0));" +
                "float outnum=  dot(rgbaDepth, bitShift);" +
                "outnum=(outnum-0.5)*2.0;\n" +
                "return outnum;" +
                "}" +
                "void main(void) " +
                "{ " +
                "vec4 tAlbedoColor =texture2D(tAlbedo,d.xy); " +
                // "gl_FragColor.xyz=jH((jG.x/jG.y)*0.5+0.5); " +
                //"float tempz =0.9123456 ;"+
                "float tempz =jG.x/jG.y;" +
                "vec4 tempVec4 = pack(tempz); " +
                "float tempFoalt = unpack(tempVec4); " +
                "gl_FragColor = pack(tempz); " +
                // "gl_FragColor =tAlbedoColor; " +
                "if (tempFoalt>0.9123455) { " +
                // "gl_FragColor = vec4(0.0,1.0,0.0,1.0); " +
                "}  " +
                // "gl_FragColor =vec4(1.0,0.0,0.0,1.0); " +
                //  "gl_FragColor =vec4(1.0,0.0,0.0,0.1); " +
                //   "gl_FragColor = vec4(gl_FragCoord.z,0.0,0.1236,1.0);\n" +
                //   "gl_FragColor.w=0.0; " +
                "}";
            return $str;
        };
        MarmosetLightVoShader.MarmosetLightVoShader = "MarmosetLightVoShader";
        return MarmosetLightVoShader;
    }(Shader3D));
    depth.MarmosetLightVoShader = MarmosetLightVoShader;
    var MarmosetLightVo = /** @class */ (function () {
        function MarmosetLightVo() {
            this.depthFBO = new MarFBO(2048, 2048);
            this.depthFBO.color = new Vector3D(0.0, 0.0, 0.0, 0.0);
            ProgrmaManager.getInstance().registe(MarmosetLightVoShader.MarmosetLightVoShader, new MarmosetLightVoShader);
            this.shader = ProgrmaManager.getInstance().getProgram(MarmosetLightVoShader.MarmosetLightVoShader);
            var gl = Scene_data.context3D.renderContext;
            this.depthFBO.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.depthFBO.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.depthFBO.width, this.depthFBO.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            this.makeDepthTexture();
            this.depthFBO.frameBuffer = gl.createFramebuffer();
            this.depthFBO.depthBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthFBO.depthBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.depthFBO.width, this.depthFBO.height);
            //gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }
        MarmosetLightVo.prototype.makeDepthTexture = function () {
            //深度贴图
            var gl = Scene_data.context3D.renderContext;
            var depthTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, depthTexture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.depthFBO.width, this.depthFBO.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.bindTexture(gl.TEXTURE_2D, null);
            this.depthFBO.depthTexture = depthTexture;
        };
        MarmosetLightVo.prototype.updateDepthTexture = function (fbo) {
            var gl = Scene_data.context3D.renderContext;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
            // gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_COMPONENT16, gl.TEXTURE_2D, fbo.depthTexture, 1);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);
            if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
                alert("错误配置");
            }
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
        MarmosetLightVo.prototype.update = function () {
            var gl = Scene_data.context3D.renderContext;
            GlReset.saveBasePrarame(gl);
            this.updateDepthTexture(this.depthFBO);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            GlReset.resetBasePrarame(gl);
        };
        return MarmosetLightVo;
    }());
    depth.MarmosetLightVo = MarmosetLightVo;
})(depth || (depth = {}));
//# sourceMappingURL=MarmosetLightVo.js.map