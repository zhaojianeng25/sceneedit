/**
* Avatar基类
*/
var game;
(function (game) {
    var scene;
    (function (scene_1) {
        var AvatarBase = /** @class */ (function () {
            function AvatarBase(scene3d) {
                this._pos = new Vector2();
                // protected _x: number = 0;
                // get x():number{
                // 	return this._x;
                // }
                // protected _y: number = 0;
                // get y():number{
                // 	return this._y;
                // }
                /*处于水层*/
                this._atWaterLayer = false;
                //处于透明层
                this._atTranLayer = false;
                //绘制的透明度
                this._drawAlpha = 1;
                this._drawX = 0;
                this._drawY = 0;
                this._drawAHeight = 0;
                // 缩放
                this._scale = 1;
                //是否可见
                this._visible = true;
                //是否需要绘制试图
                this._isNeedDrawView = true;
                /**
                 * 位于地表
                 */
                this._isLand = false;
                // 排序状态评分
                this._sortStateScore = AvatarBase._noneScore;
                //启用红色滤镜
                this._enableRedFilter = false;
                //启用绿色滤镜
                this._enableGreenFilter = false;
                //启用白色滤镜
                this._enablewhiteFilter = false;
                // 是否支持鼠标拾取
                this._hitTestEnabled = false;
                this._scene3d = scene3d;
            }
            //影子素材
            AvatarBase.initRes = function () {
                this._unloadTexture = Laya.loader.getRes("scene/common/unload.png");
                this._shadowTexture = Laya.loader.getRes("scene/sole/shaodw.png");
                this._hpBGTexture = Laya.loader.getRes("scene/common/HP_B.png");
                this._hpFTexture = Laya.loader.getRes("scene/common/HP_F.png");
                this._hpZTexture = Laya.loader.getRes("scene/common/HP_Z.png");
                this._hpTTexture = Laya.loader.getRes("scene/common/HP_T.png");
                this._angerBGTexture = Laya.loader.getRes("scene/common/ANGER_B.png");
                this._angerFTexture = Laya.loader.getRes("scene/common/ANGER_F.png");
                this._angerZTexture = Laya.loader.getRes("scene/common/ANGER_Z.png");
                this._angerTTexture = Laya.loader.getRes("scene/common/ANGER_T.png");
                this._gossTexture = Laya.loader.getRes("scene/common/ppk.png");
                this.HEAD_MASK_BOSS = Laya.loader.getRes("scene/mask/Boss1.png");
                this.HEAD_MASK_BOSS_WORLD = Laya.loader.getRes("scene/mask/Boss.png");
                this._headMaskJian = Laya.loader.getRes("scene/mask/jian.png");
                this.HEAD_MASK_JINGYING = Laya.loader.getRes("scene/mask/jingying.png");
                this.HEAD_MASK_XIALV = Laya.loader.getRes("scene/mask/xialv.png");
                this.HEAD_MASK_XIADAO = Laya.loader.getRes("scene/mask/xiadao.png");
                this.HEAD_MASK_FUSHEN = Laya.loader.getRes("scene/mask/fuxing.png");
                for (var i = 0; i < 11; i++) {
                    var num = "";
                    if (i < 10)
                        num = "0" + i;
                    else
                        num = i.toString();
                    var str = StringU.substitute("scene/common/ls_{0}.png", num);
                    var texture = Laya.loader.getRes(str);
                    this.HEAD_MASK_LIANSHENG.push(texture);
                }
                this.HEAD_MASK_XIANGUOS = Laya.loader.getRes("scene/mask/xianguo0.png");
                this.HEAD_MASK_XIANGUOL = Laya.loader.getRes("scene/mask/xianguo1.png");
                this.HEAD_MASK_REDTEAM = Laya.loader.getRes("scene/mask/xg_1.png");
                this.HEAD_MASK_BLUETEAM = Laya.loader.getRes("scene/mask/xg_2.png");
                //影子素材偏移
                this._shadow_offsetX = this._shadowTexture.width / 2;
                this._shadow_offsetY = this._shadowTexture.height / 2;
                //创建一个颜色滤镜对象,红色
                AvatarBase.redFilter = new ColorFilter([
                    //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，红色
                    1, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 1, 0,
                ]);
                //创建一个颜色滤镜对象,绿色
                AvatarBase.greenFilter = new ColorFilter([
                    0, 0, 0, 0, 0,
                    1, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 1, 0,
                ]);
                //创建一个颜色滤镜对象,白色
                AvatarBase.whiteFilter = new ColorFilter([
                    2.5, 0, 0, 0, 0,
                    2.5, 0, 0, 0, 0,
                    2.5, 0, 0, 0, 0,
                    0, 0, 0, 1, 0,
                ]);
            };
            //加载表情资源
            AvatarBase.loadFaceRes = function () {
                if (this._isLoadingFace)
                    return;
                var res = new AssetsLoader();
                res.load([game.Path.atlas_ui + "effect/biaoqing.atlas"], Handler.create(this, this.loadFaceComplete));
                this._isLoadingFace = true;
            };
            AvatarBase.loadFaceComplete = function () {
                //表情相关
                this._biaoQingBubble = Laya.loader.getRes("ui/effect/biaoqing/bubble.png");
                this._isLoadingFace = false;
            };
            Object.defineProperty(AvatarBase.prototype, "pos", {
                get: function () {
                    return this._pos;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarBase.prototype, "scale", {
                get: function () {
                    return this._scale;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarBase.prototype, "visible", {
                get: function () {
                    return this._visible;
                },
                enumerable: true,
                configurable: true
            });
            AvatarBase.prototype.setVisible = function (v) {
                this._visible = v;
            };
            Object.defineProperty(AvatarBase.prototype, "isNeedDrawView", {
                get: function () {
                    return this._isNeedDrawView;
                },
                set: function (v) {
                    this._isNeedDrawView = v;
                    this.setVisible(v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarBase.prototype, "hitTestEnabled", {
                set: function (v) {
                    this._hitTestEnabled = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarBase.prototype, "isLand", {
                get: function () {
                    return this._isLand;
                },
                set: function (v) {
                    this._isLand = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarBase.prototype, "headHeight", {
                get: function () {
                    return this._drawAHeight * this._scale;
                },
                enumerable: true,
                configurable: true
            });
            //更新深度排序分数
            AvatarBase.prototype.updateSortScore = function () {
                /////////////////// 深度排序评分 /////////////////
                // 14位
                var y = Math.floor(this._pos.y * 10) & 0x3FFF;
                // 7位
                var x = Math.floor(this._pos.x * 10) & 0x03FF;
                // 得到分数
                this.sortScore = (y << 7) + x;
                this.sortScore = 0x1FFFFF - this.sortScore;
                // 加上状态评分
                this.sortScore += this._sortStateScore;
            };
            Object.defineProperty(AvatarBase.prototype, "enableRedFilter", {
                get: function () {
                    return this._enableRedFilter;
                },
                set: function (v) {
                    if (this._enableRedFilter == v)
                        return;
                    this._enableRedFilter = v;
                    if (v) {
                        this.drawFilters = [AvatarBase.redFilter];
                    }
                    else {
                        this.drawFilters = null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarBase.prototype, "enableGreendFilter", {
                get: function () {
                    return this._enableGreenFilter;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarBase.prototype, "enableGreenFilter", {
                set: function (v) {
                    if (this._enableGreenFilter == v)
                        return;
                    this._enableGreenFilter = v;
                    if (v) {
                        this.drawFilters = [AvatarBase.greenFilter];
                    }
                    else {
                        this.drawFilters = null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarBase.prototype, "enableWhiteFilter", {
                get: function () {
                    return this._enablewhiteFilter;
                },
                set: function (v) {
                    if (this._enablewhiteFilter == v)
                        return;
                    this._enablewhiteFilter = v;
                    if (v) {
                        this.drawFilters = [AvatarBase.whiteFilter];
                    }
                    else {
                        this.drawFilters = null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            AvatarBase.prototype.onDrawBefore = function (diff, scene) {
            };
            // 绘制底下部分
            AvatarBase.prototype.onDrawBottom = function (g, scene) {
            };
            // 主绘制
            AvatarBase.prototype.onDraw = function (diff, g, scene) {
            };
            // 绘制怒气部分
            AvatarBase.prototype.onDrawAnger = function (g, scene, offsetY) {
                return 0;
            };
            // 绘制名字部分
            AvatarBase.prototype.onDrawName = function (g, scene, offsetY) {
                return 0;
            };
            // 绘制头顶标识部分
            AvatarBase.prototype.onDrawMask = function (g, scene, offsetY) {
                return 0;
            };
            // 绘制表情部分
            AvatarBase.prototype.onDrawFace = function (g, scene, offsetY) {
                return 0;
            };
            // 闲聊
            AvatarBase.prototype.onDrawGossip = function (g, scene, offsetY) {
                return 0;
            };
            /**
             * 鼠标碰撞检测
             */
            AvatarBase.prototype.hitTest = function (xMouse, yMouse, scene, hit3DPos) {
                return false;
            };
            Object.defineProperty(AvatarBase.prototype, "name", {
                get: function () {
                    return "";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarBase.prototype, "guid", {
                get: function () {
                    return "";
                },
                enumerable: true,
                configurable: true
            });
            AvatarBase.prototype.clear = function (checkNow) {
                this.drawFilters = null;
            };
            // 头顶元素间隔
            AvatarBase.HEAD_NODE_INTERVAL = 10;
            AvatarBase.HEAD_MASK_LIANSHENG = [];
            AvatarBase._isLoadingFace = false;
            // 浮空评分 
            AvatarBase._floatingScore = 1 << 21;
            // 正常评分 
            AvatarBase._noneScore = 1 << 22;
            // 死亡评分 
            AvatarBase._diedScore = 1 << 23;
            // 地表评分 
            AvatarBase._landScore = 1 << 23;
            return AvatarBase;
        }());
        scene_1.AvatarBase = AvatarBase;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=AvatarBase.js.map