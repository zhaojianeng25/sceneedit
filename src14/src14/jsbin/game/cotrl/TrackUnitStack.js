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
* 追踪unit
*/
var game;
(function (game) {
    var cotrl;
    (function (cotrl) {
        var TrackUnitStack = /** @class */ (function (_super) {
            __extends(TrackUnitStack, _super);
            function TrackUnitStack(app, dstX, dstY, distance, unit) {
                var _this = _super.call(this, app, dstX, dstY, distance) || this;
                _this._checkTimer = 300;
                _this._trackUnit = unit;
                _this._updateTimer = _this._checkTimer;
                return _this;
            }
            TrackUnitStack.prototype.update = function (diff) {
                if (this._trackUnit) {
                    if (this._updateTimer < 0) {
                        this._updateTimer = this._checkTimer;
                        var pos_1 = this._trackUnit.pos;
                        if (this._dstX != pos_1.x || this._dstY != pos_1.y) {
                            //如果距离超过了0.5
                            var distance = MathU.getDistance(pos_1.x, pos_1.y, this._dstX, this._dstY);
                            if (distance > 0.3) {
                                // 更新目标点
                                this._dstX = pos_1.x;
                                this._dstY = pos_1.y;
                                this._hasSend = true;
                            }
                        }
                    }
                    else {
                        this._updateTimer -= diff;
                    }
                }
                return _super.prototype.update.call(this, diff);
            };
            return TrackUnitStack;
        }(cotrl.GotoDstStack));
        cotrl.TrackUnitStack = TrackUnitStack;
    })(cotrl = game.cotrl || (game.cotrl = {}));
})(game || (game = {}));
//# sourceMappingURL=TrackUnitStack.js.map