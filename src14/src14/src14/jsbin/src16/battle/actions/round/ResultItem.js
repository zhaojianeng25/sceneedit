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
         * 回合倒计时
         */
        var ResultItem = /** @class */ (function (_super) {
            __extends(ResultItem, _super);
            function ResultItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ResultItem.prototype.onInit = function (data, isFaShuLianJi, dieAiActions, isLastAction) {
                if (isLastAction === void 0) { isLastAction = false; }
                _super.prototype.onInit.call(this);
                this.data = data;
                this.isFaShuLianJi = isFaShuLianJi;
                this.dieAiActions = dieAiActions;
                this.isLastAction = isLastAction;
            };
            ResultItem.prototype.onStart = function () {
                if (this.dieAiActions.length > 0) {
                    this.add.apply(this, this.dieAiActions);
                }
                var data = this.data;
                var execute = data.demoExecuteVo;
                var list = [];
                // 攻击者表现
                list.push(new aciton.DemoExecute(this.battle, execute));
                // 受击效果表现
                var subresultlist = data.subresultlist;
                for (var i = 0; i < subresultlist.length; i++) {
                    list.push(new aciton.SubResultItem(this.battle, subresultlist[i], execute.attackerID, execute.operationType, execute.operationID, execute.msgID, this.isFaShuLianJi, i));
                }
                this.addQueue.apply(this, list);
                // 新增战斗单位
                this.addQueue(new aciton.NewFighter(this.battle, data.newfighter));
                // 属性变化
                var roleChangedAttrs = data.roleChangedAttrs;
                var roleAttrs = [];
                for (var m = 0; m < roleChangedAttrs.keys.length; m++) {
                    var key = roleChangedAttrs.keys[m];
                    this.battle.updateAttr(this.battle.self_role.index, key, roleChangedAttrs.get(key));
                    roleAttrs.push(key + ":" + roleChangedAttrs.get(key));
                }
                console.log("  roleChangedAttrs:", roleAttrs.join(", "));
                var petChangedAttrs = data.petChangedAttrs;
                var petAttrs = [];
                for (var m = 0; m < petChangedAttrs.keys.length; m++) {
                    var key = petChangedAttrs.keys[m];
                    this.battle.updateAttr(this.battle.self_pet.index, key, petChangedAttrs.get(key));
                    petAttrs.push(key + ":" + petChangedAttrs.get(key));
                }
                console.log("  petChangedAttrs:", petAttrs.join(", "));
            };
            ResultItem.prototype.onDestroy = function () {
                /** 确保是最后一个动作发送回合完成指令 */
                if (this.isLastAction)
                    RequesterProtocols._instance.c2s_CSendRoundPlayEnd([1, 1, 1]);
            };
            return ResultItem;
        }(battle.ActionMgr));
        aciton.ResultItem = ResultItem;
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=ResultItem.js.map