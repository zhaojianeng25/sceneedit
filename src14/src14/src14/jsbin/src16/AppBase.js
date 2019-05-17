/*
* name
*/
var AppBase = /** @class */ (function () {
    function AppBase() {
        // 是否休眠
        this._isBlur = false;
        // 是否浮空
        this._floating = false;
        this._floatingScale = 0.9;
        this._avatarFloatingScale = 1 / this._floatingScale;
        // 客户端画布缩放比
        this._clientScale = 1;
        // 场景基础缩放比(基于客户端画布缩放比)
        this._sceneBaseScale = 1;
        // 场景最终缩放比
        this._sceneEndScale = 1;
        // 场景当前缩放比
        this._sceneCurScale = 0;
        // 场景缩放速率
        this._sceneScaleSpeed = 0;
        this._musicUrl = "";
    }
    Object.defineProperty(AppBase.prototype, "isBlur", {
        set: function (v) {
            this._isBlur = v;
            // Laya.stage.renderingEnabled = !this._isBlur;
            // this._uiRoot && (this._uiRoot.visible = !this._isBlur);
            // this._sceneRoot && (this._sceneRoot.visible = !this._isBlur);
            Laya.SoundManager.musicMuted = this._isBlur;
            Laya.SoundManager.stopAllSound();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "sync", {
        get: function () {
            if (!this._sync) {
                this._sync = new Sync(this);
            }
            return this._sync;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "sceneObjectMgr", {
        get: function () {
            if (!this._sceneObjectMgr) {
                this._sceneObjectMgr = new SceneObjectMgr(this);
            }
            return this._sceneObjectMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "localStorageMgr", {
        get: function () {
            if (!this._localStorageMgr) {
                this._localStorageMgr = new game.managers.LocalStorageMgr(this);
            }
            return this._localStorageMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "aCotrller", {
        get: function () {
            if (!this._aCotrller) {
                this._aCotrller = new ACotrller(this);
            }
            return this._aCotrller;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "battleProxy", {
        get: function () {
            if (!this._battleProxy) {
                this._battleProxy = new battle.BattleProxy(this);
            }
            return this._battleProxy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "uiRoot", {
        get: function () {
            return this._uiRoot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "sceneRoot", {
        get: function () {
            return this._sceneRoot;
        },
        enumerable: true,
        configurable: true
    });
    // 鼠标按下
    AppBase.prototype.onMouseDown = function (e) {
        if (this._uiRoot && this._uiRoot.onMouseDown(e)) {
            return;
        }
        this._sceneRoot && this._sceneRoot.onMouseDown(e);
    };
    // 鼠标移动
    AppBase.prototype.onMouseMove = function (e) {
        if (this._uiRoot && this._uiRoot.onMouseMove(e)) {
            return;
        }
        this._sceneRoot && this._sceneRoot.onMouseMove(e);
    };
    // 鼠标弹起
    AppBase.prototype.onMouseUp = function (e) {
        if (this._uiRoot && this._uiRoot.onMouseUp(e)) {
            return;
        }
        this._sceneRoot && this._sceneRoot.onMouseUp(e);
    };
    // 鼠标移开
    AppBase.prototype.onMouseOut = function (e) {
        if (this._uiRoot && this._uiRoot.onMouseOut(e)) {
            return;
        }
        this._sceneRoot && this._sceneRoot.onMouseOut(e);
    };
    AppBase.prototype.onKeyDown = function (e) {
        this._uiRoot && this._uiRoot.onKeyDown(e);
    };
    // 心跳更新
    AppBase.prototype.onUpdate = function (diff) {
        this._isBlur = window["appInBackground"];
        this._sync && this._sync.update(diff);
        this._sceneObjectMgr && this._sceneObjectMgr.update(diff);
        this._aCotrller && this._aCotrller.update(diff);
        this._uiRoot && this._uiRoot.update(diff);
        if (this._sceneRoot) {
            if (this._sceneCurScale != this._sceneEndScale) {
                if (this._sceneCurScale <= 0) {
                    this._sceneCurScale = this._sceneEndScale;
                    WeatherBase.LOCK_RESET = false; // 解除天气重置锁定
                }
                else {
                    var d = this._sceneEndScale - this._sceneCurScale;
                    if (Math.abs(d) < 0.002) {
                        this._sceneCurScale = this._sceneEndScale;
                        WeatherBase.LOCK_RESET = false; // 解除天气重置锁定
                    }
                    else {
                        var scaleSpeed = this._sceneScaleSpeed;
                        if (!scaleSpeed) {
                            scaleSpeed = d / 5;
                        }
                        this._sceneCurScale += scaleSpeed;
                        WeatherBase.LOCK_RESET = true; // 锁定天气重置
                    }
                }
                this.sceneResize(this._sceneCurScale);
                if (this._sceneScaleHandler)
                    this._sceneScaleHandler.runWith(this._sceneCurScale);
            }
            this._sceneRoot.update(diff);
        }
    };
    Object.defineProperty(AppBase.prototype, "floating", {
        set: function (v) {
            if (this._floating == v) {
                return;
            }
            this._floating = v;
            if (this.sceneObjectMgr.mainUnit) {
                var effect = ObjectPools.malloc(EffectAvatar);
                effect.setData("0000upgrade");
                effect.toward = Direct.BOTTOM;
                effect.anchorObject = this.sceneObjectMgr.mainUnit;
                if (this._floating)
                    effect.offSet = [0, 0, 0, 0, 0, -80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.sceneRoot.addEffect(effect);
            }
            this.onResize(this._clientWidth, this._clientHeight, this._clientScale, this._sceneBaseScale, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "floatingScale", {
        get: function () {
            return this._floatingScale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "avatarFloatingScale", {
        get: function () {
            return this._avatarFloatingScale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "clientWidth", {
        get: function () {
            return this._clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "clientHeight", {
        get: function () {
            return this._clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "clientScale", {
        get: function () {
            return this._clientScale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "sceneBaseScale", {
        get: function () {
            return this._sceneBaseScale;
        },
        set: function (v) {
            this._sceneBaseScale = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "sceneEndScale", {
        get: function () {
            return this._sceneEndScale;
        },
        set: function (v) {
            this._sceneEndScale = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "sceneCurScale", {
        get: function () {
            return this._sceneCurScale;
        },
        set: function (v) {
            this._sceneCurScale = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "sceneScaleSpeed", {
        set: function (v) {
            this._sceneScaleSpeed = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppBase.prototype, "mouseLock", {
        set: function (v) {
            this._uiRoot && (this._uiRoot.mouseLock = v);
            this._sceneRoot && (this._sceneRoot.mouseLock = v);
        },
        enumerable: true,
        configurable: true
    });
    // 游戏窗口尺寸发生变化
    AppBase.prototype.onResize = function (width, height, clientScale, sceneBaseScale, tween, handler) {
        if (tween === void 0) { tween = false; }
        if (handler === void 0) { handler = null; }
        this._clientWidth = width;
        this._clientHeight = height;
        this._clientScale = clientScale;
        this._sceneBaseScale = sceneBaseScale;
        this._sceneScaleHandler = handler;
        var x = 0, y = 0;
        //判断IPhoneX
        if (onIPhoneX) {
            if (Laya.stage.screenMode == Stage.SCREEN_HORIZONTAL) {
                //正横屏 
                width = width * (1 - AppBase.IPHONEX_TOP - AppBase.IPHONEX_BOTTOM);
                // x偏移
                x = width * AppBase.IPHONEX_TOP * clientScale;
            }
            else if (Laya.stage.screenMode == Stage.SCREEN_VERTICAL) {
                // 竖屏
                height = height * (1 - AppBase.IPHONEX_TOP - AppBase.IPHONEX_BOTTOM);
                // y偏移
                y = height * AppBase.IPHONEX_TOP * clientScale;
            }
            else {
                if (window.orientation == 0) {
                    // 竖屏
                    height = height * (1 - AppBase.IPHONEX_TOP - AppBase.IPHONEX_BOTTOM);
                    // y偏移
                    y = height * AppBase.IPHONEX_TOP * clientScale;
                }
                else if (window.orientation == 90) {
                    //正横屏 
                    width = width * (1 - AppBase.IPHONEX_TOP - AppBase.IPHONEX_BOTTOM);
                    // x偏移
                    x = width * AppBase.IPHONEX_TOP * clientScale;
                }
                else if (window.orientation == -90) {
                    //反横屏
                    width = width * (1 - AppBase.IPHONEX_TOP - AppBase.IPHONEX_BOTTOM);
                    // x偏移
                    x = width * AppBase.IPHONEX_BOTTOM * clientScale;
                }
            }
        }
        if (this._uiRoot) {
            this._uiRoot.x = x;
            this._uiRoot.y = y;
            this._uiRoot.scale(clientScale, clientScale);
            this._uiRoot.resize(width, height);
            this._uiRoot.graphics.clear();
            x = x / clientScale;
            y = y / clientScale;
            this._uiRoot.graphics.drawRect(-x, -y, this._clientWidth, y, '#00000');
            this._uiRoot.graphics.drawRect(-x, height, this._clientWidth, this._clientHeight - y - height, '#00000');
            this._uiRoot.graphics.drawRect(-x, 0, x, height, '#00000');
            this._uiRoot.graphics.drawRect(width, 0, this._clientWidth - x - width, height, '#00000');
        }
        this._blackBorder && this._blackBorder.scale(clientScale, clientScale);
        this._blackBorder && this._blackBorder.resize(width, height);
        Laya.stage.addChild(this._blackBorder);
        // 如果浮空视野拉远
        this._sceneEndScale = this._floating ? sceneBaseScale * this._floatingScale : sceneBaseScale;
        // WeatherBase.LOCK_RESET = tween;
        if (!tween) {
            this._sceneCurScale = 0;
        }
    };
    AppBase.prototype.sceneResize = function (scale) {
        var sceneScale = this._clientScale * scale;
        var sceneWidth = this._clientWidth / scale;
        var sceneHeight = this._clientHeight / scale;
        this._sceneRoot.scale(sceneScale, sceneScale);
        this._sceneRoot.resize(sceneWidth, sceneHeight);
    };
    AppBase.prototype.playSound = function (url, loops, complete, soundClass, startTime) {
        if (this._isBlur) {
            return;
        }
        RefSound.Get(url).playSound(url, loops, soundClass, startTime);
    };
    AppBase.prototype.stopSound = function (url) {
        RefSound.Get(url).stopSound();
        // Laya.SoundManager.stopSound(url);
    };
    AppBase.prototype.playMusic = function (url, loops, complete, startTime) {
        if (this._musicUrl != "")
            this.stopMusic();
        this._musicUrl = url;
        return Laya.SoundManager.playMusic(url, loops, complete, startTime);
    };
    AppBase.prototype.stopMusic = function () {
        Laya.SoundManager.stopMusic();
        if (this._musicUrl != "")
            Laya.SoundManager.destroySound(this._musicUrl);
    };
    //Iphone X 安全区域距离顶部
    AppBase.IPHONEX_TOP = 44 / 812;
    //Iphone X 安全区域距离底部
    AppBase.IPHONEX_BOTTOM = 34 / 812;
    return AppBase;
}());
//# sourceMappingURL=AppBase.js.map