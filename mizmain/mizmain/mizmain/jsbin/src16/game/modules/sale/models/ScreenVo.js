/*
* 拍卖品质筛选
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var sale;
        (function (sale) {
            var models;
            (function (models) {
                var ScreenVo = /** @class */ (function () {
                    function ScreenVo() {
                        /**条件下限 */
                        this.limitmin = 0;
                        /**条件上限 */
                        this.limitmax = 0;
                        /**当前页 */
                        this.currpage = 1;
                        /**价格排序 1升序  2降序*/
                        this.priceSort = 1;
                        /**0筛选 1搜索 */
                        this.issearch = 0;
                    }
                    return ScreenVo;
                }());
                models.ScreenVo = ScreenVo;
            })(models = sale.models || (sale.models = {}));
        })(sale = modules.sale || (modules.sale = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ScreenVo.js.map