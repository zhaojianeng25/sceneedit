/**
*
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var chat;
        (function (chat) {
            var models;
            (function (models) {
                var FoodItemTipsVo = /** @class */ (function () {
                    function FoodItemTipsVo() {
                    }
                    FoodItemTipsVo.prototype.fromByteArray = function (bytes) {
                        this.quality = bytes.readUint32();
                    };
                    return FoodItemTipsVo;
                }());
                models.FoodItemTipsVo = FoodItemTipsVo;
            })(models = chat.models || (chat.models = {}));
        })(chat = modules.chat || (modules.chat = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FoodItemTipsVo.js.map