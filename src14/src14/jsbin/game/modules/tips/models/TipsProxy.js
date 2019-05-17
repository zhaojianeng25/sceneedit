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
* tips的数据加载
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var tips;
        (function (tips) {
            var models;
            (function (models) {
                /**关闭tips */
                models.CLOSE_TIPS = "closeTips";
                /**点击小键盘ok键 */
                models.ON_KRYBOARD = "onKeyBoard";
                /**装备洗练，预览属性 */
                models.WASHATTR = "warshAttr";
                /**装备洗练，保存属性 */
                models.WASHATTR_SAVE = "warshAttrSave";
                /**弹窗类tips点击ok按钮*/
                models.TIPS_ON_OK = "onOkBtn";
                /**弹窗类tips点击cancel按钮 */
                models.TIPS_ON_CANCEL = "onCancelBtn";
                /**宠物tips*/
                models.PETEQUIPTIPS = "peteqiuptips";
                /**点击获取途径按钮 */
                models.onComeformBtn = "onComeformBtn";
                /**重铸 */
                models.SRefineEquipResult = "SRefineEquipResult";
                var TipsProxy = /** @class */ (function (_super) {
                    __extends(TipsProxy, _super);
                    function TipsProxy() {
                        var _this = _super.call(this) || this;
                        TipsProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    TipsProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new TipsProxy();
                        }
                        return this._instance;
                    };
                    /**添加监听 */
                    TipsProxy.prototype.addNetworkListener = function () {
                        /**洗练 */
                        Network._instance.addHanlder(ProtocolsEnum.SRefineEquipBase, this, this.onSRefineEquipBase);
                        /**重铸 */
                        Network._instance.addHanlder(ProtocolsEnum.SRefineEquipResult, this, this.onSRefineEquipResult);
                        /**宠物装备tips */
                        Network._instance.addHanlder(ProtocolsEnum.SGetPetEquipTips, this, this.onAddPetEquiptips);
                        //装备附魔成功返回
                        Network._instance.addHanlder(ProtocolsEnum.SUseEnhancementItem, this, this.onGetFuMoSucc);
                    };
                    /** 获得装备附魔成功下发消息 */
                    TipsProxy.prototype.onGetFuMoSucc = function (optcode, msg) {
                        var _equipBag = BagModel.getInstance().bagMap[BagTypes.EQUIP];
                        var _equipItems = _equipBag.items;
                        var _fumoEquipKey; //附魔装备的key
                        for (var i = 0; i < _equipItems.length; i++) {
                            var _equipItem = _equipItems[i];
                            if (_equipItem.position == msg.equippos) {
                                _fumoEquipKey = _equipItem.key;
                                break;
                            }
                        }
                        if (_fumoEquipKey) {
                            RequesterProtocols._instance.c2s_CGetItem_Tips(BagTypes.EQUIP, _fumoEquipKey);
                        }
                    };
                    /**宠物装备tips */
                    TipsProxy.prototype.onAddPetEquiptips = function (optcode, msg) {
                        StrengTheningModel.getInstance().equipTips.push({ packid: 9, keyinpack: msg.keyinpack, tips: msg.tips });
                        this.event(models.PETEQUIPTIPS);
                    };
                    /**洗练 */
                    TipsProxy.prototype.onSRefineEquipBase = function (optcode, msg) {
                        if (msg.freshtype == 0) { //预览
                            models.TipsModel._instance.equipWashAttr = [];
                            models.TipsModel._instance.equipWashAttr.push({ packid: msg.packid, keyinpack: msg.keyinpack, attr: msg.attr });
                            models.TipsProxy._instance.event(models.WASHATTR);
                        }
                        else if (msg.freshtype == 1) { //保存
                        }
                    };
                    /**重铸 */
                    TipsProxy.prototype.onSRefineEquipResult = function (optcode, msg) {
                        models.TipsProxy._instance.event(models.SRefineEquipResult);
                    };
                    TipsProxy.prototype.init = function () {
                        models.TipsModel.getInstance();
                        this.addNetworkListener();
                        /**程序内字符串表 */
                        Laya.loader.load("common/data/temp/message.cstringres.bin", Handler.create(this, this.onloadedCStringResConfigComplete), null, Loader.BUFFER);
                        /**装备洗练表 */
                        Laya.loader.load("common/data/temp/item.cequiprefineinfo.bin", Handler.create(this, this.onloadedEquipRefineInfoComplete), null, Loader.BUFFER);
                        /**装备洗特技表 */
                        Laya.loader.load("common/data/temp/item.cequiprefineskillinfo.bin", Handler.create(this, this.onloadedEquipRefineSkillInfoDataComplete), null, Loader.BUFFER);
                        /**t特技特效显示表 */
                        Laya.loader.load("common/data/temp/skill.cequipskill.bin", Handler.create(this, this.onloadedEquipSkillComplete), null, Loader.BUFFER);
                        //附魔效果配置表
                        Laya.loader.load("common/data/temp/item.cfumoeffectformula.bin", Handler.create(this, this.onloadedFumoeffectformula), null, Loader.BUFFER);
                    };
                    TipsProxy.prototype.onloadedFumoeffectformula = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cfumoeffectformula.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TipsModel.getInstance().cfumoeffectformulaConfigData, game.data.template.FumoEffectFormulaBaseVo, "id");
                    };
                    TipsProxy.prototype.onloadedCStringResConfigComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/message.cstringres.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TipsModel.getInstance().cstringResConfigData, game.data.template.CStringResBaseVo, "id");
                    };
                    TipsProxy.prototype.onloadedEquipRefineInfoComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequiprefineinfo.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TipsModel._instance.equipRefineInfoData, game.data.template.EquipRefineInfoBaseVo, "id");
                    };
                    TipsProxy.prototype.onloadedEquipRefineSkillInfoDataComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequiprefineskillinfo.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TipsModel._instance.equipRefineSkillInfoData, game.data.template.EquipRefineSkillInfoBaseVo, "partid_quality");
                    };
                    TipsProxy.prototype.onloadedEquipSkillComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cequipskill.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TipsModel._instance.equipSkillData, game.data.template.EquipSkillBaseVo, "id");
                    };
                    return TipsProxy;
                }(hanlder.ProxyBase));
                models.TipsProxy = TipsProxy;
            })(models = tips.models || (tips.models = {}));
        })(tips = modules.tips || (modules.tips = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TipsProxy.js.map