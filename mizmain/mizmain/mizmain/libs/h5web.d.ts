declare function getRoleUrl($num: string): string;


declare module Pan3d.me {
    class Scene_data {
        static ossRoot: string;
        static fileuiRoot: string;
        static fileRoot: string;
    }
    class Engine {
        static init($caves: HTMLCanvasElement): void;
    }
    class EventDispatcher {

    }
    class Object3D extends EventDispatcher {
        public rotationX: number
        public rotationY: number
        public rotationZ: number

        public x: number
        public y: number
        public z: number

        public scaleX: number
        public scaleY: number
        public scaleZ: number


    }
    class Display3D extends Object3D {
    }
    class Display3DSprite extends Display3D {

    }
    class Display3dMovie extends Display3DSprite {
        public setRoleUrl(value: string): void;
    }


    class Camera3D {
        public scene2dScale: number;
        public distance: number

    }
    class SceneManager {
        public cam3D: Camera3D;
        public focus3D: Object3D;
        public addDisplay($display: Display3D, idx?: number): void

    }
    class MathClass {

        static getCamView(_Cam: Camera3D, _focus_3d: Object3D): Float32Array;
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

declare module layapan.me {
    class LayaOverride2dSceneManager extends Pan3d.me.SceneManager {
        public addMovieDisplay($display: Pan3d.me.Display3dMovie): void;
    }
}

declare module maineditor {
    class EdItorSceneManager extends layapan.me.LayaOverride2dSceneManager {

    }
    class LyfSpriteDisplay extends Pan3d.me.Display3DSprite {
        public addLyfByUrl($url: string): void;

    }
}


declare module LayaPan3D {
    class LayaScene2dSceneChar extends Pan3d.me.Display3dMovie {
        public set2dPos($x: number, $y: number): void;
    }
    class LayaScene2dPicSprit extends Pan3d.me.Display3D {
        constructor(value?: string)
        public set2dPos($x: number, $y: number): void;
        public width: number;
        public height: number;
    }
    class Laya3dSprite extends Laya.Image {
        constructor(value: string, bfun?: Function);
        protected initScene(): void;
        protected sceneManager: maineditor.EdItorSceneManager;
        public upData(): void;
    }
    class LayaScene2D extends Laya3dSprite {
        public rootpos: Pan3d.me.Vector2D
        protected getMousePos(tx: number, ty: number): Pan3d.me.Vector2D
    }
    class LayaGame2dDemo extends LayaScene2D {
 
    }
 
  
 

}



