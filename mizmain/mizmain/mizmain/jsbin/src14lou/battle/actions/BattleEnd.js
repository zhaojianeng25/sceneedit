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
        var BattleEnd = /** @class */ (function (_super) {
            __extends(BattleEnd, _super);
            function BattleEnd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BattleEnd.prototype.onStart = function () {
                var _this = this;
                Laya.timer.once(500, null, function () {
                    console.log("============战斗结束");
                    _this.battle.exit();
                    battle.NotifyMgr.notify(0 /* BattleEnd */);
                });
            };
            return BattleEnd;
        }(battle.BaseAction));
        aciton.BattleEnd = BattleEnd;
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=BattleEnd.js.map