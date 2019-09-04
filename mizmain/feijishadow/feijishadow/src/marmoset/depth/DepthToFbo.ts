module depth {
    import Scene_data = Pan3d.Scene_data
    import Shader3D = Pan3d.Shader3D
    import Display3DSprite = Pan3d.Display3DSprite
    import ProgrmaManager = Pan3d.ProgrmaManager
    import GlReset = Pan3d.GlReset
    import Display3D = Pan3d.Display3D
    import Matrix3D = Pan3d.Matrix3D
    import Laya3dSprite = LayaPan3D.Laya3dSprite;
    import RectSprite = RectSp.RectSprite

    export class MarFBO extends Pan3d.FBO {
        public constructor(w: number = 128, h: number = 128) {
            super(w, h)
        }
        public depthViewMatrix3D: any
        public depthTexture: WebGLTexture
    }


    
    export class DepthToFbo {
        public depthFBO: MarFBO;

        public static baseDepthSprite: DepthToFbo
        public constructor() {
            this.depthFBO = new MarFBO(256, 256);
            this.depthFBO.color = new Vector3D(1.0, 1.0, 1.0, 1.0);
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;

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
 

        }
        private makeDepthTexture(): void {
            //深度贴图
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
            this.depthFBO.depthTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.depthFBO.depthTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.depthFBO.width, this.depthFBO.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

            gl.bindTexture(gl.TEXTURE_2D, null);

      

        }
 
        private updateDepthTexture(fbo: MarFBO): void {

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
         
            if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
                alert("错误配置")
            }
            gl.viewport(0, 0, fbo.width, fbo.height);
            gl.clearColor(fbo.color.x, fbo.color.y, fbo.color.z, fbo.color.w);
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.depthMask(true);
            gl.enable(gl.DEPTH_TEST);
            gl.disable(gl.BLEND); //不用混合模式
            gl.disable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);
            gl.frontFace(gl.CCW);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
 

        }
        private depthRectSprite: DepthRectSprite
        private drawTempMode(): void {
            if (this.depthRectSprite) {
                this.depthRectSprite.update();
            } else {
                this.depthRectSprite = new DepthRectSprite();
            }


        }

        public update(value: Laya3dSprite): void {
         //   this.depthFBO.color = new Vector3D(Math.random(), Math.random(), Math.random(), 1.0);
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
            GlReset.saveBasePrarame(gl);
            this.updateDepthTexture(this.depthFBO);
            this.drawTempMode()
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            GlReset.resetBasePrarame(gl);

            for (var i: number = 0; i < value.sceneManager.displayList.length; i++) {
                var dis: Display3D = value.sceneManager.displayList[i]
                if (dis instanceof RectSprite) {
                    var rectDis: RectSprite = <RectSprite>dis;
                    rectDis._uvTextureRes.texture = this.depthFBO.texture
                }
            }
        }




    }
}