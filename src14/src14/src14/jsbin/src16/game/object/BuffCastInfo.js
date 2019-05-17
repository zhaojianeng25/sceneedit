/**
* name
*/
var game;
(function (game) {
    var object;
    (function (object) {
        var BuffCastInfo = /** @class */ (function () {
            function BuffCastInfo() {
                this.data = new Array();
            }
            /**
             * 创建Buff结果数据
             */
            BuffCastInfo.Create = function () {
                return new BuffCastInfo();
            };
            return BuffCastInfo;
        }());
        object.BuffCastInfo = BuffCastInfo;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=BuffCastInfo.js.map