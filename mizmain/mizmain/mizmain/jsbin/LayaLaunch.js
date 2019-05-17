var baselaunch;
(function (baselaunch) {
    var Browser = Laya.Browser;
    var Stage = Laya.Stage;
    var LayaGame2dDemo = LayaPan3D.LayaGame2dDemo;
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
            let ParticleBoneData_setAllByteInfo = Pan3d.ParticleBoneData.prototype.setAllByteInfo;
            Pan3d.ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
                return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
            }
            */
        };
        LayaLaunch.prototype.init = function () {
            // LayaLaunch.overrideMethods()
            var _this = this;
            this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
            Laya.stage.alignV = Stage.ALIGN_LEFT;
            Laya.stage.alignH = Stage.ALIGN_TOP;
            Laya.stage.scaleMode = "full";
            Laya.stage.bgColor = "#232628";
            Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            Pan3d.Scene_data.fileuiRoot = "res/";
            Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";
            Pan3d.Engine.init(this._canvas);
            var topBox = new Laya.Box();
            Laya.stage.addChild(topBox);
            var midBox = new Laya.Box();
            Laya.stage.addChild(midBox);
            var picA = new Laya.Image("res/ui/icon/lyf_64x.png");
            Laya.stage.addChild(picA);
            picA.scale(0.5, 0.5);
            picA.pos(600, 170);
            var spriteC = new LayaGame2dDemo("res/ui/icon/512a.jpg", function () {
                spriteC.scale(1, 1);
            });
            Laya.stage.addChild(spriteC);
            spriteC.pos(350, 0);
            var spriteD = new LayaGame2dDemo("res/ui/icon/512b.jpg", function () {
                spriteD.scale(2, 1);
            });
            Laya.stage.addChild(spriteD);
            spriteD.pos(200, 250);
            var picB = new Laya.Image("res/ui/icon/lyf_64x.png");
            Laya.stage.addChild(picB);
            picB.pos(0, 220);
            this.lastTm = Pan3d.TimeUtil.getTimer();
            Laya.stage.frameLoop(1, this, function () {
                var t = Pan3d.TimeUtil.getTimer() - _this.lastTm;
                //  Pan3d.TimeUtil.START_TIME += t * -1;
                _this.lastTm = Pan3d.TimeUtil.getTimer();
                Pan3d.TimeUtil.update();
            });
        };
        LayaLaunch.initCanvas = function ($caves) {
            new LayaLaunch();
        };
        return LayaLaunch;
    }());
    baselaunch.LayaLaunch = LayaLaunch;
})(baselaunch || (baselaunch = {}));
//# sourceMappingURL=LayaLaunch.js.map