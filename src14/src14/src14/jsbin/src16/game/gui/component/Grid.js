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
* 物品格子对象
*/
var game;
(function (game) {
    var gui;
    (function (gui) {
        var component;
        (function (component) {
            /** 物品格子 */
            var Grid = /** @class */ (function (_super) {
                __extends(Grid, _super);
                function Grid(app) {
                    var _this = _super.call(this) || this;
                    //品质
                    _this._quality = -1;
                    _this._app = app;
                    return _this;
                }
                Object.defineProperty(Grid.prototype, "icon", {
                    get: function () {
                        return this._imgIcon;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Grid.prototype, "quality", {
                    get: function () {
                        return this._quality;
                    },
                    enumerable: true,
                    configurable: true
                });
                //初始化--
                Grid.prototype.init = function (image) {
                    if (!image || !image.parent)
                        return;
                    image.visible = false;
                    this.pos(image.x, image.y);
                    image.parent.addChild(this);
                    this.setBgSkin(image.skin);
                };
                /**
                 * 设置背景宽高
                 * @param width 宽度
                 * @param height 高度
                 */
                Grid.prototype.size = function (width, height) {
                    var sprite = _super.prototype.size.call(this, width, height);
                    if (this._imgBg)
                        this._imgBg.size(width, height);
                    return sprite;
                };
                Grid.prototype.setBgSkin = function (skin) {
                    if (skin instanceof LImage) {
                        this._imgBg = skin;
                    }
                    else if (typeof (skin) == "string") {
                        if (!this._imgBg) {
                            this._imgBg = new LImage();
                        }
                        this._imgBg.skin = skin;
                    }
                    this._imgBg.centerX = this._imgBg.centerY = 0;
                    this.size(this._imgBg.width, this._imgBg.height);
                    this.addChild(this._imgBg);
                };
                /**
                 * 底图花纹图案
                 */
                Grid.prototype.setBgIcon = function (skin) {
                    if (!this._imgBgIcon) {
                        this._imgBgIcon = new LImage();
                        this.addChild(this._imgBgIcon);
                    }
                    this._imgBgIcon.skin = skin;
                    this._imgBgIcon.centerX = this._imgBgIcon.centerY = 0;
                };
                /**
                 * 设置图标
                 * @param skin 图标路径
                 */
                Grid.prototype.setIcon = function (skin) {
                    if (!this._imgIcon) {
                        // 创建图标
                        this._imgIcon = new LImage();
                        this.addChild(this._imgIcon);
                        this._imgIcon.centerX = this._imgIcon.centerY = 0;
                    }
                    this._imgIcon.skin = skin;
                };
                /**
                 * 设置品质
                 * @param quality 品质
                 */
                Grid.prototype.setQuality = function (quality) {
                    if (!this._imgQuality) {
                        this._imgQuality = new LImage();
                        this.addChild(this._imgQuality);
                        this._imgQuality.centerX = this._imgQuality.centerY = 0;
                    }
                    if (quality < 0 || quality > 5) {
                        this._quality = -1;
                        this._imgQuality.skin = null;
                        return;
                    }
                    this._quality = quality;
                };
                //清除图标
                Grid.prototype.clear = function () {
                    if (this._imgIcon) {
                        this._imgIcon.skin = "";
                    }
                    this.setQuality(-1);
                };
                // 释放时清理干净
                Grid.prototype.destroy = function (destroyChild) {
                    this.clear();
                    if (this._imgBg) {
                        this._imgBg.destroy();
                        this._imgBg = null;
                    }
                    if (this._imgIcon) {
                        this._imgIcon.destroy();
                        this._imgIcon = null;
                    }
                    if (this._imgQuality) {
                        this._imgQuality.destroy();
                        this._imgQuality = null;
                    }
                    _super.prototype.destroy.call(this, destroyChild);
                };
                Grid.isDebug = true;
                return Grid;
            }(Laya.Box));
            component.Grid = Grid;
            /** 冷却格子 */
            var CoolGrid = /** @class */ (function (_super) {
                __extends(CoolGrid, _super);
                function CoolGrid(app) {
                    var _this = _super.call(this, app) || this;
                    _this._totalTime = 0;
                    _this._startTime = 0;
                    _this._isRun = false;
                    return _this;
                }
                //开始cd
                CoolGrid.prototype.startCD = function (value, cd_type) {
                    if (value <= 0 || (this._isRun && value != this._totalTime) || !this._imgIcon)
                        return;
                    //CD类型
                    this._cdType = cd_type;
                    if (!this._cdSprite) {
                        this._cdSprite = new Sprite();
                        this._cdSprite.alpha = 0.8;
                    }
                    if (!this._cdSprite.parent) {
                        this._imgIcon.addChild(this._cdSprite);
                    }
                    this.addCdEndSprite();
                    if (!this._labelCD) {
                        this._labelCD = new Label();
                        this._labelCD.font = "Helvetica";
                        this._labelCD.fontSize = 26;
                        this._labelCD.color = "#ffffff";
                        this._labelCD.stroke = 2;
                        this._labelCD.strokeColor = "#000000";
                        this._labelCD.bold = true;
                        this._labelCD.align = "center";
                        this._labelCD.width = this.width;
                        this._labelCD.mouseEnabled = false;
                    }
                    if (!this._labelCD.parent) {
                        this.addChild(this._labelCD);
                        this._labelCD.pos(0, this.height / 2 - 15);
                    }
                    this._labelCD.visible = true;
                    this._labelCD.text = Math.ceil(value / 1000).toString();
                    //如果是方形CD 则要创建遮罩
                    if (cd_type == CoolGrid.CD_RECT && !this._cdRectMask) {
                        this._cdRectMask = new Sprite();
                        //默认设置
                        var iw = this._imgIcon.width == 0 ? 56 : this._imgIcon.width;
                        var ih = this._imgIcon.height == 0 ? 56 : this._imgIcon.height;
                        this._cdRectMask.graphics.drawRect(0, 0, iw, ih, "#ffffff");
                        this._imgIcon.mask = this._cdRectMask;
                    }
                    this._startTime = Laya.timer.currTimer;
                    this._totalTime = value;
                    if (!this._isRun) {
                        this._isRun = true;
                        Laya.timer.frameLoop(1, this, this.updateCD);
                    }
                };
                //停止cd 
                CoolGrid.prototype.stopCD = function () {
                    if (!this._isRun)
                        return;
                    this._isRun = false;
                    this._totalTime = 0;
                    this._startTime = 0;
                    // this._labelCD.x = this.width / 2 - 8;
                    Laya.timer.clear(this, this.updateCD);
                    if (this._cdSprite) {
                        this._cdSprite.destroy(true);
                        this._cdSprite = null;
                    }
                    //CD结束小特效
                    this.playCdEndSprite();
                    this._labelCD.text = "";
                    this._labelCD.visible = false;
                };
                //播放cd结束小特效
                CoolGrid.prototype.playCdEndSprite = function () {
                    var _this = this;
                    if (!this._imgIcon)
                        return;
                    this.addCdEndSprite();
                    this._cdEndSprite.visible = true;
                    this._cdEndSprite.alpha = 1;
                    this._cdEndSprite.scale(1, 1);
                    Laya.Tween.clearAll(this._cdEndSprite);
                    Laya.Tween.to(this._cdEndSprite, { scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 400, null, Handler.create(this, function () {
                        if (_this._cdEndSprite)
                            _this._cdEndSprite.visible = false;
                    }));
                };
                CoolGrid.prototype.addCdEndSprite = function () {
                    if (!this._cdEndSprite) {
                        this._cdEndSprite = new LImage(this._imgIcon.skin);
                        this._cdEndSprite.visible = false;
                        this._cdEndSprite.anchorX = this._cdEndSprite.anchorY = 0.5;
                        this._cdEndSprite.zOrder = 99;
                    }
                    if (!this._cdEndSprite.parent) {
                        this.addChild(this._cdEndSprite);
                        this._cdEndSprite.pos(this.width / 2, this.height / 2);
                    }
                };
                //cd心跳
                CoolGrid.prototype.updateCD = function () {
                    if (!this._isRun)
                        return;
                    var remain_time = this._totalTime - (Laya.timer.currTimer - this._startTime);
                    if (remain_time <= 0) {
                        //时间到了
                        this.stopCD();
                    }
                    else {
                        this.drawCD(remain_time / this._totalTime * 360);
                        if (remain_time <= 1000 && remain_time > 0) {
                            this._labelCD.text = this.round(remain_time / 1000, 1).toString();
                            // this._labelCD.x = this.width / 2 - 18;
                        }
                        else
                            this._labelCD.text = Math.ceil(remain_time / 1000).toString();
                    }
                };
                /**
                 * 保留小数
                 * v : 值
                 * e : 保留的位数
                 */
                CoolGrid.prototype.round = function (v, e) {
                    var t = 1;
                    for (; e > 0; t *= 10, e--)
                        ;
                    for (; e < 0; t /= 10, e++)
                        ;
                    return Math.round(v * t) / t;
                };
                //绘制cd
                CoolGrid.prototype.drawCD = function (angle) {
                    if (!this._cdSprite)
                        return;
                    angle = 360 - angle;
                    this._cdSprite.graphics.clear();
                    var cx = this._imgIcon.width / 2;
                    var cy = this._imgIcon.height / 2;
                    var rad = this._cdType == CoolGrid.CD_CIRCLE ? cx : 80;
                    this._cdSprite.graphics.drawPie(cx, cy, rad, angle - 90, -90, "#000000");
                };
                CoolGrid.prototype.clear = function () {
                    this.stopCD();
                    _super.prototype.clear.call(this);
                };
                CoolGrid.prototype.destroy = function (destroyChild) {
                    this.clear();
                    if (this._cdRectMask) {
                        this._cdRectMask.destroy(true);
                        this._cdRectMask = null;
                    }
                    if (this._cdEndSprite) {
                        this._cdEndSprite.destroy(true);
                        this._cdEndSprite = null;
                    }
                    if (this._labelCD) {
                        this._labelCD.destroy(true);
                        this._labelCD = null;
                    }
                    _super.prototype.destroy.call(this, destroyChild);
                };
                //CD类型
                CoolGrid.CD_CIRCLE = 1;
                CoolGrid.CD_RECT = 2;
                return CoolGrid;
            }(Grid));
            component.CoolGrid = CoolGrid;
            /** 有叠加数物品格子 */
            var StackGrid = /** @class */ (function (_super) {
                __extends(StackGrid, _super);
                function StackGrid(app) {
                    return _super.call(this, app) || this;
                }
                Object.defineProperty(StackGrid.prototype, "count", {
                    get: function () {
                        return this._count;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 设置叠加数量
                 * @param count 数量
                 * @param isNeedOne 当数量为1时，是否显示
                 */
                StackGrid.prototype.setCount = function (count, isNeedOne) {
                    if (isNeedOne === void 0) { isNeedOne = false; }
                    if (count == 0 || (count == 1 && !isNeedOne)) {
                        this._count = 0;
                        if (this._labelCount)
                            this._labelCount.text = "";
                        return;
                    }
                    this._count = count;
                    this.createLabelCount();
                    this._labelCount.text = EnumToString.sampleNum(count);
                    //位置
                    this._labelCount.right = 15;
                    this._labelCount.bottom = 15;
                };
                //创建
                StackGrid.prototype.createLabelCount = function () {
                    if (this._labelCount)
                        return;
                    //叠加数文本
                    this._labelCount = new Label();
                    this._labelCount.fontSize = 26;
                    //白色
                    this._labelCount.color = "#ffffff";
                    this.addChild(this._labelCount);
                    this._labelCount.align = "right";
                    //描边
                    this._labelCount.stroke = 2;
                    this._labelCount.strokeColor = "#000000";
                };
                //清除图标
                StackGrid.prototype.clear = function () {
                    this.setCount(0);
                    _super.prototype.clear.call(this);
                };
                // 释放时清理干净
                StackGrid.prototype.destroy = function (destroyChild) {
                    this.clear();
                    if (this._labelCount) {
                        this._labelCount.destroy();
                        this._labelCount = null;
                    }
                    _super.prototype.destroy.call(this, destroyChild);
                };
                return StackGrid;
            }(CoolGrid));
            component.StackGrid = StackGrid;
            /** 模板格子 */
            var TemplateGrid = /** @class */ (function (_super) {
                __extends(TemplateGrid, _super);
                function TemplateGrid(app) {
                    return _super.call(this, app) || this;
                }
                Object.defineProperty(TemplateGrid.prototype, "entryID", {
                    get: function () {
                        if (this._tempData)
                            return this._tempData.id;
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateGrid.prototype, "tempData", {
                    get: function () {
                        return this._tempData;
                    },
                    enumerable: true,
                    configurable: true
                });
                // 设置数据
                TemplateGrid.prototype.setData = function (value, count) {
                    if (count === void 0) { count = 1; }
                    this.clear();
                    if (!value)
                        return;
                    this._tempData = value;
                    //判断是否要区分性别
                    var iconStr = StringU.substitute("{0}{1}.png", this.getFolder(value.type), value.icon);
                    if (!Laya.loader.getRes(iconStr)) {
                        //默认图片
                        this.setIcon(game.Path.ui + "icon/1/item_0.png");
                    }
                    else {
                        this.setIcon(iconStr);
                    }
                    if (value.quality >= 0)
                        this.setQuality(value.quality);
                    this.setCount(count);
                    //是否开启Debug模式
                    if (Grid.isDebug) {
                        if (!this._labelInfo) {
                            this._labelInfo = new Label();
                            this._labelInfo.color = '#ffffff';
                            this._labelInfo.bgColor = '#000000';
                            this._labelInfo.alpha = .8;
                            this._labelInfo.font = 'SimHei';
                            this._labelInfo.fontSize = 20;
                            this.addChild(this._labelInfo);
                            this._labelInfo.pos(0, 0);
                        }
                        var str = "";
                        str += "ID = " + value.id + "\n";
                        this._labelInfo.text = str;
                    }
                };
                /**
                 * 根据类型获取图标前缀
                 * @param type 物品类型
                 */
                TemplateGrid.prototype.getFolder = function (type) {
                    return game.Path.ui + "icon/1/";
                };
                TemplateGrid.prototype.clear = function () {
                    this._tempData = null;
                    if (this._labelInfo) {
                        this._labelInfo.text = "";
                    }
                    _super.prototype.clear.call(this);
                };
                // 释放时清理干净
                TemplateGrid.prototype.destroy = function (destroyChild) {
                    this.clear();
                    if (this._labelInfo) {
                        this._labelInfo.destroy(true);
                        this._labelInfo = null;
                    }
                    _super.prototype.destroy.call(this, destroyChild);
                };
                return TemplateGrid;
            }(StackGrid));
            component.TemplateGrid = TemplateGrid;
            /** 可以查看详情的模板格子 */
            var TemplateInfoGrid = /** @class */ (function (_super) {
                __extends(TemplateInfoGrid, _super);
                function TemplateInfoGrid(app) {
                    var _this = _super.call(this, app) || this;
                    _this.on(LEvent.CLICK, _this, _this.onGridClick);
                    return _this;
                }
                // 设置数据
                TemplateInfoGrid.prototype.setData = function (value, count, arrow, strongLv) {
                    if (count === void 0) { count = 1; }
                    if (arrow === void 0) { arrow = 0; }
                    if (strongLv === void 0) { strongLv = 0; }
                    if (!value)
                        return;
                    _super.prototype.setData.call(this, value, count);
                    // this.setForgingLv(strongLv);
                    // if (arrow > 0)
                    // 	this.showArrow();
                };
                //点击事件
                TemplateInfoGrid.prototype.onGridClick = function () {
                    if (!this._tempData)
                        return;
                };
                TemplateInfoGrid.prototype.clear = function () {
                    _super.prototype.clear.call(this);
                };
                // 释放时清理干净
                TemplateInfoGrid.prototype.destroy = function (destroyChild) {
                    this.clear();
                    this.off(LEvent.CLICK, this, this.onGridClick);
                    _super.prototype.destroy.call(this, destroyChild);
                };
                return TemplateInfoGrid;
            }(TemplateGrid));
            component.TemplateInfoGrid = TemplateInfoGrid;
        })(component = gui.component || (gui.component = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=Grid.js.map