module mars3D {
    import Scene_data = Pan3d.Scene_data
    import Shader3D = Pan3d.Shader3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import GlReset = Pan3d.GlReset
 

    export class MarFBO extends Pan3d.FBO {
        public constructor(w: number = 128, h: number = 128) {
            super(w, h)
        }
        public depthViewMatrix3D: any
        public depthTexture: WebGLTexture
    }


    export class MarmosetLightVoShader extends Shader3D {
        static MarmosetLightVoShader: string = "MarmosetLightVoShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "vPosition");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 vPosition;" +
                "uniform mat4 viewMatrix3D;" +
                "void main(void)" +
                "{" +
                    "vec4 vt0= vec4(vPosition, 1.0);" +
                    "vt0 = viewMatrix3D * vt0;" +
  
                    "gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "void main(void) " +
                "{ " +
                  "gl_FragColor =vec4(0.4,0.0,0.0,1.0); " +
                "}"
            return $str

        }

    }
    export class MarmosetLightVo   {
        public depthFBO: MarFBO;

 
        public constructor() {
            this.depthFBO = new MarFBO(1024, 1024);
            this.depthFBO.color = new Vector3D(1, 1, 1, 1);


            ProgrmaManager.getInstance().registe(MarmosetLightVoShader.MarmosetLightVoShader, new MarmosetLightVoShader);
            this.shader = ProgrmaManager.getInstance().getProgram(MarmosetLightVoShader.MarmosetLightVoShader);

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
            var depthTexture: WebGLTexture = gl.createTexture();  //创建深度贴图
            gl.bindTexture(gl.TEXTURE_2D, depthTexture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, 1024, 1024, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            this.depthFBO.depthTexture = depthTexture;

           // alert(gl.getExtension("WEBGL_depth_texture"))
        }
        private shader: Shader3D;
        private updateDepthTexture(fbo: MarFBO): void {

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext

             gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
           gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);

         //  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);
         //  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthFBO.depthTexture ,0)

            gl.viewport(0, 0, fbo.width, fbo.height);
            gl.clearColor(fbo.color.x, fbo.color.y, fbo.color.z, fbo.color.w);

            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.frontFace(gl.CW);

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

           
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
                gl.bindRenderbuffer(gl.RENDERBUFFER, null);
                GlReset.resetBasePrarame(gl);
            }
        }
      //  private baseViewMatrix: any
        private drawTempMesh(mesh: Mars3Dmesh): void {
            if (mesh.tAlbedo && mesh.tNormal && mesh.tReflectivity) {

                var gl = Scene_data.context3D.renderContext;
                Scene_data.context3D.setProgram(this.shader.program);
           
                if (!this.depthFBO.depthViewMatrix3D) {
                    this.depthFBO.depthViewMatrix3D = window["mview"];
                }
                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", this.depthFBO.depthViewMatrix3D);

                gl.disable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT);

                Scene_data.context3D.setVa(0, 3, mesh.objData.vertexBuffer);
                Scene_data.context3D.drawCall(mesh.objData.indexBuffer, mesh.objData.treNum);
            }


        }
        public static marmosetLightVo: MarmosetLightVo

        
    }
}