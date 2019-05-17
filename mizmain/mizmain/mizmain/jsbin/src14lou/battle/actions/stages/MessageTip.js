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
             * 提示
             */
            var MessageTip = /** @class */ (function (_super) {
                __extends(MessageTip, _super);
                function MessageTip() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MessageTip.prototype.onStart = function () {
                    _super.prototype.onStart.call(this);
                };
                MessageTip.prototype.onInit = function (msgid) {
                    this.msgID = msgid;
                };
                MessageTip.prototype.onSubLogic = function () {
                    if (this.is_stage_end) {
                        return;
                    }
                    this.is_stage_end = true;
                    this.battle.showTipsByMsgID(this.msgID);
                };
                return MessageTip;
            }(stage.BaseStageAction));
            stage.MessageTip = MessageTip;
        })(stage = aciton.stage || (aciton.stage = {}));
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=MessageTip.js.map