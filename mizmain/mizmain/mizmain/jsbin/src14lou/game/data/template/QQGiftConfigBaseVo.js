/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var QQGiftConfigBaseVo = /** @class */ (function () {
                function QQGiftConfigBaseVo() {
                    this.itemids = []; //奖励1道具,奖励2道具,奖励3道具,奖励4道具,奖励5道具
                    this.itemidnums = []; //奖励1数量,奖励2数量,奖励3数量,奖励4数量,奖励5数量
                }
                QQGiftConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.itemids.push(data.getUint32());
                    }
                    var listCount1 = data.getUint32();
                    for (var index = 0; index < listCount1; index++) {
                        this.itemidnums.push(data.getUint32());
                    }
                };
                return QQGiftConfigBaseVo;
            }());
            template.QQGiftConfigBaseVo = QQGiftConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=QQGiftConfigBaseVo.js.map