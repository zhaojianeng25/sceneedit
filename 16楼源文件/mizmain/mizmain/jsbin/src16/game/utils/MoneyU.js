/**
 * @describe  钱币处理的工具类
 * @author  LQW
 */
var game;
(function (game) {
    var utils;
    (function (utils) {
        var MoneyU = /** @class */ (function () {
            function MoneyU() {
            }
            /**
             * @describe  数字拆分为千分位标识。比如把1000，拆分为1,000
             * @param num  需要拆分的数字，通常是金币数量
             * @return  string
             */
            MoneyU.number2Thousands = function (num) {
                // 正则表达式
                if (typeof (num) != "number")
                    return "number2Thousands error";
                var str = num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                return str;
            };
            return MoneyU;
        }());
        utils.MoneyU = MoneyU;
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=MoneyU.js.map