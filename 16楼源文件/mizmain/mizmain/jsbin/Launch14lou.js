var game14lou;
(function (game14lou) {
    var Stage = Laya.Stage;
    var Browser = Laya.Browser;
    var Game2dDemo = base.Game2dDemo;
    var Game3dDemo = base.Game3dDemo;
    // 是否iphoneX
    var onIPhoneX = false;
    // 启动程序
    var Launch14lou = /** @class */ (function () {
        function Launch14lou() {
            var _this = this;
            // 美术设计画布像素高宽
            this.widthDesginPixelw = 750;
            this.heightDesginPixelw = 1334;
            this.minSacleDesginPixelw = 0.5625;
            this.maxSacleDesginPixelw = 0.64;
            // 浏览器可视高宽（在设备上的像素高宽）
            this._designWidth = 0;
            this._designHeight = 0;
            // 客户端画布缩放比
            this._clientScale = 1;
            // 场景缩放比(基于客户端画布缩放比)
            this._sceneScale = 1.17;
            this._tweenScale = false;
            // 是否休眠
            this.isBlur = false;
            this._showStat = false;
            // 浏览器可视原始高宽
            this._browserClientWidth = 0;
            this._browserClientHeight = 0;
            this._lockOrientation = true;
            this.onPC = false;
            this.apiShareCallback = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this._shareCallback && _this._shareCallback.call(_this);
                logd("分享成功");
            };
            this.apiPayCallback = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this._payCallback && _this._payCallback.call(_this);
                logd("支付成功");
            };
            this.apiFocusCallback = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this._focusCallback && _this._focusCallback.call(_this);
                logd("关注成功");
            };
            isDebug = (location.href.indexOf("file") == 0);
            // 初始化舞台
            this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
            Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            Pan3d.Scene_data.fileuiRoot = "res/";
            Pan3d.Scene_data.fileRoot = "res/";
            //   Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";
            Pan3d.Engine.init(this.canvas);
            // 是否IPhoneX
            if (Browser.onIPhone && Math.abs(Browser.pixelRatio - 3) < 0.01) {
                onIPhoneX = (Browser.clientWidth == 375 && Browser.clientHeight == 812) || (Browser.clientWidth == 812 && Browser.clientHeight == 375);
            }
            // 引擎有bug这个鬼东西暂时不能设置
            // Laya.AtlasResourceManager.atlasTextureWidth = 1024;
            // Laya.AtlasResourceManager.atlasTextureHeight = 1024;
            Laya.AtlasResourceManager.maxTextureCount = 1;
            // 抗锯齿
            Config.isAntialias = true;
            //启用DebugPanel调试面板
            //Laya.DebugTool.init();
            //log_level = 1;
            this.checkWorkerLoaderEnable();
            ////////////////连接服务器////////////////////////////////////
            logd("Browser.window.username:", Browser.window.username);
            logl("Browser.window.username:", Browser.window.username);
            //this.netWork.connectByUrl(Browser.window.server);
            // this.addNetworkListener(this.netWork);
            //game.modules.ModuleManager.init(game.modules.LoadModuleCmd);
            // this.showStat = isDebug;
            Laya.loader.maxLoader = 3;
            Laya.loader.retryNum = 10;
            Laya.loader.retryDelay = 500;
            var onPC = Browser.onPC;
            if (!onPC) {
                if (window.orientation == 0) {
                    Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
                }
                // else if (window.orientation == 90 || window.orientation == -90) {
                //     Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
                // }
                window.addEventListener("orientationchange", function (e) {
                    _this.lockOrientation = false;
                    Laya.stage.screenMode = Stage.SCREEN_NONE;
                });
                // 默认场景最小
                // this._sceneScale = 0.8;
            }
            // Vesion.addSearchPath("CN/", "data.bin");
            logd('game_start');
            var picA = new Laya.Image("res/ui/icon/lyf_64x.png");
            Laya.stage.addChild(picA);
            picA.scale(0.5, 0.5);
            picA.pos(600, 170);
            this.addScenePanel();
        }
        Object.defineProperty(Launch14lou.prototype, "showStat", {
            get: function () {
                return this._showStat;
            },
            set: function (v) {
                this._showStat = v;
                this._showStat ? Laya.Stat.show() : Laya.Stat.hide();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Launch14lou.prototype, "sceneScale", {
            get: function () {
                return this._sceneScale;
            },
            set: function (v) {
                if (this._sceneScale == v)
                    return;
                this._sceneScale = v;
                this.onResize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Launch14lou.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        Launch14lou.prototype.addScenePanel = function () {
            var midBox = new Laya.Box();
            Laya.stage.addChild(midBox);
            var topBox = new Laya.Box();
            Laya.stage.addChild(topBox);
            var spriteA = new Game3dDemo("res/ui/icon/256b.png", function () {
                spriteA.scale(2, 1);
            });
            topBox.addChild(spriteA);
            var spriteC = new Game2dDemo("res/ui/icon/512a.jpg", function () {
                spriteC.scale(1, 2);
            });
            topBox.addChild(spriteC);
            spriteC.pos(350, 100);
            var picA = new Laya.Image("res/ui/icon/lyf_64x.png");
            midBox.addChild(picA);
            picA.scale(0.5, 0.5);
            picA.pos(600, 170);
        };
        Launch14lou.prototype.checkWorkerLoaderEnable = function () {
            var workerLoaderEnable = false;
        };
        Launch14lou.prototype.init = function () {
        };
        // 心跳更新
        Launch14lou.prototype.onUpdate = function () {
            var timer = Laya.timer.currTimer;
            var diff = timer - this._prevUpdateTimer;
            // logd('Launch.onUpdate', timer - this._prevUpdateTimer, diff);   
            this._prevUpdateTimer = timer;
            if (!diff) {
                return;
            }
            // 这样做才能防止白边
            this.checkClientSize();
            // 更新设计分辨率
            // Laya.stage.designWidth = this._designWidth;
            if (Laya.stage.width != this._designWidth)
                Laya.stage.width = this._designWidth;
            // Laya.stage.designHeight = this._designHeight;
            if (Laya.stage.height != this._designHeight)
                Laya.stage.height = this._designHeight;
            // 心跳
            // let diff = Laya.timer.delta;
        };
        // 鼠标按下
        Launch14lou.prototype.onMouseDown = function (e) {
        };
        // 鼠标移动
        Launch14lou.prototype.onMouseMove = function (e) {
        };
        // 鼠标弹起
        Launch14lou.prototype.onMouseUp = function (e) {
        };
        // 鼠标移开
        Launch14lou.prototype.onMouseOut = function (e) {
        };
        Launch14lou.prototype.onKeyDown = function (e) {
        };
        // 休眠
        Launch14lou.prototype.onBlur = function () {
            this.isBlur = true;
        };
        // 激活
        Launch14lou.prototype.onFocus = function () {
            this.isBlur = false;
        };
        // 游戏窗口尺寸发生变化
        Launch14lou.prototype.onResize = function () {
            logd('Browser:', Browser.width, Browser.height, Browser.clientWidth, Browser.clientHeight, Browser.pixelRatio);
            logd('window:', window.innerWidth, window.innerHeight, window.outerWidth, window.outerHeight, window.devicePixelRatio);
            logd('screen:', screen.width, screen.height, screen.availWidth, screen.availHeight, screen.pixelDepth);
            logd('onIPhoneX', onIPhoneX);
            this.checkClientSize();
            var sceneScale = this._sceneScale;
            var clientScale = this._clientScale;
            var clientWidth = this._clientWidth;
            var clientHeight = this._clientHeight;
            // if (!Browser.onPC) {
            //     if (clientWidth > clientHeight) {
            //         // 如果是横屏模式  并且有之前的竖屏缩放数据
            //         if (this._verticalClientScale) {
            //             sceneScale = this._verticalClientScale / this._clientScale;
            //             this._verticalClientScale = 0;
            //         }
            //     }
            //     else {
            //         this._verticalClientScale = this._clientScale;
            //     }
            // }
            // alert(clientScale + ',' + sceneScale)
            this.onResize3D(sceneScale);
        };
        // 3d场景尺寸发生变化
        Launch14lou.prototype.onResize3D = function (sceneScale) {
        };
        Object.defineProperty(Launch14lou.prototype, "lockOrientation", {
            set: function (v) {
                this._lockOrientation = v;
            },
            enumerable: true,
            configurable: true
        });
        // 校验浏览器可视屏幕像素
        Launch14lou.prototype.checkClientSize = function () {
            var browser_clientWidth = Browser.clientWidth;
            var browser_clientHeight = Browser.clientHeight;
            this.onPC = Browser.onPC;
            if (!this.onPC && this._prevBrowserClientWidth) {
                if ((browser_clientWidth == this._prevBrowserClientWidth
                    && browser_clientHeight != this._prevBrowserClientHeight)
                    || (browser_clientHeight == this._prevBrowserClientHeight
                        && browser_clientWidth != this._prevBrowserClientWidth)) {
                    // 呼出软键盘了
                    // if(Laya.stage.screenMode == Stage.SCREEN_HORIZONTAL){
                    //     // 如果自动横屏改成竖屏
                    //     Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
                    //     this.verticalByInput = true;
                    // }
                    return;
                }
            }
            var __width = browser_clientWidth;
            var __height = browser_clientHeight;
            switch (Laya.stage.screenMode) {
                case Stage.SCREEN_VERTICAL:
                    browser_clientHeight = Math.max(__width, __height);
                    browser_clientWidth = Math.min(__width, __height);
                    break;
                case Stage.SCREEN_HORIZONTAL:
                    browser_clientHeight = Math.min(__width, __height);
                    browser_clientWidth = Math.max(__width, __height);
                    break;
            }
            if (this._browserClientWidth == browser_clientWidth && this._browserClientHeight == browser_clientHeight) {
                return;
            }
            this._browserClientWidth = browser_clientWidth;
            this._browserClientHeight = browser_clientHeight;
            this._prevBrowserClientWidth = browser_clientWidth;
            this._prevBrowserClientHeight = browser_clientHeight;
            this._designWidth = this._browserClientWidth * Browser.pixelRatio;
            this._designHeight = this._browserClientHeight * Browser.pixelRatio;
            // if (this._designWidth < this._designHeight && (this._designWidth < 1280 || this._designHeight < 720)) {
            //     // 屏幕太小适应手机的适配方案
            //     this.onPC = false;
            // }
            var wScale = this._designWidth / this.widthDesginPixelw;
            var hScale = this._designHeight / this.heightDesginPixelw;
            this._clientScale = Math.min(wScale, hScale);
            if (wScale > hScale) {
                this._clientWidth = this.heightDesginPixelw * (this._designWidth / this._designHeight);
                this._clientHeight = this.heightDesginPixelw;
            }
            else {
                this._clientWidth = this.widthDesginPixelw;
                this._clientHeight = this.widthDesginPixelw * (this._designHeight / this._designWidth);
            }
        };
        Object.defineProperty(Launch14lou.prototype, "shareCallback", {
            set: function (v) {
                this._shareCallback = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Launch14lou.prototype, "payCallback", {
            set: function (v) {
                this._payCallback = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Launch14lou.prototype, "focusCallback", {
            set: function (v) {
                this._focusCallback = v;
            },
            enumerable: true,
            configurable: true
        });
        Launch14lou.initCanvas = function ($caves) {
            new Launch14lou();
        };
        return Launch14lou;
    }());
    game14lou.Launch14lou = Launch14lou;
})(game14lou || (game14lou = {}));
//# sourceMappingURL=Launch14lou.js.map