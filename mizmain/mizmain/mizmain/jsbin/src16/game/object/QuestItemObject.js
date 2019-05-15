/**
* 任务物品,即任务条件类，目前只两个字段
*/
var game;
(function (game) {
    var object;
    (function (object) {
        var QuestItemObject = /** @class */ (function () {
            function QuestItemObject(itemid, itemcount, rCount, sIndex) {
                if (itemid === void 0) { itemid = 0; }
                if (itemcount === void 0) { itemcount = 0; }
                if (rCount === void 0) { rCount = 0; }
                if (sIndex === void 0) { sIndex = -1; }
                this.id = itemid;
                this.count = itemcount;
                this.reqCount = rCount;
                this.slotIndex = sIndex;
            }
            return QuestItemObject;
        }());
        object.QuestItemObject = QuestItemObject;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=QuestItemObject.js.map