/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EquipAddattributerandomlibBaseVo = /** @class */ (function () {
                function EquipAddattributerandomlibBaseVo() {
                    this.addattributer = [];
                    this.addattributerquanzhong = [];
                }
                ; //附加属性id1,附加属性id2,附加属性id3,附加属性id4,附加属性id5,附加属性id6,附加属性id7,附加属性id8,附加属性id9,附加属性id10,附加属性id11,附加属性id12,附加属性id13,附加属性id14,附加属性id15"
                ; //附加属性id1权重,附加属性id2权重,附加属性id3权重,附加属性id4权重,附加属性id5权重,附加属性id6权重,附加属性id7权重,附加属性id8权重,附加属性id9权重,附加属性id10权重,附加属性id11权重,附加属性id12权重,附加属性id13权重,附加属性id14权重,附加属性id15权重
                EquipAddattributerandomlibBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    var addattributerLength = data.getUint32();
                    this.addattributer = [];
                    for (var index = 0; index < addattributerLength; index++) {
                        this.addattributer.push(data.getUint32());
                    }
                    var addattributerquanzhongLength = data.getUint32();
                    this.addattributerquanzhong = [];
                    ;
                    for (var index = 0; index < addattributerquanzhongLength; index++) {
                        this.addattributerquanzhong.push(data.getUint32());
                    }
                    this.allquanzhong = data.getUint32();
                };
                return EquipAddattributerandomlibBaseVo;
            }());
            template.EquipAddattributerandomlibBaseVo = EquipAddattributerandomlibBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipAddattributerandomlibBaseVo.js.map