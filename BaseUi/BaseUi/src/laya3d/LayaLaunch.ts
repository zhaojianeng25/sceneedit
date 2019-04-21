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
    static inited: boolean
    static overrideMethods(): void {
        if (this.inited) {
            return;
        }
        this.inited = true;
        let compatibleLayaRender = function (pan3dFunc: Function, ...args): any {
            let v = pan3dFunc.apply(this, args);

            console.log("here")
            return v;
        }
        let ParticleBoneData_setAllByteInfo = Pan3d.ParticleBoneData.prototype.setAllByteInfo;
        Pan3d.ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
            return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
        }
        /*
        let ParticleBoneData_setAllByteInfo = Pan3d.ParticleBoneData.prototype.setAllByteInfo;
        Pan3d.ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
            return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
        }
        */
    }

    private outImg: Laya.Image;
    private init(): void {
        LayaLaunch.overrideMethods()

        this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
     //  Pan3d.Scene_data.fileRoot = "res/";

        Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
        Pan3d.Scene_data.fileuiRoot = "res/";
        Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";

        Laya.stage.scaleMode = "full"

        Pan3d.Engine.init(this._canvas);


        var midBox: Laya.Box = new Laya.Box()
        Laya.stage.addChild(midBox)

        var topBox: Laya.Box = new Laya.Box()
        Laya.stage.addChild(topBox)



 
        var spriteA: Laya3dSprite = new Laya3dSprite("res/ui/icon/512.jpg")
        topBox.addChild(spriteA)


        var spriteB: Laya3dSprite = new Laya3dSprite("res/ui/icon/512a.jpg")
        topBox.addChild(spriteB)

        spriteB.pos(525, 200)
 
        var picA: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
        midBox.addChild(picA)
        picA.pos(800, 470)


        var picB: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
        midBox.addChild(picB)
        picB.pos(0,460)
    }

     

    public static initCanvas($caves: HTMLCanvasElement): void {

        new LayaLaunch();


    }


}


