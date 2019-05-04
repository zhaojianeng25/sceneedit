declare function getRoleUrl($num: string): string;


declare module Pan3d {
    /**
     * @private
     * @author ...
     */
    class Scene_data {

        static ossRoot: string;
        static fileuiRoot: string;
        static fileRoot: string;

    }
    class Engine {

        static init($caves: HTMLCanvasElement): void;


    }
    class Display3dMovie {

        public setRoleUrl(value: string): void;

    }
    class Display3D {
 

    }
    
    class Camera3D {
        public scene2dScale: number;

    }
    class SceneManager {
        public cam3D: Camera3D;
        public addDisplay($display: Display3D, idx?: number): void 

    }
    class Vector2D {
 
        constructor($x?: number, $y?: number);
        public x: number;
        public y: number;
 

    }
    class Rectangle {

        constructor($x?: number, $y?: number, $width?: number, $height?: number);
        public x: number;
        public y: number;
        public width: number;
        public height: number;

    }
      class MouseType {
          public static MouseDown: string
          public static MouseUp: string
          public static MouseMove: string
          public static MouseClick: string
          public static KeyDown: string
          public static KeyUp: string
          public static MouseWheel: string

    }

    
}

 
declare module layapan {
    class LayaOverride2dSceneManager extends Pan3d.SceneManager {
        public addMovieDisplay($display: Pan3d.Display3dMovie): void;
    }
}

declare module maineditor {
    class EdItorSceneManager extends layapan.LayaOverride2dSceneManager {

    }
}


declare module LayaPan3D {
    /**
     * @private
     * @author ...
     */
    class Laya3dSprite extends Laya.Image {
        protected initScene(): void;

        protected sceneManager: maineditor. EdItorSceneManager;

    }
    class LayaScene2D extends Laya3dSprite {
        constructor(value: string, bfun?: Function);
        public rootpos: Pan3d.Vector2D
        protected getMousePos(tx: number, ty: number): Pan3d.Vector2D 
  

    }
    class LayaGame2dDemo extends LayaScene2D {
        constructor(value: string, bfun?: Function);

    }

    class LayaScene2dSceneChar extends Pan3d.Display3dMovie {
        public set2dPos($x: number, $y: number): void;
    }
    class LayaScene2dPicSprit  extends Pan3d.Display3D {
        constructor(value?: string) 
        public set2dPos($x: number, $y: number): void;
        public width: number;
        public height: number;
    }

    
 
}



