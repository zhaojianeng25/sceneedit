var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CAwardConfigBaseVo = /** @class */ (function () {
                function CAwardConfigBaseVo() {
                }
                CAwardConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.money = data.getUTFBytes(data.getUint32());
                    this.awardGroupId = data.getUint32();
                    this.awardId = data.getUTFBytes(data.getUint32());
                    this.noticeAwardId = data.getUTFBytes(data.getUint32());
                    this.noticeId = data.getUint32();
                    this.propertyNoticeId = data.getUint32();
                    this.silverNoticeId = data.getUint32();
                };
                return CAwardConfigBaseVo;
            }());
            template.CAwardConfigBaseVo = CAwardConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CAwardConfigBaseVo.js.map