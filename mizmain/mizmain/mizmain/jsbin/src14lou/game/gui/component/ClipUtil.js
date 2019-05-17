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
* 位图切片生成工具
*/
var game;
(function (game) {
    var gui;
    (function (gui) {
        var component;
        (function (component) {
            var ClipUtil = /** @class */ (function (_super) {
                __extends(ClipUtil, _super);
                function ClipUtil(font) {
                    var _this = _super.call(this) || this;
                    _this.setFont(font);
                    _this._stopArray = [];
                    _this._clipArray = [];
                    return _this;
                }
                ClipUtil.init = function () {
                    this.FORCE_FONT = {
                        source: game.Path.atlas_ui + "tongyong.atlas",
                        url: game.Path.ui + 'tongyong/clip_1.png',
                        clipWidth: null,
                        clipX: 10,
                        space: -18
                    };
                    this.VIP_FONT = {
                        source: game.Path.atlas_ui + "hud.atlas",
                        url: game.Path.ui + 'hud/clip_2.png',
                        clipWidth: null,
                        clipX: 10,
                        space: -9
                    };
                };
                ClipUtil.prototype.setFont = function (font) {
                    if (this._curFont == font)
                        return;
                    this._curFont = font;
                    if (font.source) {
                        var refTexture = RefAsset.Get(font.source);
                        refTexture.retain();
                    }
                    if (this._clipArray) {
                        for (var _i = 0, _a = this._clipArray; _i < _a.length; _i++) {
                            var clip = _a[_i];
                            clip.destroy(true);
                        }
                        this._clipArray = [];
                    }
                };
                //设置
                ClipUtil.prototype.setText = function (str, needZero, isTween, preSkin, postSkin) {
                    var _this = this;
                    if (needZero === void 0) { needZero = false; }
                    if (isTween === void 0) { isTween = false; }
                    if (preSkin === void 0) { preSkin = null; }
                    if (postSkin === void 0) { postSkin = null; }
                    if (!this._curFont) {
                        loge("Font not found!");
                    }
                    var refTexture = RefAsset.Get(this._curFont.source);
                    if (!refTexture.parseComplete) {
                        refTexture.once(LEvent.COMPLETE, this, function (str, needZero, isTween, preSkin, postSkin) {
                            if (needZero === void 0) { needZero = false; }
                            if (isTween === void 0) { isTween = false; }
                            if (preSkin === void 0) { preSkin = null; }
                            if (postSkin === void 0) { postSkin = null; }
                            _this.onAssetParseComplete(str, needZero, isTween, preSkin, postSkin);
                        }, [str, needZero, isTween, preSkin, postSkin]);
                    }
                    else {
                        this.onAssetParseComplete(str, needZero, isTween, preSkin, postSkin);
                    }
                };
                ClipUtil.prototype.onAssetParseComplete = function (str, needZero, isTween, preSkin, postSkin) {
                    if (needZero === void 0) { needZero = false; }
                    if (isTween === void 0) { isTween = false; }
                    if (preSkin === void 0) { preSkin = null; }
                    if (postSkin === void 0) { postSkin = null; }
                    var posX = 0;
                    //前置图片
                    if (preSkin) {
                        if (!this._preImage) {
                            this._preImage = new LImage();
                            this.addChild(this._preImage);
                        }
                        this._preImage.skin = preSkin;
                        this._preImage.pos(posX, 0);
                        posX += this._preImage.width + this._curFont.space;
                    }
                    else {
                        if (this._preImage) {
                            this._preImage.destroy();
                            this._preImage = null;
                        }
                    }
                    //清理
                    for (var _i = 0, _a = this._clipArray; _i < _a.length; _i++) {
                        var clip = _a[_i];
                        clip.removeSelf();
                    }
                    if (str && (((!needZero && str > "0") || needZero))) {
                        this.visible = true;
                        for (var i = 0; i < str.length; i++) {
                            if (!this._clipArray[i]) {
                                var index = parseInt(str.charAt(i));
                                var clip = this.createClip(index);
                                this.addChild(clip);
                                clip.x = posX;
                                clip.y = 0;
                                this._clipArray.push(clip);
                            }
                            else {
                                this._clipArray[i].index = parseInt(str.charAt(i));
                                if (!this._clipArray[i].parent)
                                    this.addChild(this._clipArray[i]);
                                this._clipArray[i].x = posX;
                                this._clipArray[i].y = 0;
                            }
                            posX += this._clipArray[i].width + this._curFont.space;
                        }
                    }
                    else {
                        this.visible = false;
                    }
                    //后置图片
                    if (postSkin) {
                        if (!this._postImage) {
                            this._postImage = new LImage();
                            this.addChild(this._postImage);
                        }
                        this._postImage.skin = postSkin;
                        this._postImage.pos(posX, 0);
                    }
                    else {
                        if (this._postImage) {
                            this._postImage.destroy();
                            this._postImage = null;
                        }
                    }
                    //需要播放滚动特效
                    if (isTween) {
                        this.playTween(str);
                    }
                };
                //滚数字表现
                ClipUtil.prototype.playTween = function (numStr) {
                    var _this = this;
                    Laya.timer.frameLoop(1, this, this.showTween, [parseInt(numStr)]);
                    var _loop_1 = function (i) {
                        if (this_1._stopArray[i]) {
                            this_1._stopArray[i] = false;
                        }
                        else {
                            this_1._stopArray.push(false);
                        }
                        Laya.timer.once(500 + 500 * i, this_1, function () {
                            _this.stopTween(i);
                        });
                    };
                    var this_1 = this;
                    for (var i = 0; i < numStr.length; i++) {
                        _loop_1(i);
                    }
                };
                //停止滚数字
                ClipUtil.prototype.stopTween = function (index) {
                    this._stopArray[index] = true;
                };
                ClipUtil.prototype.showTween = function (num) {
                    var numStr = num.toString();
                    for (var i = 0; i < numStr.length; i++) {
                        var child = this.getChildAt(i);
                        var index = child.index;
                        index++;
                        if (child) {
                            if (this._stopArray[i]) {
                                child.index = parseInt(numStr[i]);
                                if (i >= numStr.length - 1)
                                    Laya.timer.clearAll(this);
                            }
                            else {
                                child.index = index % 10;
                            }
                        }
                    }
                };
                //创建位图切片
                ClipUtil.prototype.createClip = function (index) {
                    var clip = new laya.ui.Clip(this._curFont.url);
                    clip.clipWidth = this._curFont.clipWidth;
                    clip.clipX = this._curFont.clipX;
                    clip.index = index;
                    this.addChild(clip);
                    return clip;
                };
                //释放
                ClipUtil.prototype.destroy = function (destroyChild) {
                    Laya.timer.clearAll(this);
                    if (this._curFont.source) {
                        var refTexture = RefAsset.Get(this._curFont.source);
                        refTexture.release();
                        this._curFont = null;
                    }
                    if (this._clipArray) {
                        for (var _i = 0, _a = this._clipArray; _i < _a.length; _i++) {
                            var clip = _a[_i];
                            clip.destroy(true);
                        }
                        this._clipArray = null;
                    }
                    if (this._preImage) {
                        this._preImage.destroy(true);
                        this._preImage = null;
                    }
                    if (this._postImage) {
                        this._postImage.destroy(true);
                        this._postImage = null;
                    }
                    _super.prototype.destroy.call(this, destroyChild);
                };
                return ClipUtil;
            }(Laya.Box));
            component.ClipUtil = ClipUtil;
        })(component = gui.component || (gui.component = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=ClipUtil.js.map