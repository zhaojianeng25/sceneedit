/**
* 字典相关处理工具
*/
var game;
(function (game) {
    var utils;
    (function (utils) {
        var DictionaryU = /** @class */ (function () {
            function DictionaryU() {
            }
            /**
             * 属性数组转换成字典
             * @param attrs 数组[key , value]
             */
            DictionaryU.toDict = function (attrs) {
                var dict = new Dictionary();
                for (var i = 0; i < attrs.length / 2; i++) {
                    var key = attrs[2 * i];
                    var value = attrs[2 * i + 1];
                    dict.set(key, value);
                }
                return dict;
            };
            /**
             * 字典数据累加
             * @param dic 原字典
             * @param addDic 增加的字典
             */
            DictionaryU.add = function (dic, addDic) {
                for (var _i = 0, _a = addDic.keys; _i < _a.length; _i++) {
                    var key = _a[_i];
                    var addValue = addDic.get(key);
                    var oldValue = dic.get(key);
                    if (!oldValue) {
                        dic.set(key, addValue);
                    }
                    else {
                        dic.set(key, oldValue + addValue);
                    }
                }
            };
            /**
             * 加百分比累加
             * @param dic 原字典
             * @param addDic 添加的百分比 字典
             */
            DictionaryU.addPct = function (dic, addDic) {
                for (var _i = 0, _a = addDic.keys; _i < _a.length; _i++) {
                    var key = _a[_i];
                    var pct = addDic.get(key);
                    var oldValue = dic.get(key);
                    if (oldValue) {
                        var newValue = Math.ceil(oldValue * (1 + pct / 10000));
                        dic.set(key, newValue);
                    }
                }
            };
            return DictionaryU;
        }());
        utils.DictionaryU = DictionaryU;
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=DictionaryU.js.map