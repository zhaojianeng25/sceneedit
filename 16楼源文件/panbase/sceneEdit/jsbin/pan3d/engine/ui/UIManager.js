var Pan3d;
(function (Pan3d) {
    var me;
    (function (me) {
        var UiTweenVo = /** @class */ (function () {
            function UiTweenVo() {
                this._scale = 1;
            }
            Object.defineProperty(UiTweenVo.prototype, "ui", {
                get: function () {
                    return this._ui;
                },
                set: function (value) {
                    this._ui = value;
                    this._baseRect = new me.Rectangle(this._ui.x, this._ui.y, this._ui.width, this._ui.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UiTweenVo.prototype, "scale", {
                get: function () {
                    return this._scale;
                },
                set: function (value) {
                    this._scale = value;
                    this._ui.width = this._baseRect.width * this._scale;
                    this._ui.height = this._baseRect.height * this._scale;
                    this._ui.x = this._baseRect.x + (this._baseRect.width - this._ui.width) / 2;
                    this._ui.y = this._baseRect.y + (this._baseRect.height - this._ui.height) / 2;
                },
                enumerable: true,
                configurable: true
            });
            UiTweenVo.prototype.destory = function () {
                this._ui = null;
                this._scale = null;
                this._baseRect = null;
            };
            UiTweenVo.getPosByPanel = function ($v2d, $layout, $toUIConatiner) {
                if ($layout === void 0) { $layout = null; }
                if ($toUIConatiner === void 0) { $toUIConatiner = null; }
                if (!this.baseUIConatiner) {
                    this.baseUIConatiner = new me.UIConatiner;
                }
                this.baseUIConatiner.width = me.UIData.designWidth;
                this.baseUIConatiner.height = me.UIData.designHeight;
                this.baseUIConatiner.middle = 0;
                this.baseUIConatiner.center = 0;
                if ($layout) {
                    for (var $key in $layout) {
                        this.baseUIConatiner[$key] = $layout[$key];
                    }
                }
                this.baseUIConatiner.resize();
                var $toPos = new me.Vector2D;
                $toPos.x = $v2d.x + this.baseUIConatiner.x / me.UIData.Scale;
                $toPos.y = $v2d.y + this.baseUIConatiner.y / me.UIData.Scale;
                if ($toUIConatiner) {
                    $toPos.x = $toPos.x - ($toUIConatiner.x / me.UIData.Scale);
                    $toPos.y = $toPos.y - ($toUIConatiner.y / me.UIData.Scale);
                }
                return $toPos;
            };
            return UiTweenVo;
        }());
        me.UiTweenVo = UiTweenVo;
        var UiTweenScale = /** @class */ (function () {
            function UiTweenScale() {
            }
            UiTweenScale.getInstance = function () {
                if (!this._instance) {
                    this._instance = new UiTweenScale();
                }
                return this._instance;
            };
            UiTweenScale.prototype.changeButSize = function ($ui) {
                var _this = this;
                if (this._uiTweenVo) {
                    return;
                }
                this._uiTweenVo = new UiTweenVo;
                this._uiTweenVo.ui = $ui;
                this._uiTweenVo.scale = 1;
                TweenMoveTo(this._uiTweenVo, 0.07, { scale: 1.2, onComplete: function () { _this.changeButScale(); } });
            };
            UiTweenScale.prototype.changeButScale = function () {
                var _this = this;
                this._uiTweenVo.scale = 1.2;
                TweenMoveTo(this._uiTweenVo, 0.05, { scale: 1, onComplete: function () { _this.changeButEnd(); } });
            };
            UiTweenScale.prototype.changeButEnd = function () {
                this._uiTweenVo.destory();
                this._uiTweenVo = null;
            };
            return UiTweenScale;
        }());
        me.UiTweenScale = UiTweenScale;
        var UIManager = /** @class */ (function () {
            function UIManager() {
                this._eventItem = new Array;
                this.lastTime = 0;
                me.Scene_data.uiStage = new me.UIStage();
                me.Scene_data.uiBlankStage = new me.UIStage();
                this._canvas = document.createElement("canvas");
                this._canvas.style.zIndex = "3";
                this._canvas.width = 200;
                this._canvas.height = 200;
                this._canvas.style.left = 200;
                this._canvas.style.top = 300;
                this._ctx = this._canvas.getContext("2d");
                this._ctx.textBaseline = me.TextAlign.TOP;
            }
            UIManager.getInstance = function () {
                var _this = this;
                if (!this._instance) {
                    this._instance = new UIManager();
                    UIManager.popClikNameFun = function ($name, $id) {
                        if ($id === void 0) { $id = 0; }
                        _this.uiClikName($name, $id);
                    };
                }
                return this._instance;
            };
            UIManager.uiClikName = function ($name, $id) {
            };
            UIManager.prototype.getContext2D = function ($width, $height, alianDefault) {
                if (alianDefault === void 0) { alianDefault = true; }
                this._canvas.width = $width;
                this._canvas.height = $height;
                this._ctx.clearRect(0, 0, $width, $height);
                alianDefault = true;
                if (alianDefault) {
                    this._ctx.textBaseline = me.TextAlign.TOP;
                    this._ctx.textAlign = me.TextAlign.LEFT;
                }
                return this._ctx;
            };
            UIManager.prototype.getGrayImageDatabyImg = function ($img) {
                var $ctx = UIManager.getInstance().getContext2D($img.width, $img.height, false);
                $ctx.drawImage($img, 0, 0);
                var $imgData = $ctx.getImageData(0, 0, $img.width, $img.height);
                var $gray;
                for (var i = 0; i < $imgData.data.length; i += 4) {
                    $gray = Math.floor($imgData.data[i + 0] * 0.3) + Math.floor($imgData.data[i + 1] * 0.59) + Math.floor($imgData.data[i + 2] * 0.11);
                    $imgData.data[i + 0] = $gray;
                    $imgData.data[i + 1] = $gray;
                    $imgData.data[i + 2] = $gray;
                }
                return $imgData;
            };
            UIManager.prototype.makeCtxToGray = function ($ctx, $rect) {
                var $imgData = $ctx.getImageData($rect.x, $rect.y, $rect.width, $rect.height);
                var $gray;
                for (var i = 0; i < $imgData.data.length; i += 4) {
                    $gray = Math.floor($imgData.data[i + 0] * 0.3) + Math.floor($imgData.data[i + 1] * 0.59) + Math.floor($imgData.data[i + 2] * 0.11);
                    $gray = $gray * 0.5 + 0.5;
                    $imgData.data[i + 0] = $gray;
                    $imgData.data[i + 1] = $gray;
                    $imgData.data[i + 2] = $gray;
                }
                $ctx.putImageData($imgData, $rect.x, $rect.y);
            };
            UIManager.prototype.showCanvas = function ($x, $y) {
                if ($x === void 0) { $x = 0; }
                if ($y === void 0) { $y = 0; }
                this._canvas.style.left = $x;
                this._canvas.style.top = $y;
                document.getElementById("root").appendChild(this._canvas);
            };
            UIManager.prototype.init = function () {
                me.ProgrmaManager.getInstance().registe(me.UIShader.UI_SHADER, new me.UIShader());
                me.ProgrmaManager.getInstance().registe(me.UIImageShader.UI_IMG_SHADER, new me.UIImageShader());
                me.ProgrmaManager.getInstance().registe(me.UIMaskShader.UI_MASK_SHADER, new me.UIMaskShader());
                me.ProgrmaManager.getInstance().registe(me.Movie2DShader.MOVIE2D_SHADER, new me.Movie2DShader());
                me.ProgrmaManager.getInstance().registe(me.Sprite2DShader.SPRITE2D_SHADER, new me.Sprite2DShader());
                this._uiList = new Array;
                this._containerList = new Array;
                //UIData.setDesignWH(600, 400);
                //UIData.setDesignWH(50 * 16, 50 * 9);
                me.UIData.setDesignWH(960, 540);
                //  UIData.setDesignWH(1280, 720);
            };
            UIManager.prototype.addUI = function ($ui) {
                var $id = 0;
                for (var i = this._uiList.length - 1; i >= 0; i--) {
                    if (this._uiList[i].sortnum <= $ui.sortnum) {
                        $id = i + 1;
                        break;
                    }
                }
                this._uiList.splice($id, 0, $ui);
                // this._uiList.push($ui)
                $ui.rendering = true;
            };
            UIManager.prototype.removeUI = function ($ui) {
                var index = this._uiList.indexOf($ui);
                $ui.rendering = false;
                if (index != -1) {
                    this._uiList.splice(index, 1);
                }
            };
            UIManager.prototype.addUIContainer = function ($container) {
                if ($container.hasStage) {
                    return;
                }
                this._containerList.push($container);
                $container.resize();
                for (var i = 0; i < $container.renderList.length; i++) {
                    this.addUI($container.renderList[i]);
                }
                $container.hasStage = true;
            };
            UIManager.prototype.removeAll = function () {
                while (this._containerList.length) {
                    ////console.log("this._containerList.length",this._containerList.length)
                    this.removeUIContainer(this._containerList[this._containerList.length - 1]);
                }
            };
            UIManager.prototype.removeUIContainer = function ($container) {
                if (!$container.hasStage) {
                    return;
                }
                var index = this._containerList.indexOf($container);
                $container.hasStage = false;
                if (index != -1) {
                    this._containerList.splice(index, 1);
                }
                for (var i = 0; i < $container.renderList.length; i++) {
                    this.removeUI($container.renderList[i]);
                }
            };
            UIManager.prototype.hasWindowUI = function () {
                return false;
            };
            UIManager.prototype.removeNoInterfaceUI = function () {
                for (var i = (this._containerList.length - 1); i >= 0; i--) {
                    if (!this._containerList[i].interfaceUI) { //非主界面的时候
                        this.removeUIContainer(this._containerList[i]);
                    }
                }
            };
            UIManager.prototype.resize = function () {
                if (!this._uiList) {
                    return;
                }
                me.UIData.resize();
                for (var i = 0; i < this._uiList.length; i++) {
                    this._uiList[i].resize();
                }
                for (var i = 0; i < this._containerList.length; i++) {
                    this._containerList[i].resize();
                }
            };
            UIManager.prototype.upBgGroundZero = function () {
                for (var i = 0; i < this._uiList.length; i++) {
                    if (this._uiList[i].container.layer == -1 || this._uiList[i].sortnum == -1) {
                        this._uiList[i].update();
                    }
                }
            };
            UIManager.prototype.update = function () {
                for (var i = 0; i < this._uiList.length; i++) {
                    if (this._uiList[i].container.layer >= 0 && this._uiList[i].sortnum != -1) {
                        this._uiList[i].update();
                    }
                }
            };
            //private _touch: any;
            UIManager.prototype.regEvent = function ($touce) {
                //this._touch = $touce;
                //this._touch.on("panstart panmove panend tap", ($e: any) => { this.onTouch($e) });
                // if (false) {
                //     if (Scene_data.isPc) {
                //         document.addEventListener(MouseType.MouseDown, ($evt: MouseEvent) => { this.onMouse($evt) });
                //         document.addEventListener(MouseType.MouseUp, ($evt: MouseEvent) => { this.onMouse($evt) });
                //         document.addEventListener(MouseType.MouseMove, ($evt: MouseEvent) => { this.onMouse($evt) });
                //     } else {
                //         document.addEventListener(MouseType.TouchStart, ($evt: TouchEvent) => { this.onTouch($evt) });
                //         document.addEventListener(MouseType.TouchEnd, ($evt: TouchEvent) => { this.onTouch($evt) });
                //         document.addEventListener(MouseType.TouchMove, ($evt: TouchEvent) => { this.onTouch($evt) });
                //     }
                // }
            };
            UIManager.prototype.onTouch = function ($e) {
                this.interactiveEvent($e);
            };
            UIManager.prototype.onMouse = function ($e) {
                this.interactiveEvent($e);
            };
            UIManager.prototype.interactiveEvent = function ($e) {
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
                    //evt.x = $e.pageX;
                    //evt.y = $e.pageY;
                    point.x = $e.pageX;
                    point.y = $e.pageY;
                }
                else {
                    if ($e.type == me.MouseType.TouchStart) {
                        //$e.preventDefault();
                        evt = new me.InteractiveEvent(me.InteractiveEvent.Down);
                        if ($e.touches.length > 1) {
                            // evt = new InteractiveEvent(InteractiveEvent.PinchStart);
                            // this.lastSwipeDis = MathClass.math_distance($e.touches[0].clientX, $e.touches[0].clientY, $e.touches[1].clientX, $e.touches[1].clientY);
                            // this.lastSwipeRot = Math.atan2($e.touches[1].clientY - $e.touches[0].clientY, $e.touches[1].clientX - $e.touches[0].clientX);
                            point.x = $e.touches[$e.touches.length - 1].pageX;
                            point.y = $e.touches[$e.touches.length - 1].pageY;
                        }
                        else {
                            point.x = $e.pageX;
                            point.y = $e.pageY;
                        }
                    }
                    else if ($e.type == me.MouseType.TouchEnd) {
                        //alert("touseend");
                        evt = new me.InteractiveEvent(me.InteractiveEvent.Up);
                        point.x = $e.changedTouches[0].pageX;
                        point.y = $e.changedTouches[0].pageY;
                    }
                    else if ($e.type == me.MouseType.TouchMove) {
                        //$e.preventDefault();
                        if ($e.touches.length > 1) {
                            evt = new me.InteractiveEvent(me.InteractiveEvent.Pinch);
                            evt.data = me.MathClass.math_distance($e.touches[0].clientX, $e.touches[0].clientY, $e.touches[1].clientX, $e.touches[1].clientY) / this.lastSwipeDis;
                            evt.roation = (Math.atan2($e.touches[1].clientY - $e.touches[0].clientY, $e.touches[1].clientX - $e.touches[0].clientX) - this.lastSwipeRot) * 180 / Math.PI;
                        }
                        else {
                            evt = new me.InteractiveEvent(me.InteractiveEvent.Move);
                        }
                        point.x = $e.pageX;
                        point.y = $e.pageY;
                    }
                    if ($e.touches.length) {
                        for (var i = 0; i < $e.touches.length; i++) {
                            point.x = $e.touches[i].clientX;
                            point.y = $e.touches[i].clientY;
                        }
                    }
                }
                ////console.log(point.x, point.y);
                this.mouseEvetData(evt, point);
            };
            UIManager.prototype.disMoveNnum = function (v2d, $num) {
                return me.Vector2D.distance(v2d, this.lastMousePos) < $num;
            };
            UIManager.prototype.mouseEvetData = function (evt, point) {
                UIManager.cando = true;
                if (me.Scene_data.verticalScene) {
                    evt.x = point.y;
                    evt.y = me.Scene_data.stageHeight - point.x;
                }
                else {
                    evt.x = point.x;
                    evt.y = point.y;
                }
                var tf = false;
                if (!tf) {
                    for (var i = this._uiList.length - 1; i >= 0; i--) {
                        if (this._uiList[i]) {
                            if (this._uiList[i].container.interfaceUI == false) { //非主UI
                                if (this._uiList[i] && this._uiList[i].interactiveEvent(evt)) {
                                    tf = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (!tf) {
                    for (var i = this._uiList.length - 1; i >= 0; i--) {
                        if (this._uiList[i]) {
                            if (this._uiList[i].container.interfaceUI == true) { //是主UI
                                if (this._uiList[i] && this._uiList[i].interactiveEvent(evt)) {
                                    tf = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (evt.type == me.InteractiveEvent.Down) {
                    this.lastMousePos = new me.Vector2D(evt.x, evt.y);
                    var dt = me.TimeUtil.getTimer() - this.lastTime;
                    if (dt < 200) { //小于200毫秒就只认为是一次按下事件
                        return true;
                    }
                    this.lastTime = me.TimeUtil.getTimer();
                }
                var $uistageTemp = me.Scene_data.uiStage.interactiveEvent(evt);
                if (!tf) {
                    me.Scene_data.uiBlankStage.interactiveEvent(evt);
                    return $uistageTemp;
                }
                else {
                    return true;
                }
            };
            UIManager.prototype.setUseMouseEventCon = function ($uiConatiner) {
                this._eventItem.length = 0;
                if ($uiConatiner) {
                    this._eventItem.push($uiConatiner);
                }
            };
            UIManager.prototype.getObjectsUnderPoint = function (evt) {
                for (var i = this._uiList.length - 1; i >= 0; i--) {
                    if (this._uiList[i]) {
                        if (this._uiList[i] && this._uiList[i].insetUi(evt)) {
                            return this._uiList[i].insetUi(evt);
                        }
                    }
                }
                return null;
            };
            UIManager.prototype.getcurrentList = function () {
                var currentList = new Array();
                for (var i = this._uiList.length - 1; i > 0; i--) {
                    if (this._eventItem.length) {
                        for (var j = 0; j < this._eventItem.length; j++) {
                            if (this._eventItem[j] == this._uiList[i].container) {
                                currentList.push(this._uiList[i]);
                                j = this._eventItem.length;
                                continue;
                            }
                        }
                    }
                    else {
                        currentList.push(this._uiList[i]);
                    }
                }
                return currentList;
            };
            UIManager.cando = true; //  标记只会选择一次。此循环结束
            return UIManager;
        }());
        me.UIManager = UIManager;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=UIManager.js.map