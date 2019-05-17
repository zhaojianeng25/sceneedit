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
* 客户端buff管理器
*/
var game;
(function (game) {
    var managers;
    (function (managers) {
        var ClientBuffMgr = /** @class */ (function (_super) {
            __extends(ClientBuffMgr, _super);
            function ClientBuffMgr(unit) {
                var _this = _super.call(this) || this;
                // 限制移动
                _this._lockMoveCount = 0;
                // 限制攻击
                _this._lockAttackCount = 0;
                // 隐身计数
                _this._hidingCount = 0;
                _this._hidingOutCount = 0; //外部调用的隐身计数
                // 限制上御剑
                _this._lockMountUp = 0;
                //限制选中
                _this._lockSelect = 0;
                //透明计数
                _this._alphaCount = 0;
                _this.buffs = [];
                _this.isSelf = false;
                _this._unit = unit;
                for (var i = 0; i < UnitField.MAX_BUFF; i++) {
                    var buff_1 = new Buff(unit, i);
                    _this.buffs.push(buff_1);
                }
                return _this;
            }
            Object.defineProperty(ClientBuffMgr.prototype, "lockMove", {
                get: function () {
                    return this._lockMoveCount > 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ClientBuffMgr.prototype, "lockAttack", {
                get: function () {
                    return this._lockAttackCount > 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ClientBuffMgr.prototype, "hiding", {
                get: function () {
                    return this._hidingCount > 0 || this._hidingOutCount > 0;
                },
                enumerable: true,
                configurable: true
            });
            // 增加隐身计数
            ClientBuffMgr.prototype.addHidingCount = function () {
                this._hidingOutCount++;
            };
            // 减少隐身计数
            ClientBuffMgr.prototype.subHidingCount = function () {
                this._hidingOutCount--;
            };
            Object.defineProperty(ClientBuffMgr.prototype, "lockMountUp", {
                get: function () {
                    return this._lockMountUp > 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ClientBuffMgr.prototype, "lockSelect", {
                get: function () {
                    return this._lockSelect > 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ClientBuffMgr.prototype, "inAlpha", {
                get: function () {
                    return this._alphaCount > 0;
                },
                enumerable: true,
                configurable: true
            });
            ClientBuffMgr.prototype.onUpdate = function (isNew, mask) {
                var idChange = false;
                for (var i = 0; i < this.buffs.length; i++) {
                    var __idChange = this.buffs[i].update(isNew, mask);
                    if (__idChange) {
                        idChange = true;
                    }
                }
                if (idChange) {
                    this._lockMoveCount = 0;
                    this._lockAttackCount = 0;
                    this._lockMountUp = 0;
                    this._lockSelect = 0;
                    this._hidingCount = 0;
                    this._alphaCount = 0;
                    for (var i = 0; i < this.buffs.length; i++) {
                        var buff_2 = this.buffs[i];
                        if (!buff_2)
                            continue;
                    }
                    this.event(LEvent.CHANGED);
                }
            };
            //是否有buff
            ClientBuffMgr.prototype.haveBuff = function (buffid) {
                for (var i = 0; i < this.buffs.length; i++) {
                    if (this.buffs[i].id == buffid) {
                        return true;
                    }
                }
                return false;
            };
            //获取buff等级
            ClientBuffMgr.prototype.getBuffLevel = function (buffid) {
                for (var i = 0; i < this.buffs.length; i++) {
                    var buff_3 = this.buffs[i];
                    if (buff_3.id == buffid) {
                        return buff_3.lv;
                    }
                }
                return 0;
            };
            //获取buffdata
            ClientBuffMgr.prototype.getBuffData = function (buffid) {
                for (var i = 0; i < this.buffs.length; i++) {
                    var buff_4 = this.buffs[i];
                    if (buff_4.id == buffid) {
                        return buff_4.data;
                    }
                }
                return 0;
            };
            Object.defineProperty(ClientBuffMgr.prototype, "buffIds", {
                get: function () {
                    var ids = [];
                    for (var i = 0; i < this.buffs.length; i++) {
                        if (this.buffs[i].id <= 0)
                            continue;
                        ids.push(this.buffs[i].id);
                    }
                    return ids;
                },
                enumerable: true,
                configurable: true
            });
            // 释放函数
            ClientBuffMgr.prototype.dispose = function () {
                for (var i = 0; i < this.buffs.length; i++) {
                    var buff_5 = this.buffs[i];
                    buff_5.dispose();
                }
                this.buffs = null;
                this.isSelf = false;
                this._unit = null;
                this.offAll();
            };
            return ClientBuffMgr;
        }(Laya.EventDispatcher));
        managers.ClientBuffMgr = ClientBuffMgr;
    })(managers = game.managers || (game.managers = {}));
})(game || (game = {}));
//# sourceMappingURL=ClientBuffMgr.js.map