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
/**
* 伙伴
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var huoban;
        (function (huoban) {
            var models;
            (function (models) {
                /**伙伴信息*/
                models.HUOBANLIST_EVENT = "huobanlist_event";
                /**伙伴阵容*/
                models.ZHENRONG_EVENT = "zhenrong_event";
                /**伙伴详情*/
                models.HUOBANDETAIL_EVENT = "huobandetail_event";
                /**伙伴解锁*/
                models.HUOBANJIESUO_EVENT = "huobanjiesuo_event";
                /**界面更换*/
                models.JIEMIANCHANGE_EVENT = "jiemainchange_event";
                /**上阵提示*/
                models.SHANGZHENTISHI_EVENT = "shangzhentishi_event";
                /**更换阵容*/
                models.SWITCHCHANGE_EVENT = "swtichchange_event";
                /**打开阵法*/
                models.OPENZHENFA_EVENT = "openzhenfa_event";
                var HuoBanProxy = /** @class */ (function (_super) {
                    __extends(HuoBanProxy, _super);
                    function HuoBanProxy() {
                        var _this = _super.call(this) || this;
                        HuoBanProxy._instance = _this;
                        _this.addNetworkListener();
                        Laya.loader.load("common/data/temp/npc.cherobaseinfo.bin", Handler.create(_this, _this.onloadedcHeroBaseInfoComplete), null, Loader.BUFFER);
                        //CFriendSkill
                        Laya.loader.load("common/data/temp/skill.cfriendskill.bin", Handler.create(_this, _this.onloadedFriendSkillComplete), null, Loader.BUFFER);
                        //battlemagic 最终位置为在队伍中读取
                        Laya.loader.load("common/data/temp/battle.cformationbaseconfig.bin", Handler.create(_this, _this.onloadedFormationbaseConfigBaseVoComplete), null, Loader.BUFFER);
                        //克制 CFormationRestrain
                        Laya.loader.load("common/data/temp/battle.cformationrestrain.bin", Handler.create(_this, _this.onloadedFormationRestrainBaseVoComplete), null, Loader.BUFFER);
                        //team.czhenfaeffect
                        Laya.loader.load("common/data/temp/team.czhenfaeffect.bin", Handler.create(_this, _this.onloadedZhenFaEffectComplete), null, Loader.BUFFER);
                        return _this;
                    }
                    HuoBanProxy.prototype.addNetworkListener = function () {
                        /**获取伙伴信息*/
                        Network._instance.addHanlder(ProtocolsEnum.SHuobanList, this, this.refrehuoban);
                        /**刷新阵容*/
                        Network._instance.addHanlder(ProtocolsEnum.SZhenrongInfo, this, this.refrezhenrong);
                        ; /**伙伴增加*/
                        Network._instance.addHanlder(ProtocolsEnum.SChangeZhenrong, this, this.add);
                        /**伙伴详情*/
                        Network._instance.addHanlder(ProtocolsEnum.SHuobanDetail, this, this.huobandetail);
                        /**伙伴解锁*/
                        Network._instance.addHanlder(ProtocolsEnum.SActiveHuoBan, this, this.huobanjiesuo);
                        /**更改阵法*/
                        Network._instance.addHanlder(ProtocolsEnum.SSwitchZhenfa, this, this.switchchangezhenfa);
                        /**打开阵法*/
                        Network._instance.addHanlder(ProtocolsEnum.SFormationsMap, this, this.openzhenfa);
                    };
                    //z光环效果配置表
                    HuoBanProxy.prototype.onloadedZhenFaEffectComplete = function () {
                        console.log("ZhenFaEffect表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/team.czhenfaeffect.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.HuoBanModel.getInstance().ZhenFaEffectData, game.data.template.ZhenFaEffectBaseVo, "id");
                        //console.log("ZhenFaEffect.configData:",this.ZhenFaEffectData);
                    };
                    HuoBanProxy.prototype.onloadedFormationRestrainBaseVoComplete = function () {
                        console.log("cformationrestrain 表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cformationrestrain.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.HuoBanModel.getInstance().FormationRestrainData, game.data.template.FormationRestrainBaseVo, "id");
                        // console.log("cformationrestrain.configData:",this.FormationRestrainData);
                    };
                    HuoBanProxy.prototype.onloadedFormationbaseConfigBaseVoComplete = function () {
                        console.log("cformationbaseconfig 表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cformationbaseconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.HuoBanModel.getInstance().FormationbaseConfigData, game.data.template.FormationbaseConfigBaseVo, "id");
                        //  console.log("cformationbaseconfig.configData:",HuoBanModel.getInstance().FormationbaseConfigData);
                    };
                    HuoBanProxy.prototype.onloadedFriendSkillComplete = function () {
                        console.log("FriendSkillData表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cfriendskill.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.HuoBanModel.getInstance().friendSkillData, game.data.template.FriendSkillBaseVo, "id");
                        //	console.log("FriendSkillData:", this.friendSkillData);
                    };
                    HuoBanProxy.prototype.onloadedcHeroBaseInfoComplete = function () {
                        console.log("CHeroBaseInfo-h伙伴系统/h伙伴信息配置表 completed1");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/npc.cherobaseinfo.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.HuoBanModel.getInstance().cheroBaseInfoData, game.data.template.CHeroBaseInfoBaseVo, "id");
                        //console.log("cawardresultconfigpaModel.configData:", this.cheroBaseInfoData);
                    };
                    /**打开阵法*/
                    HuoBanProxy.prototype.openzhenfa = function (optcode, msg) {
                        console.log(msg.formationMap.keys);
                        for (var p in msg.formationMap.keys) {
                            if (msg.formationMap.get(msg.formationMap.keys[p])) {
                                LoginModel.getInstance().roleDetail.learnedFormsMap.set(msg.formationMap.keys[p], msg.formationMap.get(msg.formationMap.keys[p]));
                            }
                        }
                        models.HuoBanProxy.getInstance().event(models.OPENZHENFA_EVENT);
                    };
                    /**伙伴详情*/
                    HuoBanProxy.prototype.huobandetail = function (optcode, msg) {
                        console.log("伙伴信息：" + msg.huoban);
                        models.HuoBanModel.getInstance().huobandetail = msg.huoban;
                        models.HuoBanProxy.getInstance().event(models.HUOBANDETAIL_EVENT);
                    };
                    /**伙伴解锁*/
                    HuoBanProxy.prototype.huobanjiesuo = function (optcode, msg) {
                        for (var index = 0; index < models.HuoBanModel.getInstance().huobaninfo.length; index++) {
                            if (models.HuoBanModel.getInstance().huobaninfo[index].huobanID == msg.huobanId) { //是否有该伙伴
                                if (msg.state == 1) { //是否永久
                                    models.HuoBanModel.getInstance().huobaninfo[index].state = 1;
                                    models.HuoBanModel.getInstance().huobandetail.state = 1;
                                }
                                else {
                                    models.HuoBanModel.getInstance().huobaninfo[index].state = (msg.state - 10) * 60;
                                    models.HuoBanModel.getInstance().huobandetail.state = (msg.state - 10) * 60;
                                }
                                models.HuoBanModel.getInstance().huobandetail.weekfree = 0;
                                models.HuoBanModel.getInstance().huobaninfo[index].weekfree = 0;
                                break;
                            }
                        }
                        models.HuoBanProxy.getInstance().event(models.HUOBANJIESUO_EVENT);
                    };
                    /**伙伴增加*/
                    HuoBanProxy.prototype.add = function (optcode, msg) {
                        console.log("更新后阵容：" + msg.huobanlist);
                        var info = new game.modules.huoban.models.ZhenrongInfoVo();
                        info.zhenfa = msg.zhenfa;
                        info.huobanlist = msg.huobanlist;
                        switch (msg.reason) { //更新原因 1-系统第一次自动更新 2-光环更新 3-参战伙伴更新 4-伙伴阵容切换
                            case 1:
                                break;
                            case 2:
                                break;
                            case 3:
                                models.HuoBanModel.getInstance().currentzrid = msg.zhenrong; //当前阵容
                                break;
                            case 4:
                                models.HuoBanModel.getInstance().zhenrongid = msg.zhenrong; //选择阵容
                                break;
                            case 5:
                                models.HuoBanModel.getInstance().currentzrid = msg.zhenrong; //当前阵容
                                break;
                            default:
                                break;
                        }
                        models.HuoBanModel.getInstance().reason = msg.reason;
                        models.HuoBanModel.getInstance().zrhuobanlist[msg.zhenrong] = info;
                        if (models.HuoBanModel.getInstance().huobaninfo.length != 0) {
                            for (var index = 0; index < models.HuoBanModel.getInstance().huobaninfo.length; index++) {
                                models.HuoBanModel.getInstance().huobaninfo[index].infight = 0;
                            }
                            for (var index = 0; index < info.huobanlist.length; index++) {
                                models.HuoBanModel.getInstance().huobaninfo[info.huobanlist[index] - 40000].infight = 1;
                            }
                        }
                        models.HuoBanProxy.getInstance().event(models.ZHENRONG_EVENT);
                    };
                    /**刷新阵容*/
                    HuoBanProxy.prototype.refrezhenrong = function (optcode, msg) {
                        models.HuoBanModel.getInstance().zhenrongid = msg.dangqianzhenrong;
                        models.HuoBanModel.getInstance().currentzrid = msg.dangqianzhenrong;
                        models.HuoBanModel.getInstance().zrhuobanlist = msg.zhenrongxinxi;
                        if (msg.zhenrongxinxi[msg.dangqianzhenrong]) {
                            if (models.HuoBanModel.getInstance().huobaninfo.length != 0) {
                                for (var index = 0; index < models.HuoBanModel.getInstance().huobaninfo.length; index++) {
                                    models.HuoBanModel.getInstance().huobaninfo[index].infight = 0;
                                }
                                for (var index = 0; index < msg.zhenrongxinxi[msg.dangqianzhenrong].huobanlist.length; index++) {
                                    models.HuoBanModel.getInstance().huobaninfo[msg.zhenrongxinxi[msg.dangqianzhenrong].huobanlist[index] - 40000].infight = 1;
                                }
                            }
                        }
                        models.HuoBanProxy.getInstance().event(models.ZHENRONG_EVENT);
                    };
                    /**获取伙伴信息*/
                    HuoBanProxy.prototype.refrehuoban = function (optcode, msg) {
                        models.HuoBanModel.getInstance().huobaninfo = msg.huobans;
                        console.log(models.HuoBanModel.getInstance().huobaninfo);
                        models.HuoBanProxy.getInstance().event(models.HUOBANLIST_EVENT);
                    };
                    /**更换阵法 */
                    HuoBanProxy.prototype.switchchangezhenfa = function (optcode, msg) {
                        if (models.HuoBanModel.getInstance().zrhuobanlist[msg.zhenrongid]) { //阵容列表是否有该阵容
                            models.HuoBanModel.getInstance().zrhuobanlist[msg.zhenrongid].zhenfa = msg.zhenfaid;
                        }
                        else {
                            models.HuoBanModel.getInstance().currentzf[msg.zhenrongid] = msg.zhenfaid;
                            models.HuoBanModel.getInstance().currentzr = msg.zhenrongid;
                        }
                        models.HuoBanProxy.getInstance().event(models.SWITCHCHANGE_EVENT);
                    };
                    HuoBanProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new HuoBanProxy();
                        }
                        return this._instance;
                    };
                    return HuoBanProxy;
                }(hanlder.ProxyBase));
                models.HuoBanProxy = HuoBanProxy;
            })(models = huoban.models || (huoban.models = {}));
        })(huoban = modules.huoban || (modules.huoban = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=HuoBanProxy.js.map