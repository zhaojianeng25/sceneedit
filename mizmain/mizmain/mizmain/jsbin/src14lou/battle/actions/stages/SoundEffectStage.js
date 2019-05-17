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
             * 音效
             */
            var SoundEffectStage = /** @class */ (function (_super) {
                __extends(SoundEffectStage, _super);
                function SoundEffectStage() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SoundEffectStage.prototype.onInit = function (soundEffectName) {
                    this.soundEffectName = soundEffectName;
                };
                SoundEffectStage.prototype.onStart = function () {
                    _super.prototype.onStart.call(this);
                    Laya.SoundManager.playSound(this.soundEffectName);
                };
                return SoundEffectStage;
            }(battle.BaseAction));
            stage.SoundEffectStage = SoundEffectStage;
        })(stage = aciton.stage || (aciton.stage = {}));
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=SoundEffectStage.js.map