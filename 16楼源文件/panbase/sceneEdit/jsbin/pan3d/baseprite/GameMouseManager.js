var Pan3d;
(function (Pan3d) {
    var me;
    (function (me) {
        var GameMouseManager = /** @class */ (function () {
            function GameMouseManager() {
                this.ready = false;
                this.resetPos = new me.Vector2D(150, 400);
                this.bindPos = new me.Vector2D();
                this.useMouseEvent = true;
                this.lastMouseEvetTime = 0;
                this.nextSendTime = 0;
                this.skipNum = 0;
                this.isFristTouchMove = true;
                this.yaoganIdentifier = -1;
            }
            GameMouseManager.getInstance = function () {
                if (!this._instance) {
                    this._instance = new GameMouseManager();
                }
                return this._instance;
            };
            GameMouseManager.prototype.setBtn = function ($a, $b) {
                this.b_yaogan_bar = $a;
                this.b_yaogan_bg = $b;
                this.ready = true;
            };
            GameMouseManager.prototype.addMouseEvent = function () {
                var _this = this;
                if (me.Scene_data.isPc) {
                    document.addEventListener(me.MouseType.MouseDown, function ($evt) { _this.onMouse($evt); });
                    document.addEventListener(me.MouseType.MouseUp, function ($evt) { _this.onMouse($evt); });
                    document.addEventListener(me.MouseType.MouseMove, function ($evt) { _this.onMouse($evt); });
                    document.addEventListener(me.MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
                }
                else {
                    document.addEventListener(me.MouseType.TouchMove, function ($evt) { _this.onTouchMove($evt); });
                    document.addEventListener(me.MouseType.TouchEnd, function ($evt) { _this.onTouchEnd($evt); });
                    document.addEventListener(me.MouseType.TouchStart, function ($evt) { _this.onTouchStart($evt); });
                }
                this.bindPos.x = this.resetPos.x;
                this.bindPos.y = this.resetPos.y;
                this.updataFun = function (t) { _this.updata(t); };
            };
            GameMouseManager.prototype.onMouseWheel = function ($evt) {
                me.AstarUtil.sceneVectList = null;
                me.Scene_data.gameAngle += $evt.wheelDelta / 100;
            };
            GameMouseManager.prototype.isCanUseMouseEvent = function () {
                return this.useMouseEvent;
            };
            GameMouseManager.prototype.onMouse = function ($e) {
                if (!this.isCanUseMouseEvent()) {
                    return;
                }
                if ($e.button == 2) {
                    return;
                }
                var evt;
                var point = new me.Vector2D();
                if ($e instanceof MouseEvent) {
                    if ($e.type == me.MouseType.MouseDown) {
                        evt = new me.InteractiveEvent(me.InteractiveEvent.Down);
                    }
                    else if ($e.type == me.MouseType.MouseUp) {
                        evt = new me.InteractiveEvent(me.InteractiveEvent.Up);
                    }
                    else if ($e.type == me.MouseType.MouseMove) {
                        evt = new me.InteractiveEvent(me.InteractiveEvent.Move);
                    }
                    else if ($e.type == me.MouseType.MouseClick) {
                    }
                    point.x = $e.pageX;
                    point.y = $e.pageY;
                }
                if (evt) {
                    evt.mouseEvent = $e;
                }
                this.makeMouseEvent(evt, point);
            };
            GameMouseManager.prototype.makeMouseEvent = function (evt, point) {
                this.lastMouseEvetTime = me.TimeUtil.getTimer();
                var temp = win.LayerManager.getInstance().mouseEvetData(evt, point);
                if (evt.type == me.InteractiveEvent.Move) {
                    return;
                }
            };
            GameMouseManager.prototype.mouseToEvent = function ($touchEvent) {
                var evt;
                var point = new me.Vector2D();
                if ($touchEvent.type == me.MouseType.TouchStart) {
                    evt = new me.InteractiveEvent(me.InteractiveEvent.Down);
                }
                else if ($touchEvent.type == me.MouseType.TouchEnd) {
                    evt = new me.InteractiveEvent(me.InteractiveEvent.Up);
                    point.x = $touchEvent.changedTouches[0].pageX;
                    point.y = $touchEvent.changedTouches[0].pageY;
                }
                else if ($touchEvent.type == me.MouseType.TouchMove) {
                    evt = new me.InteractiveEvent(me.InteractiveEvent.Move);
                }
                if ($touchEvent.touches.length) {
                    point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
                    point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
                }
                this.makeMouseEvent(evt, point);
                return evt;
            };
            GameMouseManager.prototype.cantClikGround = function ($mousePos) {
                if (me.GameInstance.useYaoGan) {
                    return false;
                }
                if (!me.GameInstance.mainChar) {
                    return false;
                }
                if (!me.SceneManager.getInstance().render) {
                    return false;
                }
                if (me.GameInstance.mainChar.isDeath) {
                    return false;
                }
                return true;
            };
            GameMouseManager.prototype.onSceneMouseDown = function ($evt) {
                if (this.ready) {
                    return;
                }
                var $mousePos = new me.Vector2D;
                if (!me.Scene_data.verticalScene) {
                    $mousePos.x = $evt.x;
                    $mousePos.y = $evt.y;
                }
                else {
                    $mousePos.x = $evt.y;
                    $mousePos.y = me.Scene_data.stageHeight - $evt.x;
                }
            };
            GameMouseManager.prototype.onTouchStart = function ($e) {
                if (!this.isCanUseMouseEvent()) {
                    return;
                }
                this.mouseToEvent($e);
            };
            GameMouseManager.prototype.onTouchEnd = function ($e) {
                if (!this.isCanUseMouseEvent()) {
                    return;
                }
                if (me.GameInstance.useYaoGan) {
                    var hasYaoGan = false;
                    for (var i = 0; i < $e.touches.length; i++) {
                        if ($e.touches[i].identifier == this.yaoganIdentifier) {
                            hasYaoGan = true;
                        }
                    }
                    if (!hasYaoGan) {
                        this.bindPos.x = this.resetPos.x;
                        this.bindPos.y = this.resetPos.y;
                        me.TimeUtil.removeFrameTick(this.updataFun);
                        this.canTestClikGroundMove = null; //
                        me.GameInstance.useYaoGan = false;
                        this.setBasePostion();
                    }
                }
                this.mouseToEvent($e);
            };
            GameMouseManager.prototype.setBasePostion = function () {
                this.b_yaogan_bar.x = this.bindPos.x - this.b_yaogan_bar.width / 2;
                this.b_yaogan_bar.y = this.bindPos.y - this.b_yaogan_bar.height / 2;
                //console.log(this.b_yaogan_bar.y)
                this.b_yaogan_bg.x = this.bindPos.x - this.b_yaogan_bg.width / 2;
                this.b_yaogan_bg.y = this.bindPos.y - this.b_yaogan_bg.height / 2;
            };
            GameMouseManager.prototype.onTouchMove = function ($e) {
                // alert("--MOve--");
                if (!this.isCanUseMouseEvent()) {
                    return;
                }
            };
            GameMouseManager.prototype.updata = function (t) {
            };
            GameMouseManager.prototype.getMouseDownPos = function ($touch) {
                var $mousePos = new me.Vector2D;
                if (!me.Scene_data.verticalScene) {
                    $mousePos.x = $touch.pageX / me.UIData.Scale;
                    $mousePos.y = $touch.pageY / me.UIData.Scale;
                }
                else {
                    $mousePos.x = $touch.pageY / me.UIData.Scale;
                    $mousePos.y = (me.Scene_data.stageHeight - $touch.pageX) / me.UIData.Scale;
                }
                $mousePos.y += (me.Scene_data.stageHeight / me.UIData.Scale - 540);
                return $mousePos;
            };
            return GameMouseManager;
        }());
        me.GameMouseManager = GameMouseManager;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=GameMouseManager.js.map