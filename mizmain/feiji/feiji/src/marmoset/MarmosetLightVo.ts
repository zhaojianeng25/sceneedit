module mars3D {
    import Scene_data = Pan3d.Scene_data
    import TextureManager = Pan3d.TextureManager

    export class FBO extends Pan3d.FBO {
        public constructor(w: number = 128, h: number = 128) {
            super(w, h)
        }
    }

    export class MarmosetLightVo   {
        public tDepth0: FBO;
        public tDepth1: FBO;
        public tDepth2: FBO;
        public constructor() {

            this.tDepth0 = new FBO(512, 512);
            this.tDepth1 = new FBO(512, 512);
            this.tDepth2 = new FBO(512, 512);

        }

        public update(value: Array<Mars3Dmesh>): void {
            for (var i: number = 0; i < value.length; i++) {

                this.drawTempMesh(value[i])

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