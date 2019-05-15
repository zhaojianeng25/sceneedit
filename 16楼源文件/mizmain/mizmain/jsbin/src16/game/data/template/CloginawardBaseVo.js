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
            var CloginawardBaseVo = /** @class */ (function () {
                function CloginawardBaseVo() {
                    this.item1id = []; //角色ID1道具1,角色ID2道具1,角色ID3道具1,角色ID4道具1,角色ID5道具1,角色ID6道具1
                    this.item1num = []; //角色ID1数量1,角色ID2数量1,角色ID3数量1,角色ID4数量1,角色ID5数量1,角色ID6数量1
                    this.item1bind = []; //角色ID1道具1是否绑定,角色ID2道具1是否绑定,角色ID3道具1是否绑定,角色ID4道具1是否绑定,角色ID5道具1是否绑定,角色ID6道具1是否绑定
                    this.item2id = []; //角色ID1道具2,角色ID2道具2,角色ID3道具2,角色ID4道具2,角色ID5道具2,角色ID6道具2
                    this.item2num = []; //角色ID1数量2,角色ID2数量2,角色ID3数量2,角色ID4数量2,角色ID5数量2,角色ID6数量2
                    this.item2bind = []; //角色ID1道具2是否绑定,角色ID2道具2是否绑定,角色ID3道具2是否绑定,角色ID4道具2是否绑定,角色ID5道具2是否绑定,角色ID6道具2是否绑定
                    this.item3id = []; //角色ID1道具3,角色ID2道具3,角色ID3道具3,角色ID4道具3,角色ID5道具3,角色ID6道具3
                    this.item3num = []; //角色ID1数量3,角色ID2数量3,角色ID3数量3,角色ID4数量3,角色ID5数量3,角色ID6数量3
                    this.item3bind = []; //角色ID1道具3是否绑定,角色ID2道具3是否绑定,角色ID3道具3是否绑定,角色ID4道具3是否绑定,角色ID5道具3是否绑定,角色ID6道具3是否绑定
                    this.needcapacity = []; //角色ID1物品需要包裹格,角色ID2物品需要包裹格,角色ID3物品需要包裹格,角色ID4物品需要包裹格,角色ID5物品需要包裹格,角色ID6物品需要包裹格
                    this.pet1id = []; //角色ID1宠物1,角色ID2宠物1,角色ID3宠物1,角色ID4宠物1,角色ID5宠物1,角色ID6宠物1
                    this.pet1bind = []; //角色ID1宠物1是否绑定,角色ID2宠物1是否绑定,角色ID3宠物1是否绑定,角色ID4宠物1是否绑定,角色ID5宠物1是否绑定,角色ID6宠物1是否绑定
                    this.pet2id = []; //角色ID1宠物2,角色ID2宠物2,角色ID3宠物2,角色ID4宠物2,角色ID5宠物2,角色ID6宠物2
                    this.pet2bind = []; //角色ID1宠物2是否绑定,角色ID2宠物2是否绑定,角色ID3宠物2是否绑定,角色ID4宠物2是否绑定,角色ID5宠物2是否绑定,角色ID6宠物2是否绑定
                    this.pet3id = []; //角色ID1宠物3,角色ID2宠物3,角色ID3宠物3,角色ID4宠物3,角色ID5宠物3,角色ID6宠物3
                    this.pet3bind = []; //角色ID1宠物3是否绑定,角色ID2宠物3是否绑定,角色ID3宠物3是否绑定,角色ID4宠物3是否绑定,角色ID5宠物3是否绑定,角色ID6宠物3是否绑定
                    this.needpetcapacity = []; //角色ID1宠物需要包裹格,角色ID2宠物需要包裹格,角色ID3宠物需要包裹格,角色ID4宠物需要包裹格,角色ID5宠物需要包裹格,角色ID6宠物需要包裹格
                }
                CloginawardBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.dayimg = data.getUTFBytes(data.getUint32());
                    var item1idLength = data.getUint32();
                    for (var index = 0; index < item1idLength; index++) {
                        this.item1id.push(data.getUTFBytes(data.getUint32()));
                    }
                    var item1numLength = data.getUint32();
                    for (var index = 0; index < item1numLength; index++) {
                        this.item1num.push(data.getUint32());
                    }
                    var item1bindLength = data.getUint32();
                    for (var index = 0; index < item1bindLength; index++) {
                        this.item1bind.push(data.getUint32());
                    }
                    var item2idLength = data.getUint32();
                    for (var index = 0; index < item2idLength; index++) {
                        this.item2id.push(data.getUTFBytes(data.getUint32()));
                    }
                    var item2numLength = data.getUint32();
                    for (var index = 0; index < item2numLength; index++) {
                        this.item2num.push(data.getUint32());
                    }
                    var item2bindLength = data.getUint32();
                    for (var index = 0; index < item2bindLength; index++) {
                        this.item2bind.push(data.getUint32());
                    }
                    var item3idLength = data.getUint32();
                    for (var index = 0; index < item3idLength; index++) {
                        this.item3id.push(data.getUTFBytes(data.getUint32()));
                    }
                    var item3numLength = data.getUint32();
                    for (var index = 0; index < item3numLength; index++) {
                        this.item3num.push(data.getUint32());
                    }
                    var item3bindLength = data.getUint32();
                    for (var index = 0; index < item3bindLength; index++) {
                        this.item3bind.push(data.getUint32());
                    }
                    var needcapacityLength = data.getUint32();
                    for (var index = 0; index < needcapacityLength; index++) {
                        this.needcapacity.push(data.getUint32());
                    }
                    var pet1idLength = data.getUint32();
                    for (var index = 0; index < pet1idLength; index++) {
                        this.pet1id.push(data.getUint32());
                    }
                    var pet1bindLength = data.getUint32();
                    for (var index = 0; index < pet1bindLength; index++) {
                        this.pet1bind.push(data.getUint32());
                    }
                    var pet2idLength = data.getUint32();
                    for (var index = 0; index < pet2idLength; index++) {
                        this.pet2id.push(data.getUint32());
                    }
                    var pet2bindLength = data.getUint32();
                    for (var index = 0; index < pet2bindLength; index++) {
                        this.pet2bind.push(data.getUint32());
                    }
                    var pet3idLength = data.getUint32();
                    for (var index = 0; index < pet3idLength; index++) {
                        this.pet3id.push(data.getUint32());
                    }
                    var pet3bindLength = data.getUint32();
                    for (var index = 0; index < pet3bindLength; index++) {
                        this.pet3bind.push(data.getUint32());
                    }
                    var needpetcapacityLength = data.getUint32();
                    for (var index = 0; index < needpetcapacityLength; index++) {
                        this.needpetcapacity.push(data.getUint32());
                    }
                };
                return CloginawardBaseVo;
            }());
            template.CloginawardBaseVo = CloginawardBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CloginawardBaseVo.js.map