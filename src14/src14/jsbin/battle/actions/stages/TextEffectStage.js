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
             * 文字特效
             */
            var TextEffectStage = /** @class */ (function (_super) {
                __extends(TextEffectStage, _super);
                function TextEffectStage() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                TextEffectStage.prototype.onInit = function (textEffectName, target) {
                    this.textEffectName = textEffectName;
                    this.target = target;
                };
                TextEffectStage.prototype.onStart = function () {
                    var data = [];
                    data.name = this.textEffectName;
                    this.battle.ShowFightxt(this.target, 3 /* PIC */, data, false);
                };
                return TextEffectStage;
            }(battle.BaseAction));
            stage.TextEffectStage = TextEffectStage;
        })(stage = aciton.stage || (aciton.stage = {}));
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=TextEffectStage.js.map