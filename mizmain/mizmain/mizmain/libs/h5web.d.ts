 



declare module maineditor {
    import Display3DSprite = Pan3d.Display3DSprite
    import LayaOverride2dSceneManager = layapan_me.LayaOverride2dSceneManager
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
    import LayaSceneChar = layapan_me.LayaSceneChar
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



