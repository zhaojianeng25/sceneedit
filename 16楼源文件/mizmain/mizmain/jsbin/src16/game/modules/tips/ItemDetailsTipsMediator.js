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
        var tips;
        (function (tips) {
            /** 物品详情tips */
            var ItemDetailsTipsMediator = /** @class */ (function (_super) {
                __extends(ItemDetailsTipsMediator, _super);
                function ItemDetailsTipsMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**点击更多按钮的标识 */
                    _this.moreBtnFlag = false;
                    /**杂货表数据 */
                    _this.groceryEffectData = game.modules.strengThening.models.StrengTheningModel._instance.groceryEffectData;
                    /**复合表 */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /**宝石表 */
                    _this.gemEffectData = game.modules.strengThening.models.StrengTheningModel._instance.gemEffectData;
                    /**道具类型表 */
                    _this.itemTypeData = game.modules.strengThening.models.StrengTheningModel._instance.itemTypeData;
                    /**宠物技能显示表 */
                    _this.petSkillConfigData = game.modules.pet.models.PetModel._instance.petSkillConfigData;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**食品表 */
                    _this.foodAndDrugEffectData = SaleModel.getInstance().foodAndDrugEffectData;
                    /**食品公式表 */
                    _this.foodAndDrugFormulaData = game.modules.sale.models.SaleModel._instance.foodAndDrugFormulaData;
                    /**玩家等级 */
                    _this.level = game.modules.createrole.models.LoginModel.getInstance().roleDetail.level;
                    /**客户端信息提示表 */
                    _this.chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                    /**html的最小高度 */
                    _this.minHtmlHeight = 30;
                    /** 道具所在背包的key */
                    _this.key = -1;
                    /** 道具id */
                    _this.itemID = -1;
                    /** 背包id */
                    _this.packID = -1;
                    _this.shopId = -1;
                    _this.number = -1;
                    _this.access = -1;
                    _this._viewUI = new ui.common.component.ItemDetailsUI();
                    _this.isCenter = false;
                    _this._app = app;
                    _this._viewUI.mask_img.on(LEvent.MOUSE_DOWN, _this, _this.closeWindow);
                    return _this;
                }
                /*关闭当前界面 */
                ItemDetailsTipsMediator.prototype.onThisView = function () {
                    if (this._viewUI.visible) {
                        this.hide();
                    }
                };
                /**
                 * 背包中显示物品的详细信息
                 * @param itemId 物品id
                 */
                ItemDetailsTipsMediator.prototype.showItemTips = function (parame) {
                    this._viewUI.bagTipsBtn_box.visible = true;
                    if (parame.get("showBtn") != null && parame.get("showBtn") == false) {
                        this._viewUI.bagTipsBtn_box.visible = false;
                    }
                    var itemId = parame.get("itemId");
                    var packid = parame.get("packid");
                    var key = parame.get("key");
                    if (key == -1 || !key) {
                        key = BagModel.getInstance().chargeItemKey(packid, itemId);
                    }
                    var outbattle = parame.get("outbattleuse");
                    var shopID = parame.get("shopid");
                    var number = parame.get("number");
                    var xpos = parame.get("xpos");
                    var ypos = parame.get("ypos");
                    if (xpos && ypos) {
                        this._viewUI.bg_img.x = xpos;
                        this._viewUI.bg_img.y = ypos;
                    }
                    else {
                        this._viewUI.bg_img.x = 175;
                        this._viewUI.bg_img.y = 537;
                    }
                    this.key = key;
                    this.packID = packid;
                    this.itemID = itemId;
                    this.shopId = shopID;
                    this.number = number;
                    this._viewUI.comeform_btn.visible = false;
                    this._viewUI.moreBtn_list.visible = false;
                    var destribe = this.itemAttrData[itemId].destribe; //描述
                    this.itemName = this.itemAttrData[itemId].name;
                    var html = "";
                    if (108000 <= itemId && itemId <= 108812) { /** 该物品为宝石 */
                        var inlaypos = this.gemEffectData[itemId].inlaypos; //宝石镶嵌位置
                        html += "<span style='fontSize:20;color:#13FF00;font:SimHei'>" + this.cstringResConfigData[11037].msg + inlaypos + "</span><br>";
                    }
                    else if (102000 <= itemId && itemId <= 102012) { /** 该物品为坐骑 */
                        var currentRideId = bagModel.getInstance().currentRideId;
                        if (currentRideId == itemId) { /** 按钮重新赋值 当前的坐骑在使用中*/
                            this._viewUI.use_btn.label = this.cstringResConfigData[11394].msg;
                        }
                        else { /** 当前坐骑未被骑乘 */
                            this._viewUI.use_btn.label = this.cstringResConfigData[11393].msg;
                        }
                    }
                    else if (111000 <= itemId && itemId <= 111053) {
                        var needQuality = this.foodAndDrugEffectData[itemId].needQuality; //是否有品质
                        if (needQuality == 1) {
                            var strformula = this.foodAndDrugFormulaData[itemId].strformula;
                            var foodQuality = this.getfoodQuality(parame);
                            var m_strformula = strformula.replace(this.cstringResConfigData[11131].msg, foodQuality);
                            var effectdescribe = this.foodAndDrugEffectData[itemId].effectdescribe;
                            var m_effectdescribe = effectdescribe.replace("$parameter1$", eval(m_strformula));
                            html += "<span style='fontSize:20;font:SimHei'>" + m_effectdescribe + "</span><br>";
                        }
                    }
                    html += "<span style='fontSize:10;font:SimHei'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    html += "<span style='fontSize:20;font:SimHei'>" + destribe + "</span><br>";
                    var _itemData;
                    if (packid == BagTypes.DEPOT) {
                        var depotid = parame.get("currdepot");
                        _itemData = BagModel.getInstance().getItemInfoData(packid, itemId, key, depotid);
                    }
                    else {
                        _itemData = BagModel.getInstance().getItemInfoData(packid, itemId, key);
                    }
                    if (_itemData && BagModel.getInstance().itemIsBind(_itemData.flags)) {
                        html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                        var cStr = tipsModel.getInstance().cstringResConfigData[11350]["msg"];
                        html += "<span style='color:#FBDC47;fontSize:24'>" + cStr + "</span><br/>";
                        this._viewUI.suo_img.visible = true;
                    }
                    else {
                        this._viewUI.suo_img.visible = false;
                    }
                    this.setHtml(html);
                    this.showBaseItem(itemId, parame);
                    this.setMoreBtnList(itemId);
                    /** 关闭界面的点击事件 */
                    this._viewUI.mask_img.on(LEvent.MOUSE_DOWN, this, this.closeWindow);
                    if (packid != BagTypes.TEMP) {
                        this._viewUI.more_btn.disabled = false;
                        this._viewUI.more_btn.on(LEvent.MOUSE_DOWN, this, this.showMoreBtnList);
                        this._viewUI.access_btn.on(LEvent.MOUSE_DOWN, this, this.onAccessEvent, [parame]);
                        this._viewUI.use_btn.on(LEvent.MOUSE_DOWN, this, this.onUseBtn, [key, outbattle, itemId]);
                    }
                    else {
                        this._viewUI.more_btn.disabled = true;
                        this._viewUI.use_btn.label = this.cstringResConfigData[2916].msg;
                        this._viewUI.use_btn.on(LEvent.MOUSE_DOWN, this, this.temporaryequip, [BagTypes.TEMP, key, 1, 1]);
                    }
                };
                /**
                 * 临时背包装备转移按钮事件
                 */
                ItemDetailsTipsMediator.prototype.temporaryequip = function (srcpackid, itemKey, number, dstpackid) {
                    var bag = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
                    if (bag.items.length != bag.capacity) { //如果背包格子和数据源相等说明他满了
                        RequesterProtocols._instance.c2s_CTrans_Item(srcpackid, itemKey, number, dstpackid, -1, -1, -1);
                        this.closeWindow();
                    }
                    else {
                        var prompt_1 = this.chatMessageTips[145950].msg;
                        this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(prompt_1);
                    }
                };
                /** 取消丢弃 */
                ItemDetailsTipsMediator.prototype.clickCancelBtnEvent = function () {
                    this.RemindViewMediator.hide();
                };
                /**
                * @describe  确认丢弃
                */
                ItemDetailsTipsMediator.prototype.clickEnSureBtnEvent = function () {
                    RequesterProtocols._instance.c2s_CDrop_Item(this.packID, this.key, 0);
                    this.closeWindow();
                };
                /** 存取按钮点击事件 */
                ItemDetailsTipsMediator.prototype.onAccessEvent = function (parame) {
                    var depotId = parame.get("currdepot");
                    var num = -1;
                    var dstPos = -1;
                    var npcId = -1;
                    bagModel.getInstance().currDepotId = depotId;
                    if (this.access == 1) { /** 存入协议 */
                        RequesterProtocols._instance.c2s_CTrans_Item(BagTypes.BAG, this.key, num, BagTypes.DEPOT, dstPos, depotId, npcId);
                    }
                    else if (this.access == 2) { /** 取出协议 */
                        depotId = -1;
                        RequesterProtocols._instance.c2s_CTrans_Item(BagTypes.DEPOT, this.key, num, BagTypes.BAG, dstPos, depotId, npcId);
                    }
                    this.closeWindow();
                };
                /**显示更多按钮列表 */
                ItemDetailsTipsMediator.prototype.showMoreBtnList = function () {
                    if (!this._viewUI.moreBtn_list.visible) {
                        this._viewUI.moreBtn_list.visible = true;
                        this._viewUI.closeMoreBtn_img.visible = true;
                        this.setMorebtnlistPos();
                    }
                    else {
                        this._viewUI.moreBtn_list.visible = false;
                    }
                };
                /**设置morelsit坐标 */
                ItemDetailsTipsMediator.prototype.setMorebtnlistPos = function () {
                    var _this = this;
                    var x = this._viewUI.bagTipsBtn_box.x;
                    var y = this._viewUI.bagTipsBtn_box.y;
                    var numY = this._viewUI.moreBtn_list.repeatY;
                    var spaceY = this._viewUI.moreBtn_list.spaceY;
                    var morebtnlistY = numY * 50 + spaceY * (numY - 1);
                    this._viewUI.moreBtn_list.x = 40;
                    this._viewUI.moreBtn_list.y = y - morebtnlistY - 20;
                    this._viewUI.closeMoreBtn_img.on(LEvent.MOUSE_DOWN, this, function () {
                        _this._viewUI.moreBtn_list.visible = false;
                        _this._viewUI.closeMoreBtn_img.visible = false;
                    });
                };
                /** 关闭页面事件 */
                ItemDetailsTipsMediator.prototype.closeWindow = function () {
                    tips.models.TipsProxy.getInstance().event(tips.models.CLOSE_TIPS);
                };
                /**点击使用按钮 */
                ItemDetailsTipsMediator.prototype.onUseBtn = function (key, outbattle, itemId) {
                    if (this.ItemPurpose == ItemPurpose.ITEM_TRANSFER) { //转移
                        var num = -1;
                        var depotId = -1;
                        var dstPos = -1;
                        var npcId = -1;
                        RequesterProtocols._instance.c2s_CTrans_Item(BagTypes.TEMP, key, num, BagTypes.BAG, dstPos, depotId, npcId);
                    }
                    else { //正常使用
                        var item = BagModel.getInstance().getItemAttrData(itemId);
                        var roleId = LoginModel.getInstance().roleDetail.roleid;
                        //不可使用，战斗中使用
                        if (outbattle == 0)
                            return;
                        //人物使用
                        else if (outbattle == 3 || outbattle == 1) {
                            outbattle = 0;
                            if (item.itemtypeid == 3750) { //元素类型 技能的专精
                                modules.skill.models.SkillModel.getInstance().currenTabNum = 2;
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                modules.ModuleManager.show(modules.ModuleNames.SKILL, this._app);
                                LoginModel.getInstance().CommonPage = "Bag";
                            }
                            else if (item.itemtypeid == 166) { //升级礼包界面
                                // ModuleManager.show(ModuleNames.REWARD,this._app);
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                modules.ModuleManager.jumpPage(modules.ModuleNames.REWARD, rewardBtnType.LEVELUP, this._app);
                                LoginModel.getInstance().CommonPage = "Bag";
                            }
                            else if (item.itemtypeid == ItemTypeId.TuzhiItem) { //图纸类型-->打造
                                modules.strengThening.models.StrengTheningModel.getInstance().tabNum = 0;
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                modules.ModuleManager.show(modules.ModuleNames.STRENG_THENING, this._app);
                                LoginModel.getInstance().CommonPage = "Bag";
                            }
                            else if (item.itemtypeid == ItemTypeId.OtherItem && itemId <= 100005) { //杂货-->装备修理
                                modules.strengThening.models.StrengTheningModel.getInstance().tabNum = 3;
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                modules.ModuleManager.show(modules.ModuleNames.STRENG_THENING, this._app);
                                LoginModel.getInstance().CommonPage = "Bag";
                            }
                            else if (item.itemtypeid == ItemTypeId.OtherItem && itemId <= 101453) { //杂货-->装备修理
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                if (itemId == 101451) { //装备洗练
                                    var EquipWashPractiseMediator_1 = new game.modules.tips.EquipWashPractiseMediator(this._app);
                                    EquipWashPractiseMediator_1.onShow(this.itemID, this.key);
                                }
                                else if (itemId == 101452) { //装备重铸
                                    var EquipRecastMediator_1 = new game.modules.tips.EquipRecastMediator(this._app);
                                    EquipRecastMediator_1.onShow(this.itemID, this.key);
                                }
                                else if (itemId == 101453) { //洗特技界面
                                    var EuipWashStuntMediator_1 = new game.modules.tips.EuipWashStuntMediator(this._app);
                                    EuipWashStuntMediator_1.show();
                                }
                                LoginModel.getInstance().CommonPage = "Bag";
                            }
                            else if (item.itemtypeid == ItemTypeId.Present && itemId <= 100023) { //奖励-->打造装备
                                modules.strengThening.models.StrengTheningModel.getInstance().tabNum = 0;
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                modules.ModuleManager.show(modules.ModuleNames.STRENG_THENING, this._app);
                                LoginModel.getInstance().CommonPage = "Bag";
                            }
                            else if (item.itemtypeid == ItemTypeId.ForgeStone || item.itemtypeid == ItemTypeId.TailorDye || item.itemtypeid == ItemTypeId.SmeltFusion) { /** 武器制造材料 裁缝制造材料 炼金制造材料 */
                                modules.strengThening.models.StrengTheningModel.getInstance().tabNum = 0;
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                modules.ModuleManager.show(modules.ModuleNames.STRENG_THENING, this._app);
                                LoginModel.getInstance().CommonPage = "Bag";
                            }
                            else if (item.itemtypeid == ItemTypeId.TuzhiMake) { //打造图纸
                                modules.strengThening.models.StrengTheningModel.getInstance().tabNum = 0;
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                modules.ModuleManager.show(modules.ModuleNames.STRENG_THENING, this._app);
                                LoginModel.getInstance().CommonPage = "Bag";
                            }
                            else if (item.itemtypeid == ItemTypeId.TimeReturn || itemId == 339107) { //洗点道具-->人物洗点
                                this.RoleResetAttrMediator = new game.modules.roleinfo.RoleResetAttrMediator(this._app);
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                this.RoleResetAttrMediator.show();
                                LoginModel.getInstance().CommonPage = "Bag";
                            }
                            else if (item.itemtypeid == ItemTypeId.AttrUpItem) { //临时符使用 
                                var _enhancementType = parseInt(this.groceryEffectData[this.itemID]["tmpType"]); //获得临时类型，即附魔的类型
                                var _equip_pos = modules.skill.models.SkillModel.getInstance().getEquipPosType(_enhancementType); //获得装备类型
                                var _equip_bag = BagModel.getInstance().getBagGameItemData(BagTypes.EQUIP); //获得装备背包数据
                                var _equip_items = _equip_bag.items;
                                var _equip_key = void 0; //所在装备背包的key
                                //先判断临时符所附魔的装备部位是否已经存在附魔了
                                for (var i = 0; i < _equip_items.length; i++) {
                                    var _equip_ItemVo = _equip_items[i];
                                    if (_equip_ItemVo.position == _equip_pos) {
                                        _equip_key = _equip_ItemVo.key;
                                    }
                                }
                                if (_equip_key) {
                                    var _TipsVo = void 0;
                                    var _equipTips = game.modules.strengThening.models.StrengTheningModel._instance.equipTips;
                                    for (var i = 0; i < _equipTips.length; i++) {
                                        var _packid = _equipTips[i].packid;
                                        if (_packid == BagTypes.EQUIP) {
                                            var _key = _equipTips[i].keyinpack;
                                            if (_key == _equip_key) {
                                                _TipsVo = _equipTips[i].tips; //获得到注灵卷轴的tips
                                            }
                                        }
                                    }
                                    var _equip_enhancement = _TipsVo.enhancement; //存放附魔相关数据的数组
                                    if (_equip_enhancement.length != 0) { //有附魔就弹窗提示
                                        var _enhancementAttr = _equip_enhancement[0].enhancementAttr; //当时附魔的属性数据
                                        var _keys = _enhancementAttr.keys; //附魔的属性id
                                        var _value = _enhancementAttr.get(_keys[0]); //附魔的属性值
                                        var _shuxingName = tips.models.TipsModel.getInstance().getEquipFuMoName(_keys[0]);
                                        var parame = new Laya.Dictionary();
                                        parame.set("contentId", 150092);
                                        parame.set("parame", [_shuxingName, _value.toString()]);
                                        tips.models.TipsProxy.getInstance().on(tips.models.TIPS_ON_OK, this, this.confirmFuMo);
                                        var _tips = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, parame);
                                    }
                                    else { //无附魔就发送使用注灵卷轴道具的请求
                                        this.confirmFuMo();
                                    }
                                }
                                else { //就算那个部分没装备，发送附魔请求，服务端也会返回消息，告诉客户端提示消息，要装备装备才能附魔
                                    this.confirmFuMo();
                                }
                            } //else if(item.itemtypeid == ItemTypeId.TreasuremapItem ||item.itemtypeid == ItemTypeId.SuperTreasureMapItem  )
                            //{/** 藏宝图的使用 */ 
                            //}
                            // else if(item.itemtypeid == ItemTypeId.SynthesisTresureMap  )
                            // {/** 合成藏宝图 */
                            // 	/** 没见到实际效果 */ 
                            // 	ModuleManager.hide(ModuleNames.BAG);
                            //}
                            else if (item.itemtypeid == ItemTypeId.FormBookHalf) { /** 光环碎片，合成光环卷轴 */
                                if (this.number < 5) {
                                    var prompt_2 = tipsModel.stringType.itemNotEnough;
                                    this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                                    this.DisappearMessageTipsMediator.onShow(prompt_2);
                                }
                                else {
                                    RequesterProtocols._instance.c2s_CAppend_Item(key, outbattle, roleId);
                                }
                            }
                            else if (item.itemtypeid == ItemTypeId.FormBook) { /** 光环卷轴 */
                                this.ZhenFaGuangHuanMediator = new ZhenFaGuangHuanMediator(this._app);
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                this.ZhenFaGuangHuanMediator.show();
                                LoginModel.getInstance().CommonPage = "Bag";
                            }
                            else if (item.itemtypeid == ItemTypeId.RoleParticleBook || item.itemtypeid == ItemTypeId.PetParticleBook) { /** 专精道具包含宠物和人物 */
                                modules.skill.models.SkillModel.getInstance().currenTabNum = 3;
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                modules.ModuleManager.show(modules.ModuleNames.SKILL, this._app);
                                LoginModel.getInstance().CommonPage = "Bag";
                            }
                            else if (item.itemtypeid == ItemTypeId.RoleColorItem || item.itemtypeid == ItemTypeId.PetColorItem) { /** 染色相关 */
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                            }
                            else if (item.itemtypeid == ItemTypeId.SilverKeyItem) { /** 瑟银钥匙 这里应该有地图或坐标的指引 */
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                            }
                            else if (item.itemtypeid == ItemTypeId.GoldKeyItem) { /** 氪金钥匙 这里应该有地图或坐标的指引 */
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                            }
                            else if (item.itemtypeid == ItemTypeId.RenameCardItem) { /** 改名  */
                                this.RenameMediators = new game.modules.commonUI.RenameMediators(this._viewUI, this._app);
                                this.RenameMediators.onShow(key);
                                this.closeWindow();
                            }
                            else if (item.itemtypeid == ItemTypeId.ShenShouExchangeItem) { /** 好友赠送礼物  */
                                var _GiveGiftViewMediator = new game.modules.friend.GiveGiftViewMediator(this._app);
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                _GiveGiftViewMediator.show(true);
                                LoginModel.getInstance().CommonPage = "Bag";
                            }
                            else if ((item.itemtypeid == ItemTypeId.Present && itemId >= 337939 && itemId <= 337940) || item.itemtypeid == ItemTypeId.PetSkillItem) { /** 宠物技能界面  */
                                PetModel.getInstance().tabnum = 1;
                                PetModel.getInstance().changexilian = 2;
                                modules.ModuleManager.show(modules.ModuleNames.PET, this._app);
                            }
                            else if (item.itemtypeid == ItemTypeId.GemItem) { /** 宝石类型  */
                                var rolelevel = HudModel.getInstance().levelNum;
                                if (rolelevel >= unlock.QIANGHUA_LEVEL) {
                                    modules.strengThening.models.StrengTheningModel.getInstance().tabNum = 1;
                                    modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                    modules.ModuleManager.show(modules.ModuleNames.STRENG_THENING, this._app);
                                    LoginModel.getInstance().CommonPage = "Bag";
                                }
                                else {
                                    this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                                    this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[150054].msg.replace("$parameter1$", unlock.QIANGHUA_LEVEL));
                                }
                            }
                            else { /** 正常点击的使用 */
                                RequesterProtocols._instance.c2s_CAppend_Item(key, outbattle, roleId);
                            }
                        }
                        else if (outbattle == 2) /** 宠物使用 */ {
                            outbattle = 1;
                            /** 宠物个数 */
                            var petNum = game.modules.pet.models.PetModel.getInstance().pets.keys.length;
                            if (petNum == 0) { /** 没有宠物，弹窗提示 先自己手写，后面统一放入配置表取*/
                                var prompt_3 = this.chatMessageTips[162062].msg;
                                this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                                this.DisappearMessageTipsMediator.onShow(prompt_3);
                            }
                            else {
                                /** 跳到宠物培养界面 */
                                if (item.itemtypeid == 49) { /** 宠物的技能，调至第二页 */
                                    PetModel.getInstance().tabnum = 1;
                                    PetModel.getInstance().studyskill = 2;
                                }
                                else { /** 宠物的培养，调制第三页 */
                                    PetModel.getInstance().tabnum = 2;
                                }
                                modules.ModuleManager.show(modules.ModuleNames.PET, this._app);
                                modules.ModuleManager.hide(modules.ModuleNames.BAG);
                                LoginModel.getInstance().CommonPage = modules.ModuleNames.BAG;
                            }
                        }
                    }
                    if (this.packID == BagTypes.QUEST) { //如果是任务道具，使用时进行飘窗提示
                        var _tipsMsg = ChatModel.getInstance().chatMessageTips[420043]["msg"];
                        var _distipsmsg = new modules.commonUI.DisappearMessageTipsMediator(this._app);
                        _distipsmsg.onShow(_tipsMsg);
                    }
                    this.closeWindow();
                };
                /** 确认附魔 */
                ItemDetailsTipsMediator.prototype.confirmFuMo = function () {
                    RequesterProtocols._instance.c2s_CAppend_Item(this.key, IDType.ITEM, LoginModel.getInstance().roleDetail.roleid);
                };
                /**初始化更多按钮列表 */
                ItemDetailsTipsMediator.prototype.setMoreBtnList = function (itemId) {
                    var moreBtnlist = this._viewUI.moreBtn_list;
                    var arr = [];
                    var bCanSale = this.itemAttrData[itemId].bCanSale;
                    if (bCanSale != 0) {
                        arr.push({ more_btn: tipsModel.stringType.paimai });
                    }
                    var bCanSaleToNpc = this.itemAttrData[itemId].bCanSaleToNpc;
                    if (bCanSaleToNpc != 0) {
                        arr.push({ more_btn: tipsModel.stringType.shanghui });
                    }
                    var itemtypeid = this.itemAttrData[itemId].itemtypeid;
                    if (itemtypeid == 5) { // 5为宝石，即当前物品为宝石
                        var level = this.gemEffectData[itemId].level;
                        if (level <= 3) { //宝石等级小于等于3级，显示合成按钮
                            arr.push({ more_btn: tipsModel.stringType.hecheng });
                        }
                        var ncanfenjie = this.gemEffectData[itemId].ncanfenjie; //宝石能否分解
                        if (ncanfenjie == 1) {
                            arr.push({ more_btn: tipsModel.stringType.fenjie });
                        }
                    }
                    else {
                        var bManuleDesrtrol = this.itemAttrData[itemId].bManuleDesrtrol; //可否摧毁
                        if (bManuleDesrtrol) {
                            arr.push({ more_btn: tipsModel.stringType.drop });
                        }
                    }
                    if (arr.length <= 0) {
                        var bManuleDesrtrol = this.itemAttrData[itemId].bManuleDesrtrol; //可否摧毁
                        this._viewUI.more_btn.label = tipsModel.stringType.drop;
                        if (bManuleDesrtrol == 0) {
                            this._viewUI.more_btn.disabled = true;
                        }
                    }
                    if (arr.length == 1) {
                        var name = arr[0].more_btn;
                        this._viewUI.more_btn.label = name;
                        arr = [];
                    }
                    moreBtnlist.array = arr;
                    moreBtnlist.repeatY = arr.length;
                    moreBtnlist.selectHandler = new Handler(this, this.moreBtnlistSelect);
                    this._viewUI.more_btn.on(LEvent.MOUSE_DOWN, this, this.onoldmoreBtn);
                };
                /**选择更多列表按钮中的按钮 */
                ItemDetailsTipsMediator.prototype.moreBtnlistSelect = function (index) {
                    var cell = this._viewUI.moreBtn_list.getCell(index);
                    var morebtn = cell.getChildByName("more_btn"); //list中的morebtn
                    var btnname = morebtn.label;
                    this.btnSelect(btnname);
                };
                /**点击更多按钮 */
                ItemDetailsTipsMediator.prototype.onoldmoreBtn = function () {
                    var morebtn = this._viewUI.more_btn; //页面的btn
                    var btnname = morebtn.label;
                    this.btnSelect(btnname);
                };
                /**点击按钮 */
                ItemDetailsTipsMediator.prototype.btnSelect = function (btnName) {
                    if (btnName == tipsModel.stringType.fenjie) { //分解
                        if (this.key != -1) {
                            RequesterProtocols._instance.c2s_resolve_gem(this.key);
                            tips.models.TipsProxy.getInstance().event(tips.models.CLOSE_TIPS);
                        }
                    }
                    else if (btnName == tipsModel.stringType.paimai) { //拍卖      
                        modules.ModuleManager.show(modules.ModuleNames.SALE, this._app);
                    }
                    else if (btnName == tipsModel.stringType.drop) { //丢弃  需要二次确认  
                        this.RemindViewMediator = new game.modules.commonUI.RemindViewMediator(this._viewUI, this._app);
                        var array = [];
                        array.push(this.itemName);
                        var prmot = HudModel.getInstance().promptAssembleBack(PromptExplain.CONFIRM_DROP, array);
                        this.RemindViewMediator.onShow(prmot, this.cstringResConfigData[2037].msg, this.cstringResConfigData[2038].msg);
                        this.RemindViewMediator.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.clickCancelBtnEvent);
                        this.RemindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.clickEnSureBtnEvent);
                    }
                    else if (btnName == tipsModel.stringType.shanghui) { //商会
                        this.BuyKuaiJieMediator = new game.modules.commonUI.BuyKuaiJieMediator(this._app);
                        var keyWords = "SALE";
                        this.BuyKuaiJieMediator.show(keyWords);
                        this.BuyKuaiJieMediator.initSaleData(this.itemID, this.number, this.shopId, this.key);
                        this.closeWindow();
                    }
                    else if (btnName == tipsModel.stringType.hecheng) { //合成   
                        var rolelevel = HudModel.getInstance().levelNum;
                        if (rolelevel >= unlock.QIANGHUA_LEVEL) {
                            game.modules.strengThening.models.StrengTheningModel._instance.tabNum = 2;
                            this.StrengTheningModule = new game.modules.strengThening.StrengTheningModule(this._app);
                            modules.ModuleManager.show(modules.ModuleNames.STRENG_THENING, this._app);
                            modules.ModuleManager.hide(modules.ModuleNames.BAG);
                            LoginModel.getInstance().CommonPage = modules.ModuleNames.BAG;
                        }
                        else {
                            this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                            this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[150054].msg.replace("$parameter1$", unlock.QIANGHUA_LEVEL));
                        }
                    }
                    if (btnName != "更多") {
                        this.closeWindow();
                    }
                };
                /**
                 * 奖励系统的tips,签到tips
                 * @param itemId
                 * @param parame [标题：没有标题为空,签到的天数(-1为已经领取，大于0则为需要的天数)]
                 */
                ItemDetailsTipsMediator.prototype.showCommonItemTips = function (itemId, parame) {
                    this._viewUI.comeform_btn.visible = false;
                    this._viewUI.bagTipsBtn_box.visible = false;
                    this._viewUI.itemKeZhuangBei_img.visible = false;
                    this._viewUI.more_btn.visible = false;
                    this._viewUI.moreBtn_list.visible = false;
                    this.showBaseItem(itemId);
                    var xpos = parame.get("xpos");
                    var ypos = parame.get("ypos");
                    if (xpos && ypos) {
                        this._viewUI.bg_img.x = xpos;
                        this._viewUI.bg_img.y = ypos;
                    }
                    else {
                        this._viewUI.bg_img.x = 175;
                        this._viewUI.bg_img.y = 537;
                    }
                    var destribe = this.itemAttrData[itemId].destribe; //描述
                    var html = "<span style='fontSize:20;'>" + destribe + "</span><br>";
                    var m_parame = parame.get("parame");
                    if (m_parame != undefined) {
                        if (m_parame[0] > 0) {
                            var msg = this.cstringResConfigData[11178].msg + ""; //配置表修改完成使用这个
                            var m_msg = msg.replace("$parameter1$", m_parame[0]);
                            html += m_msg;
                        }
                        else {
                            var msg = this.cstringResConfigData[11177].msg + ""; //配置表修改完后用这个
                            html += msg;
                        }
                    }
                    this.setHtml(html);
                };
                /**
                 * 强化界面物品tips
                 */
                ItemDetailsTipsMediator.prototype.showQianghuaTips = function (itemId) {
                    this._viewUI.bagTipsBtn_box.visible = false;
                    this._viewUI.itemKeZhuangBei_img.visible = false;
                    this._viewUI.moreBtn_list.visible = false;
                    this.showBaseItem(itemId);
                    var destribe = this.itemAttrData[itemId].destribe; //描述
                    var html = "<span style='fontSize:20;'>" + destribe + "</span><br>";
                    var name = this.itemAttrData[itemId].name;
                    var tishi = this.cstringResConfigData[11029].msg;
                    html += "<span style='fontSize:20;color:#FF0000'>" + tishi.replace("$parameter1$", name) + "</span><br>";
                    this.setHtml(html);
                    this._viewUI.comeform_btn.on(LEvent.MOUSE_DOWN, this, this.onComeformBtn, [itemId]);
                };
                /**点击获取途径按钮 */
                ItemDetailsTipsMediator.prototype.onComeformBtn = function (itemId) {
                    tips.models.TipsProxy.getInstance().event(tips.models.CLOSE_TIPS);
                    tips.models.TipsProxy.getInstance().event(tips.models.onComeformBtn, itemId);
                };
                /**
                 * 显示宠物技能tips
                 * @param skillId
                 */
                ItemDetailsTipsMediator.prototype.showSkillTips = function (skillId) {
                    this._viewUI.bagTipsBtn_box.visible = false;
                    this._viewUI.itemKeZhuangBei_img.visible = false;
                    this._viewUI.comeform_btn.visible = false;
                    this._viewUI.itemName_lab.visible = false;
                    this._viewUI.itemFeatures_html.visible = false;
                    this._viewUI.itemFeatures_btn.visible = false;
                    this._viewUI.more_btn.visible = false;
                    this._viewUI.moreBtn_list.visible = false;
                    this._viewUI.suo_img.visible = false;
                    var skillname = this.petSkillConfigData[skillId].skillname; //技能名称
                    var skilltype = this.petSkillConfigData[skillId].skilltype; //技能类型
                    var skilldescribe = this.petSkillConfigData[skillId].skilldescribe; //技能描述
                    this._viewUI.itemType_btn.text = skillname;
                    var iconid = this.petSkillConfigData[skillId].icon; //技能图标id
                    this._viewUI.itemIcon_img.skin = "common/icon/skill/" + iconid + ".png";
                    var color = this.petSkillConfigData[skillId].color; //品质
                    //this._viewUI.itemColor_img.skin = StrengTheningModel._instance.frameSkinArr[color];
                    var html = "";
                    if (skilltype == 1) {
                        html += "<span style='fontSize:20;color:#13FF00'>" + this.cstringResConfigData[2160].msg + "</span><br>";
                        this._viewUI.itemColor_img.skin = "common/ui/pet/beiji" + color + ".png";
                    }
                    else if (skilltype == 2) {
                        html += "<span style='fontSize:20;color:#13FF00'>" + tipsModel.stringType.zhudong + "</span><br>";
                        this._viewUI.itemColor_img.skin = "common/ui/pet/zhuji" + color + ".png";
                    }
                    html += "<span style='fontSize:20;color:#13FF00'>" + skilldescribe + "</span><br>";
                    this.setHtml(html);
                };
                /**
                 * 显示物品tips中的名称、类型、功能、图标、边框
                 * @param itemId
                 */
                ItemDetailsTipsMediator.prototype.showBaseItem = function (itemId, parame) {
                    var destribe = this.itemAttrData[itemId].destribe; //描述
                    var effectdes = this.itemAttrData[itemId].effectdes; //功能说明
                    var itemName = this.itemAttrData[itemId].name; //物品名称
                    var itemtypeid = this.itemAttrData[itemId].itemtypeid; //类型
                    var itemtypeName = this.itemTypeData[itemtypeid].name; //类型名
                    var iconid = this.itemAttrData[itemId].icon; //iconid
                    var itemIcon = SaleModel.getInstance().getIcon(iconid); //icon
                    var nquality = this.itemAttrData[itemId].nquality; //品质
                    var colour = this.itemAttrData[itemId].colour;
                    var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                    this._viewUI.itemName_lab.text = itemName;
                    this._viewUI.itemName_lab.color = colour;
                    this._viewUI.itemType_btn.text = tipsModel.stringType.equipType + itemtypeName;
                    this._viewUI.itemFeatures_html.visible = false;
                    this._viewUI.itemFeatures_btn.visible = true;
                    if (100100 <= itemId && itemId <= 100352) {
                        this._viewUI.itemFeatures_btn.text = this.cstringResConfigData[1].msg + this.itemAttrData[itemId].level;
                    }
                    else if (111000 <= itemId && itemId <= 111053) {
                        var needQuality = this.foodAndDrugEffectData[itemId].needQuality; //是否有品质
                        if (needQuality == 1) {
                            var foodQuality = this.getfoodQuality(parame);
                            this._viewUI.itemFeatures_btn.text = this.cstringResConfigData[1456].msg + foodQuality;
                        }
                        else {
                            this._viewUI.itemFeatures_btn.text = this.cstringResConfigData[11032].msg + effectdes;
                        }
                    }
                    else {
                        if (itemId <= 101108 && itemId >= 101100) { //符文卷轴
                            this._viewUI.itemFeatures_html.visible = true;
                            var _EnhancementVo = void 0;
                            var _equipTips = game.modules.strengThening.models.StrengTheningModel._instance.equipTips;
                            for (var i = 0; i < _equipTips.length; i++) {
                                var _packid = _equipTips[i].packid;
                                if (_packid == this.packID) {
                                    var _key = _equipTips[i].keyinpack;
                                    if (_key == this.key) {
                                        _EnhancementVo = _equipTips[i].tips; //获得到注灵卷轴的tips
                                    }
                                }
                            }
                            if (!_EnhancementVo) { //若没取到附魔道具的附魔数据，则向服务端请求该道具的tips数据
                                if (this.packID == BagTypes.DEPOT || this.packID == BagTypes.TEMP) {
                                    modules.createrole.models.LoginProxy.getInstance().once(modules.createrole.models.GetItemTips_EVENT, this, this.showBaseItem, [itemId, parame]);
                                    RequesterProtocols._instance.c2s_CGetItem_Tips(this.packID, this.key);
                                }
                                return;
                            }
                            this._viewUI.itemFeatures_btn.text = this.cstringResConfigData[1].msg + _EnhancementVo.level.toString();
                            var _fumoeffectformula = tips.models.TipsModel.getInstance().cfumoeffectformulaConfigData[itemId];
                            var _enchEffectMin = Math.round(_fumoeffectformula.fmin * _EnhancementVo.level); //附魔保底效果
                            var _enchEffectMan = Math.round(_fumoeffectformula.fmax * _EnhancementVo.level); //附魔最高效果
                            var param = [_enchEffectMin, _enchEffectMan];
                            var _parameterNum = this.getNeedParamterCount(effectdes);
                            for (var paramIndex = 0; paramIndex < _parameterNum; paramIndex++) {
                                if (0 == paramIndex % 2) {
                                    effectdes = effectdes.replace("$parameter" + [(paramIndex + 1)] + "$", param[0]);
                                }
                                else {
                                    effectdes = effectdes.replace("$parameter" + [(paramIndex + 1)] + "$", param[1]);
                                }
                            }
                            this._viewUI.itemFeatures_html.innerHTML = "<span style='fontSize:20'>" + this.cstringResConfigData[11032].msg + "</span>" + effectdes;
                            var _featuresHeight = this._viewUI.itemFeatures_html.contextHeight;
                            this._viewUI.iteamDetails_html.y = this._viewUI.itemFeatures_html.y + _featuresHeight + 10;
                            var _detailsHeight = this._viewUI.iteamDetails_html.contextHeight;
                            this.setHtml(null, _featuresHeight + _detailsHeight);
                        }
                        else {
                            this._viewUI.itemFeatures_btn.text = this.cstringResConfigData[11032].msg + effectdes;
                        }
                    }
                    this._viewUI.itemIcon_img.skin = itemIcon + "";
                    this._viewUI.itemColor_img.skin = itemnquality;
                };
                /** 获取所需要参数的个数
                 * @param str 有需要参数的文字说明
                 */
                ItemDetailsTipsMediator.prototype.getNeedParamterCount = function (str) {
                    var _count = 0;
                    var fromIndex = 0;
                    while (true) {
                        var index = str.indexOf("parameter", fromIndex);
                        if (-1 != index) {
                            fromIndex = index + 1;
                            _count++;
                        }
                        else {
                            break;
                        }
                    }
                    return _count;
                };
                /**获取食物品质 */
                ItemDetailsTipsMediator.prototype.getfoodQuality = function (parame) {
                    if (parame != undefined) {
                        var foodQuality = 0;
                        var equipTips = StrengTheningModel._instance.equipTips;
                        var packid = parame.get("packid");
                        var key = parame.get("key");
                        for (var i = 0; i < equipTips.length; i++) {
                            var equPackid = equipTips[i].packid;
                            var equKey = equipTips[i].keyinpack;
                            if (packid == equPackid && key == equKey) {
                                foodQuality = equipTips[i].tips.quality;
                            }
                        }
                        return foodQuality;
                    }
                    else
                        return this.cstringResConfigData[2461].msg; //未知
                };
                /**
                 * 重新设置html的高和内容
                 * @param html
                 */
                ItemDetailsTipsMediator.prototype.setHtml = function (html, height) {
                    var bgHeight = this._viewUI.bg_img.height;
                    if (html) {
                        this._viewUI.iteamDetails_html.innerHTML = html;
                        if (this._viewUI.iteamDetails_html.height > this.minHtmlHeight) {
                            this._viewUI.bg_img.height = bgHeight - this.minHtmlHeight + this._viewUI.iteamDetails_html.height;
                        }
                    }
                    else if (height) {
                        this._viewUI.bg_img.height = bgHeight - this.minHtmlHeight + height;
                    }
                };
                /**
                 * @param isshow 是否显示按钮 @param access 1 存入 2取出
                 */
                ItemDetailsTipsMediator.prototype.show = function (parame, isshow, access) {
                    _super.prototype.show.call(this);
                    if (parame && parame.get("purposetype") != null) {
                        var type = parame.get("purposetype");
                        if (type == ItemPurpose.ITEM_TRANSFER) {
                            this._viewUI.use_btn.label = this.cstringResConfigData[2916].msg;
                            this.ItemPurpose = type;
                        }
                    }
                    else if (isshow && access) { /** 仓库 */
                        this._viewUI.more_btn.visible = false;
                        this._viewUI.use_btn.visible = false;
                        this._viewUI.access_btn.visible = true;
                        this.access = access;
                        if (access == 1) {
                            this._viewUI.access_btn.label = this.cstringResConfigData[3079].msg;
                        }
                        else if (access == 2) {
                            this._viewUI.access_btn.label = this.cstringResConfigData[3080].msg;
                        }
                    }
                    else if (isshow) { /** 使用按钮禁止 */
                        this._viewUI.more_btn.visible = false;
                        this._viewUI.use_btn.visible = false;
                        this._viewUI.access_btn.visible = false;
                    }
                    else {
                        this._viewUI.more_btn.visible = true;
                        this._viewUI.use_btn.visible = true;
                        this._viewUI.access_btn.visible = false;
                    }
                };
                ItemDetailsTipsMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                ItemDetailsTipsMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ItemDetailsTipsMediator;
            }(game.modules.UiMediator));
            tips.ItemDetailsTipsMediator = ItemDetailsTipsMediator;
        })(tips = modules.tips || (modules.tips = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ItemDetailsTipsMediator.js.map