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
var battle;
(function (battle) {
    var aciton;
    (function (aciton) {
        /**
         * 显示回合
         */
        var ShowRoundDelay = /** @class */ (function (_super) {
            __extends(ShowRoundDelay, _super);
            function ShowRoundDelay() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ShowRoundDelay.prototype.onInit = function (round, delay) {
                this.round = round;
                this.delay = delay * 1000;
                battle.NotifyMgr.register(4 /* RoundOprateEnd */, this, this._onEnd);
            };
            ShowRoundDelay.prototype._onEnd = function () {
                this.is_end = true;
            };
            ShowRoundDelay.prototype.onStart = function () {
                this.battle.roundStart(this.round, this.delay);
            };
            ShowRoundDelay.prototype.onLogic = function (delay) {
                if (this.is_end) {
                    return;
                }
                this.delay -= delay;
                this.battle.page.setRoundDelay(this.delay);
            };
            ShowRoundDelay.prototype.isEnd = function () {
                return this.is_end || this.delay <= 0;
            };
            ShowRoundDelay.prototype.onDestroy = function () {
                battle.NotifyMgr.remove(4 /* RoundOprateEnd */, this, this._onEnd);
            };
            return ShowRoundDelay;
        }(battle.BaseAction));
        aciton.ShowRoundDelay = ShowRoundDelay;
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=ShowRoundDelay.js.map