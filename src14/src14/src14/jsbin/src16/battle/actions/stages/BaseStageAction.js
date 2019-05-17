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
             * stage行为播放基类
             */
            var BaseStageAction = /** @class */ (function (_super) {
                __extends(BaseStageAction, _super);
                function BaseStageAction() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                BaseStageAction.prototype.onInit = function (result, stage_data, attacker, attacker_units) {
                    this.result = result;
                    this.stage_data = stage_data;
                    this.attacker = attacker;
                    this.attacker_units = attacker_units;
                    if (this.stage_data)
                        this.setDelayTicks(this.stage_data.delay);
                };
                BaseStageAction.prototype.setDelayTicks = function (delay) {
                    this.stage_data.delay += delay;
                };
                BaseStageAction.prototype.onLogic = function (delay) {
                    _super.prototype.onLogic.call(this, delay);
                    this.onSubLogic(delay);
                };
                BaseStageAction.prototype.getPhantomUnit = function () {
                    return this.getPhantom(this.stage_data.phantomid);
                };
                BaseStageAction.prototype.getPhantom = function (id) {
                    var len = this.attacker_units.length;
                    for (var i = len; i <= id; i++) {
                        this.attacker_units.push(this.battle.scene.createFakeUnit(this.attacker, true));
                    }
                    return this.attacker_units[id];
                };
                BaseStageAction.prototype.isEnd = function () {
                    return this.is_stage_end;
                };
                BaseStageAction.prototype.onSubLogic = function (delay) {
                };
                return BaseStageAction;
            }(battle.BaseAction));
            stage.BaseStageAction = BaseStageAction;
        })(stage = aciton.stage || (aciton.stage = {}));
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=BaseStageAction.js.map