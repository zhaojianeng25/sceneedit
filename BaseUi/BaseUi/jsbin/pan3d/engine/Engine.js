var Pan3d;
(function (Pan3d) {
    var me;
    (function (me) {
        var Engine = /** @class */ (function () {
            function Engine() {
            }
            Engine.init = function ($caves) {
                var isIpad = /ipad/i.test(navigator.userAgent);
                var isIphone = /iPhone/i.test(navigator.userAgent);
                var isAndroid = /android/i.test(navigator.userAgent);
                var isWindow = /iindow/i.test(navigator.userAgent);
                var sUserAgent = navigator.userAgent.toLowerCase();
                ////console.log("--sUserAgent--",sUserAgent,isIpad,isIphone,isAndroid,isWindow);
                if (isIpad || isIphone || isAndroid) {
                    me.Scene_data.isPc = false;
                }
                else {
                    me.Scene_data.isPc = true;
                }
                if (isIpad || isIphone) {
                    me.Scene_data.isIos = true;
                }
                else {
                    me.Scene_data.isIos = false;
                }
                me.Scene_data.vpMatrix = new me.Matrix3D;
                me.Scene_data.canvas3D = $caves;
                me.Scene_data.context3D = new me.Context3D();
                me.Scene_data.context3D.init($caves);
                me.UIManager.getInstance().init();
                me.Scene_data.cam3D = new me.Camera3D;
                me.Scene_data.focus3D = new me.Object3D;
                me.Scene_data.focus3D.x = 0;
                me.Scene_data.focus3D.y = 0;
                me.Scene_data.focus3D.z = 0;
                me.Scene_data.focus3D.rotationY = 135;
                me.Scene_data.focus3D.rotationX = -45;
                me.Scene_data.light = new me.LightVo();
                Engine.testBlob();
                Engine.resetSize();
                // Engine.initShadow();
                me.TimeUtil.init();
                me.PathManager.init();
            };
            Engine.resReady = function () {
                Engine.initPbr();
            };
            Engine.testBlob = function () {
                //Scene_data.supportBlob = false;
                //return;
                try {
                    var blob = new Blob();
                }
                catch (e) {
                    me.Scene_data.supportBlob = false;
                    return;
                }
                me.Scene_data.supportBlob = true;
            };
            Engine.initPbr = function () {
                if (!me.Scene_data.pubLut) {
                    me.TextureManager.getInstance().getTexture(me.Scene_data.fileRoot + "base/brdf_ltu.jpg", function ($texture) {
                        me.Scene_data.pubLut = $texture.texture;
                    }, 1);
                }
                if (!me.Scene_data.skyCubeMap) {
                    me.TextureManager.getInstance().loadCubeTexture(me.Scene_data.fileRoot + "base/cube/e", function ($ary) {
                        me.Scene_data.skyCubeMap = $ary;
                    });
                }
            };
            Engine.initShadow = function () {
                me.TextureManager.getInstance().getTexture(me.Scene_data.fileRoot + "base/shadow.png", function ($texture) {
                    me.Display3dShadow.texture = $texture.texture;
                });
            };
            Engine.resetSize = function (a, b) {
                if (a === void 0) { a = 0; }
                if (b === void 0) { b = 0; }
                me.Scene_data.stageWidth = document.body.clientWidth;
                me.Scene_data.stageHeight = document.body.clientHeight;
                me.Scene_data.canvas3D.width = me.Scene_data.stageWidth;
                me.Scene_data.canvas3D.height = me.Scene_data.stageHeight;
                me.Scene_data.context3D.resetSize(me.Scene_data.stageWidth, me.Scene_data.stageHeight);
                me.UIManager.getInstance().resize();
                me.BloodManager.getInstance().resize();
                this.resetViewMatrx3D();
                me.Scene_data.canvas3D.style.position = "absolute";
                me.Scene_data.canvas3D.style.left = "0px";
                me.Scene_data.canvas3D.style.top = "0px";
            };
            Engine.resetViewMatrx3D = function () {
                if (me.Scene_data.viewMatrx3D) {
                    me.Scene_data.viewMatrx3D.identity();
                }
                else {
                    me.Scene_data.viewMatrx3D = new me.Matrix3D;
                }
                var fovw = me.Scene_data.stageWidth;
                var fovh = me.Scene_data.stageHeight;
                me.Scene_data.sceneViewHW = Math.max(fovw, fovh);
                me.Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.sceneCamScale, 1, 50, me.Scene_data.camFar);
                me.Scene_data.viewMatrx3D.appendScale(1 * (me.Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (me.Scene_data.sceneViewHW / fovw * 2), 1);
            };
            Engine.update = function () {
                me.TimeUtil.update();
                me.SceneManager.getInstance().update();
                me.FpsMc.update();
            };
            Engine.unload = function () {
                //NetManager.getInstance().close();
            };
            Engine.needVertical = true;
            Engine.needInputTxt = false; //在输入文本时，将不再可调整大小
            Engine.sceneCamScale = 1.76;
            return Engine;
        }());
        me.Engine = Engine;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Engine.js.map