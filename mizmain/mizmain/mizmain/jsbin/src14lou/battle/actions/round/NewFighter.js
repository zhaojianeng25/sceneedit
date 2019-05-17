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
        var NewFighter = /** @class */ (function (_super) {
            __extends(NewFighter, _super);
            function NewFighter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            NewFighter.prototype.onInit = function (fighters) {
                this.fighters = fighters;
            };
            NewFighter.prototype.onStart = function () {
                for (var i = 0; i < this.fighters.length; i++) {
                    var element = this.fighters[i];
                    this.battle.addNewFighter(element);
                }
            };
            return NewFighter;
        }(battle.BaseAction));
        aciton.NewFighter = NewFighter;
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=NewFighter.js.map