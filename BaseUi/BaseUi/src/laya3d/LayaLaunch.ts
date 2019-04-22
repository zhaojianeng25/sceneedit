import Browser = Laya.Browser;
import Loader = Laya.Loader;
import LEvent = Laya.Event;
import Stage = Laya.Stage;


import Pan3dByteArray = Pan3d.Pan3dByteArray;
import Laya3dSprite = LayaPan3D.Laya3dSprite;
 

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

         //   console.log("here")
            return v;
        }
        let funA = WebGLRenderingContext.prototype.blendFunc;
        WebGLRenderingContext.prototype.blendFunc = function (sfactor: GLenum, dfactor: GLenum): void {
            return compatibleLayaRender.call(this, funA, sfactor, dfactor);
        }
        /*
        let ParticleBoneData_setAllByteInfo = Pan3d.ParticleBoneData.prototype.setAllByteInfo;
        Pan3d.ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
            return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
        }
        */
    }

 
    private init(): void {
        LayaLaunch.overrideMethods()

        this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
 
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
        topBox.addChild(spriteA);

        var spriteB: Laya3dSprite = new Laya3dSprite("res/ui/icon/512a.jpg")
        topBox.addChild(spriteB);
 
        spriteB.pos(525, 200);
 
 
        var picA: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
        midBox.addChild(picA)
        picA.scale(0.5,0.5)
        picA.pos(600, 170)


        var picB: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
        midBox.addChild(picB)
 
        picB.pos(0, 220)

        this.lastTm = Pan3d.TimeUtil.getTimer()
        Laya.stage.frameLoop(1, this, () => {
          

            var t = Pan3d.TimeUtil.getTimer() - this.lastTm;

            Pan3d.TimeUtil.START_TIME += t * -2

            this.lastTm = Pan3d.TimeUtil.getTimer()

            Pan3d.TimeUtil.update()
            spriteA.upData()
            spriteB.upData()
             
        })
    }
    private lastTm: number
 
    public static initCanvas($caves: HTMLCanvasElement): void {

        new LayaLaunch();


    }


}


