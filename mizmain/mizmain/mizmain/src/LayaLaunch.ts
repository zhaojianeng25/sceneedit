module base {
    import Browser = Laya.Browser;
    import Loader = Laya.Loader;
    import LEvent = Laya.Event;
    import Stage = Laya.Stage;
    import Sprite = Laya.Sprite


    import Engine = Pan3d.me.Engine
    import Scene_data = Pan3d.me.Scene_data

    import Game2dDemo = base.Game2dDemo;
    import Game3dDemo = base.Game3dDemo;




    export class LayaLaunch {
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
            let ParticleBoneData_setAllByteInfo =  ParticleBoneData.prototype.setAllByteInfo;
             ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
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


            Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            Scene_data.fileuiRoot = "res/";
            Scene_data.fileRoot = "res/";
            //    Scene_data.fileRoot =  Scene_data.ossRoot + "baseedit/";
            Engine.init(this._canvas);


            var midBox: Laya.Box = new Laya.Box()
            Laya.stage.addChild(midBox)

            var topBox: Laya.Box = new Laya.Box()
            Laya.stage.addChild(topBox)


            var spriteA: Game3dDemo = new Game3dDemo("res/ui/icon/256b.png", () => {
                spriteA.scale(2, 1)
            })
            topBox.addChild(spriteA);


            var spriteB: Game3dDemo = new Game3dDemo("res/ui/icon/256a.png", () => {
                spriteB.scale(1, 2)
            })
            topBox.addChild(spriteB);
            spriteB.pos(0, 250);




            var spriteC: Game2dDemo = new Game2dDemo("res/ui/icon/512a.jpg", () => {
                spriteC.scale(1, 1)
            })
            topBox.addChild(spriteC);
            spriteC.pos(350, 0);



            var spriteD: Game2dDemo = new Game2dDemo("res/ui/icon/512b.jpg", () => {
                spriteD.scale(2, 1)
            })
            topBox.addChild(spriteD);
            spriteD.pos(200, 250);



            var picA: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
            midBox.addChild(picA)
            picA.scale(0.5, 0.5)
            picA.pos(600, 170)

            var picB: Laya.Image = new Laya.Image("res/ui/icon/lyf_64x.png");
            midBox.addChild(picB)
            picB.pos(0, 220)



        }


        private lastTm: number

        public static initCanvas($caves: HTMLCanvasElement): void {

            new LayaLaunch();


        }


    }



}