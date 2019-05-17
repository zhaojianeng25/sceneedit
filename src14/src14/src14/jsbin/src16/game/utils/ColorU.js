/**
* 颜色获取工具
* name: AnswerHom
*/
var game;
(function (game) {
    var utils;
    (function (utils) {
        var ColorU = /** @class */ (function () {
            function ColorU() {
            }
            /**
             * 获取颜色数值
             * @param type 字体类型
             * @return RGB颜色数值
             */
            ColorU.getColorByType = function (type) {
                var color;
                switch (type) {
                    // case ItemMgr.QUALITY_WHITE:
                    //     color = ColorU.COLOR_WHITE;	//白色
                    //     break;
                    // case ItemMgr.QUALITY_GREEN:
                    //     color = ColorU.COLOR_GREEN;	//绿色
                    //     break;
                    // case ItemMgr.QUALITY_BLUE:
                    //     color = ColorU.COLOR_BLUE;	//蓝色
                    //     break;
                    // case ItemMgr.QUALITY_PURPLE:
                    //     color = ColorU.COLOR_PURPLE;	//紫色
                    //     break;
                    // case ItemMgr.QUALITY_ORANGE:
                    //     color = ColorU.COLOR_ORANGE;	//橙色
                    //     break;
                    // case ItemMgr.QUALITY_RED:
                    //     color = ColorU.COLOR_RED;	//红色
                    //     break
                    // case ItemMgr.QUALITY_GOLD:
                    //     color = ColorU.COLOR_GOLD;   //金色
                    //     break;
                    default:
                        color = ColorU.COLOR_NORMAL_WORD;
                }
                return color;
            };
            /**类型 */
            ColorU.COLOR_WHITE = "#f5f0dc"; //白
            ColorU.COLOR_GREEN = "#188043"; //绿
            ColorU.COLOR_BLUE = "#3f6cc9"; //蓝
            ColorU.COLOR_PURPLE = "#6e229e"; //紫
            ColorU.COLOR_ORANGE = "#aa3911"; //橙
            ColorU.COLOR_RED = "#b9181e"; //红
            ColorU.COLOR_GOLD = "ffe500"; //红
            ColorU.COLOR_NORMAL_WORD = "#c5a986"; //正常描述文字颜色
            ColorU.COLOR_BLACK = "#000000"; //黑
            ColorU.COLOR_GRAY = "#777777"; //灰色
            return ColorU;
        }());
        utils.ColorU = ColorU;
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=ColorU.js.map