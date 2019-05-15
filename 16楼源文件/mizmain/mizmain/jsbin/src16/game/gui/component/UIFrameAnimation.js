/**UI帧动画类
* name 王谦
*/
var game;
(function (game) {
    var gui;
    (function (gui) {
        var component;
        (function (component) {
            var UIFrameAnimation = /** @class */ (function () {
                function UIFrameAnimation(fps) {
                    if (fps === void 0) { fps = 12; }
                    this.poolName = 'UIFrameAnimation';
                    this._totalFrame = 0;
                    this._fps = fps;
                    this._comps = [];
                    this._frames = [];
                    this._flagEnd = [];
                    this._tweenUpdateHandler = Handler.create(this, this.onTweenUpdate, null, false);
                }
                /**
                 * 进池 （相当于对象dispose函数）
                 */
                UIFrameAnimation.prototype.intoPool = function () {
                    var arg = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        arg[_i] = arguments[_i];
                    }
                    this.reset();
                };
                /**
                 * 出池 （相当于对象初始化函数）
                 */
                UIFrameAnimation.prototype.outPool = function () {
                    var arg = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        arg[_i] = arguments[_i];
                    }
                    if (arg && arg.length)
                        this._fps = arg[0];
                };
                Object.defineProperty(UIFrameAnimation.prototype, "completeHandler", {
                    /**动画完成回调函数*/
                    set: function (h) {
                        this._completeHandler = h;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UIFrameAnimation.prototype, "updateHandler", {
                    /**动画更新回调函数*/
                    set: function (h) {
                        this._updateHandler = h;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UIFrameAnimation.prototype, "isPlaying", {
                    /**是否播放中*/
                    get: function () {
                        return this._isPlaying;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**添加动画对象和帧列表*/
                UIFrameAnimation.prototype.addTarget = function (comp, frames) {
                    if (!comp || !frames || !frames.length)
                        return;
                    this._comps[this._comps.length] = comp;
                    this._frames[this._frames.length] = frames;
                    var frame = frames[frames.length - 1].frame;
                    if (frame > this._totalFrame)
                        this._totalFrame = frame;
                };
                /**删除动画对象和帧列表*/
                UIFrameAnimation.prototype.removeTarget = function (comp) {
                    if (!comp)
                        return;
                    var index = this._comps.indexOf(comp);
                    if (index == -1)
                        return;
                    this._comps.splice(index, 1);
                    this._frames.splice(index, 1);
                };
                /**开始播放*/
                UIFrameAnimation.prototype.play = function (isLoop, fps) {
                    if (isLoop === void 0) { isLoop = false; }
                    if (fps === void 0) { fps = 0; }
                    if (this._isPlaying)
                        this.stop();
                    if (fps)
                        this._fps = fps;
                    this._isLoop = isLoop;
                    this._curFrame = -1;
                    this._startTime = Laya.timer.currTimer;
                    for (var i = 0; i < this._comps.length; i++)
                        this.updateTween(this._comps[i], 0);
                    this._isPlaying = true;
                };
                /**更新动画*/
                UIFrameAnimation.prototype.updateTween = function (comp, index) {
                    var idx = this._comps.indexOf(comp);
                    if (idx == -1)
                        return;
                    if (index >= this._frames[idx].length) {
                        if (this._flagEnd.length <= idx)
                            this._flagEnd.length = idx + 1;
                        this._flagEnd[idx] = true;
                        this.checkAndLoop();
                        return;
                    }
                    var prev = index ? this._frames[idx][index - 1].frame : 0;
                    var props = ObjectU.cloneObject(this._frames[idx][index]);
                    var time = (props.frame - prev) * 1000 / this._fps;
                    delete props.frame;
                    props.update = this._tweenUpdateHandler;
                    var ease;
                    if (props.hasOwnProperty("ease")) {
                        ease = props.ease;
                        delete props.ease;
                    }
                    else
                        ease = Laya.Ease.linearNone;
                    Laya.Tween.to(comp, props, time, ease, Handler.create(this, this.updateTween, [comp, index + 1]));
                };
                //缓动动画更新
                UIFrameAnimation.prototype.onTweenUpdate = function () {
                    var frame = Math.floor((Laya.timer.currTimer - this._startTime) * this._fps / 1000);
                    if (frame > this._totalFrame || this._curFrame == frame)
                        return;
                    if (this._updateHandler)
                        this._updateHandler.runWith(frame);
                    this._curFrame = frame;
                };
                /**检测并循环播放*/
                UIFrameAnimation.prototype.checkAndLoop = function () {
                    if (this._flagEnd.length < this._comps.length)
                        return;
                    var index = this._flagEnd.indexOf(undefined);
                    if (index != -1)
                        return;
                    this._flagEnd.length = 0;
                    this._isPlaying = false;
                    if (this._isLoop)
                        this.play(true);
                    else if (this._completeHandler)
                        this._completeHandler.run();
                };
                /**停止播放*/
                UIFrameAnimation.prototype.stop = function () {
                    for (var i = 0; i < this._comps.length; i++)
                        Laya.Tween.clearAll(this._comps[i]);
                    this._flagEnd.length = 0;
                    this._isPlaying = false;
                };
                /**销毁*/
                UIFrameAnimation.prototype.reset = function () {
                    if (this._isPlaying)
                        this.stop();
                    if (this._completeHandler) {
                        this._completeHandler.recover();
                        this._completeHandler = null;
                    }
                    if (this._updateHandler) {
                        this._updateHandler.recover();
                        this._updateHandler = null;
                    }
                    this._comps.length = this._frames.length = 0;
                    this._fps = 12;
                    this._startTime = this._curFrame = this._totalFrame = 0;
                    this._isLoop = this._isPlaying = false;
                };
                return UIFrameAnimation;
            }());
            component.UIFrameAnimation = UIFrameAnimation;
        })(component = gui.component || (gui.component = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=UIFrameAnimation.js.map