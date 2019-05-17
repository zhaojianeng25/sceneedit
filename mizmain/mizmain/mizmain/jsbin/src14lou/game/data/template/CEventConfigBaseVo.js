var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CEventConfigBaseVo = /** @class */ (function () {
                function CEventConfigBaseVo() {
                }
                CEventConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.iconId = data.getUint32();
                    this.type = data.getUint32();
                    this.enermyId = data.getUint32();
                    this.battleId = data.getUint32();
                    this.battleAward = data.getUTFBytes(data.getUint32());
                    this.skillId = data.getUint32();
                    this.personalNoticeId = data.getUint32();
                    this.noticeId = data.getUint32();
                };
                return CEventConfigBaseVo;
            }());
            template.CEventConfigBaseVo = CEventConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CEventConfigBaseVo.js.map