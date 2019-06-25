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
var mars3D;
(function (mars3D) {
    var Scene_data = Pan3d.Scene_data;
    var Shader3D = Pan3d.Shader3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var GlReset = Pan3d.GlReset;
    var Matrix3D = Pan3d.Matrix3D;
    var MarFBO = /** @class */ (function (_super) {
        __extends(MarFBO, _super);
        function MarFBO(w, h) {
            if (w === void 0) { w = 128; }
            if (h === void 0) { h = 128; }
            return _super.call(this, w, h) || this;
        }
        return MarFBO;
    }(Pan3d.FBO));
    mars3D.MarFBO = MarFBO;
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
    mars3D.MarmosetLightVoShader = MarmosetLightVoShader;
    var MarmosetLightVo = /** @class */ (function () {
        function MarmosetLightVo() {
            this.skipNum = 1;
            this.depthFBO = new MarFBO(1024, 1024);
            this.depthFBO.color = new Vector3D(0, 0, 0, 0);
            ProgrmaManager.getInstance().registe(MarmosetLightVoShader.MarmosetLightVoShader, new MarmosetLightVoShader);
            this.shader = ProgrmaManager.getInstance().getProgram(MarmosetLightVoShader.MarmosetLightVoShader);
            var gl = Scene_data.context3D.renderContext;
            this.depthFBO.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.depthFBO.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.depthFBO.width, this.depthFBO.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            this.depthFBO.frameBuffer = gl.createFramebuffer();
            this.depthFBO.depthBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthFBO.depthBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.depthFBO.width, this.depthFBO.height);
            // alert(gl.getExtension("WEBGL_depth_texture"))
        }
        MarmosetLightVo.prototype.updateDepthTexture = function (fbo) {
            var gl = Scene_data.context3D.renderContext;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);
            //  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthFBO.depthTexture ,0)
            gl.viewport(0, 0, fbo.width, fbo.height);
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.disable(gl.BLEND); //不用混合模式
            gl.frontFace(gl.CW);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.clearColor(fbo.color.x, fbo.color.y, fbo.color.z, fbo.color.w);
        };
        MarmosetLightVo.prototype.update = function (value) {
            if (value && value.length) {
                var gl = Scene_data.context3D.renderContext;
                GlReset.saveBasePrarame(gl);
                this.updateDepthTexture(this.depthFBO);
                for (var i = 0; i < value.length; i++) {
                    this.drawTempMesh(value[i]);
                }
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.bindTexture(gl.TEXTURE_2D, null);
                //   gl.bindRenderbuffer(gl.RENDERBUFFER, null);
                GlReset.resetBasePrarame(gl);
            }
        };
        MarmosetLightVo.prototype.fract = function (value) {
            return value - Math.floor(value);
        };
        MarmosetLightVo.prototype.make255 = function (value) {
            return Math.floor(value * 255) / 255;
        };
        MarmosetLightVo.prototype.packdepth = function (depth) {
            console.log("base", depth);
            var bitShift = new Vector3D(1.0, 255.0, 255.0 * 255.0, 255.0 * 255.0 * 255.0);
            var bitMask = new Vector3D(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);
            var rgbaDepth = bitShift.clone();
            rgbaDepth.x *= depth;
            rgbaDepth.y *= depth;
            rgbaDepth.z *= depth;
            rgbaDepth.w *= depth;
            console.log(rgbaDepth);
            rgbaDepth.x = this.fract(rgbaDepth.x);
            rgbaDepth.y = this.fract(rgbaDepth.y);
            rgbaDepth.z = this.fract(rgbaDepth.z);
            rgbaDepth.w = this.fract(rgbaDepth.w);
            console.log(rgbaDepth);
            rgbaDepth.x -= rgbaDepth.y * bitMask.x;
            rgbaDepth.y -= rgbaDepth.z * bitMask.y;
            rgbaDepth.z -= rgbaDepth.w * bitMask.z;
            rgbaDepth.w -= rgbaDepth.w * bitMask.w;
            console.log(rgbaDepth);
            rgbaDepth.x = this.make255(rgbaDepth.x);
            rgbaDepth.y = this.make255(rgbaDepth.y);
            rgbaDepth.z = this.make255(rgbaDepth.z);
            rgbaDepth.w = this.make255(rgbaDepth.w);
            console.log(rgbaDepth);
            rgbaDepth.w = 0.1;
            var outNum = this.upackDepth(rgbaDepth);
            console.log("outNum=>", outNum);
            console.log("basereb=>", Math.floor(depth * 255) / 255);
            console.log("----------------", depth - outNum);
            //"vec4 rgbaDepth = fract(depth * bitShift);  \n" +
            //"rgbaDepth -= rgbaDepth.yzww * bitMask;  \n" +
            //"return rgbaDepth;\n" +
        };
        MarmosetLightVo.prototype.upackDepth = function (value) {
            var bitShift = new Vector3D(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0));
            var outNum = bitShift.x * value.x + bitShift.y * value.y + bitShift.z * value.z + bitShift.w * value.w;
            //   console.log(outNum)
            //" vec4 bitShift = vec4(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0));" +
            //    "return dot(rgbaDepth, bitShift);" 
            return outNum;
        };
        MarmosetLightVo.prototype.getShaderMatrix3D = function () {
            var skym = new Matrix3D();
            var shdowM = new Matrix3D();
            for (var i = 0; i < skym.m.length; i++) {
                skym.m[i] = window["uSkyMatrix"][i];
                shdowM.m[i] = window["uShadowMatrices"][i];
            }
            shdowM.prepend(skym);
            //   console.log(skym.m)
            return shdowM;
        };
        MarmosetLightVo.prototype.drawTempMesh = function (mesh) {
            if (mesh.tAlbedo && mesh.tNormal && mesh.tReflectivity) {
                //    Pan3d.Scene_data.context3D.setWriteDepth(true);
                //   Pan3d.Scene_data.context3D.setDepthTest(true);
                //  Pan3d.Scene_data.context3D.setBlendParticleFactors(0)
                var gl = Scene_data.context3D.renderContext;
                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setDepthTest(true);
                //  Scene_data.context3D.setCullFaceModel(2);
                // Scene_data.context3D.setBlendParticleFactors(Math.floor(this.skipNum / 100)%6)
                Scene_data.context3D.setBlendParticleFactors(Math.floor(this.skipNum / 100) % 6);
                //console.log(Math.floor(this.skipNum / 100) % 6)
                //  this.packdepth(0.91234)
                Scene_data.context3D.setProgram(this.shader.program);
                if (!this.depthFBO.depthViewMatrix3D) {
                    this.depthFBO.depthViewMatrix3D = window["mview"];
                }
                // var tempArr: Array<number> = [-2.399169445037842, 0.007191055919975042, 0.026615558192133904, 0.026615558192133904, 0.00008928590250434354, 2.9879062175750732, -0.08928610384464264, -0.08928610384464264, 0.06313783675432205, 0.26900720596313477, 0.9956503510475159, 0.9956503510475159, 0.7742966413497925, -2.6027095317840576, 27.5628662109375, 28.162866592407227];
                var tempArr = [-1.2128925323486328, -0.009712250903248787, 0.026615558192133904, 0.026615558192133904, 0.04468769580125809, 1.5385961532592773, -0.08928610384464264, -0.08928610384464264, -0.4662562608718872, -0.36332157254219055, 0.9956503510475159, 0.9956503510475159, -13.69428539276123, -15.382787704467773, 27.5628662109375, 28.162866592407227];
                //  tempArr = window["uShadowMatrices"]
                for (var kt = 0; kt < tempArr.length; kt++) {
                    this.depthFBO.depthViewMatrix3D[kt] = tempArr[kt];
                }
                this.makeShadowMatrix();
                var tempM = new Matrix3D();
                for (var kt = 0; kt < tempM.m.length; kt++) {
                    tempM.m[kt] = MarmosetLightVo.marmosetLightVo.depthFBO.depthViewMatrix3D[kt];
                }
                tempM.append(this.getChangeMn());
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", tempM.m);
                Scene_data.context3D.setRenderTexture(this.shader, "tAlbedo", mesh.tAlbedo.texture, 0);
                Scene_data.context3D.setVa(0, 3, mesh.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, mesh.objData.uvBuffer);
                Scene_data.context3D.drawCall(mesh.objData.indexBuffer, mesh.objData.treNum);
                this.skipNum++;
            }
        };
        MarmosetLightVo.prototype.getChangeMn = function () {
            var addM = new Matrix3D(); // 阴影映射矩阵;
            addM.appendScale(2, 2, 1);
            addM.appendTranslation(+1, +1, 0);
            return addM;
        };
        MarmosetLightVo.prototype.getChangeM = function () {
            var addM = new Matrix3D(); // 阴影扫描矩阵;
            addM.appendTranslation(-1, -1, 0);
            addM.appendScale(0.5, 0.5, 1);
            return addM;
        };
        MarmosetLightVo.prototype.makeShadowMatrix = function () {
            if (window["uSkyMatrix"] && window["depthViewMatrix3D"]) {
                var shadowM = new Matrix3D();
                var skyM = new Matrix3D();
                for (var kt = 0; kt < shadowM.m.length; kt++) {
                    shadowM.m[kt] = window["depthViewMatrix3D"][kt];
                    skyM.m[kt] = window["uSkyMatrix"][kt];
                }
                shadowM.prepend(skyM);
                window["shadowMatrix"] = shadowM.m; //源阴影镜头矩阵
            }
        };
        return MarmosetLightVo;
    }());
    mars3D.MarmosetLightVo = MarmosetLightVo;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=MarmosetLightVo.js.map