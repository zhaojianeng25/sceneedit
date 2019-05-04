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
}


declare module LayaPan3D {
    /**
     * @private
     * @author ...
     */
    class Laya3dSprite extends Laya.Image {


    }
    class LayaScene2D extends Laya3dSprite {


    }
    class LayaGame2dDemo extends LayaScene2D {
        constructor(value: string, bfun?: Function);

    }
 
}



