/**
* 任务进度对象
*/
var game;
(function (game) {
    var object;
    (function (object) {
        var QuestStatusObject = /** @class */ (function () {
            function QuestStatusObject() {
                /**
                 *是否接受后自动引导
                 */
                this.isAutoGuide = false;
                /**
                 *需要任务物品
                 */
                this.items = new Array();
                /**
                 *需要任务生物或GO
                 */
                this.creatures = new Array();
            }
            return QuestStatusObject;
        }());
        object.QuestStatusObject = QuestStatusObject;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=QuestStatusObject.js.map