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
        
    }
}