var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CNpcServerConfigBaseVo = /** @class */ (function () {
                function CNpcServerConfigBaseVo() {
                    this.childservice = []; //子服务1,子服务2,子服务3,子服务4,子服务5,子服务6
                }
                CNpcServerConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.icon = data.getUint32();
                    this.servicedescribe = data.getUTFBytes(data.getUint32());
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.childservice.push(data.getUint32());
                    }
                    this.severStr = data.getUTFBytes(data.getUint32());
                    this.webaddress = data.getUTFBytes(data.getUint32());
                    this.nautocommit = data.getUint32();
                };
                return CNpcServerConfigBaseVo;
            }());
            template.CNpcServerConfigBaseVo = CNpcServerConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CNpcServerConfigBaseVo.js.map