import Browser = Laya.Browser;
import Loader = Laya.Loader;
import LEvent = Laya.Event;
import Stage = Laya.Stage;

import LoadManager = Pan3d.LoadManager
import Scene_data = Pan3d.Scene_data
import TextureRes = Pan3d.TextureRes

import Pan3dByteArray = Pan3d.Pan3dByteArray;
import WebGLContext = laya.webgl.WebGLContext;

import EdItorSceneManager = maineditor.EdItorSceneManager;


class LayaLaunch {
    private _canvas: HTMLCanvasElement;
    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
    constructor() {
        this.init()
    }
    private outImg: Laya.Image;
    private init(): void {
        this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
     //  Pan3d.Scene_data.fileRoot = "res/";

        Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
        Pan3d.Scene_data.fileuiRoot = "res/";
        Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";

        Pan3d.Engine.init(this._canvas);


        var picA: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
        Laya.stage.addChild(picA)
        picA.pos(800, 300)

 
        var spriteA: Laya3dSprite = new Laya3dSprite("res/ui/icon/512.jpg")
        Laya.stage.addChild(spriteA)

        var sprite: Laya3dSprite = new Laya3dSprite("res/ui/icon/512a.jpg")
        Laya.stage.addChild(sprite)

        sprite.pos(525,0)

    }

     

    public static initCanvas($caves: HTMLCanvasElement): void {

        new LayaLaunch();


    }


}


