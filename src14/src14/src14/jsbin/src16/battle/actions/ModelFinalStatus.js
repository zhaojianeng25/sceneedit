var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var battle;
(function (battle) {
    var aciton;
    (function (aciton) {
        /**
         * 回合结束属性变化
         */
        var ModelFinalStaus = /** @class */ (function (_super) {
            __extends(ModelFinalStaus, _super);
            function ModelFinalStaus() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ModelFinalStaus.prototype.onInit = function (hps, mps) {
                console.log(">>>>> 战斗者血量的最终值", hps);
                console.log(">>>>> 战斗者兰量的最终值", mps);
                this.hps = hps;
                this.mps = mps;
            };
            ModelFinalStaus.prototype.onStart = function () {
                var hp_keys = this.hps.keys;
                for (var index = 0; index < hp_keys.length; index++) {
                    var key = hp_keys[index];
                    var role = this.battle.findRoleByIndex(key);
                    role.hp = this.hps.get(key);
                }
                var mp_keys = this.mps.keys;
                for (var index = 0; index < mp_keys.length; index++) {
                    var key = mp_keys[index];
                    var role = this.battle.findRoleByIndex(key);
                    role.mp = this.hps.get(key);
                }
            };
            ModelFinalStaus.prototype.onDestroy = function () {
                //RequesterProtocols._instance.c2s_CSendRoundPlayEnd([]);
            };
            return ModelFinalStaus;
        }(battle.BaseAction));
        aciton.ModelFinalStaus = ModelFinalStaus;
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=ModelFinalStatus.js.map