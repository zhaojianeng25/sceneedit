var game;
(function (game) {
    var modules;
    (function (modules) {
        var tianjixianling;
        (function (tianjixianling) {
            var models;
            (function (models) {
                /** 天机仙令任务Vo */
                var AnYeTaskVo = /** @class */ (function () {
                    function AnYeTaskVo() {
                    }
                    AnYeTaskVo.prototype.fromByteArray = function (bytes) {
                        this.pos = bytes.readInt32();
                        this.id = bytes.readInt32();
                        this.kind = bytes.readInt32();
                        this.state = bytes.readInt32();
                        this.dstitemid = bytes.readInt32();
                        this.dstitemnum = bytes.readInt32();
                        this.dstnpckey = bytes.readLong();
                        this.dstnpcid = bytes.readInt32();
                        this.legend = bytes.readInt32();
                        this.legendtime = bytes.readLong();
                        this.legendend = bytes.readLong();
                    };
                    return AnYeTaskVo;
                }());
                models.AnYeTaskVo = AnYeTaskVo;
            })(models = tianjixianling.models || (tianjixianling.models = {}));
        })(tianjixianling = modules.tianjixianling || (modules.tianjixianling = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=AnYeTaskVo.js.map