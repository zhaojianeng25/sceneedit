/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var OnLineGiftBaseVo = /** @class */ (function () {
                function OnLineGiftBaseVo() {
                }
                OnLineGiftBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.time = data.getUint32();
                    this.itemid1 = data.getUint32();
                    this.itemidnew1 = data.getUint32();
                    this.itemnum1 = data.getUint32();
                    this.itemid2 = data.getUint32();
                    this.itemnum2 = data.getUint32();
                    this.itemid3 = data.getUint32();
                    this.itemnum3 = data.getUint32();
                };
                return OnLineGiftBaseVo;
            }());
            template.OnLineGiftBaseVo = OnLineGiftBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=OnLineGiftBaseVo.js.map