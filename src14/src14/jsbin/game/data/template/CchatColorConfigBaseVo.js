/**
* name  Y颜色转换表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CchatColorConfigBaseVo = /** @class */ (function () {
                function CchatColorConfigBaseVo() {
                    this.notifylist = []; //频道1,频道2,频道3,频道4,频道5,频道6,频道7,频道8,频道9,频道10,频道11,频道12,频道13,频道14,频道15,频道16,频道17,频道18
                    this.chatlist = []; //频道19,频道20,频道21,频道22,频道23,频道24,频道25,频道26,频道27,频道28,频道29,频道30,频道31,频道32
                }
                CchatColorConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.color = data.getUTFBytes(data.getUint32());
                    var listCount = data.getUint32();
                    for (var index = 0; index < listCount; index++) {
                        this.notifylist.push(data.getUTFBytes(data.getUint32()));
                        // console.log(data.getUTFBytes(data.getUint32()));				
                    }
                    var listCount2 = data.getUint32();
                    for (var index = 0; index < listCount2; index++) {
                        this.chatlist.push(data.getUTFBytes(data.getUint32()));
                        // console.log(data.getUTFBytes(data.getUint32()));				
                    }
                    this.headpop = data.getUTFBytes(data.getUint32());
                };
                return CchatColorConfigBaseVo;
            }());
            template.CchatColorConfigBaseVo = CchatColorConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CchatColorConfigBaseVo.js.map