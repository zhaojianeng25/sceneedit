﻿
module left {
    import Scene_data = Pan3d.Scene_data
    import FBO = Pan3d.FBO
    import Display3D = Pan3d.Display3D
    import MathClass = Pan3d.MathClass
    import Engine = Pan3d.Engine


    export class SceneRenderToTextrue {
        private static _instance: SceneRenderToTextrue;
        public static getInstance(): SceneRenderToTextrue {
            if (!this._instance) {
                this._instance = new SceneRenderToTextrue();
            }
            return this._instance;
        }
        private renderContext: WebGLRenderingContext;
        private fw: number = 1024
        private fh: number = 1024
        private getFBO(): FBO {

            this.fw = 2048
            this.fh = 2048
            this.renderContext = Scene_data.context3D.renderContext
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext
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
          //  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);



        }
        public viweLHnumber: number = 1000
        public resetViewMatrx3D(): void {
            
            Scene_data.viewMatrx3D.identity()
            Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(Engine.sceneCamScale, 1, 1, this.viweLHnumber);

        }
        public fbo: FBO;
        public renderToTexture($item: Array<Display3D>): void {
            if (!this.fbo) {
                this.fbo = this.getFBO();  //512*512
            }
            this.updateDepthTexture(this.fbo);
            this.renderContext.viewport(0, 0, this.fw, this.fh);
            this.renderContext.clearColor(20 / 255, 20 / 255, 20 / 255, 1.0);
            this.renderContext.clearDepth(1.0);
            this.renderContext.clearStencil(0.0);
 
            this.renderContext.depthMask(true);
            this.renderContext.frontFace(this.renderContext.CW);
            this.renderContext.clear(this.renderContext.COLOR_BUFFER_BIT | this.renderContext.DEPTH_BUFFER_BIT | this.renderContext.STENCIL_BUFFER_BIT);

            this.resetViewMatrx3D()
    
            MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵

         

            for (var i: number = 0; i < $item.length; i++) {
                $item[i].update()
            }

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);

            Engine.resetSize();
        }




    }
}