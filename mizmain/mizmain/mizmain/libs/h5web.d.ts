
declare module layapan.me {
    import CombineParticle = Pan3d.CombineParticle
    import ParticleManager = Pan3d.ParticleManager
    import Display3DParticle = Pan3d.Display3DParticle
    import Display3dMovie = Pan3d.Display3dMovie
    import BloodLineMeshVo = Pan3d.BloodLineMeshVo
    import CharNameMeshVo = Pan3d.CharNameMeshVo

    class Frame3DAtlasParticle extends Display3DParticle {
        public static getFrameParticle(pathurl: string, fileBaseName: string, info: any): CombineParticle;
    }
    class LayaOverride2dParticleManager extends ParticleManager {
    }
    class LayaOverride2dSceneManager extends Pan3d.SceneManager {
        public addMovieDisplay($display: Pan3d.Display3dMovie): void;
        public particleManager: LayaOverride2dParticleManager
    }
    class LayaSceneBaseChar extends Display3dMovie {
    }
    class LayaSceneChar extends LayaSceneBaseChar {
  
        protected _pScale: number ;
        protected _mountChar: LayaSceneBaseChar;
        protected _wingDisplay: LayaSceneBaseChar;
        protected tittleHeight: number 
        protected _bloodEnable: boolean;
        protected _charBloodVo: BloodLineMeshVo;
        protected _nameEnable: boolean 
        protected _charNameVo: CharNameMeshVo;
        public charName: string
        public isMount: boolean;
        protected _charAngerVo: BloodLineMeshVo;
        protected _isCamera2D: boolean;
        protected _resultVisible: boolean 
        protected pRotationY:number
    }
    
}
declare module maineditor {
    import Display3DSprite = Pan3d.Display3DSprite
    import LayaOverride2dSceneManager = layapan.me.LayaOverride2dSceneManager
    class EdItorSceneManager extends LayaOverride2dSceneManager {
        public fbo: Pan3d.FBO;
    }
    class LyfSpriteDisplay extends Display3DSprite {
        public addLyfByUrl($url: string): void;

    }
}


declare module LayaPan3D {
    import Vector2D = Pan3d.Vector2D
    import Display3D = Pan3d.Display3D
    import Display3dMovie = Pan3d.Display3dMovie
    import LayaSceneChar = layapan.me.LayaSceneChar
    import EdItorSceneManager = maineditor.EdItorSceneManager
    class LayaScene2dSceneChar extends  LayaSceneChar {
        public set2dPos($x: number, $y: number): void;
 
    }
    class LayaScene2dPicSprit extends Display3D {
        constructor(value?: string)
        public set2dPos($x: number, $y: number): void;
        public width: number;
        public height: number;
    }
    class Laya3dSprite extends Laya.Image {
        constructor(value: string, bfun?: Function);
        protected initScene(): void;
        protected sceneManager: EdItorSceneManager;
        public upData(): void;
    }
    class LayaScene2D extends Laya3dSprite {
        public rootpos: Vector2D
        protected getMousePos(tx: number, ty: number): Vector2D
    }
    class LayaGame2dDemo extends LayaScene2D {
 
    }


}



