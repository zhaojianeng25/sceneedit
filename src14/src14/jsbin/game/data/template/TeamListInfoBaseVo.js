var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var TeamListInfoBaseVo = /** @class */ (function () {
                function TeamListInfoBaseVo() {
                }
                TeamListInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.content = data.getUTFBytes(data.getUint32());
                    this.target = data.getUTFBytes(data.getUint32());
                    this.type = data.getUint32();
                    this.minlevel = data.getUint32();
                    this.maxlevel = data.getUint32();
                    this.minMember = data.getUint32();
                    this.maxMember = data.getUint32();
                    this.additional = data.getUint32();
                    this.requirement = data.getUTFBytes(data.getUint32());
                    this.opentime = data.getUTFBytes(data.getUint32());
                };
                return TeamListInfoBaseVo;
            }());
            template.TeamListInfoBaseVo = TeamListInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamListInfoBaseVo.js.map