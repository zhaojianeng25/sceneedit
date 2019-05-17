var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var FriendGiveItemBaseVo = /** @class */ (function () {
                function FriendGiveItemBaseVo() {
                }
                FriendGiveItemBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                };
                return FriendGiveItemBaseVo;
            }());
            template.FriendGiveItemBaseVo = FriendGiveItemBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=FriendGiveItemBaseVo.js.map