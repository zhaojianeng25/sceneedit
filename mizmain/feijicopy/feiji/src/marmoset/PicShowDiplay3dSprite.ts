﻿
module mars3D {
    import Vector2D = Pan3d.Vector2D
    import Object3D = Pan3d.Object3D
    import MouseType = Pan3d.MouseType
    import LineDisplayShader = Pan3d.LineDisplayShader
    import Shader3D = Pan3d.Shader3D
    import Matrix3D = Pan3d.Matrix3D
    import TextureManager = Pan3d.TextureManager
    import ProgrmaManager = Pan3d.ProgrmaManager
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite
    import TextureRes = Pan3d.TextureRes
    import Scene_data = Pan3d.Scene_data




    export class PicShowDiplay3dShader extends Shader3D {
        static PicShowDiplay3dShader: string = "PicShowDiplay3dShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "vPosition");
            $context.bindAttribLocation(this.program, 1, "u2Texture");

            $context.bindAttribLocation(this.program, 2, "vTangent");
            $context.bindAttribLocation(this.program, 3, "vBitangent");
            $context.bindAttribLocation(this.program, 4, "vNormal");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 vPosition;" +
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

                "varying highp vec3 vPos;" +  //模型顶点



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

                "   vPos= vPosition;" + //模型顶点

                "   vec4 vt0= vec4(vPosition, 1.0);" +
                // "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +


                "   gl_Position = vt0;" +

                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "#define UV_OFFSET\n" +
                "#define SHADOW_NATIVE_DEPTH\n" +
                "#define NOBLEND\n" +
                "#define SHADOW_COUNT 3\n" +
                "#define LIGHT_COUNT 3\n" +
                "#define SHADOW_KERNEL (4.0/1536.0)\n" +

                "#extension GL_OES_standard_derivatives : enable\n" +
     
                "precision highp float;\n" +
                "uniform sampler2D tAlbedo;\n" +
                "uniform sampler2D tNormal;\n" +
                "uniform sampler2D tReflectivity;\n" +
                "uniform sampler2D tSkySpecular;\n" +

                "uniform sampler2D tDepth0;\n" +
                "uniform sampler2D tDepth1;\n" +
                "uniform sampler2D tDepth2;\n" +

                "uniform sampler2D tDepthTexture;\n" +

                "varying vec2 d;\n" +
                "varying  vec3 dA; " +
                "varying  vec3 dB; " +
                "varying  vec3 dC; " +

                "varying highp vec3 dv;" +
                "varying highp vec3 vPos;" +  //模型顶点

                "uniform vec3 uCameraPosition;" +
                "uniform vec4 uDiffuseCoefficients[9];" +
                "uniform highp vec4 uShadowTexelPadProjections[SHADOW_COUNT];" +
                "uniform highp mat4 uShadowMatrices[SHADOW_COUNT];" +

                "uniform highp mat4 depthViewMatrix3D;" +  //阴影深度矩阵

                "uniform float uHorizonOcclude;" +
                "uniform highp vec2 uShadowKernelRotation;" +

                "\n#define SHADOW_COMPARE(a,b) ((a) < (b) ? 1.0 : 0.0)\n"+

                "struct ev{" +
                   "float eL[LIGHT_COUNT];" +
                "};" +

                "highp vec4 h(highp mat4 i,highp vec3 p){" +
                      "return i[0] * p.x + (i[1] * p.y + (i[2] * p.z + i[3]));" +
                " } " +

                "highp float hJ(highp vec3 G) {\n" +
                      "return G.x;\n" +
                "}\n" +

                "float hK(sampler2D hL, highp vec2 hA, highp float H) {" +
                    "highp float G = hJ(texture2D(hL, hA.xy).xyz);" +
                    "return SHADOW_COMPARE(H,G);" +
                "}" +

                "highp float hN(sampler2D hL, highp vec3 hA, float hO) {\n" +
                    "highp vec2 l = uShadowKernelRotation * hO;\n" +
                    "float s;\n" +
                    "s = hK(hL, hA.xy + l, hA.z);\n" +
                    "s += hK(hL, hA.xy - l, hA.z);\n" +
                    "s += hK(hL, hA.xy + vec2(-l.y, l.x), hA.z);\n" +
                    "s += hK(hL, hA.xy + vec2(l.y, -l.x), hA.z);\n" +
                    "s *= 0.25;\n" +
                    "return s * s;\n" +
                "}\n" +

