
module mars3D {
    import Vector2D = Pan3d.Vector2D
    import Object3D = Pan3d.Object3D
    import MouseType = Pan3d.MouseType
    import LineDisplayShader = Pan3d.LineDisplayShader
    import Shader3D = Pan3d.Shader3D
    import Camera3D = Pan3d.Camera3D
    import TextureManager = Pan3d.TextureManager
    import ProgrmaManager = Pan3d.ProgrmaManager
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite
    import TextureRes = Pan3d.TextureRes
    import Scene_data = Pan3d.Scene_data

 


    export class PicShowDiplay3dShader extends Shader3D {
        static PicShowDiplay3dShader: string = "PicShowDiplay3dShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
 
            $context.bindAttribLocation(this.program, 2, "v3Nrm");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "attribute vec2 vTangent;" +
                "attribute vec2 vBitangent;" +
                "attribute vec2 vNormal;" +

                "attribute vec3 v3Nrm;" +
 
                "uniform mat4 viewMatrix3D;" +
              //  "uniform mat4 posMatrix3D;" +

                "varying vec2 d;\n" +

                "varying  vec3 dA; " +
                "varying  vec3 dB; " +
                "varying  vec3 dC; " +

                "varying  vec3 dnrm;" +
 
                " vec3 iW(vec2 v) {;" +
                    "  v.x=v.x/65535.0;" +
                    "  v.y=v.y/65535.0;" +
                    "  bool iX = (v.y > (32767.1 / 65535.0));" +
                    "  v.y = iX ? (v.y - (32768.0 / 65535.0)) : v.y;" +
                    "  vec3 r;" +
                    "  r.x = (2.0 * 65535.0 / 32767.0) * v.x - 1.0;" +
                    "  r.y = (2.0 * 65535.0 / 32767.0) * v.y - 1.0;" +
                    "  r.z = sqrt(max(min(1.0 - (r.x*r.x+r.y*r.y), 1.0), 0.0));" +
                    "  r.z = iX ? -r.z : r.z;" +
                    "  return r;" +
                " }" +

                "void main(void)" +
                "{" +
                    "   d = vec2(u2Texture.x, u2Texture.y);" +
 
                    "   dnrm=v3Nrm;" +
                    "   vec4 vt0= vec4(v3Position, 1.0);" +
                   // "   vt0 = posMatrix3D * vt0;" +
                    "   vt0 = viewMatrix3D * vt0;" +
                    "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D tAlbedo;\n" +
                "uniform sampler2D tNormal;\n" +

                "varying vec2 d;\n" +
                "varying  vec3 dA; "+
                "varying  vec3 dB; " +
                "varying  vec3 dC; " +
                "varying  vec3 dnrm;" +

                "vec3 dG(vec3 c){return c*c;}" +
 
          
                "void main(void) " +
                "{ " +

                "vec4 m=texture2D(tAlbedo,d);"+
                "vec3 dF=dG(m.xyz);" +
                "float e = m.w;"+
                // "vec3 dI = dJ(texture2D(tNormal, d).xyz);"

     
                    "gl_FragColor =vec4(dF.xyz,1.0); " +
                "}"
            return $str

        }

    }


    export class PicShowDiplay3dSprite extends BaseDiplay3dSprite {
        private tAlbedo: TextureRes;
        constructor() {
            super();
            this.initData()
 
 
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
            if (mesh.tAlbedo && mesh.tNormal) {
                var gl = Scene_data.context3D.renderContext;
                Scene_data.context3D.setProgram(this.program);

                Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
                var viewM = Scene_data.viewMatrx3D.clone()
                viewM.prepend(Scene_data.cam3D.cameraMatrix)
                viewM.prepend(this.posMatrix)

                Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", viewM.m);
                if (window["mview"]) {
                    Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", window["mview"]);
                }
                Scene_data.context3D.setRenderTexture(this.shader, "tAlbedo", mesh.tAlbedo.texture, 0);
                Scene_data.context3D.setRenderTexture(this.shader, "tNormal", mesh.tNormal.texture, 1);

                gl.disable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT);

                Scene_data.context3D.setVa(0, 3, mesh.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, mesh.objData.uvBuffer);
                Scene_data.context3D.setVa(2, 3, mesh.objData.normalsBuffer);
                Scene_data.context3D.drawCall(mesh.objData.indexBuffer, mesh.objData.treNum);
            }
       

   


        }
        private isFinish: boolean
        private makeMeshItemTexture(): void {
            var albedArr: Array<string> = []
            albedArr.push("mat1_c")
            albedArr.push("mat2_c")
            albedArr.push("mat0_c")

            var nrmArr: Array<string> = []
            nrmArr.push("mat1_n")
            nrmArr.push("mat2_n")
            nrmArr.push("mat0_n")

            for (var i: number = 0; i < MarmosetModel.meshItem.length; i++) {
                var vo = MarmosetModel.meshItem[i]
                vo.setAlbedoUrl(albedArr[i])
                vo.setNormalUrl(nrmArr[i])
                
            }
            this.isFinish = true
        }
        public update(): void {
            if (MarmosetModel.meshItem && MarmosetModel.meshItem.length) {
                if (!this.isFinish) {
                    this.makeMeshItemTexture()
                }
                for (var i: number = 0; i < MarmosetModel.meshItem.length; i++) {
                    this.drawTempMesh(MarmosetModel.meshItem[i])
                }
            } else {
                super.update()
            }

        }



    }

}