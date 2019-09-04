module core {
    import TextureRes = Pan3d.TextureRes
    import UIManager = Pan3d.UIManager
    import Scene_data = Pan3d.Scene_data
    import Shader3D = Pan3d.Shader3D
    import GlReset = Pan3d.GlReset
    import ProgrmaManager = Pan3d.ProgrmaManager
    import TextureManager = Pan3d.TextureManager
    import Display3D = Pan3d.Display3D

    export class BaseCavanShader extends Shader3D {
        static BaseCavanShader: string = "BaseCavanShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +

                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +

                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +

                "void main(void)\n" +
                "{\n" +

                "gl_FragColor = vec4(1.0,0.0,0.0,1.0); " +
                "}"
            return $str

        }

    }

    export class BaseCavanSprite extends Display3D {

        constructor() {
            super();
            this.initData()
            this.updateMatrix
        }
        protected initData(): void {
            ProgrmaManager.getInstance().registe(BaseCavanShader.BaseCavanShader, new BaseCavanShader);
            this.shader = ProgrmaManager.getInstance().getProgram(BaseCavanShader.BaseCavanShader);
            this.program = this.shader.program;

            this.objData = new ObjData;

            var sizeNum: number = 0.8
            this.objData.vertices = new Array();
            this.objData.vertices.push(-sizeNum, +sizeNum, 0.9);
            this.objData.vertices.push(+sizeNum, +sizeNum, 0.9);
            this.objData.vertices.push(+sizeNum, -sizeNum, 0.9);
            this.objData.vertices.push(-sizeNum, -sizeNum, 0.9);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();

            this.objData.indexs.push(0, 2, 1);
            this.objData.indexs.push(0, 3, 2);

            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);

            this.loadTexture();


            this.upToGpu()


        }
        private loadTexture(): void {
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(128, 128, false);
            $ctx.fillStyle = "rgb(255,255,255)";
            $ctx.fillRect(0, 0, 128, 128);
            this._uvTextureRes = TextureManager.getInstance().getCanvasTexture($ctx)
        }
        public _uvTextureRes: TextureRes

        public upToGpu(): void {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        }
        public update(): void {
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

            }

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
            this.baseDiplay3dSprite = new BaseCavanSprite()
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



        private baseDiplay3dSprite: BaseCavanSprite
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
            gl.clearColor(fbo.color.x, fbo.color.y, fbo.color.z, fbo.color.w);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
 
        }
        private depthFBO: mars3D.MarFBO;
        public drawTextureToTexture(): WebGLTexture {
            this.depthFBO = new mars3D.MarFBO(256, 256);
            this.depthFBO.color = new Vector3D(Math.random(), Math.random(), Math.random(), 1.0);
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
            GlReset.saveBasePrarame(gl);
            this.setFboInfo(this.depthFBO);

          //  this.drawBaseRectCavan();

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            GlReset.resetBasePrarame(gl);
            return this.depthFBO.texture
        }
        public drawBaseRectCavan(): void {

            this.baseDiplay3dSprite.update();

        }


    }
}