                "void eB(out ev ss, float hO){" +
                    "highp vec3 hP[SHADOW_COUNT];" +
                    "vec3 hu = gl_FrontFacing ? dC : -dC;" +
                    "for (int k = 0; k < SHADOW_COUNT; ++k) {" +
                        "vec4 hQ = uShadowTexelPadProjections[k];" +
                        "float hR = hQ.x * dv.x + (hQ.y * dv.y + (hQ.z * dv.z + hQ.w));" +
                        "hR*=.0005+0.5 * hO;" +
                        "highp vec4 hS = h(uShadowMatrices[k], dv + hR * hu);" +
                        "hP[k] = hS.xyz / hS.w;" +
                    "}" +
                    "float m;\n" +
                     "\n#if SHADOW_COUNT > 0 \n" +
                          "m = hN(tDepth0, hP[0], hO);" +
                          "ss.eL[0] = m;" +
                    "\n#endif\n" +
                     "\n#if SHADOW_COUNT > 1\n" +
                        "m = hN(tDepth1, hP[1], hO);" +
                        "ss.eL[1] =m;" +
                    "\n#endif\n" +
                    "\n#if SHADOW_COUNT > 2\n" +
                        "m = hN(tDepth2, hP[2], hO);\n" +
                        "ss.eL[2] =m;\n" +
                        "\n#endif\n" +
                    "}" +

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

            
                "vec4 mathdepthuv(highp mat4 i,highp vec3 p){" +
                   "vec4 outVec4 =i*vec4(p,1.0) ;" +
                   "outVec4.xyz =outVec4.xyz/outVec4.w ;" +
                   "vec4 outColorVec4 =texture2D(tDepthTexture,outVec4.xy); " +
                   "return  vec4(outColorVec4.xyz,1.0);" +
                " } " +

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

                "vec4 m=texture2D(tAlbedo,d);" +
                "vec3 dF=dG(m.xyz);" +
                "float e = m.w;" +
                "vec3 dI=dJ(texture2D(tNormal, d).xyz);" +
                "vec3 dO=normalize(uCameraPosition-dv);" +
                "m=texture2D(tReflectivity,d);" +

                "vec3 dP = dG(m.xyz);" +
                "float dQ=m.w;"+
                "float dR = dQ;" +

                "vec3 ei=ej(dI);" +

                "vec3 ek=reflect(-dO,dI);" +

                "vec3 el=em(ek,dQ);" +

                "el*=en(ek,dC);" +


                "highp float eo = 10.0 / log2(dQ * 0.968 + 0.03);" +
                "eo *= eo;" +
                "float eu = eo * (1.0 / (8.0 * 3.1415926)) + (4.0 / (8.0 * 3.1415926));" +
                "eu = min(eu, 1.0e3);" +

                "ev eA; \n" +

 
                "vec4 depthvinfo=mathdepthuv(depthViewMatrix3D,vPos);" +
                "vec4 lightvo=depthViewMatrix3D *vec4(vPos, 1.0);" +
                "vec4 tempvec4 =pack(lightvo.z/lightvo.w) ;" +

                "float tempz =unpack(depthvinfo) ;" +


              
                "gl_FragColor = vec4(depthvinfo.xyz,1.0); " +
                "gl_FragColor =vec4(1.0,1.0,1.0,1.0); " +
                "if (tempz<lightvo.z/lightvo.w-0.001) { " +
                      "gl_FragColor =vec4(0.5,0.5,0.5,1.0); " +
                "}  " +
        
                

