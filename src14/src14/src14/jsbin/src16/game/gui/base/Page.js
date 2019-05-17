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
/**
* ui页面
*/
var game;
(function (game) {
    var gui;
    (function (gui) {
        var base;
        (function (base) {
            var Page = /** @class */ (function (_super) {
                __extends(Page, _super);
                function Page(app, onOpenFunc, onCloseFunc) {
                    var _this = _super.call(this, app) || this;
                    // 贴图加载器
                    _this._assetsLoader = new AssetsLoader();
                    // 是否打开
                    _this.isOpened = false;
                    // 是否关闭中
                    _this._isCloseing = false;
                    //是否模态窗
                    _this._isModal = false;
                    /**是否启用缓动大开效果*/
                    // protected _isTweenOpen: boolean = true;
                    /**
                     * 是否需要阴影
                     */
                    _this._isNeedBlack = false;
                    _this._mouseThrough = true;
                    //是否已经释放UI计数
                    _this._isSubBgCount = false;
                    _this._onOpenFunc = onOpenFunc;
                    _this._onCloseFunc = onCloseFunc;
                    _this.mouseThrough = true;
                    return _this;
                }
                Object.defineProperty(Page.prototype, "isModal", {
                    get: function () {
                        return this._isModal;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Page.prototype, "dataSource", {
                    /**数据*/
                    get: function () {
                        return this._dataSource;
                    },
                    /**数据*/
                    set: function (v) {
                        this._dataSource = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Page.prototype, "viewPos", {
                    /**当前面板位置*/
                    get: function () {
                        return [this._view.x, this._view.y];
                    },
                    enumerable: true,
                    configurable: true
                });
                Page.prototype.onLoaded = function () {
                    if (!this.isOpened)
                        return;
                    this.init();
                    this.layout();
                    this.onOpen();
                    if (this._view instanceof View) {
                        this._view.mouseThrough = this._mouseThrough;
                        this._view.cacheAs = "normal";
                        this._view.centerX = 0.5;
                        this._view.centerY = 0.5;
                    }
                    this.clearLoadEffect();
                };
                // 页面初始化函数
                Page.prototype.init = function () {
                };
                // 页面打开函数
                Page.prototype.open = function (key, prevView) {
                    this._key = key;
                    this._prev_View = prevView;
                    this.clear();
                    if (this._app.uiRoot && this.parent instanceof gui.GeneralUI)
                        this._app.uiRoot.addBgCount(key);
                    this.isOpened = true;
                    this.createdLoadEffect();
                    this._assetsLoader.load(this._asset, Handler.create(this, this.onLoaded));
                };
                Page.prototype.createdLoadEffect = function () {
                    this._loadEffect = new gui.component.LoadEffect(this);
                    this._loadEffect.width = this._clientWidth;
                    this._loadEffect.height = this._clientHeight;
                };
                Page.prototype.clearLoadEffect = function () {
                    if (this._loadEffect) {
                        this._loadEffect.destroy();
                        this._loadEffect = null;
                    }
                };
                Object.defineProperty(Page.prototype, "addListener", {
                    /**
                     * 添加事件侦听(子类重写方法添加各类监听)
                     * Page页面打开，关闭函数会处理监听的开启和关闭
                     */
                    set: function (isAdd) {
                    },
                    enumerable: true,
                    configurable: true
                });
                Page.prototype.setMouseThrough = function (v) {
                    this._mouseThrough = v;
                    if (this._view instanceof View) {
                        this._view.mouseThrough = this._mouseThrough;
                    }
                };
                Page.prototype.inFrontAll = function () {
                    this.parent && this.parent.addChild(this);
                };
                // 页面打开时执行函数
                Page.prototype.onOpen = function () {
                    this._onOpenFunc && this._onOpenFunc(this);
                    if (this._prev_View && this._prev_View.parent)
                        this._prev_View.parent.visible = false;
                    if (this._view && this._view.hasOwnProperty("btn_close"))
                        this._view.btn_close.on(LEvent.CLICK, this, this.close); //更多
                    //添加页面相关监听
                    this.addListener = true;
                    if (this._isNeedBlack)
                        this.drawBlack();
                    // if (this._isTweenOpen && this._view) {
                    // 	Laya.Tween.from(this._view, { scaleX: 0.1, scaleY: 0.1 }, 300, Laya.Ease.cubicIn);
                    // }
                };
                // 打开其他页面
                Page.prototype.openOtherPage = function (key, container, onOpenFunc, onCloseFunc) {
                    if (!container) {
                        container = this.parent;
                    }
                    if (!container) {
                        return null;
                    }
                    return container.open(key, onOpenFunc, onCloseFunc);
                };
                // 清理下页面
                Page.prototype.clear = function () {
                    this.clearLoadEffect();
                    if (this._view) {
                        for (var key in this._view) {
                            var node = this._view[key];
                            if (node instanceof Sprite && !node.parent) {
                                node.destroy(true);
                            }
                        }
                        this._view.destroy(true);
                        this._view = null;
                    }
                    this._assetsLoader.clear();
                };
                // 重新布局
                Page.prototype.layout = function () {
                    if (this._view) {
                        var scaleX = this._clientWidth / this._view.width;
                        var scaleY = this._clientHeight / this._view.height;
                        var scale = Math.min(scaleX, scaleY);
                        this._view.scale(scale, scale);
                        this._view.x = (this._clientWidth - this._view.width * scale) / 2;
                        this._view.y = (this._clientHeight - this._view.height * scale) / 2;
                    }
                };
                /**
                 * 绘制黑底
                 */
                Page.prototype.drawBlack = function () {
                    // if (!this._isModal)
                    // 	return;
                    if (!this._blackSprite) {
                        this._blackSprite = new Sprite();
                        this._blackSprite.alpha = 0.7;
                        this._blackSprite.mouseEnabled = true;
                        this._blackSprite.on(LEvent.CLICK, this, this.onBlackSpriteClick);
                        this.addChildAt(this._blackSprite, 0);
                    }
                    this._blackSprite.size(this._clientWidth, this._clientHeight);
                    this._blackSprite.graphics.clear();
                    this._blackSprite.graphics.drawRect(0, 0, this._clientWidth, this._clientHeight, "#000000");
                };
                /**
                 * 黑底点击事件
                 */
                Page.prototype.onBlackSpriteClick = function () {
                    this.close();
                };
                /**
                 * 清理黑底
                 */
                Page.prototype.clearBlack = function () {
                    if (!this._isModal)
                        return;
                    if (this._blackSprite) {
                        // this._blackSprite.off(LEvent.CLICK, this, this.onBlackSpriteClick);
                        this._blackSprite.graphics.clear();
                        this._blackSprite.destroy();
                        this._blackSprite = null;
                    }
                };
                // 页面关闭
                Page.prototype.close = function () {
                    if (this._isCloseing) {
                        return;
                    }
                    // if (this._isTweenOpen && this._view) {
                    // 	this._isCloseing = true;
                    // 	Laya.Tween.to(this._view, { scaleX: .1, scaleY: 0.1 }, 300, Laya.Ease.cubicIn,
                    // 		Handler.create(this, () => {
                    // 			this._isCloseing = false;
                    // 			this.close();
                    // 		}));
                    // 	this._isTweenOpen = false;
                    // 	return;
                    // }
                    this.clearBlack();
                    if (!this._isSubBgCount && this._app.uiRoot && this.parent instanceof gui.GeneralUI) {
                        this._app.uiRoot.subBgCount(this._key);
                        this._isSubBgCount = true;
                    }
                    if (this._view && this._view.hasOwnProperty("btn_close"))
                        this._view.btn_close.off(LEvent.CLICK, this, this.close); //更多
                    if (this._prev_View && this._prev_View.parent)
                        this._prev_View.parent.visible = true;
                    //移除页面相关监听
                    if (this._view)
                        this.addListener = false;
                    this._prev_View = null;
                    this._isCloseing = false;
                    this.isOpened = false;
                    this.removeGuideEffect();
                    this._onCloseFunc && this._onCloseFunc(this);
                    this.dispose();
                };
                Page.prototype.resize = function (w, h, isLayout) {
                    if (isLayout === void 0) { isLayout = true; }
                    _super.prototype.resize.call(this, w, h);
                    isLayout && this.layout();
                };
                // 释放函数
                Page.prototype.dispose = function () {
                    this.clear();
                    _super.prototype.dispose.call(this);
                    this.removeSelf();
                };
                // 取消函数调用关闭函数
                Page.prototype.cancel = function () {
                    this.close();
                    return true;
                };
                /**显示新手引导表现
                 * @param type 类型
                 * @param step 步骤
                 */
                Page.prototype.showGuideEffect = function (type, step) {
                    //重载
                };
                /**
                 * 添加
                 * @param ex 位置x
                 * @param ey 位置y
                 * @param guideParent 父级
                 * @param direct 箭头朝向
                 */
                Page.prototype.addGuideEffect = function (ex, ey, guideParent, direct, desc, visibleFlag) {
                    if (direct === void 0) { direct = 1; }
                    if (visibleFlag === void 0) { visibleFlag = false; }
                    if (!this._view)
                        return;
                    this.onLoadGuideAssetOver(ex, ey, guideParent, direct, desc, visibleFlag);
                };
                Page.prototype.onLoadGuideAssetOver = function (ex, ey, guideParent, direct, desc, visibleFlag) {
                    if (direct === void 0) { direct = 0; }
                    if (visibleFlag === void 0) { visibleFlag = false; }
                    if (!this._view)
                        return;
                    // if (!this._guideEffect) {
                    // 	this._guideEffect = new AnimationFrame(EffectMgr.EFFECT_GUIDE);
                    // }
                    if (this._guideEffect.parent && this._guideEffect.parent != guideParent) {
                        this._guideEffect.removeSelf(false);
                    }
                    if (!this._guideEffect.parent) {
                        if (guideParent)
                            guideParent.addChild(this._guideEffect);
                        else
                            this._view.addChild(this._guideEffect);
                    }
                    this._guideEffect.pos(ex, ey - 68);
                    // if(!this._guideEffect.isPlaying)
                    if (!this._guideEffect.isPlaying)
                        this._guideEffect.play(true);
                    //换手了
                    if (!this._guideArrow) {
                        this._guideArrow = new LImage(game.Path.ui_tongyong + "shou.png");
                        this._guideArrow.scale(0.8, 0.8);
                        this._guideEffect.addChild(this._guideArrow);
                    }
                    if (!this._guideArrow || !this._guideArrow.parent)
                        return;
                    var diffx = -10;
                    var diffy = -10;
                    var ax = this._guideArrow.width;
                    var ay = 68;
                    this._guideArrow.pos(ax, ay);
                    Laya.Tween.clearAll(this._guideArrow);
                    this.playGuideArrow(ax, ay, diffx, diffy, 1);
                    if (visibleFlag)
                        this.setGuideEffectVisible(guideParent);
                };
                //重置引导特效位置
                Page.prototype.resetGuideEffectPos = function (efx, efy) {
                    if (this._guideEffect && this._guideEffect.parent) {
                        this._guideEffect.pos(efx, efy - 68);
                    }
                };
                //播放新手引导箭头
                Page.prototype.playGuideArrow = function (ex, ey, diffx, diffy, status) {
                    if (!status || !this._guideArrow)
                        return;
                    if (status == 1) {
                        Laya.Tween.to(this._guideArrow, { x: ex + diffx, y: ey + diffy }, 250, null, Handler.create(this, this.playGuideArrow, [ex, ey, diffx, diffy, 2]));
                    }
                    else if (status == 2) {
                        Laya.Tween.to(this._guideArrow, { x: ex, y: ey }, 250, null, Handler.create(this, this.playGuideArrow, [ex, ey, diffx, diffy, 1]));
                    }
                };
                //设置是否可见
                Page.prototype.setGuideEffectVisible = function (btn) {
                    if (!btn || !this._guideEffect || this._guideEffect.parent != btn)
                        return;
                    if (this._guideEffect)
                        this._guideEffect.visible = !btn.gray;
                };
                //移除
                Page.prototype.removeGuideEffect = function () {
                    if (this._guideEffect) {
                        this._guideEffect.destroy();
                        this._guideEffect = null;
                    }
                    if (this._guideArrow) {
                        Laya.Tween.clearAll(this._guideArrow);
                        this._guideArrow.destroy();
                        this._guideArrow = null;
                    }
                    Page._guideTextures && Page._guideTextures.clear();
                };
                return Page;
            }(base.Container));
            base.Page = Page;
        })(base = gui.base || (gui.base = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=Page.js.map