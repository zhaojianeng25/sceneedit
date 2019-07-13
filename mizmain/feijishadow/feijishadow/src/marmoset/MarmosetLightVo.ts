module mars3D {
    import Scene_data = Pan3d.Scene_data
    import Shader3D = Pan3d.Shader3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import GlReset = Pan3d.GlReset
    import Matrix3D = Pan3d.Matrix3D
 

    export class MarFBO extends Pan3d.FBO {
        public constructor(w: number = 128, h: number = 128) {
            super(w, h)
        }
        public depthViewMatrix3D: any
      //  public depthTexture: WebGLTexture
    }


    export class MarmosetLightVoShader extends Shader3D {
        static MarmosetLightVoShader: string = "MarmosetLightVoShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "vPosition");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 vPosition;" +
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

                "gl_Position.x = max(gl_Position.x,0.5);" +
                  
                    
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision highp  float;\n" +
                "uniform sampler2D tAlbedo;\n" +

                "varying vec2 d;\n" +
                "varying vec2 jG; \n"+
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
                "float tempz =jG.x/jG.y;"+
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

                "}"
            return $str

        }

    }
    export class MarmosetLightVo   {
        public depthFBO: MarFBO;

 
        public constructor() {

            this.depthFBO = new MarFBO(2048, 2048);
            this.depthFBO.color = new Vector3D(1.0, 1, 1, 1);


            ProgrmaManager.getInstance().registe(MarmosetLightVoShader.MarmosetLightVoShader, new MarmosetLightVoShader);
            this.shader = ProgrmaManager.getInstance().getProgram(MarmosetLightVoShader.MarmosetLightVoShader);

      
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;


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
        private shader: Shader3D;
        private updateDepthTexture(fbo: MarFBO): void {

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext

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

         

           
        }

        public update(value: Array<Mars3Dmesh>): void {

            if (value && value.length) {
                var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
                GlReset.saveBasePrarame(gl);
                this.updateDepthTexture(this.depthFBO);
 
                for (var i: number = 0; i < value.length; i++) {
                    this.drawTempMesh(value[i]);
                }

                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.bindTexture(gl.TEXTURE_2D, null);
            //   gl.bindRenderbuffer(gl.RENDERBUFFER, null);
                GlReset.resetBasePrarame(gl);
            }
        }

        private skipNum: number = 1
        private fract(value: number): number {
            return value - Math.floor(value)
        }
        private make255(value: number): number {
 
            return Math.floor(value * 255)/255
        }
        private packdepth(depth: number): void {
            console.log("base", depth)
            var bitShift: Vector3D = new Vector3D(1.0, 255.0, 255.0 * 255.0, 255.0 * 255.0 * 255.0);  
            var bitMask: Vector3D = new Vector3D(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0) 

            var rgbaDepth: Vector3D = bitShift.clone()
            rgbaDepth.x *= depth
            rgbaDepth.y *= depth
            rgbaDepth.z *= depth
            rgbaDepth.w *= depth
            console.log(rgbaDepth)

            rgbaDepth.x = this.fract(rgbaDepth.x)
            rgbaDepth.y = this.fract(rgbaDepth.y)
            rgbaDepth.z = this.fract(rgbaDepth.z)
            rgbaDepth.w = this.fract(rgbaDepth.w)
            console.log(rgbaDepth)
            rgbaDepth.x -= rgbaDepth.y * bitMask.x
            rgbaDepth.y -= rgbaDepth.z * bitMask.y
            rgbaDepth.z -= rgbaDepth.w * bitMask.z
            rgbaDepth.w -= rgbaDepth.w * bitMask.w
            console.log(rgbaDepth)

            rgbaDepth.x = this.make255(rgbaDepth.x)
            rgbaDepth.y = this.make255(rgbaDepth.y)
            rgbaDepth.z = this.make255(rgbaDepth.z)
            rgbaDepth.w = this.make255(rgbaDepth.w)
            console.log(rgbaDepth)

            rgbaDepth.w=0.1

            var outNum: number = this.upackDepth(rgbaDepth)
            console.log("outNum=>", outNum)
            console.log("basereb=>", Math.floor(depth * 255) / 255)
            console.log("----------------", depth - outNum)

                //"vec4 rgbaDepth = fract(depth * bitShift);  \n" +
                //"rgbaDepth -= rgbaDepth.yzww * bitMask;  \n" +
                //"return rgbaDepth;\n" +
      
        }
        private upackDepth(value: Vector3D): number {
            var bitShift: Vector3D = new Vector3D(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0)); 

            var outNum: number = bitShift.x * value.x + bitShift.y * value.y + bitShift.z * value.z + bitShift.w * value.w
         //   console.log(outNum)

            //" vec4 bitShift = vec4(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0));" +
            //    "return dot(rgbaDepth, bitShift);" 
            return outNum
        }
  
        private drawTempMesh(mesh: Mars3Dmesh): void {
            if (mesh.tAlbedo && mesh.tNormal && mesh.tReflectivity) {
 
                var gl = Scene_data.context3D.renderContext;
             
                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setDepthTest(true);
 
      
                Scene_data.context3D.setProgram(this.shader.program);
                this.makeShadowMatrix();
                this.changeShadewMatrixToViewMatrix()
                if (MarmosetLightVo.shadowCamview) {
                    Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", MarmosetLightVo.shadowCamview.m);  //深度矩阵
                }
   
                Scene_data.context3D.setRenderTexture(this.shader, "tAlbedo", mesh.tAlbedo.texture, 0);

                Scene_data.context3D.setVa(0, 3, mesh.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, mesh.objData.uvBuffer);
                Scene_data.context3D.drawCall(mesh.objData.indexBuffer, mesh.objData.treNum);
                this.skipNum++
            }
 
        }
        private changeShadewMatrixToViewMatrix(): void {
            var tempuShadowMatrices: Array<number> = window["uShadowMatrices"];
            var outArr: Float32Array = new Float32Array(tempuShadowMatrices.length)
            for (var i: number = 0; i < tempuShadowMatrices.length / 16; i++) {
                var tempM: Matrix3D = new Matrix3D();
                var skyM: Matrix3D = new Matrix3D()
                for (var j: number = 0; j < 16; j++) {
                    tempM.m[j] = tempuShadowMatrices[i * 16 + j]
                    skyM.m[j] = window["uSkyMatrix"][j];
                }
                tempM.prepend(skyM)
                tempM.appendTranslation(-0.5, -0.5, 0)
                tempM.appendScale(2, 2, 1);
                for (var j: number = 0; j < 16; j++) {
                    outArr[i * 16 + j] = tempM.m[j]
                }
            }
        }
        private getChangeMn(): Matrix3D {
            var addM: Matrix3D = new Matrix3D();  // 阴影映射矩阵;
            addM.appendScale(2, 2, 1);
            addM.appendTranslation(+1, +1, 0)
            return addM
        }
        private getChangeM(): Matrix3D {
            var addM: Matrix3D = new Matrix3D(); // 阴影扫描矩阵;
            addM.appendTranslation(-1, -1, 0)
            addM.appendScale(0.5, 0.5, 1);
            return addM
        }
 
        public static shadowCamview: Matrix3D; //基础镜头
        public static testShadowView: Matrix3D
        private makeShadowMatrix(): void {  //阴影矩阵

            if (window["uSkyMatrix"] && window["depthViewMatrix3D"]) {
                var shadowM: Matrix3D = new Matrix3D()
                var skyM: Matrix3D = new Matrix3D()
                for (var kt: number = 0; kt < shadowM.m.length; kt++) {
                    shadowM.m[kt] = window["depthViewMatrix3D"][kt];
                    skyM.m[kt] = window["uSkyMatrix"][kt];
                }
                MarmosetLightVo.testShadowView = shadowM.clone()
                shadowM.prepend(skyM)
                shadowM.appendTranslation(-0.5, -0.5, 0)
                shadowM.appendScale(2, 2, 1);
                MarmosetLightVo.shadowCamview = shadowM.clone()
 
            }

        }
     
        public static marmosetLightVo: MarmosetLightVo

        
    }
}