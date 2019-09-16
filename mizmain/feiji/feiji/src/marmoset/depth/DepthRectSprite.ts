﻿module depth {
    import Shader3D = Pan3d.Shader3D
    import Display3D = Pan3d.Display3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import UIManager = Pan3d.UIManager
    import Scene_data = Pan3d.Scene_data
    import TextureRes = Pan3d.TextureRes
    import TextureManager = Pan3d.TextureManager
    export class DepthRectShader extends Shader3D {
        static DepthRectShader: string = "DepthRectShader";
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
                "   vec4 vt0= vec4(v3Position.xyz, 1.0);" +
                "   gl_Position = vt0;" +
                "}"
            return $str
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "uniform vec4 fColor;" +
                "varying vec2 v_texCoord;\n" +

                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
             //   "infoUv.xyz=(infoUv.xxx-0.5)*2.0 ;\n " +
 
                "gl_FragColor = infoUv;\n" +
                "}"
            return $str

        }

    }

    export class DepthRectSprite extends Display3D {

        constructor() {
            super();
            this.initData()
        }
        protected initData(): void {
            ProgrmaManager.getInstance().registe(DepthRectShader.DepthRectShader, new DepthRectShader);
            this.shader = ProgrmaManager.getInstance().getProgram(DepthRectShader.DepthRectShader);
            this.program = this.shader.program;

            this.objData = new ObjData;
            this.objData.vertices = new Array();
            var sizeNum: number = 0.25;
            var tx: number = -0.75

            var setDepth: number = 0.001;
            this.objData.vertices.push(-sizeNum + tx, +sizeNum, setDepth);
            this.objData.vertices.push(+sizeNum + tx, +sizeNum, 0.999);
            this.objData.vertices.push(+sizeNum + tx, -sizeNum, 0.999);
            this.objData.vertices.push(-sizeNum + tx, -sizeNum, setDepth);

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
        private loadTexture(): void {
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(128, 128, false);
            $ctx.fillStyle = "rgb(0,0,255)";
            $ctx.fillRect(0, 0, 128, 128);
            this._uvTextureRes = TextureManager.getInstance().getCanvasTexture($ctx);

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
        private skipNum: number=1
        public update(): void {
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setCullFaceModel(2)
                var gl: WebGLRenderingContext = Scene_data.context3D.renderContext
                gl.disable(gl.CULL_FACE);

                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);

                var feijivo: any = window["feijitextvo"];
                if (feijivo) {
                    console.log(feijivo)
                    Scene_data.context3D.setRenderTexture(this.shader, "s_texture", feijivo.normal.id, 0);
                }

                Scene_data.context3D.setVc4fv(this.shader, "fColor", [0.999, 0, 0, 1]);

                this.skipNum-=0.00001

                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

            }
        }



    }
}