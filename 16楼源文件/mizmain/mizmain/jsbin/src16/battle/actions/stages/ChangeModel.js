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
             * 5 变身，在残影对象填变身模型id
             */
            var ChangeModel = /** @class */ (function (_super) {
                __extends(ChangeModel, _super);
                function ChangeModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ChangeModel.prototype.onStart = function () {
                    _super.prototype.onStart.call(this);
                    //console.log("玩家:"+this.attacker.index+ "变身, stage: " + this.stage_data.id);
                };
                ChangeModel.prototype.onSubLogic = function () {
                    if (this.is_stage_end) {
                        return;
                    }
                    this.is_stage_end = true;
                    var result = this.result;
                    var target = this.battle.findRoleByIndex(result.targetID);
                    if (!target) {
                        console.warn("找不到目标", this.stage_data.id, result.targetID);
                        return;
                    }
                    target.shape = Math.max(this.stage_data.phantomid, result.shape_change);
                    // 还原变身
                    if (target.shape == 0)
                        target.shape = target.baseShape;
                    this.battle._scene.removeFakeUint(target.fakeUnit);
                    this.battle._scene.createFakeUnit(target);
                };
                return ChangeModel;
            }(stage.BaseStageAction));
            stage.ChangeModel = ChangeModel;
        })(stage = aciton.stage || (aciton.stage = {}));
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=ChangeModel.js.map