                "}"
            return $str

        }

    }


    export class PicShowDiplay3dSprite extends BaseDiplay3dSprite {
        private tAlbedo: TextureRes;
        constructor() {
            super();
            this.initData()


        }

        protected initData(): void {
            ProgrmaManager.getInstance().registe(PicShowDiplay3dShader.PicShowDiplay3dShader, new PicShowDiplay3dShader);
            this.shader = ProgrmaManager.getInstance().getProgram(PicShowDiplay3dShader.PicShowDiplay3dShader);
            this.program = this.shader.program;

            this.objData = new ObjData;
            this.objData.vertices = new Array();
            this.objData.vertices.push(-100, 0, -100);
            this.objData.vertices.push(100, 0, -100);
            this.objData.vertices.push(100, 0, 100);
            this.objData.vertices.push(-100, 0, 100);

            this.objData.uvs = new Array()
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(0, 1);

            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);

            this.loadTexture();


            this.upToGpu()


        }
        private makeTbnBuff(mesh: Mars3Dmesh): void {
            if (!mesh.objData.tangents || mesh.objData.tangents.length <= 0) {
                TBNUtils.processTBN(mesh.objData)
                mesh.objData.tangentBuffer = Scene_data.context3D.uploadBuff3D(mesh.objData.tangents);
                mesh.objData.bitangentBuffer = Scene_data.context3D.uploadBuff3D(mesh.objData.bitangents);
            }
        }
     

        private drawTempMesh(mesh: Mars3Dmesh): void {
            if (mesh.tAlbedo && mesh.tNormal && mesh.tReflectivity) {
              

                this.makeTbnBuff(mesh)
                var gl = Scene_data.context3D.renderContext;
                Scene_data.context3D.setProgram(this.program);

                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                var viewM = Scene_data.viewMatrx3D.clone()
                viewM.prepend(Scene_data.cam3D.cameraMatrix)
                viewM.prepend(this.posMatrix)

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

                if (window["uShadowTexelPadProjections"]) {
                    Scene_data.context3D.setVc4fv(this.shader, "uShadowTexelPadProjections", window["uShadowTexelPadProjections"]);
                }
                if (window["uShadowMatrices"]) {
                    Scene_data.context3D.setVc4fv(this.shader, "uShadowMatrices", window["uShadowMatrices"]);
 
                }
                if (window["uShadowKernelRotation"]) {
                    Scene_data.context3D.setVc2f(this.shader, "uShadowKernelRotation", 0.7853, 0.7853);
                }
                
            

                Scene_data.context3D.setRenderTexture(this.shader, "tAlbedo", mesh.tAlbedo.texture, 0);
                Scene_data.context3D.setRenderTexture(this.shader, "tNormal", mesh.tNormal.texture, 1);
                Scene_data.context3D.setRenderTexture(this.shader, "tReflectivity", mesh.tReflectivity.texture, 2);
                Scene_data.context3D.setRenderTexture(this.shader, "tSkySpecular", MarmosetModel.tSkySpecularTexture, 3);

                if (MarmosetLightVo.marmosetLightVo && MarmosetLightVo.marmosetLightVo.depthFBO && MarmosetLightVo.marmosetLightVo.depthFBO.texture) {

                  //  console.log(MarmosetLightVo.marmosetLightVo.depthFBO.depthBuffer)
                 //   console.log(MarmosetLightVo.marmosetLightVo.depthFBO.texture)

                    Scene_data.context3D.setRenderTexture(this.shader, "tDepthTexture", MarmosetLightVo.marmosetLightVo.depthFBO.texture, 4); //深度贴图
                    if (MarmosetLightVo.marmosetLightVo.depthFBO.depthViewMatrix3D) {

                        var tempM: Matrix3D = new Matrix3D()
                        for (var kt: number = 0; kt < tempM.m.length; kt++) {
                            tempM.m[kt] = MarmosetLightVo.marmosetLightVo.depthFBO.depthViewMatrix3D[kt]
                        }
                        var addM: Matrix3D = new Matrix3D(); //设置映射纹理坐标;
                        addM.appendTranslation(-1, -1, 0)
                        addM.appendScale(0.5, 0.5, 1);
                        tempM.append(addM);
                        Scene_data.context3D.setVcMatrix4fv(this.shader, "depthViewMatrix3D", tempM.m);  //深度矩阵
 
                    }
                  
        
                }

               

                gl.disable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT);

                Scene_data.context3D.setVa(0, 3, mesh.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, mesh.objData.uvBuffer);
                Scene_data.context3D.setVa(2, 3, mesh.objData.tangentBuffer);
                Scene_data.context3D.setVa(3, 3, mesh.objData.bitangentBuffer);
                Scene_data.context3D.setVa(4, 3, mesh.objData.normalsBuffer);

                Scene_data.context3D.drawCall(mesh.objData.indexBuffer, mesh.objData.treNum);
            }
 

        }
        private isFinish: boolean
        private makeMeshItemTexture(): void {
            var albedArr: Array<string> = []
            albedArr.push("mat1_c")
            albedArr.push("mat2_c")
            albedArr.push("mat0_c")

            var nrmArr: Array<string> = []
            nrmArr.push("mat1_n")
            nrmArr.push("mat2_n")
            nrmArr.push("mat0_n")

            var reflectArr: Array<string> = []
            reflectArr.push("mat1_r")
            reflectArr.push("mat2_r")
            reflectArr.push("mat0_r")

            var glossArr: Array<string> = []
            glossArr.push("mat1_g")
            glossArr.push("mat2_g")
            glossArr.push("mat0_g")
 
            for (var i: number = 0; i < MarmosetModel.meshItem.length; i++) {
                var vo: Mars3Dmesh = MarmosetModel.meshItem[i]
                vo.setAlbedoUrl(albedArr[i])
                vo.setNormalUrl(nrmArr[i])
                 vo.setReflectRgbAlphaUrl(reflectArr[i], glossArr[i])

                //vo.setReflectRgbAlphaUrl("mat1_r","mat1_g")
            }
            this.isFinish = true
        }
        public update(): void {
            if (MarmosetModel.meshItem && MarmosetModel.meshItem.length) {
                if (!this.isFinish) {
                    this.makeMeshItemTexture()
                }
       
                for (var i: number = 0; i < MarmosetModel.meshItem.length; i++) {
                    this.drawTempMesh(MarmosetModel.meshItem[i])
                }
            } else {
                super.update()
            }

        }



    }

}