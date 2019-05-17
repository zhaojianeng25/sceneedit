var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var FriendGiveGiftBaseVo = /** @class */ (function () {
                function FriendGiveGiftBaseVo() {
                }
                FriendGiveGiftBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.oppositeSexFriendlyDegrees = data.getUint32();
                    this.sameSexFriendlyDegrees = data.getUint32();
                };
                return FriendGiveGiftBaseVo;
            }());
            template.FriendGiveGiftBaseVo = FriendGiveGiftBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=FriendGiveGiftBaseVo.js.map