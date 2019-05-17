/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var FightxtDrawtor = /** @class */ (function () {
            function FightxtDrawtor(g) {
                this._data = [];
                this._g = g;
            }
            // 贴图存储索引
            FightxtDrawtor.getTextureIndex = function (atk_type, o_type, idx) {
                return atk_type * 1000 + o_type * 100 + idx;
            };
            FightxtDrawtor.prototype.onResComplete = function () {
                for (var i = 0; i < 12; i++) {
                    // 普通
                    var texture = Laya.loader.getRes("scene/common/Attack_" + i + ".png");
                    var key = FightxtDrawtor.getTextureIndex(UnitField.HIT_NOMAL, FightxtDrawtor.TYPE_OTHER, i); //其他
                    FightxtDrawtor.TEXTURES[key] = texture;
                    texture = Laya.loader.getRes("scene/common/Attack1_" + i + ".png");
                    key = FightxtDrawtor.getTextureIndex(UnitField.HIT_NOMAL, FightxtDrawtor.TYPE_SELF, i); //自己
                    FightxtDrawtor.TEXTURES[key] = texture;
                    // 暴击
                    texture = Laya.loader.getRes("scene/common/Crit_" + i + ".png");
                    key = FightxtDrawtor.getTextureIndex(UnitField.HIT_CRIT, FightxtDrawtor.TYPE_OTHER, i); //其他
                    FightxtDrawtor.TEXTURES[key] = texture;
                    texture = Laya.loader.getRes("scene/common/Attack3_" + i + ".png");
                    key = FightxtDrawtor.getTextureIndex(UnitField.HIT_CRIT, FightxtDrawtor.TYPE_SELF, i); //自己
                    FightxtDrawtor.TEXTURES[key] = texture;
                    // 加血
                    texture = Laya.loader.getRes("scene/common/Attack2_" + i + ".png");
                    key = FightxtDrawtor.getTextureIndex(UnitField.HIT_ZHILIAO, FightxtDrawtor.TYPE_OTHER, i); //其他
                    FightxtDrawtor.TEXTURES[key] = texture;
                    key = FightxtDrawtor.getTextureIndex(UnitField.HIT_ZHILIAO, FightxtDrawtor.TYPE_SELF, i); //自己
                    FightxtDrawtor.TEXTURES[key] = texture;
                    // 闪避	
                    texture = Laya.loader.getRes("scene/common/miss1_" + i + ".png");
                    key = FightxtDrawtor.getTextureIndex(UnitField.HIT_MISS, FightxtDrawtor.TYPE_OTHER, i); //其他
                    FightxtDrawtor.TEXTURES[key] = texture;
                    texture = Laya.loader.getRes("scene/common/miss2_" + i + ".png");
                    key = FightxtDrawtor.getTextureIndex(UnitField.HIT_MISS, FightxtDrawtor.TYPE_SELF, i); //自己
                    FightxtDrawtor.TEXTURES[key] = texture;
                }
            };
            // 绘制
            FightxtDrawtor.prototype.onDraw = function (diff, camera) {
                for (var key in this._data) {
                    var fightxt = this._data[key];
                    if (fightxt.isEnd) {
                        ObjectPools.free(fightxt);
                        delete this._data[key];
                        continue;
                    }
                    fightxt.onDraw(diff, camera, this._g);
                }
            };
            // 显示战斗信息
            FightxtDrawtor.prototype.show = function (atk_type, values, toward, target, isSelf) {
                if (atk_type != UnitField.HIT_MISS && values == 0) {
                    return;
                }
                var fightxt = Fightxt.create(atk_type, values, toward, target, isSelf);
                this._data.push(fightxt);
            };
            // 其他
            FightxtDrawtor.TYPE_OTHER = 1;
            // 自己
            FightxtDrawtor.TYPE_SELF = 2;
            // 贴图数据
            FightxtDrawtor.TEXTURES = {};
            return FightxtDrawtor;
        }());
        scene.FightxtDrawtor = FightxtDrawtor;
        var Fightxt = /** @class */ (function () {
            function Fightxt() {
                this.poolName = 'Fightxt';
                this._scale = 1;
                this._width = 0;
                this._textures = [];
                this._runtime = 0;
                // 延迟时间
                this._delayTimer = 350;
                // 移除时间
                this._delTimer = 0;
                this._easeObjs = [];
            }
            Object.defineProperty(Fightxt.prototype, "isEnd", {
                // 是否结束
                get: function () {
                    return this._runtime > this._delTimer;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 进池 （相当于对象dispose函数）
             */
            Fightxt.prototype.intoPool = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                this.reset();
            };
            /**
             * 出池 （相当于对象初始化函数）
             */
            Fightxt.prototype.outPool = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
            };
            ;
            Fightxt.create = function (atk_type, values, toward, target, isSelf) {
                var obj = ObjectPools.malloc(Fightxt);
                obj.create(atk_type, values, toward, target, isSelf);
                return obj;
            };
            Fightxt.prototype.create = function (atk_type, values, toward, target, isSelf) {
                if (values < 0) {
                    // 加血
                    atk_type = UnitField.HIT_ZHILIAO;
                }
                if (atk_type == 0) {
                    atk_type = UnitField.HIT_NOMAL;
                }
                // atk_type = UnitField.HIT_CRIT
                this._mapX = target.unit.pos.x;
                this._mapY = target.unit.pos.y;
                this._offsetX = 0;
                this._offsetY = -target.headHeight;
                this.__offsetX = this.__offsetY = 0;
                this._scale = 1;
                this._width = 0;
                var o_type = isSelf ? FightxtDrawtor.TYPE_SELF : FightxtDrawtor.TYPE_OTHER;
                // 汉字前缀
                var key = FightxtDrawtor.getTextureIndex(atk_type, o_type, 11);
                var tex = FightxtDrawtor.TEXTURES[key];
                if (tex) {
                    this._textures.push(FightxtDrawtor.TEXTURES[key]);
                    this._width += tex.width;
                }
                // 符号前缀
                key = FightxtDrawtor.getTextureIndex(atk_type, o_type, 10);
                tex = FightxtDrawtor.TEXTURES[key];
                if (tex) {
                    this._textures.push(FightxtDrawtor.TEXTURES[key]);
                    this._width += tex.width;
                }
                // 数值
                var strArr;
                if (atk_type == UnitField.HIT_MISS) {
                    strArr = [];
                }
                else {
                    strArr = values.toString(10).split("");
                }
                for (var i = 0; i < strArr.length; i++) {
                    var idx = parseInt(strArr[i]);
                    var key_1 = FightxtDrawtor.getTextureIndex(atk_type, o_type, idx);
                    var tex_1 = FightxtDrawtor.TEXTURES[key_1];
                    if (tex_1) {
                        this._textures.push(FightxtDrawtor.TEXTURES[key_1]);
                        this._width += tex_1.width;
                    }
                }
                // 方向
                var direct = Direct.GetDirect(toward);
                // 总时长
                var duration;
                var lastTimer = 0;
                var frameTimer = 1000 / 30;
                if (atk_type == UnitField.HIT_ZHILIAO) {
                    this._offsetY = -target.headHeight;
                    var t = 20 * frameTimer;
                    this.createEase(0, t, 0, -60, laya.utils.Ease.circIn, this.easeY);
                    duration = t + lastTimer;
                }
                // else if(isSelf){
                // 	let isLeft = direct > Direct.BOTTOM_RIGHT && direct < Direct.UP;
                // 	let sx, sy, ss;
                // 	let ex, ey, es;
                // 	let st, et;
                // 	this._offsetY = - target.headHeight/2 ;
                // 	this._offsetX = isLeft ? -20 : 20;
                // 	st = 0, et = 4 * frameTimer; // 时间
                // 	ss = 2.5;
                // 	es = 1;
                // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                // 	// 第二阶段 (4帧)
                // 	st = et, et = 14 * frameTimer; // 时间
                // 	ss = 1;
                // 	es = 1;
                // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                // 	// 第三阶段 (7帧无向上)
                // 	st = et, et = 24 * frameTimer; // 时间
                // 	sy = 0;
                // 	ey = 60;
                // 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
                // 	// 持续时间
                // 	duration = et + lastTimer;
                // }
                else {
                    var sx = void 0, sy = void 0, ss = void 0;
                    var ex = void 0, ey = void 0, es = void 0;
                    var st = void 0, et = void 0;
                    // direct = Direct.BOTTOM;
                    //没有方向了 1帧 放大200   缩小 4帧 100  再停4帧 向上飘30
                    st = 0, et = 3 * frameTimer; // 时间
                    ss = 3;
                    es = 1;
                    this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 第二阶段 (4帧)
                    st = et, et = 15 * frameTimer; // 时间
                    ss = 1;
                    es = 1;
                    this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 第三阶段 (7帧无向上)
                    st = et, et = 25 * frameTimer; // 时间
                    sy = 0;
                    ey = -60;
                    this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
                    duration = 25 * frameTimer;
                    // switch(direct){
                    // case Direct.LEFT:
                    // case Direct.RIGHT:
                    // 	// 第一阶段
                    // 	st = 0, et = 3 * frameTimer; // 时间
                    // 	sx = direct == Direct.RIGHT ? 40 : -40, ss = 1.5;
                    // 	ex = direct == Direct.RIGHT ? 80 : -80, es = 1;
                    // 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第二阶段 (1帧)
                    // 	st = et, et = 4 * frameTimer; // 时间
                    // 	ss = 1.1;
                    // 	es = 1.1;
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第三阶段 (10帧无动画)
                    // 	st = et, et = 5 * frameTimer; // 时间
                    // 	ss = 1;
                    // 	es = 1;
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第四阶段 (10帧)
                    // 	st = 14 * frameTimer;
                    // 	et = 24 * frameTimer;
                    // 	sx = ex;
                    // 	ex = direct == Direct.RIGHT ? 170 : -170;
                    // 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
                    // 	duration = 30 * frameTimer;
                    // 	break;
                    // case Direct.UPPER_LEFT:
                    // case Direct.UPPER_RIGHT:
                    // 	// 第一阶段
                    // 	st = 0, et = 3 * frameTimer; // 时间
                    // 	sx = direct == Direct.UPPER_RIGHT ? 40 : -40, sy = -40, ss = 1.5;
                    // 	ex = direct == Direct.UPPER_RIGHT ? 80 : -80, ey = -75, es = 1;
                    // 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
                    // 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第二阶段 (1帧)
                    // 	st = et, et = 4 * frameTimer; // 时间
                    // 	ss = 1.1;
                    // 	es = 1.1;
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第三阶段 (10帧无动画)
                    // 	st = et, et = 5 * frameTimer; // 时间
                    // 	ss = 1;
                    // 	es = 1;
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第四阶段 (10帧)
                    // 	st = 14 * frameTimer;
                    // 	et = 24 * frameTimer;
                    // 	sx = ex, sy = ey;
                    // 	ex = direct == Direct.UPPER_RIGHT ? 170 : -170;
                    // 	ey = -115;
                    // 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
                    // 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
                    // 	duration = 30 * frameTimer;
                    // 	break;
                    // case Direct.BOTTOM_LEFT:
                    // case Direct.BOTTOM_RIGHT:
                    // 	// 第一阶段
                    // 	st = 0, et = 3 * frameTimer; // 时间
                    // 	sx = direct == Direct.BOTTOM_RIGHT ? 40 : -40, sy = 40, ss = 1.5;
                    // 	ex = direct == Direct.BOTTOM_RIGHT ? 80 : -80, ey = 75, es = 1;
                    // 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
                    // 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第二阶段 (1帧)
                    // 	st = et, et = 4 * frameTimer; // 时间
                    // 	ss = 1.1;
                    // 	es = 1.1;
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第三阶段 (10帧无动画)
                    // 	st = et, et = 5 * frameTimer; // 时间
                    // 	ss = 1;
                    // 	es = 1;
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第四阶段 (10帧)
                    // 	st = 14 * frameTimer;
                    // 	et = 24 * frameTimer;
                    // 	sx = ex, sy = ey;
                    // 	ex = direct == Direct.BOTTOM_RIGHT ? 170 : -170;
                    // 	ey = 115;
                    // 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
                    // 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
                    // 	duration = 30 * frameTimer;
                    // 	break; 
                    // case Direct.UP:
                    // 	// 第一阶段
                    // 	st = 0, et = 3 * frameTimer; // 时间
                    // 	sx = 0, sy = -40, ss = 1.5;
                    // 	ex = 20, ey = -75, es = 1;
                    // 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
                    // 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第二阶段 (1帧)
                    // 	st = et, et = 4 * frameTimer; // 时间
                    // 	ss = 1.1;
                    // 	es = 1.1;
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第三阶段 (10帧无动画)
                    // 	st = et, et = 5 * frameTimer; // 时间
                    // 	ss = 1;
                    // 	es = 1;
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第四阶段 (10帧)
                    // 	st = 14 * frameTimer;
                    // 	et = 24 * frameTimer;
                    // 	sx = ex, sy = ey;
                    // 	ex = 50;
                    // 	ey = -145;
                    // 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
                    // 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
                    // 	duration = 30 * frameTimer;
                    // 	break;
                    // case Direct.BOTTOM:
                    // 	// 第一阶段
                    // 	st = 0, et = 3 * frameTimer; // 时间
                    // 	sx = 0, sy = 40, ss = 1.5;
                    // 	ex = -20, ey = 70, es = 1;
                    // 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
                    // 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第二阶段 (1帧)
                    // 	st = et, et = 4 * frameTimer; // 时间
                    // 	ss = 1.1;
                    // 	es = 1.1;
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第三阶段 (10帧无动画)
                    // 	st = et, et = 5 * frameTimer; // 时间
                    // 	ss = 1;
                    // 	es = 1;
                    // 	this.createEase(st, et - st, ss, es, laya.utils.Ease.linearNone, this.easeScale);
                    // 	// 第四阶段 (10帧)
                    // 	st = 14 * frameTimer;
                    // 	et = 24 * frameTimer;
                    // 	sx = ex, sy = ey;
                    // 	ex = -40;
                    // 	ey = 120;
                    // 	this.createEase(st, et - st, sx, ex, laya.utils.Ease.linearNone, this.easeX);
                    // 	this.createEase(st, et - st, sy, ey, laya.utils.Ease.linearNone, this.easeY);
                    // 	duration = 30 * frameTimer;
                    // 	break;
                    // }
                }
                this._delTimer = this._delayTimer + duration;
            };
            Fightxt.prototype.createEase = function (startTimer, duration, startValue, endValue, easeFunc, callbackFunc) {
                this._easeObjs.push(EaseObj.create(startTimer, duration, startValue, endValue, easeFunc, Handler.create(this, callbackFunc, null, false)));
            };
            Fightxt.prototype.easeX = function (v) {
                this.__offsetX = v;
            };
            Fightxt.prototype.easeY = function (v) {
                this.__offsetY = v;
            };
            Fightxt.prototype.easeScale = function (v) {
                this._scale = v;
            };
            Fightxt.prototype.onDraw = function (diff, camera, g) {
                if (!this._textures)
                    return;
                if (this._runtime < this._delayTimer) {
                    // 还没开始
                    this._runtime += diff;
                    return;
                }
                if (this.isEnd) {
                    return;
                }
                var __runtime = this._runtime - this._delayTimer;
                for (var _i = 0, _a = this._easeObjs; _i < _a.length; _i++) {
                    var obj = _a[_i];
                    obj.update(__runtime);
                }
                //起始点x
                var rowX = camera.getScenePxByCellX(this._mapX);
                //起始点Y
                var rowY = camera.getScenePxByCellY(this._mapY);
                //贴图集合
                var x_offset = -this._width * this._scale / 2;
                for (var i = 0; i < this._textures.length; i++) {
                    var tex = this._textures[i];
                    g.drawTexture(tex, rowX + this._offsetX + this.__offsetX + x_offset, rowY + this._offsetY + this.__offsetY - tex.sourceHeight * this._scale / 2, tex.sourceWidth * this._scale, tex.sourceHeight * this._scale);
                    //从左到右排列
                    x_offset += tex.sourceWidth * this._scale;
                }
                this._runtime += diff;
            };
            Fightxt.prototype.reset = function () {
                this._textures.length = 0;
                this._runtime = 0;
                this._delayTimer = 0;
                this._delTimer = 0;
                for (var _i = 0, _a = this._easeObjs; _i < _a.length; _i++) {
                    var obj = _a[_i];
                    ObjectPools.free(obj);
                }
                this._easeObjs.length = 0;
                this._scale = 1;
            };
            return Fightxt;
        }());
        var EaseObj = /** @class */ (function () {
            function EaseObj() {
                this.poolName = 'EaseObj';
            }
            /**
             * 进池 （相当于对象dispose函数）
             */
            EaseObj.prototype.intoPool = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                this.reset();
            };
            /**
             * 出池 （相当于对象初始化函数）
             */
            EaseObj.prototype.outPool = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
            };
            ;
            EaseObj.create = function (startTimer, duration, startValue, endValue, easeFunc, hander) {
                var obj = ObjectPools.malloc(EaseObj);
                obj.create(startTimer, duration, startValue, endValue, easeFunc, hander);
                return obj;
            };
            EaseObj.prototype.create = function (startTimer, duration, startValue, endValue, easeFunc, hander) {
                this._startTimer = startTimer;
                this._duration = duration;
                this._startValue = startValue;
                this._changeValue = endValue - startValue;
                this._easeFunc = easeFunc;
                this._hander = hander;
            };
            EaseObj.prototype.update = function (runtime) {
                if (runtime < this._startTimer) {
                    // 还没开始
                    return;
                }
                if (runtime > this._startTimer + this._duration) {
                    // 结束了
                    return;
                }
                var v = this._easeFunc(runtime - this._startTimer, this._startValue, this._changeValue, this._duration);
                this._hander.runWith(v);
            };
            EaseObj.prototype.reset = function () {
                this._easeFunc = null;
                if (this._hander) {
                    this._hander.recover();
                    this._hander = null;
                }
            };
            return EaseObj;
        }());
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=FightxtDrawtor.js.map