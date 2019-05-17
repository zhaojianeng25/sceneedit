var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var MyRecruitPayBaseVo = /** @class */ (function () {
                function MyRecruitPayBaseVo() {
                }
                MyRecruitPayBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.level = data.getUint32();
                    this.items = data.getUTFBytes(data.getUint32());
                    this.text = data.getUTFBytes(data.getUint32());
                };
                return MyRecruitPayBaseVo;
            }());
            template.MyRecruitPayBaseVo = MyRecruitPayBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=MyRecruitPayBaseVo.js.map