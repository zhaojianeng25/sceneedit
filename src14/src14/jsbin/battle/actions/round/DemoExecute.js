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
        var DemoExecute = /** @class */ (function (_super) {
            __extends(DemoExecute, _super);
            function DemoExecute() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            DemoExecute.prototype.onInit = function (data) {
                _super.prototype.onInit.call(this);
                this.data = data;
            };
            DemoExecute.prototype.onStart = function () {
                if (this.data.attackerID != 0) {
                    // 攻击者
                    var attacker = this.battle.findRoleByIndex(this.data.attackerID);
                    if (!attacker)
                        return;
                    // 攻击者属性变化
                    // attacker.changeHp(this.data.hpconsume);
                    // 更新hp
                    if (this.data.hpconsume != 0)
                        this.battle.page.updateHp(attacker, this.data.hpconsume, 1, false);
                    // attacker.changeMp(this.data.mpconsume);
                    // 更新mp
                    if (this.data.mpconsume != 0)
                        this.battle.page.updateMp(attacker, this.data.mpconsume);
                    // attacker.changeSp(this.data.spconsume);
                    //更新sp
                    // this.battle.page.updateSp(attacker, this.data.spconsume);
                }
                //当不为0时，为动作时的提示ID 在stage中处理 为了保证播放时机
                // if (this.data.msgID > 0)
                //     this.battle.showTips(this.data.msgID);
                // buf处理
                for (var i = 0; i < this.data.demobuffs.length; i++) {
                    var buff_1 = this.data.demobuffs[i];
                    this.battle.updateBuff(buff_1.fighterid, buff_1.buffid, buff_1.round);
                }
                //  console.log("---DemoExecute-----attackerID = ",this.data.attackerID," msgID = ",this.data.msgID," operationType = ",this.data.operationType," operationID = ",this.data.operationID);
                // 指令操作失败
                if (this.data.operationType == 14 /* ACTION_FAILURE */ || this.data.operationType == 20 /* ACTION_FAILURE_NO_WONDER */) {
                    console.log("---指令操作失败 DemoExecute-----attackerID = ", this.data.attackerID, " operationType = ", this.data.operationType, " operationID = ", this.data.operationID);
                }
            };
            return DemoExecute;
        }(battle.ActionMgr));
        aciton.DemoExecute = DemoExecute;
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=DemoExecute.js.map