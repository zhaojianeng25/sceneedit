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
    var Shader3D = Pan3d.Shader3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite;
    var Scene_data = Pan3d.Scene_data;
    var PicShowDiplay3dShader = /** @class */ (function (_super) {
        __extends(PicShowDiplay3dShader, _super);
        function PicShowDiplay3dShader() {
            return _super.call(this) || this;
        }
        PicShowDiplay3dShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "vPosition");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
            $context.bindAttribLocation(this.program, 2, "vTangent");
            $context.bindAttribLocation(this.program, 3, "vBitangent");
            $context.bindAttribLocation(this.program, 4, "vNormal");
        };
        PicShowDiplay3dShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 vPosition;" +
                "attribute vec2 u2Texture;" +
                "attribute vec3 vTangent;" +
                "attribute vec3 vBitangent;" +
                "attribute vec3 vNormal;" +
                "uniform mat4 uSkyMatrix;" +
                "uniform mat4 viewMatrix3D;" +
                //  "uniform mat4 posMatrix3D;" +
                "varying vec2 d;\n" +
                "varying  vec3 dA; " +
                "varying  vec3 dB; " +
                "varying  vec3 dC; " +
                "varying highp vec3 dv;" +
                " vec3 iW(vec2 v) {;" +
                "  v.x=v.x/65535.0;" +
                "  v.y=v.y/65535.0;" +
                "  bool iX = (v.y > (32767.1 / 65535.0));" +
                "  v.y = iX ? (v.y - (32768.0 / 65535.0)) : v.y;" +
                "  vec3 r;" +
                "  r.x = (2.0 * 65535.0 / 32767.0) * v.x - 1.0;" +
                "  r.y = (2.0 * 65535.0 / 32767.0) * v.y - 1.0;" +
                "  r.z = sqrt(max(min(1.0 - (r.x*r.x+r.y*r.y), 1.0), 0.0));" +
                "  r.z = iX ? -r.z : r.z;" +
                "  return r;" +
                " }" +
                "void main(void)" +
                "{" +
                "   d = vec2(u2Texture.x, u2Texture.y);" +
                "   dA=(uSkyMatrix*vec4(vTangent, 1.0)).xyz;" +
                "   dB=(uSkyMatrix*vec4(vBitangent, 1.0)).xyz;" +
                "   dC=(uSkyMatrix*vec4(vNormal, 1.0)).xyz;" +
                "dv=(uSkyMatrix*vec4(vPosition, 1.0)).xyz;" +
                "   vec4 vt0= vec4(vPosition, 1.0);" +
                // "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        PicShowDiplay3dShader.prototype.getFragmentShaderString = function () {
            var $str = "#define SAMPLE_COUNT 21.0;\n" +
                "#define LIGHT_COUNT 3\n" +
                "#define SHADOW_KERNEL (4.0/1536.0)\n" +
                "precision mediump float;\n" +
                "uniform sampler2D tAlbedo;\n" +
                "uniform sampler2D tNormal;\n" +
                "uniform sampler2D tReflectivity;\n" +
                "uniform sampler2D tSkySpecular;\n" +
                "varying vec2 d;\n" +
                "varying  vec3 dA; " +
                "varying  vec3 dB; " +
                "varying  vec3 dC; " +
                "varying highp vec3 dv;" +
                "uniform vec3 uCameraPosition;" +
                "uniform vec4 uDiffuseCoefficients[9];" +
                "uniform float uHorizonOcclude;" +
                "struct ev{" +
                "float eL[LIGHT_COUNT];" +
                "};" +
                "vec3 dG(vec3 c){return c*c;}" +
                "vec3 dJ(vec3 n) {" +
                "vec3 hn = dA;" +
                "vec3 ho = dB;" +
                "vec3 hu = dC;" +
                "n = 2.0 * n - vec3(1.0);" +
                "return normalize(hn * n.x + ho * n.y + hu * n.z);" +
                "}" +
                "vec3 ej(vec3 fJ) {" +
                "\n#define c(n) uDiffuseCoefficients[n].xyz\n" +
                "vec3 G=(c(0)+fJ.y*((c(1)+c(4)*fJ.x)+c(5)*fJ.z))+fJ.x*(c(3)+c(7)*fJ.z)+c(2)*fJ.z;" +
                "\n#undef c\n" +
                " return G.xyz;" +
                " }" +
                " vec3 em(vec3 fJ, float dQ) {" +
                " fJ /= dot(vec3(1.0), abs(fJ));" +
                "vec2 fU = abs(fJ.zx) - vec2(1.0, 1.0);" +
                "vec2 fV = vec2(fJ.x < 0.0 ? fU.x : -fU.x, fJ.z < 0.0 ? fU.y : -fU.y);" +
                "vec2 fW = (fJ.y < 0.0) ? fV : fJ.xz;" +
                "fW = vec2(0.5 * (254.0 / 256.0), 0.125 * 0.5 * (254.0 / 256.0)) * fW + vec2(0.5, 0.125 * 0.5);" +
                "float fX = fract(7.0 * dQ);" +
                "fW.y += 0.125 * (7.0 * dQ - fX); vec2 fY = fW + vec2(0.0, 0.125);" +
                "vec4 fZ = mix(texture2D(tSkySpecular, fW), texture2D(tSkySpecular, fY), fX);" +
                "vec3 r = fZ.xyz * (7.0 * fZ.w);" +
                "return r * r; " +
                " }" +
                "float en(vec3 fJ,vec3 hc){" +
                "float hd = dot(fJ, hc);" +
                "hd =  1.0 + uHorizonOcclude * hd;" +
                "hd = clamp(hd, 0.0, 1.0 );" +
                "return hd * hd;" +
                "}" +
                "void main(void) " +
                "{ " +
                "vec4 m=texture2D(tAlbedo,d);" +
                "vec3 dF=dG(m.xyz);" +
                "float e = m.w;" +
                "vec3 dI=dJ(texture2D(tNormal, d).xyz);" +
                "vec3 dO=normalize(uCameraPosition-dv);" +
                "m=texture2D(tReflectivity,d);" +
                "vec3 dP = dG(m.xyz);" +
                "float dQ=m.w;" +
                "float dR = dQ;" +
                "vec3 ei=ej(dI);" +
                "vec3 ek=reflect(-dO,dI);" +
                "vec3 el=em(ek,dQ);" +
                "el*=en(ek,dC);" +
                "highp float eo = 10.0 / log2(dQ * 0.968 + 0.03);" +
                "eo *= eo;" +
                "float eu = eo * (1.0 / (8.0 * 3.1415926)) + (4.0 / (8.0 * 3.1415926));" +
                "eu = min(eu, 1.0e3);" +
                "ev eA;" +
                "gl_FragColor =vec4(eu,eu,eu,1.0); " +
                "}";
            return $str;
        };
        PicShowDiplay3dShader.PicShowDiplay3dShader = "PicShowDiplay3dShader";
        return PicShowDiplay3dShader;
    }(Shader3D));
    mars3D.PicShowDiplay3dShader = PicShowDiplay3dShader;
    var PicShowDiplay3dSprite = /** @class */ (function (_super) {
        __extends(PicShowDiplay3dSprite, _super);
        function PicShowDiplay3dSprite() {
            var _this = _super.call(this) || this;
            _this.initData();
            return _this;
        }
        PicShowDiplay3dSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(PicShowDiplay3dShader.PicShowDiplay3dShader, new PicShowDiplay3dShader);
            this.shader = ProgrmaManager.getInstance().getProgram(PicShowDiplay3dShader.PicShowDiplay3dShader);
            this.program = this.shader.program;
            this.objData = new ObjData;
            this.objData.vertices = new Array();
            this.objData.vertices.push(-100, 0, -100);
            this.objData.vertices.push(100, 0, -100);
            this.objData.vertices.push(100, 0, 100);
            this.objData.vertices.push(-100, 0, 100);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);
            this.loadTexture();
            this.upToGpu();
        };
        PicShowDiplay3dSprite.prototype.makeTbnBuff = function (mesh) {
            if (!mesh.objData.tangents || mesh.objData.tangents.length <= 0) {
                TBNUtils.processTBN(mesh.objData);
                mesh.objData.tangentBuffer = Scene_data.context3D.uploadBuff3D(mesh.objData.tangents);
                mesh.objData.bitangentBuffer = Scene_data.context3D.uploadBuff3D(mesh.objData.bitangents);
            }
        };
        PicShowDiplay3dSprite.prototype.drawTempMesh = function (mesh) {
            if (mesh.tAlbedo && mesh.tNormal && mesh.tReflectivity) {
                this.makeTbnBuff(mesh);
                var gl = Scene_data.context3D.renderContext;
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                var viewM = Scene_data.viewMatrx3D.clone();
                viewM.prepend(Scene_data.cam3D.cameraMatrix);
                viewM.prepend(this.posMatrix);
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", viewM.m);
                if (window["mview"]) {
                    Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", window["mview"]);
                }
                if (window["uSkyMatrix"]) {
                    Scene_data.context3D.setVcMatrix4fv(this.shader, "uSkyMatrix", window["uSkyMatrix"]);
                }
                if (window["uCameraPosition"]) {
                    Scene_data.context3D.setVc3fv(this.shader, "uCameraPosition", [window["uCameraPosition"][0], window["uCameraPosition"][1], window["uCameraPosition"][2]]);
                }
                if (window["uDiffuseCoefficients"]) {
                    Scene_data.context3D.setVc4fv(this.shader, "uDiffuseCoefficients", window["uDiffuseCoefficients"]);
                }
                if (window["tSkySpecular"]) {
                    Scene_data.context3D.setRenderTexture(this.shader, "tSkySpecular", window["tSkySpecular"], 3);
                }
                if (window["horizonOcclude"]) {
                    Scene_data.context3D.setVc1fv(this.shader, "uHorizonOcclude", [window["horizonOcclude"]]);
                }
                Scene_data.context3D.setRenderTexture(this.shader, "tAlbedo", mesh.tAlbedo.texture, 0);
                Scene_data.context3D.setRenderTexture(this.shader, "tNormal", mesh.tNormal.texture, 1);
                Scene_data.context3D.setRenderTexture(this.shader, "tReflectivity", mesh.tReflectivity.texture, 2);
                Scene_data.context3D.setRenderTexture(this.shader, "tSkySpecular", mars3D.MarmosetModel.tSkySpecularTexture, 3);
                gl.disable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT);
                Scene_data.context3D.setVa(0, 3, mesh.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, mesh.objData.uvBuffer);
                Scene_data.context3D.setVa(2, 3, mesh.objData.tangentBuffer);
                Scene_data.context3D.setVa(3, 3, mesh.objData.bitangentBuffer);
                Scene_data.context3D.setVa(4, 3, mesh.objData.normalsBuffer);
                Scene_data.context3D.drawCall(mesh.objData.indexBuffer, mesh.objData.treNum);
            }
        };
        PicShowDiplay3dSprite.prototype.makeMeshItemTexture = function () {
            var albedArr = [];
            albedArr.push("mat1_c");
            albedArr.push("mat2_c");
            albedArr.push("mat0_c");
            var nrmArr = [];
            nrmArr.push("mat1_n");
            nrmArr.push("mat2_n");
            nrmArr.push("mat0_n");
            var reflectArr = [];
            reflectArr.push("mat1_r");
            reflectArr.push("mat2_r");
            reflectArr.push("mat0_r");
            var glossArr = [];
            glossArr.push("mat1_g");
            glossArr.push("mat2_g");
            glossArr.push("mat0_g");
            for (var i = 0; i < mars3D.MarmosetModel.meshItem.length; i++) {
                var vo = mars3D.MarmosetModel.meshItem[i];
                vo.setAlbedoUrl(albedArr[i]);
                vo.setNormalUrl(nrmArr[i]);
                vo.setReflectRgbAlphaUrl(reflectArr[i], glossArr[i]);
                //vo.setReflectRgbAlphaUrl("mat1_r","mat1_g")
            }
            this.isFinish = true;
        };
        PicShowDiplay3dSprite.prototype.update = function () {
            if (mars3D.MarmosetModel.meshItem && mars3D.MarmosetModel.meshItem.length) {
                if (!this.isFinish) {
                    this.makeMeshItemTexture();
                }
                for (var i = 0; i < mars3D.MarmosetModel.meshItem.length; i++) {
                    if (i == 2) {
                    }
                    this.drawTempMesh(mars3D.MarmosetModel.meshItem[i]);
                }
            }
            else {
                _super.prototype.update.call(this);
            }
        };
        return PicShowDiplay3dSprite;
    }(BaseDiplay3dSprite));
    mars3D.PicShowDiplay3dSprite = PicShowDiplay3dSprite;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=PicShowDiplay3dSprite.js.map