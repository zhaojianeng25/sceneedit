var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var RecruitPathBaseVo = /** @class */ (function () {
                function RecruitPathBaseVo() {
                }
                RecruitPathBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.path1 = data.getUTFBytes(data.getUint32());
                    this.path2 = data.getUTFBytes(data.getUint32());
                    this.path3 = data.getUTFBytes(data.getUint32());
                    this.path4 = data.getUTFBytes(data.getUint32());
                    this.path5 = data.getUTFBytes(data.getUint32());
                    this.path6 = data.getUTFBytes(data.getUint32());
                    this.path7 = data.getUTFBytes(data.getUint32());
                    this.path8 = data.getUTFBytes(data.getUint32());
                    this.path9 = data.getUTFBytes(data.getUint32());
                    this.path10 = data.getUTFBytes(data.getUint32());
                    this.path11 = data.getUTFBytes(data.getUint32());
                };
                return RecruitPathBaseVo;
            }());
            template.RecruitPathBaseVo = RecruitPathBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=RecruitPathBaseVo.js.map