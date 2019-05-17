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
var game;
(function (game) {
    var modules;
    (function (modules) {
        var guaji;
        (function (guaji) {
            var models;
            (function (models) {
                /** 刷新挂机AI数据返回事件 */
                models.GET_AUTOFIGHTAI_DATA = "getAutoFightData";
                /** 人物技能图片改变事件 */
                models.ROLE_SKILL_IMG_CHANGE = "roleSkillImgChange";
                /** 挂机系统的proxy */
                var GuaJiProxy = /** @class */ (function (_super) {
                    __extends(GuaJiProxy, _super);
                    function GuaJiProxy() {
                        var _this = _super.call(this) || this;
                        GuaJiProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    GuaJiProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new GuaJiProxy();
                        }
                        return this._instance;
                    };
                    GuaJiProxy.prototype.init = function () {
                        models.GuaJiModel.getInstance();
                        this.addNetworkListener();
                        //加载练功区怪物配置表
                        Laya.loader.load("common/data/temp/npc.cmonsterconfig.bin", Handler.create(this, this.onloadedCMonsterConfigComplete), null, Loader.BUFFER);
                        //加载挂机设置的配置表
                        Laya.loader.load("common/data/temp/battle.crolefighteai.bin", Handler.create(this, this.onloadedCRoleFighteAIComplete), null, Loader.BUFFER);
                        //s死亡提醒表
                        Laya.loader.load("common/data/temp/game.cdeathnote.bin", Handler.create(this, this.onloadedDeathNoteComplete), null, Loader.BUFFER);
                    };
                    GuaJiProxy.prototype.onloadedCRoleFighteAIComplete = function () {
                        console.log("CRoleFighteAI表加载完毕------ completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.crolefighteai.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.GuaJiModel.getInstance().roleFightAIDic, game.data.template.RoleFighteAIBaseVo, "id");
                        console.log("onloadedCreateRoleConfigComplete:", models.GuaJiModel.getInstance().roleFightAIDic);
                    };
                    GuaJiProxy.prototype.onloadedCMonsterConfigComplete = function () {
                        console.log("CNpcInAll表加载完毕------ completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cmonsterconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.GuaJiModel.getInstance().monstersDic, game.data.template.CMonsterConfigBaseVo, "id");
                        console.log("onloadedCreateRoleConfigComplete:", models.GuaJiModel.getInstance().monstersDic);
                    };
                    GuaJiProxy.prototype.onloadedDeathNoteComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/game.cdeathnote.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.GuaJiModel.getInstance().deatNote, game.data.template.CDeathNoteBaseVo, "id");
                        console.log("onloadedCreateRoleConfigComplete:", models.GuaJiModel.getInstance().monstersDic);
                    };
                    // 添加监听
                    GuaJiProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SFlushRoleFightAI, this, this.onSFlushRoleFightAI);
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshRoleHookBattleData, this, this.onSRefreshRoleHookBattleData);
                    };
                    /**
                     * 服务器刷新挂机战斗相关数据返回
                     */
                    GuaJiProxy.prototype.onSRefreshRoleHookBattleData = function (optcode, msg) {
                        models.GuaJiModel._instance.hookBattleData = msg.RoleHookBattleData;
                    };
                    /**
                     * 刷新挂机AI数据返回
                     */
                    GuaJiProxy.prototype.onSFlushRoleFightAI = function (optcode, msg) {
                        models.GuaJiModel._instance.autoFightData = [];
                        models.GuaJiModel._instance.autoFightData = msg.fightaiids;
                        GuaJiProxy.getInstance().event(models.GET_AUTOFIGHTAI_DATA, [msg.fightaiids]);
                    };
                    return GuaJiProxy;
                }(hanlder.ProxyBase));
                models.GuaJiProxy = GuaJiProxy;
            })(models = guaji.models || (guaji.models = {}));
        })(guaji = modules.guaji || (modules.guaji = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=GuaJiProxy.js.map