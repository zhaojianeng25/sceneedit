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
    /**
     * 攻击结束恢复站位
     */
    var Recover = /** @class */ (function (_super) {
        __extends(Recover, _super);
        function Recover() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Recover.prototype.onInit = function (attacker, attacker_units) {
            this.attacker = attacker;
            this.attacker_units = attacker_units;
        };
        Recover.prototype.onStart = function () {
            var p = this.battle.scene.getMapPoint(this.attacker.pos - 1, this.attacker.isBottom);
            //console.log("---------------攻击结束恢复站位 ", this.attacker.fakeUnit.name);
            this.battle._scene.moveBack(this.attacker.fakeUnit, this.attacker.pos - 1, this.attacker.isBottom);
        };
        Recover.prototype.onDestroy = function () {
            // console.log("-------------onDestroy");
            for (var i = this.attacker_units.length - 1; i > 0; i--) {
                var fakeUnit = this.attacker_units[i];
                this.battle.scene._objMgr.ReleaseObject(fakeUnit);
                this.attacker_units.splice(i, 1);
            }
        };
        return Recover;
    }(battle.BaseAction));
    battle.Recover = Recover;
})(battle || (battle = {}));
//# sourceMappingURL=Recover.js.map