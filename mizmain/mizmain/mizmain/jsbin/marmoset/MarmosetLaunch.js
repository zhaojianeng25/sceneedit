var marmoset;
(function (marmoset) {
    var Browser = Laya.Browser;
    var Stage = Laya.Stage;
    var MarmosetLaunch = /** @class */ (function () {
        function MarmosetLaunch() {
            this.init();
        }
        Object.defineProperty(MarmosetLaunch.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        MarmosetLaunch.overrideMethods = function () {
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
        MarmosetLaunch.prototype.init = function () {
            // LayaLaunch.overrideMethods()
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
            picA.pos(0, 0);
            console.log(layapan_me.LayaSceneChar);
            var spriteD = new marmoset.Marmoset3dScene("res/ui/icon/512b.jpg", function () {
                spriteD.scale(1, 0.75);
            });
            Laya.stage.addChild(spriteD);
            spriteD.pos(100, 100);
            Laya.stage.frameLoop(1, this, function () {
                Pan3d.TimeUtil.update();
            });
        };
        MarmosetLaunch.initCanvas = function ($caves) {
            new MarmosetLaunch();
        };
        return MarmosetLaunch;
    }());
    marmoset.MarmosetLaunch = MarmosetLaunch;
})(marmoset || (marmoset = {}));
//# sourceMappingURL=MarmosetLaunch.js.map