var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CLoginImagesBaseVo = /** @class */ (function () {
                function CLoginImagesBaseVo() {
                }
                CLoginImagesBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.imagefilename = data.getUTFBytes(data.getUint32());
                    this.width = data.getUint32();
                    this.height = data.getUint32();
                    this.minlevel = data.getUint32();
                    this.maxlevel = data.getUint32();
                    this.mapid = data.getUint32();
                    this.taskid = data.getUint32();
                    this.weight = data.getUint32();
                };
                return CLoginImagesBaseVo;
            }());
            template.CLoginImagesBaseVo = CLoginImagesBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CLoginImagesBaseVo.js.map