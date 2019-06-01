
module mars3D {
    import Vector2D = Pan3d.Vector2D
    import Object3D = Pan3d.Object3D
    import MouseType = Pan3d.MouseType
    import LineDisplayShader = Pan3d.LineDisplayShader
    import Shader3D = Pan3d.Shader3D
    import Camera3D = Pan3d.Camera3D
    import Rectangle = Pan3d.Rectangle
    import ProgrmaManager = Pan3d.ProgrmaManager
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite
    import BaseDiplay3dShader = Pan3d.BaseDiplay3dShader
    import Scene_data = Pan3d.Scene_data

 


    export class PicShowDiplay3dShader extends Shader3D {
        static PicShowDiplay3dShader: string = "PicShowDiplay3dShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
            $context.bindAttribLocation(this.program, 2, "T");
            $context.bindAttribLocation(this.program, 3, "B");
            $context.bindAttribLocation(this.program, 4, "N");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "attribute vec2 T;" +
                "attribute vec2 B;" +
                "attribute vec2 N;" +

                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +

                "varying vec2 v_texCoord;" +

                "void main(void)" +
                "{" +

                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
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
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "gl_FragColor =infoUv;\n" +
                "}"
            return $str

        }

    }


    export class PicShowDiplay3dSprite extends BaseDiplay3dSprite {

        constructor() {
            super();
            this.initData()
            this.updateMatrix
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
        private drawTempMesh(mesh: Mars3Dmesh): void {
            var gl = Scene_data.context3D.renderContext;
            Scene_data.context3D.setProgram(this.program);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);


            Scene_data.context3D.cullFaceBack(false);

            Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);

            Scene_data.context3D.pushVa(mesh.vertexBuffer);
            Scene_data.context3D.setVaOffset(0, 3, mesh.stride, 0);
            Scene_data.context3D.setVaOffset(1, 2, mesh.stride, 12);

    
            var f: number = 20
            gl.enableVertexAttribArray(2);
            gl.vertexAttribPointer(2, 2, gl.UNSIGNED_SHORT, false, mesh.stride, f);
            f += 4;
            gl.enableVertexAttribArray(3);
            gl.vertexAttribPointer(3, 2, gl.UNSIGNED_SHORT, false, mesh.stride, f);
            f += 4;
            gl.enableVertexAttribArray(3);
            gl.vertexAttribPointer(4, 2, gl.UNSIGNED_SHORT, false, mesh.stride, f);
          
     
  



            Scene_data.context3D.drawCall(mesh.indexBuffer, mesh.indexCount);
        }
        public update(): void {
            if (MarmosetModel.meshItem && MarmosetModel.meshItem.length) {
                for (var i: number = 0; i < MarmosetModel.meshItem.length; i++) {
                    this.drawTempMesh(MarmosetModel.meshItem[i])
                }
            } else {
                super.update()
            }

        }



    }

}