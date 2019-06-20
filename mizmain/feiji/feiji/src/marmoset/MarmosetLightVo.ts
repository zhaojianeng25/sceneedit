module mars3D {
    import Scene_data = Pan3d.Scene_data
    import TextureManager = Pan3d.TextureManager

    export class FBO extends Pan3d.FBO {
        public constructor(w: number = 128, h: number = 128) {
            super(w, h)
        }
    }

    export class MarmosetLightVo   {
        public depthFBO: FBO;
        public constructor() {
            this.depthFBO = new FBO(512, 512);
        }
        private updateDepthTexture(fbo: FBO): void {

            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext

            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);
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
                this.updateDepthTexture(this.depthFBO)
                for (var i: number = 0; i < value.length; i++) {
                    this.drawTempMesh(value[i])
                }
            }
          
        }
        private drawTempMesh(mesh: Mars3Dmesh): void {
            if (mesh.tAlbedo && mesh.tNormal && mesh.tReflectivity) {

                var gl = Scene_data.context3D.renderContext;

                gl.disable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT);

           //     Scene_data.context3D.setVa(0, 3, mesh.objData.vertexBuffer);
            //    Scene_data.context3D.setVa(1, 2, mesh.objData.uvBuffer);
            //    Scene_data.context3D.drawCall(mesh.objData.indexBuffer, mesh.objData.treNum);
            }
 

        }

        
    }
}