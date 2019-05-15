/**wanjiazhuangbei.ui */
// import ViewEquipUI = ui.common.component.wanjiazhuangbeiUI;
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
        var commonUI;
        (function (commonUI) {
            var ViewEquipMediator = /** @class */ (function (_super) {
                __extends(ViewEquipMediator, _super);
                function ViewEquipMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**装备背包中道具个数 */
                    _this._equipGameItemListLength = 5;
                    _this.key = false;
                    _this._viewUI = new ui.common.component.wanjiazhuangbeiUI();
                    _this._PetXiangQingMediator = new modules.pet.PetXiangQingMediator(app);
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.model = new ModelsCreate();
                    _this.scene2DPanel = new TestRole2dPanel();
                    _this._viewUI.pos_box.addChild(_this.scene2DPanel);
                    _this.eventListener();
                    return _this;
                }
                /**注册事件监听 */
                ViewEquipMediator.prototype.eventListener = function () {
                    game.modules.sale.models.SaleProxy._instance.on(game.modules.sale.models.SMarketPetTips, this, this.showPetDetails);
                };
                ////////////////
                ///业务逻辑
                ////////////////
                /**
                 * @describe  显示提示UI
                 * @param null
                 *
                 */
                ViewEquipMediator.prototype.onShow = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                    _super.prototype.show.call(this);
                    this.registerEvent();
                    this.controlEquipGameItemList();
                    this.onLoadRoleInfo();
                    this.key = true;
                };
                ViewEquipMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.key = false;
                };
                ViewEquipMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**显示宠物详情 */
                ViewEquipMediator.prototype.showPetDetails = function (e) {
                    var data = modules.sale.models.SaleModel.getInstance().SMarketPetTipsData.get("data");
                    if (data.tipstype == 5 && this.key == true)
                        this._PetXiangQingMediator.init(data.PetInfoVo);
                };
                /**
                 * @describe  注册事件
                 */
                ViewEquipMediator.prototype.registerEvent = function () {
                    /** 发送信息 */
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.closeEvent);
                    this._viewUI.viewPet_btn.on(LEvent.MOUSE_DOWN, this, this.showPet);
                };
                /**查看宠物 */
                ViewEquipMediator.prototype.showPet = function () {
                    var eQuipData = modules.team.models.TeamModel.getInstance().roleEquipData;
                    RequesterProtocols._instance.c2s_CGetRolePet_Info(eQuipData.roleid);
                };
                /** 玩家的门派等级其他信息 */
                ViewEquipMediator.prototype.onLoadRoleInfo = function () {
                    var eQuipData = modules.team.models.TeamModel.getInstance().roleEquipData;
                    if (typeof (eQuipData) == "undefined" || eQuipData == null)
                        return;
                    this._viewUI.roleName_txt.text = eQuipData.rolename;
                    this._viewUI.score_lab.text = eQuipData.rolelevel.toString();
                    this._viewUI.pinfen.text = eQuipData.totalscore.toString();
                    var school = eQuipData.profession;
                    var schoolImgUrl = game.modules.team.models.TeamModel.getInstance().getSchoolImgBack(school);
                    this._viewUI.school_img.skin = schoolImgUrl;
                    var roles = LoginModel.getInstance().cnpcShapeInfo[eQuipData.shape];
                    this.modelcreate(parseInt(roles.shape));
                };
                //创建模型
                ViewEquipMediator.prototype.modelcreate = function (modelid) {
                    /** 读的是创角配置表的模型 由于创角配置表被改过，原Id是将首个2换成1 比如2010101 原1010101 */
                    modelid = parseInt((modelid.toString()).replace("2", "1"));
                    this.scene2DPanel.ape.x = this._viewUI.x * this._viewUI.globalScaleX;
                    this.scene2DPanel.ape.y = this._viewUI.y * this._viewUI.globalScaleY;
                    if (this.model.role3d) { //移除模型
                        this.scene2DPanel.removeSceneChar(this.model.role3d);
                    }
                    this.model.role3d = new YxChar3d();
                    this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
                    this.model.role3d.set2dPos((this._viewUI.pos_box.x + this._viewUI.pos_box.width / 2 + this._viewUI.bk_box.x) * this._viewUI.globalScaleX, (this._viewUI.pos_box.y + this._viewUI.pos_box.height / 4 * 3.5 + this._viewUI.bk_box.y) * this._viewUI.globalScaleY); //坐标
                    this.model.role3d.scale = 1;
                    this.model.role3d.rotationY = 180;
                    this.scene2DPanel.addSceneChar(this.model.role3d);
                    BagModel.chargeToWeapon(this.model.role3d);
                };
                ViewEquipMediator.prototype.controlEquipGameItemList = function () {
                    this.getEquipData();
                    this._viewUI.equip_list.spaceX = 237;
                    this._viewUI.equip_list.spaceY = 26;
                    this._viewUI.equip_list.selectEnable = true;
                    this._viewUI.equip_list.renderHandler = new Handler(this, this.onRenderListItemOfEquipGameItem);
                    this._viewUI.equip_list.selectHandler = new Handler(this, this.ListItemOfEquipGameItemSelect);
                };
                /** 获取装备的数据 */
                ViewEquipMediator.prototype.getEquipData = function () {
                    var eQuipData = modules.team.models.TeamModel.getInstance().roleEquipData;
                    if (typeof (eQuipData) == "undefined")
                        return;
                    var bag = eQuipData.equipinfo;
                    if (!bag)
                        return;
                    // 置空
                    this._equipGameItemListData = [];
                    var arr = [];
                    var posArray = [];
                    var listItem;
                    //插入Item到arr数组
                    for (var index = 0; index < bag.items.length; index++) {
                        var id = bag.items[index].id;
                        var obj = game.modules.bag.models.BagModel.getInstance().getItemAttrData(id);
                        var equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
                        var icon = obj.icon;
                        var nquality = obj.nquality;
                        var number = bag.items[index].number;
                        var pos_1 = bag.items[index].position;
                        var key = bag.items[index].key;
                        listItem = {
                            ID: id,
                            icon: icon,
                            number: number,
                            position: pos_1,
                            nquality: nquality,
                            isLock: false,
                            key: key,
                            equipType: equipType,
                        };
                        arr.push(listItem);
                        // 1，4，5，7，12
                        // 0, 1, 2, 3, 4
                        posArray.push(equipType);
                    }
                    // let listItem: ListItem;
                    for (var index = 0; index <= this._equipGameItemListLength; index++) {
                        var tempIndex = posArray.indexOf(index);
                        // 找到
                        if (tempIndex != -1) {
                            listItem = arr[tempIndex];
                        }
                        else {
                            listItem = {
                                ID: -1,
                                icon: -1,
                                number: -1,
                                position: -1,
                                nquality: -1,
                                isLock: false,
                                key: -1,
                                equipType: -1,
                            };
                        }
                        this._equipGameItemListData.push(listItem);
                    }
                    /** 重新进行排版,针对武器的位置 */
                    var weapion = this._equipGameItemListData[0]; //武器
                    this._equipGameItemListData.splice(0, 1);
                    this._equipGameItemListData.splice(2, 0, weapion);
                    this._viewUI.equip_list.array = this._equipGameItemListData;
                };
                ViewEquipMediator.prototype.onRenderListItemOfEquipGameItem = function (cell, index) {
                    if (index > this._equipGameItemListLength)
                        return;
                    var itemData = this._equipGameItemListData[index];
                    var gameItemImg = cell.getChildByName("ownGameItem_img");
                    if (itemData.ID != -1) {
                        var icon = itemData.icon;
                        gameItemImg.skin = "common/icon/item/" + icon + ".png";
                        // gameItemImg.on(LEvent.DOUBLE_CLICK,this,this.opEquip,[OpEquip.TAKEOFF,itemData.key,itemData.position]);
                    }
                    else {
                        gameItemImg.skin = "";
                    }
                };
                ViewEquipMediator.prototype.ListItemOfEquipGameItemSelect = function (index) {
                    if (this._viewUI.equip_list.selectedIndex != -1) {
                        var itemId = this._equipGameItemListData[index].ID;
                        if (itemId != -1) {
                            var key = this._equipGameItemListData[index].key;
                            var equipType = this._equipGameItemListData[index].equipType;
                            var parame = new Dictionary();
                            parame.set("itemId", itemId);
                            parame.set("key", key);
                            parame.set("equiptype", equipType);
                            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame);
                        }
                        this._viewUI.equip_list.selectedIndex = -1;
                    }
                };
                ViewEquipMediator.prototype.closeEvent = function () {
                    this.hide();
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                ////////////////
                ///事件
                ////////////////
                /**
                 * @describe  银币补助界面，点击使用金币代替按钮事件
                 */
                ViewEquipMediator.prototype.onClickUseGoldBtnEvent = function () {
                    this.event(commonUI.USE_GOLD_EXCHANGE_EVENT);
                };
                /**
                 * @describe  银币补足界面，点击使用符石兑换按钮事件
                 */
                ViewEquipMediator.prototype.onClickUseYuanBaoOfSilverBtnEvent = function () {
                    this.event(commonUI.USE_SILVER_EXCHANGE_EVENT);
                    this.hide();
                };
                /**
                 * @describe  金币补助界面，点击使用符石兑换按钮事件
                 */
                ViewEquipMediator.prototype.onClickUseYuanBaoOfGoldBtnEvent = function () {
                    this.event(commonUI.USE_YUANBAO_EXCHANGE_EVENT);
                    this.hide();
                };
                return ViewEquipMediator;
            }(game.modules.UiMediator));
            commonUI.ViewEquipMediator = ViewEquipMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ViewEquipMediator.js.map