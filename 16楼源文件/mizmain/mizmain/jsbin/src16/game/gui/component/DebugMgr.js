var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var gui;
    (function (gui) {
        var component;
        (function (component) {
            /**
             * debug管理器
             * name 王谦
             */
            var DebugMgr = /** @class */ (function (_super) {
                __extends(DebugMgr, _super);
                function DebugMgr() {
                    return _super.call(this) || this;
                }
                Object.defineProperty(DebugMgr, "instance", {
                    /**单例*/
                    get: function () {
                        if (!this._instance)
                            this._instance = new DebugMgr();
                        return this._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                //发送debug
                DebugMgr.onSendDebug = function (app, text) {
                    this._app = app;
                    text = StringU.trim(text);
                    if (!text || !text.length) {
                        // this._app.uiRoot.top.open(PageDef.TIPS, (page:game.gui.page.Tips) => {
                        // 	page.setText("不能发送空消息");
                        // });
                        logd("不能发送空消息");
                        return;
                    }
                    if (text.indexOf("@") != 0)
                        return;
                    var type = -1;
                    var arr = text.split(' ');
                    switch (arr[0]) {
                        case '@窗口':
                        case '@page':
                            if (arr.length < 2)
                                return;
                            var data_1;
                            if (arr.length > 2)
                                data_1 = parseInt(arr[2]);
                            this._app.uiRoot.general.open(parseInt(arr[1]), function (page) { page.dataSource = data_1; });
                            break;
                        default:
                        // this._app.network.call_gm_command(text);
                    }
                };
                /**保存消息*/
                DebugMgr.cacheMsg = function (input) {
                    var msg = StringU.trim(input.text);
                    if (!msg)
                        return;
                    for (var i = 0; i < this._caches.length; i++) {
                        if (this._caches[i] != msg)
                            continue; //消息内容相同，先删除
                        this._caches.splice(i, 1);
                        break;
                    }
                    this._caches.push(msg);
                    if (this._caches.length > 10)
                        this._caches.shift();
                    this._select = -1;
                };
                /**选择缓存消息*/
                DebugMgr.selectCacheMsg = function (input, isUp) {
                    if (isUp === void 0) { isUp = true; }
                    if (!this._caches.length)
                        return;
                    var len = this._caches.length;
                    if (this._select == -1)
                        this._select = isUp ? len - 1 : 0;
                    else
                        this._select = isUp ? (this._select + len - 1) % len : (this._select + 1) % len;
                    //还原文本
                    input.text = this._caches[this._select];
                    input.focus = true;
                };
                Object.defineProperty(DebugMgr.prototype, "addListener", {
                    //添加事件侦听
                    set: function (isAdd) {
                        DisplayU.setEventListener(this.stage, isAdd, LEvent.KEY_UP, this, this.onKeyUpHandler);
                        DisplayU.setMouseListener(this._btnEnter, isAdd, this, this.onClickHandler);
                    },
                    enumerable: true,
                    configurable: true
                });
                //定时检测
                DebugMgr.prototype.updateTime = function () {
                    if (this._page.isOpened)
                        return;
                    this.clear();
                    DebugMgr._instance = null;
                };
                //位置检测
                DebugMgr.prototype.updatePos = function () {
                    if (!this._page.isOpened)
                        return;
                    var _a = this._page.viewPos, x = _a[0], y = _a[1];
                    this.pos(x, y);
                };
                //发送debug信息
                DebugMgr.prototype.onSendDebug = function () {
                    DebugMgr.onSendDebug(this._app, this._input.text);
                    DebugMgr.cacheMsg(this._input); //保存发送信息
                    this._input.text = "";
                    this._input.focus = false;
                };
                //鼠标点击事件
                DebugMgr.prototype.onClickHandler = function (e) {
                    component.TweenBtnEff.BtnTween(e.currentTarget);
                    switch (e.currentTarget) {
                        case this._btnEnter:
                            this.onSendDebug();
                            break;
                    }
                };
                //键盘事件
                DebugMgr.prototype.onKeyUpHandler = function (e) {
                    if (this.visible && !this._input.focus)
                        return;
                    switch (e.keyCode) {
                        case 13:
                            if (this.visible)
                                this.onSendDebug();
                            this.visible = !this.visible;
                            if (this.visible)
                                this._input.focus = true;
                            break;
                        case 38:
                            DebugMgr.selectCacheMsg(this._input, true);
                            break;
                        case 40:
                            DebugMgr.selectCacheMsg(this._input, false);
                            break;
                    }
                };
                /**初始化*/
                DebugMgr.prototype.init = function (app, page) {
                    this._app = app;
                    this._page = page;
                    if (this._init) {
                        if (this.parent != this._page) {
                            this.updatePos();
                            this._page.addChild(this);
                        }
                        return;
                    }
                    this.size(DebugMgr.PAGE_SIZE[0], DebugMgr.PAGE_SIZE[1]);
                    this.mouseThrough = true;
                    //容器
                    this._container = new laya.display.Sprite();
                    this._container.pos(DebugMgr.DEBUGMGR_POS[0], DebugMgr.DEBUGMGR_POS[1]);
                    this.addChild(this._container);
                    //背景
                    this._imgBack = new LImage(DebugMgr.SKIN_BACK);
                    this._imgBack.sizeGrid = DebugMgr.SIZEGRID_BACK;
                    this._imgBack.size(200, 40);
                    this.checkSkin(this._imgBack, "#666666");
                    this._imgBack.pos(0, 0);
                    this._container.addChild(this._imgBack);
                    //输入框
                    this._input = new TextInput();
                    this._input.size(185, 30);
                    this._input.pos(8, 5);
                    this._input.color = "#ffffff";
                    this._input.fontSize = 20;
                    this._container.addChild(this._input);
                    this._btnEnter = new Button(DebugMgr.SKIN_BTN);
                    this._btnEnter.sizeGrid = DebugMgr.SIZEGRID_BTN;
                    this._btnEnter.size(97, 40);
                    this._btnEnter.pivot(this._btnEnter.width / 2, this._btnEnter.height / 2);
                    this.checkSkin(this._btnEnter, "#ff6600");
                    this._btnEnter.pos(203 + this._btnEnter.pivotX, 0 + this._btnEnter.pivotY);
                    this._btnEnter.labelBold = true;
                    this._btnEnter.labelSize = 20;
                    this._btnEnter.labelColors = "#393939,#393939,#393939";
                    this._btnEnter.label = "确 定";
                    this._container.addChild(this._btnEnter);
                    this.visible = false;
                    this.updatePos();
                    this._page.addChild(this);
                    this.addListener = true;
                    Laya.timer.loop(10000, this, this.updateTime);
                    Laya.timer.loop(1000, this, this.updatePos);
                    this._init = true;
                };
                //检测皮肤
                DebugMgr.prototype.checkSkin = function (target, color) {
                    if (!target || !color)
                        return;
                    if (target == this._imgBack) {
                        if (this._imgBack.skin && this._imgBack.skin.length)
                            return;
                    }
                    else if (target == this._btnEnter) {
                        if (this._btnEnter.skin && this._btnEnter.skin.length)
                            return;
                    }
                    var g = target.graphics;
                    g.clear();
                    g.drawRect(0, 0, target.width, target.height, color);
                };
                //清理
                DebugMgr.prototype.clear = function () {
                    Laya.timer.clear(this, this.updateTime);
                    Laya.timer.clear(this, this.updatePos);
                    this.addListener = false;
                    if (this._imgBack) {
                        this._imgBack.removeSelf();
                        this._imgBack = null;
                    }
                    if (this._input) {
                        this._input.removeSelf();
                        this._input = null;
                    }
                    if (this._btnEnter) {
                        this._btnEnter.removeSelf();
                        this._btnEnter = null;
                    }
                    if (this._container) {
                        this._container.removeSelf();
                        this._container = null;
                    }
                    this.removeSelf();
                    this._init = false;
                };
                DebugMgr.PAGE_SIZE = [720, 1280]; //界面默认宽高
                DebugMgr.DEBUGMGR_POS = [180, 1065]; //debug管理器位置
                DebugMgr.SKIN_BACK = game.Path.ui + "tongyong/wbk_1.png"; //背景皮肤或null
                DebugMgr.SIZEGRID_BACK = "12,12,12,12"; //背景皮肤九宫格
                DebugMgr.SKIN_BTN = game.Path.ui + "tongyong/btn_BQ_1.png"; //按钮皮肤或null
                DebugMgr.SIZEGRID_BTN = ""; //按钮皮肤九宫格
                DebugMgr._caches = [];
                DebugMgr._select = -1;
                return DebugMgr;
            }(laya.display.Sprite));
            component.DebugMgr = DebugMgr;
        })(component = gui.component || (gui.component = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=DebugMgr.js.map