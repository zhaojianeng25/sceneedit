var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CMonsterConfigBaseVo = /** @class */ (function () {
                function CMonsterConfigBaseVo() {
                }
                CMonsterConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.title = data.getUTFBytes(data.getUint32());
                    this.modelID = data.getUint32();
                    this.becatch = data.getUint32();
                    this.showhpbar = data.getUint32();
                    this.showhpbarbig = data.getUint32();
                    this.showlevel = data.getUint32();
                    this.npctype = data.getUint32();
                    this.bodytype = data.getFloat64();
                    this.area1colour = data.getUint32();
                    this.area2colour = data.getUint32();
                    this.petid = data.getUint32();
                    this.school = data.getUint32();
                };
                return CMonsterConfigBaseVo;
            }());
            template.CMonsterConfigBaseVo = CMonsterConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CMonsterConfigBaseVo.js.map