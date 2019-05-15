/**
* name
*/
var game;
(function (game) {
    var object;
    (function (object) {
        var SpellCastData = /** @class */ (function () {
            function SpellCastData() {
            }
            /**
             * 创建技能结果数据
             */
            SpellCastData.Create = function () {
                return new SpellCastData();
            };
            return SpellCastData;
        }());
        object.SpellCastData = SpellCastData;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=SpellCastData.js.map