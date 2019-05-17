/** html格式及拼接方式
* name 王谦
*/
var game;
(function (game) {
    var utils;
    (function (utils) {
        var HtmlFormat = /** @class */ (function () {
            function HtmlFormat() {
            }
            /*=====HTML拼接(格式:addHtmlXXX)=====*/
            /**
             * 添加简单Html
             * @param value 内容
             * @param htmlKing 类型:HTML_B、HTML_U、HTML_I、HTML_SML、HTML_MID、HTML_BIG、HTML_THK、HTML_ANG、HTML_MID_R、HTML_ANG_R
             * @return
             */
            HtmlFormat.addHtmlSingle = function (value, htmlKing) {
                if (htmlKing == null || htmlKing == "" || htmlKing.indexOf("{0}") == -1)
                    return value;
                return htmlKing.replace("{0}", value);
            };
            /**
             * 添加颜色
             * @param value 内容
             * @param color 颜色
             * @return
             */
            HtmlFormat.addHtmlColor = function (value, color) {
                if (color == null || color == "")
                    return value;
                return HtmlFormat.HTML_COLOR.replace("{0}", value).replace("{1}", color);
            };
            /**
             * 添加字号
             * @param value 内容
             * @param size 字号
             * @return
             */
            HtmlFormat.addHtmlSize = function (value, size) {
                if (!size)
                    return value;
                return HtmlFormat.HTML_SIZE.replace("{0}", value).replace("{1}", size + "");
            };
            /**
             * 添加括号
             * @param value 内容
             * @param bracket 括号 0 无,1 小括号,2 中括号,3 大括号,4 厚括号,5 尖括号
             * @return
             */
            HtmlFormat.addHtmlBracket = function (value, bracket) {
                switch (bracket) {
                    case 1:
                        value = HtmlFormat.HTML_SML.replace("{0}", value);
                        break;
                    case 2:
                        value = HtmlFormat.HTML_MID.replace("{0}", value);
                        break;
                    case 3:
                        value = HtmlFormat.HTML_BIG.replace("{0}", value);
                        break;
                    case 4:
                        value = HtmlFormat.HTML_THK.replace("{0}", value);
                        break;
                    case 5:
                        value = HtmlFormat.HTML_ANG.replace("{0}", value);
                        break;
                }
                return value;
            };
            /**
             * 添加链接
             * @param value 内容
             * @param linkText 链接返回内容
             * @param color 颜色
             * @param bracket 括号 0 无,1 小括号,2 中括号,3 大括号,4 厚括号,5 尖括号
             * @param underline 下划线
             * @param bold 加粗
             * @return
             */
            HtmlFormat.addHtmlLink = function (value, linkText, color, bracket, underline, bold) {
                if (color === void 0) { color = null; }
                if (bracket === void 0) { bracket = 0; }
                if (underline === void 0) { underline = false; }
                if (bold === void 0) { bold = false; }
                if (underline)
                    value = HtmlFormat.addHtmlSingle(value, HtmlFormat.HTML_U);
                if (bold)
                    value = HtmlFormat.addHtmlSingle(value, HtmlFormat.HTML_B);
                if (bracket)
                    value = HtmlFormat.addHtmlBracket(value, bracket);
                if (linkText == null || linkText == "")
                    return value;
                value = HtmlFormat.HTML_LINK.replace("{0}", value).replace("{1}", linkText);
                if (color == null || color == "")
                    color = utils.ColorU.COLOR_GREEN;
                return HtmlFormat.addHtmlColor(value, color);
            };
            /**
             * 添加html文本
             * @param value 内容
             * @param color 颜色
             * @param bracket 括号 0 无,1 小括号,2 中括号,3 大括号,4 厚括号,5 尖括号
             * @param underline 下划线
             * @param bold 加粗
             * @return
             */
            HtmlFormat.addHtmlText = function (value, color, bracket, underline, bold) {
                if (bracket === void 0) { bracket = 0; }
                if (underline === void 0) { underline = false; }
                if (bold === void 0) { bold = false; }
                if (underline)
                    value = HtmlFormat.addHtmlSingle(value, HtmlFormat.HTML_U);
                if (bold)
                    value = HtmlFormat.addHtmlSingle(value, HtmlFormat.HTML_B);
                if (bracket)
                    value = HtmlFormat.addHtmlBracket(value, bracket);
                if (color == null || color == "")
                    color = utils.ColorU.COLOR_WHITE;
                return HtmlFormat.addHtmlColor(value, color);
            };
            /**
             * 添加图片
             * @param urlImg 图片地址
             * @param width 宽度
             * @param height 高度
             * @return
             */
            HtmlFormat.addHtmlImg = function (urlImg, width, height) {
                if (urlImg == null || urlImg == "" || !width || !height)
                    return "";
                return HtmlFormat.HTML_IMG.replace("{0}", urlImg).replace("{1}", width).replace("{2}", height);
            };
            /*========================================HTML相关============================================*/
            /*=====HTML模板(格式:HTML_XXX)=====*/
            HtmlFormat.HTML_COLOR = "<span style='color:{1}'>{0}</span>"; //着色	
            HtmlFormat.HTML_SIZE = "<font style='font-size:{1}px'>{0}</font>"; //字号
            HtmlFormat.HTML_LINK = "<a href='event:{1}'>{0}</a>"; //链接
            HtmlFormat.HTML_IMG = "<img src='{0}' style='width:{1};height:{2}'></img>"; //图片
            HtmlFormat.HTML_B = "<b>{0}</b>"; //加粗
            HtmlFormat.HTML_U = "<u>{0}</u>"; //下划线
            HtmlFormat.HTML_I = "<i>{0}</i>"; //倾斜
            HtmlFormat.HTML_BR = "<br>"; //换行
            HtmlFormat.HTML_SML = "({0})"; //小括号
            HtmlFormat.HTML_MID = "[{0}]"; //中括号
            HtmlFormat.HTML_BIG = "{{0}}"; //大括号
            HtmlFormat.HTML_THK = "【{0}】"; //厚括号
            HtmlFormat.HTML_ANG = "<{0}>"; //尖括号
            HtmlFormat.HTML_MID_R = "[/{0}]"; //右中括号
            HtmlFormat.HTML_ANG_R = "</{0}>"; //右尖括号
            return HtmlFormat;
        }());
        utils.HtmlFormat = HtmlFormat;
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=HtmlFormat.js.map