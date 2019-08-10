module core {
    import TextureRes = Pan3d.TextureRes
    import UIManager = Pan3d.UIManager
    import Scene_data = Pan3d.Scene_data
    import Shader3D = Pan3d.Shader3D
    import GlReset = Pan3d.GlReset
    import ProgrmaManager = Pan3d.ProgrmaManager
    import TextureManager = Pan3d.TextureManager


    export class TextureToTextureShader extends Shader3D {
        static TextureToTextureShader: string = "TextureToTextureShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +
                "void main(void)" +
                "{" +
                "   vec4 pos = vec4(v3Pos.xyz,1.0);" +
                "   gl_Position = vt0;" +
                "}"
            return $str
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor = vec4(1.0,0.0,0.0,1.0); " +
                "}"
            return $str

        }

    }
    export class TextureUint {


        private static _instance: TextureUint;
        public static getInstance(): TextureUint {
            if (!this._instance) {
                this._instance = new TextureUint();
            }
            return this._instance;
        }
        public constructor() {
            this.makeBaseRectObjdata();
        }
        //创建颜色纹理
        public makeColorTexture(colorStr: string = "#ff0000", w: number = 1024, h: number = 1024): TextureRes {
            var tempRect: TextureRes = new TextureRes();
            tempRect.width = w;
            tempRect.height = h;
            tempRect.texture = Scene_data.context3D.creatTexture(tempRect.width, tempRect.height)
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(tempRect.width, tempRect.height, false);
            ctx.fillStyle = colorStr; // text color
            ctx.fillRect(0, 0, tempRect.width, tempRect.height);
            TextureManager.getInstance().updateTexture(tempRect.texture, 0, 0, ctx);

            return tempRect
        }
        private objData: ObjData;
        private shader: Shader3D;
        private makeBaseRectObjdata(): void {
            ProgrmaManager.getInstance().registe(TextureToTextureShader.TextureToTextureShader, new TextureToTextureShader)
            this.shader = ProgrmaManager.getInstance().getProgram(TextureToTextureShader.TextureToTextureShader);
            this.objData = new ObjData();
            this.objData.vertices.push(
                -1, 1, 0,
                1, 1, 0,
                1, -1, 0,
                -1, -1, 0);
            this.objData.uvs.push(
                0, 0,
                1, 0,
                1, 1,
                0, 1);
            this.objData.indexs.push(0, 1, 2, 0, 3, 2);
            this.objData.treNum = 6;
            this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
            this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
            this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);

            this.baseDiplay3dSprite = new Pan3d.BaseDiplay3dSprite()
        }
        private baseDiplay3dSprite: Pan3d.BaseDiplay3dSprite
        private setFboInfo(fbo: mars3D.MarFBO): void {
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);


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
        }
        private depthFBO: mars3D.MarFBO;
        public drawTextureToTexture(): WebGLTexture {
            this.depthFBO = new mars3D.MarFBO(1024, 1024);
            this.depthFBO.color = new Vector3D(0.0, 1.0, 1.0, 1.0);
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
            GlReset.saveBasePrarame(gl);
            this.setFboInfo(this.depthFBO);
           this.drawBaseRectCavan();

            this.baseDiplay3dSprite.update()

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            GlReset.resetBasePrarame(gl);
            return this.depthFBO.texture
        }
        public drawBaseRectCavan(): void {
            Scene_data.context3D.setProgram(this.shader.program);
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
 
        }


    }
}