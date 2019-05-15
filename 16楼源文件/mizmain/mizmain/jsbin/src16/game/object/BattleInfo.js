var game;
(function (game) {
    var object;
    (function (object) {
        /**
         * 战斗数据
         * name 王谦
         */
        var BattleInfo = /** @class */ (function () {
            function BattleInfo() {
            }
            return BattleInfo;
        }());
        object.BattleInfo = BattleInfo;
        /**战斗战将数据*/
        var BattleRole = /** @class */ (function () {
            function BattleRole() {
            }
            return BattleRole;
        }());
        object.BattleRole = BattleRole;
        /**战斗出手数据*/
        var BattleHurt = /** @class */ (function () {
            function BattleHurt() {
            }
            return BattleHurt;
        }());
        object.BattleHurt = BattleHurt;
        /**战斗目标战将数据*/
        var BattleTarget = /** @class */ (function () {
            function BattleTarget() {
            }
            return BattleTarget;
        }());
        object.BattleTarget = BattleTarget;
        /**战斗额外目标战将数据*/
        var BattleExtra = /** @class */ (function () {
            function BattleExtra() {
            }
            return BattleExtra;
        }());
        object.BattleExtra = BattleExtra;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=BattleInfo.js.map