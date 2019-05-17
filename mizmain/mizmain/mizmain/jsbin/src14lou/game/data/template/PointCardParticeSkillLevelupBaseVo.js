/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PointCardParticeSkillLevelupBaseVo = /** @class */ (function () {
                function PointCardParticeSkillLevelupBaseVo() {
                }
                PointCardParticeSkillLevelupBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    var vecskillexpLength = data.getUint32();
                    this.vecskillexp = [];
                    for (var index = 0; index < vecskillexpLength; index++) {
                        this.vecskillexp.push(data.getUint32());
                    }
                    this.playerlevel = data.getUint32();
                    this.factionlevel = data.getUint32();
                    this.maxcon = data.getUint32();
                    this.huanhuaplayerlevel = data.getUint32();
                    this.huanhuafactionlevel = data.getUint32();
                    this.huanhuamaxcon = data.getUint32();
                };
                return PointCardParticeSkillLevelupBaseVo;
            }());
            template.PointCardParticeSkillLevelupBaseVo = PointCardParticeSkillLevelupBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PointCardParticeSkillLevelupBaseVo.js.map