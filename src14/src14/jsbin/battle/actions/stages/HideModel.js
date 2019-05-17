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
        var stage;
        (function (stage) {
            /**
             * 6 隐身，填透明度即可
             */
            var HideModel = /** @class */ (function (_super) {
                __extends(HideModel, _super);
                function HideModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                HideModel.prototype.onStart = function () {
                    _super.prototype.onStart.call(this);
                    console.log("玩家:" + this.attacker.index + "隐身 = ", this.stage_data.phantomalpha / 255, " stage: " + this.stage_data.id);
                };
                HideModel.prototype.onSubLogic = function () {
                    if (this.is_stage_end) {
                        return;
                    }
                    this.is_stage_end = true;
                    var reuslt = this.result;
                    if (this.stage_data.phantomalpha == -1) { //移除模型
                        this.battle._scene.removeFakeUint(this.attacker.fakeUnit);
                        this.battle.removeRoleByIndex(this.attacker.index);
                        return;
                    }
                    this.battle._scene._scene.updateAlpha(this.attacker.fakeUnit, this.stage_data.phantomalpha / 255);
                };
                return HideModel;
            }(stage.BaseStageAction));
            stage.HideModel = HideModel;
        })(stage = aciton.stage || (aciton.stage = {}));
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=HideModel.js.map