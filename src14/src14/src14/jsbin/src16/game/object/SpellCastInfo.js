/**
* name
*/
var game;
(function (game) {
    var object;
    (function (object) {
        var SpellCastInfo = /** @class */ (function () {
            function SpellCastInfo() {
                this.data = new Array();
            }
            /**
             * 创建技能结果数据
             */
            SpellCastInfo.Create = function () {
                return new SpellCastInfo();
            };
            return SpellCastInfo;
        }());
        object.SpellCastInfo = SpellCastInfo;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=SpellCastInfo.js.map