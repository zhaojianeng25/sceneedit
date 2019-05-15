/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var AttributeDesConfigBaseVo = /** @class */ (function () {
                function AttributeDesConfigBaseVo() {
                }
                AttributeDesConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.numid = data.getUint32();
                    this.roleattribute = data.getUTFBytes(data.getUint32());
                    this.numbasevalue = data.getUTFBytes(data.getUint32());
                    this.numpositivedes = data.getUTFBytes(data.getUint32());
                    this.numnegativedes = data.getUTFBytes(data.getUint32());
                    this.percentid = data.getUint32();
                    this.percentpositivedes = data.getUTFBytes(data.getUint32());
                    this.percentnegativedes = data.getUTFBytes(data.getUint32());
                };
                return AttributeDesConfigBaseVo;
            }());
            template.AttributeDesConfigBaseVo = AttributeDesConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=AttributeDesConfigBaseVo.js.map