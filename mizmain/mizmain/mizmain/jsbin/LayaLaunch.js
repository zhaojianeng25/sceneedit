var base;
(function (base) {
    var Browser = Laya.Browser;
    var Stage = Laya.Stage;
    var Engine = Pan3d.me.Engine;
    var Scene_data = Pan3d.me.Scene_data;
    var Game2dDemo = base.Game2dDemo;
    var Game3dDemo = base.Game3dDemo;
    var LayaLaunch = /** @class */ (function () {
        function LayaLaunch() {
            this.init();
        }
        Object.defineProperty(LayaLaunch.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        LayaLaunch.overrideMethods = function () {
            if (this.inited) {
                return;
            }
            this.inited = true;
            var compatibleLayaRender = function (pan3dFunc) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var v = pan3dFunc.apply(this, args);
                //   console.log("here")
                return v;
            };
            var funA = WebGLRenderingContext.prototype.blendFunc;
            WebGLRenderingContext.prototype.blendFunc = function (sfactor, dfactor) {
                return compatibleLayaRender.call(this, funA, sfactor, dfactor);
            };
            /*
            let ParticleBoneData_setAllByteInfo =  ParticleBoneData.prototype.setAllByteInfo;
             ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
                return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
            }
            */
        };
        LayaLaunch.prototype.init = function () {
            // LayaLaunch.overrideMethods()
            this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
            Laya.stage.alignV = Stage.ALIGN_LEFT;
            Laya.stage.alignH = Stage.ALIGN_TOP;
            Laya.stage.scaleMode = "full";
            Laya.stage.bgColor = "#232628";
            Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            Scene_data.fileuiRoot = "res/";
            Scene_data.fileRoot = "res/";
            //    Scene_data.fileRoot =  Scene_data.ossRoot + "baseedit/";
            Engine.init(this._canvas);
            var midBox = new Laya.Box();
            Laya.stage.addChild(midBox);
            var topBox = new Laya.Box();
            Laya.stage.addChild(topBox);
            var spriteA = new Game3dDemo("res/ui/icon/256b.png", function () {
                spriteA.scale(2, 1);
            });
            topBox.addChild(spriteA);
            var spriteB = new Game3dDemo("res/ui/icon/256a.png", function () {
                spriteB.scale(1, 2);
            });
            topBox.addChild(spriteB);
            spriteB.pos(0, 250);
            var spriteC = new Game2dDemo("res/ui/icon/512a.jpg", function () {
                spriteC.scale(1, 1);
            });
            topBox.addChild(spriteC);
            spriteC.pos(350, 0);
            var spriteD = new Game2dDemo("res/ui/icon/512b.jpg", function () {
                spriteD.scale(2, 1);
            });
            topBox.addChild(spriteD);
            spriteD.pos(200, 250);
            var picA = new Laya.Image("res/ui/icon/lyf_64x.png");
            midBox.addChild(picA);
            picA.scale(0.5, 0.5);
            picA.pos(600, 170);
            var picB = new Laya.Image("res/ui/icon/lyf_64x.png");
            midBox.addChild(picB);
            picB.pos(0, 220);
        };
        LayaLaunch.initCanvas = function ($caves) {
            new LayaLaunch();
        };
        return LayaLaunch;
    }());
    base.LayaLaunch = LayaLaunch;
})(base || (base = {}));
//# sourceMappingURL=LayaLaunch.js.map