/**
* name z战斗信息表-复合/z战斗信息表_1xxx,z战斗信息表-复合/z战斗信息表_剧情_8xxx,z战斗信息表-复合/z战斗信息表_练功区特殊_9xxx
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CbattlelistBaseVo = /** @class */ (function () {
                function CbattlelistBaseVo() {
                }
                CbattlelistBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.positionsid = data.getUint32();
                };
                return CbattlelistBaseVo;
            }());
            template.CbattlelistBaseVo = CbattlelistBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CbattlelistBaseVo.js.map