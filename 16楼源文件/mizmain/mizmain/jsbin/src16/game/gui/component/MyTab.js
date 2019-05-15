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
            var MyTab = /** @class */ (function (_super) {
                __extends(MyTab, _super);
                /**
                 * 构造函数
                 * @param width 标签面板宽度
                 * @param height 标签面板高度
                 * @param type 标签类型
                 * @param space 标签间隔
                 * @param scrollBarSkin 滚动条皮肤
                 */
                function MyTab(width, height, type, space, scrollBarSkin) {
                    if (type === void 0) { type = MyTab.TYPE_HORIZONTAL; }
                    if (space === void 0) { space = 0; }
                    if (scrollBarSkin === void 0) { scrollBarSkin = ""; }
                    var _this = _super.call(this) || this;
                    /**选中的索引 */
                    _this._selectIndex = -1;
                    _this.size(width, height);
                    _this._type = type;
                    _this._space = space;
                    _this._tabShowList = [];
                    _this._panel = new Panel();
                    _this._panel.size(width, height);
                    _this.addChild(_this._panel);
                    if (type == MyTab.TYPE_HORIZONTAL) {
                        _this._panel.hScrollBarSkin = scrollBarSkin;
                    }
                    else {
                        _this._panel.vScrollBarSkin = scrollBarSkin;
                    }
                    return _this;
                }
                Object.defineProperty(MyTab.prototype, "selectHandler", {
                    set: function (handler) {
                        this._selectHandler = handler;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MyTab.prototype, "selectIndex", {
                    get: function () {
                        return this._selectIndex;
                    },
                    set: function (index) {
                        this._selectIndex = index;
                        this.onUpdateSelect();
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 初始化标签
                 * @param skins 标签皮肤集合
                 */
                MyTab.prototype.initTab = function (configs) {
                    if (!configs || configs.length <= 0)
                        return;
                    if (this._panel.numChildren > 0)
                        this._panel.destroyChildren();
                    this._tabShowList.length = 0;
                    for (var i = 0; i < configs.length; i++) {
                        var config = configs[i];
                        var skin = "";
                        if (config.hasOwnProperty('skin'))
                            skin = config.skin;
                        else
                            skin = config;
                        var checkBox = this.addTab(skin);
                        if (config.hasOwnProperty('gray'))
                            checkBox.gray = config.gray;
                    }
                    this.updateTabPos();
                };
                /**
                 * 校验标签位置，做视野校对
                 */
                MyTab.prototype.checkSign = function () {
                    if (!this._panel || this._tabShowList.length <= 0 || this._selectIndex < 0)
                        return;
                    var isHorizontal = this._type == MyTab.TYPE_HORIZONTAL;
                    //滚动条对象
                    var scrollBar = isHorizontal ? this._panel.hScrollBar : this._panel.vScrollBar;
                    //从0位置到显示区域结束的距离
                    var dis = scrollBar.value + (isHorizontal ? this._panel.width : this._panel.height);
                    //从0位置到当前位置一共的距离
                    var totalDis = 0;
                    for (var i = 0; i <= this._selectIndex; i++) {
                        var item_1 = this._tabShowList[i];
                        totalDis += (isHorizontal ? item_1.width : item_1.height);
                    }
                    var slideDis = 0;
                    //右/下边界校对
                    var diff = dis - totalDis;
                    if (diff < 0) {
                        slideDis = scrollBar.value + Math.abs(diff) + 50;
                    }
                    //左/上边界校对
                    var item = this._tabShowList[this._selectIndex];
                    var itemDis = isHorizontal ? item.width : item.height;
                    diff = Math.abs(scrollBar.value - totalDis);
                    if (diff < itemDis) {
                        diff = itemDis - diff;
                        slideDis = scrollBar.value - (diff + 50);
                    }
                    if (slideDis != 0)
                        Laya.Tween.to(scrollBar, { value: slideDis }, 150);
                };
                /**
                 * 添加标签项
                 * @param skin 皮肤
                 * @param label 文字
                 */
                MyTab.prototype.addTab = function (skin) {
                    var checkBox = new CheckBox();
                    checkBox.skin = skin;
                    checkBox.stateNum = 2;
                    this._tabShowList.push(checkBox);
                    //添加事件
                    DisplayU.setMouseListener(checkBox, true, this, this.onTabClick);
                    this._panel.addChild(checkBox);
                    return checkBox;
                };
                /**
                 * 更新位置信息
                 */
                MyTab.prototype.updateTabPos = function () {
                    var pos = 0;
                    for (var i = 0; i < this._tabShowList.length; i++) {
                        var checkBox = this._tabShowList[i];
                        if (this._type == MyTab.TYPE_HORIZONTAL) {
                            checkBox.x = pos;
                            checkBox.y = 0;
                            pos += checkBox.width + this._space;
                        }
                        else {
                            checkBox.x = 0;
                            checkBox.y = pos;
                            pos += checkBox.height + this._space;
                        }
                    }
                    if (this._type == MyTab.TYPE_HORIZONTAL) {
                        this._panel.hScrollBar.max = pos - this._panel.width;
                    }
                    else {
                        this._panel.vScrollBar.max = pos - this._panel.height;
                    }
                };
                /**
                 * 标签点击事件
                 * @param e 事件对象
                 */
                MyTab.prototype.onTabClick = function (e) {
                    var target = e.currentTarget;
                    // TweenBtnEff.BtnTween(target);
                    var index = this._tabShowList.indexOf(target);
                    //如果点击已经打开的标签 那就不做任何事情吧！
                    if (index != -1 && this._selectIndex != index) {
                        this._selectIndex = index;
                        //更新标签组的状态
                        this.onUpdateSelect();
                    }
                    else {
                        target.selected = true;
                    }
                };
                /**更新标签状态 */
                MyTab.prototype.onUpdateSelect = function () {
                    //视野校对
                    this.checkSign();
                    //选中状态更新
                    for (var i = 0; i < this._tabShowList.length; i++) {
                        var tab = this._tabShowList[i];
                        tab.selected = (i == this._selectIndex);
                    }
                    //选中回调
                    if (this._selectHandler) {
                        this._selectHandler.runWith(this._selectIndex);
                    }
                };
                /**
                 * 销毁组件
                 */
                MyTab.prototype.destroy = function () {
                    Laya.timer.clearAll(this);
                    Laya.Tween.clearAll(this._panel);
                    //清理显示列表
                    if (this._tabShowList && this._tabShowList.length > 0) {
                        for (var i = 0; i < this._tabShowList.length; i++) {
                            var tab = this._tabShowList[i];
                            //移除事件
                            DisplayU.setMouseListener(tab, false, this, this.onTabClick);
                            tab.destroy(true);
                        }
                        this._tabShowList = null;
                    }
                    this._selectHandler = null;
                    this._selectIndex = -1;
                    _super.prototype.destroy.call(this);
                };
                /**水平标签 */
                MyTab.TYPE_HORIZONTAL = 0;
                /**竖直标签 */
                MyTab.TYPE_VERTIVAL = 1;
                return MyTab;
            }(Laya.Box));
            component.MyTab = MyTab;
        })(component = gui.component || (gui.component = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=MyTab.js.map