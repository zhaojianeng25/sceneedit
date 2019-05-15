/**
* @Author: LinQiuWen
* @description:
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CShareConfigBaseVo = /** @class */ (function () {
                function CShareConfigBaseVo() {
                }
                CShareConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    ;
                    this.iconWechat = data.getUTFBytes(data.getUint32());
                    this.titleWechat = data.getUTFBytes(data.getUint32());
                    this.describWechat = data.getUTFBytes(data.getUint32());
                    this.iosUrlWechat = data.getUTFBytes(data.getUint32());
                    this.androidUrlWechat = data.getUTFBytes(data.getUint32());
                    this.iconMonents = data.getUTFBytes(data.getUint32());
                    this.titleMonents = data.getUTFBytes(data.getUint32());
                    this.describMonents = data.getUTFBytes(data.getUint32());
                    this.iosUrlMonents = data.getUTFBytes(data.getUint32());
                    this.androidUrlMonents = data.getUTFBytes(data.getUint32());
                    this.iconWeibo = data.getUTFBytes(data.getUint32());
                    this.titleWeibo = data.getUTFBytes(data.getUint32());
                    this.describWeibo = data.getUTFBytes(data.getUint32());
                    this.iosUrlWeibo = data.getUTFBytes(data.getUint32());
                    this.androidUrlWeibo = data.getUTFBytes(data.getUint32());
                };
                return CShareConfigBaseVo;
            }());
            template.CShareConfigBaseVo = CShareConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CShareConfigBaseVo.js.map