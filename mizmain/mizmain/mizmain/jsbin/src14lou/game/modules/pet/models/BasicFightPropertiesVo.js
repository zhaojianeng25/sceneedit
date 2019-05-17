/**
* 宠物基础属性
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var models;
            (function (models) {
                var BasicFightPropertiesVo = /** @class */ (function () {
                    function BasicFightPropertiesVo() {
                    }
                    BasicFightPropertiesVo.prototype.fromByteArray = function (bytes) {
                        this.cons = bytes.readInt16();
                        this.iq = bytes.readInt16();
                        this.str = bytes.readInt16();
                        this.endu = bytes.readInt16();
                        this.agi = bytes.readInt16();
                    };
                    return BasicFightPropertiesVo;
                }());
                models.BasicFightPropertiesVo = BasicFightPropertiesVo;
            })(models = pet.models || (pet.models = {}));
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BasicFightPropertiesVo.js.map