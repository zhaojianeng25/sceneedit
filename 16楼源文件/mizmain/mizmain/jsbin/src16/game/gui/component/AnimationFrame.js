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
* ui 模块序列帧动画 容器
*/
var game;
(function (game) {
    var gui;
    (function (gui) {
        var component;
        (function (component) {
            var AnimationFrame = /** @class */ (function (_super) {
                __extends(AnimationFrame, _super);
                /**
                 *
                 * @param value 配置信息
                 * @param needCenter 是否需要居中
                 * @param addUpdate 是否需要自定义心跳 默认要
                 */
                function AnimationFrame(value, needCenter) {
                    if (needCenter === void 0) { needCenter = false; }
                    var _this = _super.call(this) || this;
                    _this._start = 0;
                    _this._total = 0;
                    _this._data = "";
                    _this._dataFix = "";
                    _this._fps = 0;
                    _this._isPlaying = false;
                    _this._needOverEvent = false;
                    _this._haveEventComplete = false;
                    _this._data = value.source;
                    _this._dataFix = value.fileName;
                    _this._fps = value.interval;
                    _this._start = value.start ? value.start : 0;
                    _this._total = value.frameCount ? value.frameCount : 0;
                    var total = value.frameCount;
                    _this._effect = ObjectPools.malloc(component.EffectFrameUI, null, total, _this._fps);
                    if (value.sourcePath)
                        _this._effect.setAssetPath(value.sourcePath);
                    if (!needCenter)
                        _this._effect.centrePoint = new Vector2(0, 0);
                    //默认不触发鼠标点击
                    _this.setMouseEnabled(false);
                    //如果有设置大小
                    if (value.width && value.height) {
                        if (value.height1)
                            _this.size(value.width, value.height1);
                        else
                            _this.size(value.width, value.height);
                    }
                    _this.frameLoop(1, _this, _this.onDraw);
                    return _this;
                }
                /**
                 * 设置是否接受鼠标事件
                 * @param value
                 */
                AnimationFrame.prototype.setMouseEnabled = function (value) {
                    this.mouseEnabled = value;
                    if (this._effect) {
                        this._effect.setMouseEnabled(value);
                    }
                };
                Object.defineProperty(AnimationFrame.prototype, "isPlaying", {
                    get: function () {
                        return this._isPlaying && this._effect && !this._effect.isPlayEnd;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 开始播放
                 * @param start
                 * @param isLoop
                 */
                AnimationFrame.prototype.play = function (isLoop, reverse) {
                    if (isLoop === void 0) { isLoop = false; }
                    if (reverse === void 0) { reverse = false; }
                    if (!this._effect)
                        return;
                    this._effect.isPlayEnd = false;
                    this._haveEventComplete = false;
                    this._effect.setLoop(isLoop);
                    this._effect.setData(this._data, this._fps, this._start, this._dataFix, reverse);
                    this._isPlaying = true;
                };
                AnimationFrame.prototype.playFrame = function (isLoop) {
                    if (isLoop === void 0) { isLoop = false; }
                    if (!this._effect)
                        return;
                    this._effect.isPlayEnd = false;
                    this._effect.setLoop(isLoop);
                    var loadArr = [];
                    for (var i = 0; i < this._total; i++) {
                        loadArr.push(PathConst.ui_effect + this._data + "/" + (10000 + i) + ".jpg");
                    }
                    this._effect.setDataFrames(this._data, loadArr, this._fps, this._start, this._dataFix);
                    this._isPlaying = true;
                };
                Object.defineProperty(AnimationFrame.prototype, "interval", {
                    //帧率
                    set: function (value) {
                        if (this._effect)
                            this._effect.setFps(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                //绘制
                AnimationFrame.prototype.onDraw = function () {
                    this.graphics.clear();
                    if (this._effect) {
                        if (!this._effect.isPlayEnd) {
                            this._effect.updateTexture();
                            this._effect.onDraw(this.graphics);
                        }
                        //非循环 播放结束了就抛出事件
                        else if (this._needOverEvent && !this._effect.loop && !this._haveEventComplete) {
                            this.event(LEvent.COMPLETE);
                            this._haveEventComplete = true;
                        }
                    }
                };
                /**
                 * <p>增加事件侦听器，以使侦听器能够接收事件通知。</p>
                 * <p>如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。</p>
                 * @param type		事件的类型。
                 * @param caller	事件侦听函数的执行域。
                 * @param listener	事件侦听函数。
                 * @param args		（可选）事件侦听函数的回调参数。
                 * @return 此 EventDispatcher 对象。
                 */
                AnimationFrame.prototype.on = function (type, caller, listener, args) {
                    var onEvent = _super.prototype.on.call(this, type, caller, listener, args);
                    if (type == LEvent.COMPLETE)
                        this._needOverEvent = true; //有监听结束事件
                    return onEvent;
                };
                /**
                 * 从 EventDispatcher 对象中删除侦听器。
                 * @param type		事件的类型。
                 * @param caller	事件侦听函数的执行域。
                 * @param listener	事件侦听函数。
                 * @param onceOnly	（可选）如果值为 true ,则只移除通过 once 方法添加的侦听器。
                 * @return 此 EventDispatcher 对象。
                 */
                AnimationFrame.prototype.off = function (type, caller, listener, onceOnly) {
                    if (type == LEvent.COMPLETE)
                        this._needOverEvent = false; //移除监听结束事件
                    return _super.prototype.off.call(this, type, caller, listener, onceOnly);
                };
                //清理
                AnimationFrame.prototype.clear = function () {
                    this.graphics.clear();
                    if (this._effect) {
                        this._effect.isPlayEnd = true;
                        this._haveEventComplete = true;
                    }
                    this._isPlaying = false;
                };
                //移除
                AnimationFrame.prototype.removeSelf = function (needClear) {
                    if (needClear === void 0) { needClear = true; }
                    if (needClear)
                        this.clear();
                    _super.prototype.removeSelf.call(this);
                };
                //销毁
                AnimationFrame.prototype.destroy = function (destroyChild) {
                    this._effect && ObjectPools.free(this._effect);
                    this._effect = null;
                    this._needOverEvent = false;
                    this._haveEventComplete = false;
                    this.removeSelf();
                    _super.prototype.destroy.call(this, destroyChild);
                };
                return AnimationFrame;
            }(laya.display.Sprite));
            component.AnimationFrame = AnimationFrame;
        })(component = gui.component || (gui.component = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=AnimationFrame.js.map