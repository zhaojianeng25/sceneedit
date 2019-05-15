/**
* 闲聊数据
*/
var game;
(function (game) {
    var data;
    (function (data) {
        var GossipData = /** @class */ (function () {
            function GossipData() {
            }
            //存储 生物ID和文本的关系（1对多的关系）
            // private static gossipData: laya.utils.Dictionary = new laya.utils.Dictionary();
            GossipData._isInit = false;
            return GossipData;
        }());
        data.GossipData = GossipData;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=GossipData.js.map