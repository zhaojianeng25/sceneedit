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
         * 时间间隔, 默认0.2秒
         */
        var DelayPlay = /** @class */ (function (_super) {
            __extends(DelayPlay, _super);
            function DelayPlay() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            DelayPlay.prototype.onInit = function (delay) {
                if (delay === void 0) { delay = 200; }
                this.delay = delay;
            };
            DelayPlay.prototype.onLogic = function (delay) {
                this.delay -= delay;
            };
            DelayPlay.prototype.isEnd = function () {
                return this.delay <= 0;
            };
            return DelayPlay;
        }(battle.BaseAction));
        aciton.DelayPlay = DelayPlay;
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=DelayPlay.js.map