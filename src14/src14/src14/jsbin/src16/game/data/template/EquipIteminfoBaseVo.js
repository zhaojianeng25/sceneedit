/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EquipIteminfoBaseVo = /** @class */ (function () {
                function EquipIteminfoBaseVo() {
                }
                EquipIteminfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32(); //装备属性编号 id              
                    this.shuxing1id = data.getUint32(); //属性1ID 
                    var shuxing1bodongduanminLength = data.getUint32();
                    this.shuxing1bodongduanmin = []; //属性1波动段1min,属性1波动段2min,属性1波动段3min,属性1波动段4min,属性1波动段5min
                    for (var index = 0; index < shuxing1bodongduanminLength; index++) {
                        this.shuxing1bodongduanmin.push(data.getUint32());
                    }
                    var shuxing1bodongduanmaxLength = data.getUint32();
                    this.shuxing1bodongduanmax = []; //属性1波动段1max,属性1波动段2max,属性1波动段3max,属性1波动段4max,属性1波动段5max
                    for (var index = 0; index < shuxing1bodongduanmaxLength; index++) {
                        this.shuxing1bodongduanmax.push(data.getUint32());
                    }
                    var shuxing1bodongquanzhongLength = data.getUint32();
                    this.shuxing1bodongquanzhong = []; //属性1波动段1权重,属性1波动段2权重,属性1波动段3权重,属性1波动段4权重,属性1波动段5权重	
                    for (var index = 0; index < shuxing1bodongquanzhongLength; index++) {
                        this.shuxing1bodongquanzhong.push(data.getUint32());
                    }
                    this.shuxing2id = data.getUint32(); //属性2ID
                    var shuxing2bodongduanminLength = data.getUint32();
                    this.shuxing2bodongduanmin = []; //属性2波动段1min,属性2波动段2min,属性2波动段3min,属性2波动段4min,属性2波动段5min
                    for (var index = 0; index < shuxing2bodongduanminLength; index++) {
                        this.shuxing2bodongduanmin.push(data.getUint32());
                    }
                    var shuxing2bodongduanmaxLength = data.getUint32();
                    this.shuxing2bodongduanmax = []; //属性2波动段1max,属性2波动段2max,属性2波动段3max,属性2波动段4max,属性2波动段5max
                    for (var index = 0; index < shuxing2bodongduanmaxLength; index++) {
                        this.shuxing2bodongduanmax.push(data.getUint32());
                    }
                    var shuxing2bodongquanzhongLength = data.getUint32();
                    this.shuxing2bodongquanzhong = []; //属性2波动段1权重,属性2波动段2权重,属性2波动段3权重,属性2波动段4权重,属性2波动段5权重
                    for (var index = 0; index < shuxing2bodongquanzhongLength; index++) {
                        this.shuxing2bodongquanzhong.push(data.getUint32());
                    }
                    this.shuxing3id = data.getUint32(); //属性3ID
                    var shuxing3bodongduanminLength = data.getUint32();
                    this.shuxing3bodongduanmin = []; //属性3波动段1min,属性3波动段2min,属性3波动段3min,属性3波动段4min,属性3波动段5min
                    for (var index = 0; index < shuxing3bodongduanminLength; index++) {
                        this.shuxing3bodongduanmin.push(data.getUint32());
                    }
                    var shuxing3bodongduanmaxLength = data.getUint32();
                    this.shuxing3bodongduanmax = []; //属性3波动段1max,属性3波动段2max,属性3波动段3max,属性3波动段4max,属性3波动段5max
                    for (var index = 0; index < shuxing3bodongduanmaxLength; index++) {
                        this.shuxing3bodongduanmax.push(data.getUint32());
                    }
                    var shuxing3bodongquanzhongLength = data.getUint32();
                    this.shuxing3bodongquanzhong = []; //属性3波动段1权重,属性3波动段2权重,属性3波动段3权重,属性3波动段4权重,属性3波动段5权重
                    for (var index = 0; index < shuxing3bodongquanzhongLength; index++) {
                        this.shuxing3bodongquanzhong.push(data.getUint32());
                    }
                };
                return EquipIteminfoBaseVo;
            }());
            template.EquipIteminfoBaseVo = EquipIteminfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipIteminfoBaseVo.js.map