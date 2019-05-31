﻿module marmoset {
    import Browser = Laya.Browser;
    import Stage = Laya.Stage;
    import LayaGame2dDemo = LayaPan3D.LayaGame2dDemo;
    export class MarmosetLaunch {
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
            // LayaLaunch.overrideMethods()

            this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
            Laya.stage.alignV = Stage.ALIGN_LEFT;
            Laya.stage.alignH = Stage.ALIGN_TOP;

            Laya.stage.scaleMode = "full"
            Laya.stage.bgColor = "#232628";



            Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            Pan3d.Scene_data.fileuiRoot = "res/";
            Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";



            Pan3d.Engine.init(this._canvas);


            var topBox: Laya.Box = new Laya.Box()
            Laya.stage.addChild(topBox)

            var midBox: Laya.Box = new Laya.Box()
            Laya.stage.addChild(midBox)




            var picA: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
            Laya.stage.addChild(picA)
            picA.scale(0.5, 0.5)
            picA.pos(0, 0)

            console.log(layapan_me.LayaSceneChar)
 

            var spriteD: Marmoset3dScene = new Marmoset3dScene("res/ui/icon/512b.jpg", () => {
                spriteD.scale(1, 0.75)
            })
            Laya.stage.addChild(spriteD);
            spriteD.pos(100, 100);


            Laya.stage.frameLoop(1, this, () => {
                Pan3d.TimeUtil.update()
            })
        }


  
        public static initCanvas($caves: HTMLCanvasElement): void {

            new MarmosetLaunch();


        }


    }


}