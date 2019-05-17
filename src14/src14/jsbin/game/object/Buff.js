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
* buff
*/
var game;
(function (game) {
    var object;
    (function (object) {
        var Buff = /** @class */ (function (_super) {
            __extends(Buff, _super);
            function Buff(unit, pos) {
                var _this = _super.call(this) || this;
                _this._unit = unit;
                _this._pos = pos;
                var uint16Pos = Math.floor(_this._pos / 2);
                _this._idIndex = object.UnitField.UNIT_INT_BUFF_ID + uint16Pos;
                _this._lvIndex = object.UnitField.UNIT_INT_BUFF_LV + uint16Pos;
                _this._tmIndex = object.UnitField.UNIT_INT_BUFF_TM + pos;
                _this._giverIndex = object.UnitField.UNIT_INT_BUFF_GIVER + pos;
                _this._dataIndex = object.UnitField.UNIT_INT_BUFF_DATA + pos;
                _this._id = _this._unit.GetBuffId(_this._pos);
                _this._lv = _this._unit.GetBuffLv(_this._pos);
                _this._timer = _this._unit.GetBuffTm(_this._pos);
                _this._giver = _this._unit.GetBuffGiver(_this._pos);
                _this._data = _this._unit.GetBuffData(_this._pos);
                return _this;
            }
            Object.defineProperty(Buff.prototype, "pos", {
                get: function () {
                    return this._pos;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Buff.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Buff.prototype, "lv", {
                get: function () {
                    return this._lv;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Buff.prototype, "timer", {
                get: function () {
                    return this._timer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Buff.prototype, "giver", {
                get: function () {
                    return this._giver;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Buff.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            Buff.prototype.update = function (isNew, mask) {
                var idChange = false;
                var v;
                if (isNew || mask.GetBit(this._idIndex)) {
                    v = this._unit.GetBuffId(this._pos);
                    if (this._id != v) {
                        this._id = v;
                        idChange = true;
                        this.event(Buff.CHANGE_ID, v);
                    }
                }
                if (isNew || mask.GetBit(this._lvIndex)) {
                    v = this._unit.GetBuffLv(this._pos);
                    if (this._lv != v) {
                        this._lv = v;
                        this.event(Buff.CHANGE_LV, v);
                    }
                }
                if (isNew || mask.GetBit(this._tmIndex)) {
                    v = this._unit.GetBuffTm(this._pos);
                    if (this._timer != v) {
                        this._timer = v;
                        this.event(Buff.CHANGE_TIMER, v);
                    }
                }
                if (isNew || mask.GetBit(this._giverIndex)) {
                    v = this._unit.GetBuffGiver(this._pos);
                    if (this._giver != v) {
                        this._giver = v;
                        this.event(Buff.CHANGE_GIVER, v);
                    }
                }
                if (isNew || mask.GetBit(this._dataIndex)) {
                    v = this._unit.GetBuffData(this._pos);
                    if (this._data != v) {
                        this._data = v;
                        this.event(Buff.CHANGE_DATA, v);
                    }
                }
                return idChange;
            };
            // 释放函数
            Buff.prototype.dispose = function () {
                this._unit = null;
            };
            Buff.CHANGE_ID = 'CHANGE_ID';
            Buff.CHANGE_LV = 'CHANGE_LV';
            Buff.CHANGE_TIMER = 'CHANGE_TIMER';
            Buff.CHANGE_GIVER = 'CHANGE_GIVER';
            Buff.CHANGE_DATA = 'CHANGE_DATA';
            return Buff;
        }(Laya.EventDispatcher));
        object.Buff = Buff;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=Buff.js.map