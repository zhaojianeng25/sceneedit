module maineditor {
    import SceneManager = Pan3d.SceneManager
    import Scene_data = Pan3d.Scene_data
    import TimeUtil = Pan3d.TimeUtil
    import MathClass = Pan3d.MathClass
    import ParticleManager = Pan3d.ParticleManager
    import SkillManager = Pan3d.SkillManager
    import FBO = Pan3d.FBO
    import Engine = Pan3d.Engine
    import TextureRes = Pan3d.TextureRes
    import Camera3D = Pan3d.Camera3D
    import Object3D = Pan3d.Object3D

    export class EdItorSceneManager extends SceneManager {
        constructor() {
            super();
        }
        public fbo: FBO;
        private renderContext: WebGLRenderingContext;
        private fw: number = 1024;
        private fh: number = 1024;
        private getFBO(): FBO {

            this.renderContext = Scene_data.context3D.renderContext;
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
            var fbo: FBO = new FBO();
            fbo.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, fbo.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.fw, this.fh, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            fbo.frameBuffer = gl.createFramebuffer();
            fbo.depthBuffer = gl.createRenderbuffer();

            gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.depthBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.fw, this.fh);

            return fbo;
        }
        private updateDepthTexture(fbo: FBO): void {

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);

            this.renderContext.viewport(0, 0, this.fw, this.fh);
            this.renderContext.clearColor(20 / 255, 20 / 255, 20 / 255, 1.0);
            this.renderContext.clearDepth(1.0);
            this.renderContext.clearStencil(0.0);
            this.renderContext.enable(this.renderContext.DEPTH_TEST);
            this.renderContext.depthMask(true);
            this.renderContext.enable(this.renderContext.BLEND);
            this.renderContext.frontFace(this.renderContext.CW);
            this.renderContext.clear(this.renderContext.COLOR_BUFFER_BIT | this.renderContext.DEPTH_BUFFER_BIT | this.renderContext.STENCIL_BUFFER_BIT);
        }
        public viweLHnumber: number = 1000
        public resetViewMatrx3D( ): void {
            Scene_data.viewMatrx3D.identity();


            Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(Engine.sceneCamScale, 1, 1, this.viweLHnumber);
            Scene_data.viewMatrx3D.appendScale(1, this.cam3D.cavanRect.width / this.cam3D.cavanRect.height, 1);
   

        }
        public renderToTexture( ): void {
            if (!this.fbo) {
                this.fbo = this.getFBO();  
            }
            this.resetViewMatrx3D( );
            this.updateDepthTexture(this.fbo);
            this.update();

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            Engine.resetSize();

            if (this.fbo && this.textureRes) {
                this.textureRes.texture = this.fbo.texture;
            }
        }
        public textureRes: Pan3d.TextureRes;
        public update(): void {
            var lastCam3D: Camera3D = Scene_data.cam3D
            var lastfocus3D: Object3D = Scene_data.focus3D 

         
            Scene_data.cam3D = this.cam3D;
            Scene_data.focus3D = this.focus3D;
   
            Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time = TimeUtil.getTimer();
            }
            if (this._ready) {
                Scene_data.context3D.cullFaceBack(true);
                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setDepthTest(true);
                this.updateStaticDiplay();
                this.updateSpriteDisplay();
                this.updateMovieDisplay();
                Scene_data.context3D.setWriteDepth(false);
            }
            Scene_data.cam3D = lastCam3D;
            Scene_data.focus3D = lastfocus3D;
        }

    }

}
