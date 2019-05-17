/**
* name
*/
var game;
(function (game) {
    var object;
    (function (object) {
        var BuffCastData = /** @class */ (function () {
            function BuffCastData() {
            }
            /**
             * 创建技能结果数据
             */
            BuffCastData.Create = function () {
                return new BuffCastData();
            };
            return BuffCastData;
        }());
        object.BuffCastData = BuffCastData;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=BuffCastData.js.map