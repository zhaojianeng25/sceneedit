var game;
(function (game) {
    var modules;
    (function (modules) {
        var guaji;
        (function (guaji) {
            var models;
            (function (models) {
                /** 挂机战斗相关数据Vo */
                var HookBattleDataVo = /** @class */ (function () {
                    /** 挂机战斗相关数据Vo */
                    function HookBattleDataVo() {
                    }
                    HookBattleDataVo.prototype.fromByteArray = function (bytes) {
                        this.isautobattle = bytes.readByte();
                        this.charoptype = bytes.readShort();
                        this.charopid = bytes.readInt32();
                        this.petoptype = bytes.readShort();
                        this.petopid = bytes.readInt32();
                    };
                    return HookBattleDataVo;
                }());
                models.HookBattleDataVo = HookBattleDataVo;
            })(models = guaji.models || (guaji.models = {}));
        })(guaji = modules.guaji || (modules.guaji = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=HookBattleDataVo.js.map