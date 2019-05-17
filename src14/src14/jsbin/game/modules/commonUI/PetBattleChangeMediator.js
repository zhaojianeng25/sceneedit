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
            /** 选择宠物事件 */
            commonUI.CALL_PET = "selectBackPetEvent";
            /** 宠物战斗召唤 或者 选择要被重置的神兽 */
            var PetBattleChangeMediator = /** @class */ (function (_super) {
                __extends(PetBattleChangeMediator, _super);
                function PetBattleChangeMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**宠物品质*/
                    _this.colour = ["baikuang.png", "lvkuang.png", "lankuang.png", "zikuang.png", "jinkuang.png"];
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /** 当前召唤次数 */
                    _this.calltime = 0;
                    /** 召唤次数上限 */
                    _this.upLimittime = 0;
                    /** 神兽列表被选中的索引 */
                    _this.shenshouSelectedIndex = -1;
                    _this._viewUI = new ui.common.PetBattleChangeUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._viewUI.zhaohuan_btn.on(LEvent.MOUSE_DOWN, _this, _this.selectchuzhan);
                    _this._petAttrData = PetModel.getInstance().petCPetAttrData; //宠物数据表
                    _this._shapeCpnfig = modules.createrole.models.LoginModel.getInstance().cnpcShapeInfo; //造型配置表
                    _this._petSkillConfigData = PetModel.getInstance().petSkillConfigData; //宠物技能显示配置表
                    return _this;
                }
                /**
                 * @param calltime 当前宠物召唤次数
                 */
                PetBattleChangeMediator.prototype.show = function (calltime) {
                    _super.prototype.show.call(this);
                    this.show_and_hide_UI(false);
                    var data = [];
                    this.petkey = [];
                    this._viewUI.zhaohuan_btn.gray = true;
                    this._viewUI.zhaohuan_btn.mouseEnabled = false;
                    var currentfightkey = game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex;
                    var callpet = this.setCallTimes(calltime);
                    for (var key in PetModel.getInstance().pets.keys) {
                        var petinfo = PetModel._instance.pets.get(PetModel._instance.pets.keys[key]);
                        if (petinfo.key == currentfightkey || callpet.get(petinfo.key) != null) //是否是已出战宠物
                            continue;
                        var allpetbase = this._petAttrData[petinfo.id];
                        var icondata = this._shapeCpnfig[allpetbase.modelid];
                        data.push({ petname_lab: petinfo.name, petlv_lab: petinfo.level + this.cstringResConfigData[3].msg, coloricon_img: "common/ui/tongyong/" + this.colour[allpetbase.quality - 1], icon_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png", pet_id: petinfo.id });
                        this.petkey.push(petinfo.key);
                    }
                    this._viewUI.pet_list.array = data;
                    this._viewUI.pet_list.repeatY = data.length;
                    this._viewUI.pet_list.vScrollBarSkin = "";
                    this._viewUI.pet_list.scrollBar.elasticDistance = 200;
                    this._viewUI.pet_list.scrollBar.elasticBackTime = 100;
                    this._viewUI.pet_list.renderHandler = new Laya.Handler(this, this.initbtn);
                };
                /**初始化响应事件*/
                PetBattleChangeMediator.prototype.initbtn = function (cell, index) {
                    var btn = cell.getChildByName("petselect_btn");
                    var icon_img = cell.getChildByName("icon_img");
                    icon_img.on(LEvent.CLICK, this, this.showPetDetail, [index]);
                    btn.on(LEvent.MOUSE_DOWN, this, this.selectpet, [cell, index]);
                };
                /** 点击显示宠物详情 */
                PetBattleChangeMediator.prototype.showPetDetail = function (index) {
                    var _petId = this._viewUI.pet_list.array[index].pet_id;
                    var _petTips = new game.modules.commonUI.PetMessageMediator(_petId, this._app, true);
                    _petTips.show();
                    //  _petTips.once(commonUI.CLOSE_PET_TIPS, this, this.showdetail);
                };
                /**选择宠物 */
                PetBattleChangeMediator.prototype.selectpet = function (cell, index) {
                    if (this.lastbox) { //是否多次选择
                        var lastbtn = this.lastbox.getChildByName("petselect_btn");
                        lastbtn.selected = false;
                    }
                    var btn = cell.getChildByName("petselect_btn");
                    btn.selected = true;
                    this.lastbox = cell;
                    this.currentselect = index;
                    this._viewUI.zhaohuan_btn.gray = false;
                    this._viewUI.zhaohuan_btn.mouseEnabled = true;
                };
                /**选择召唤*/
                PetBattleChangeMediator.prototype.selectchuzhan = function () {
                    console.log(this.petkey[this.currentselect]);
                    if (this.calltime < this.upLimittime) {
                        this.event(commonUI.CALL_PET, this.petkey[this.currentselect]);
                        this.hide();
                    }
                    else {
                        var param = [this.upLimittime];
                        var prompt_1 = HudModel.getInstance().promptAssembleBack(PromptExplain.COMBAT_ASSISTANCE_UPLIMIT, param);
                        var disappearTipsMessage = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        disappearTipsMessage.onShow(prompt_1);
                    }
                };
                /** 设置当前的召唤次数*/
                PetBattleChangeMediator.prototype.setCallTimes = function (callPet) {
                    var roleLevel = HudModel.getInstance().levelNum;
                    var upLimit; //= parseInt(((roleLevel % 100)/10).toString()); //计算十位数
                    /** 策划给的规则是1-50级上限2只,60-79上限3只,80-99级4只 */
                    if (roleLevel < 60) {
                        upLimit = 2;
                    }
                    else if (roleLevel < 80) {
                        upLimit = 3;
                    }
                    else if (roleLevel < 100) {
                        upLimit = 4;
                    }
                    if (callPet.keys.length <= 1) {
                        var callPets = LocalStorage.getJSON(LoginModel.getInstance().roleDetail.roleid + "_callPetTimes");
                        if (callPets && callPets instanceof Object) {
                            for (var _index = 0; _index < callPets._keys.length; _index++) {
                                callPet.set(callPets._keys[_index], callPets._values[_index]);
                            }
                        }
                    }
                    this.calltime = callPet.keys.length;
                    this.upLimittime = upLimit;
                    this._viewUI.count_lab.text = (this.calltime + " / " + upLimit);
                    return callPet;
                };
                PetBattleChangeMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.shenshouSelectedIndex = -1;
                    this.selectedBtn = undefined;
                    this._viewUI.reset_btn.off(LEvent.CLICK, this, this.resetShenShou);
                };
                PetBattleChangeMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /** 选择要被重置的神兽 */
                PetBattleChangeMediator.prototype.onShow = function () {
                    if (this.checkHaveShenShou()) {
                        return;
                    }
                    _super.prototype.show.call(this);
                    this.show_and_hide_UI(true);
                    this.shenShouLstInt();
                    this._viewUI.shenShou_lst.selectedIndex = 0; //默认选中第一位神兽要被重置
                    this._viewUI.reset_btn.on(LEvent.CLICK, this, this.resetShenShou);
                };
                /** 重置神兽 */
                PetBattleChangeMediator.prototype.resetShenShou = function () {
                    var _PetChooseMediator = new commonUI.PetChooseMediator(this._app);
                    var _shenShouId = this._shenshouDic.get(this._shenshouDic.keys[this.shenshouSelectedIndex]).id;
                    _PetChooseMediator.onShow(_shenShouId, this._shenshouDic.keys[this.shenshouSelectedIndex]);
                    this.hide();
                };
                /** 神兽列表初始化 */
                PetBattleChangeMediator.prototype.shenShouLstInt = function () {
                    this._viewUI.shenShou_lst.vScrollBarSkin = "";
                    this._viewUI.shenShou_lst.scrollBar.elasticBackTime = 100;
                    this._viewUI.shenShou_lst.scrollBar.elasticDistance = 100;
                    this._viewUI.shenShou_lst.array = this._shenshouDic.keys;
                    this._viewUI.shenShou_lst.renderHandler = new Laya.Handler(this, this.shenShouLstRend);
                    this._viewUI.shenShou_lst.selectHandler = new Laya.Handler(this, this.shenShouLstSelect);
                };
                /** 神兽列表选择 */
                PetBattleChangeMediator.prototype.shenShouLstSelect = function (index) {
                    var petselect_btn = this._viewUI.shenShou_lst.getCell(index).getChildByName("petselect_btn");
                    petselect_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    if (this.selectedBtn) {
                        this.selectedBtn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                    this.shenshouSelectedIndex = index;
                    this.selectedBtn = petselect_btn;
                };
                /** 神兽列表渲染 */
                PetBattleChangeMediator.prototype.shenShouLstRend = function (cell, index) {
                    var petname_lab = cell.getChildByName("petname_lab");
                    var petLevel_lab = cell.getChildByName("petLevel_lab");
                    var incCount_lab = cell.getChildByName("incCount_lab");
                    var _shenShouInfo = this._shenshouDic.get(this._shenshouDic.keys[index]);
                    petname_lab.text = this._petAttrData[_shenShouInfo.id]["name"];
                    petLevel_lab.text = _shenShouInfo.level.toString();
                    incCount_lab.text = _shenShouInfo.shenshouinccount.toString();
                    var coloricon_img = cell.getChildByName("coloricon_img");
                    var icon_img = cell.getChildByName("icon_img");
                    coloricon_img.skin = modules.bag.BagSystemModule.getGameItemFrameColorResource(this._petAttrData[_shenShouInfo.id]["quality"]);
                    var _shapeid = this._petAttrData[_shenShouInfo.id]["modelid"];
                    var _shenshouiconid = this._shapeCpnfig[_shapeid]["littleheadID"];
                    icon_img.skin = "common/icon/avatarpet/" + _shenshouiconid + ".png";
                    var petselect_btn = cell.getChildByName("petselect_btn");
                    if (this.selectedBtn == petselect_btn) {
                        petselect_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    }
                    else {
                        petselect_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                    var petSkills_lst = cell.getChildByName("petSkills_lst");
                    this.shenShouSkillsLstInit(petSkills_lst, _shenShouInfo.skills);
                };
                /** 神兽技能列表初始化
                 * @param lst
                 * @param skills 存放神兽技能的数值
                 */
                PetBattleChangeMediator.prototype.shenShouSkillsLstInit = function (lst, skills) {
                    lst.array = skills;
                    this.shenshouSkillsArr = [];
                    this.shenshouSkillsArr = skills;
                    lst.renderHandler = new Laya.Handler(this, this.shenShouSkillsLstRender);
                    lst.selectHandler = new Laya.Handler(this, this.shenShouSkillsLstSelect);
                };
                /** 神兽技能列表点击 */
                PetBattleChangeMediator.prototype.shenShouSkillsLstSelect = function (index) {
                    var _skill = this.shenshouSkillsArr[index];
                    var _parame = new Laya.Dictionary();
                    _parame.set("itemId", _skill.skillId);
                    var _tipsmod = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, _parame);
                };
                /** 神兽技能列表渲染 */
                PetBattleChangeMediator.prototype.shenShouSkillsLstRender = function (cell, index) {
                    var petSkill_img = cell.getChildByName("petSkill_img"); //技能头像
                    var petSkillFrame_img = cell.getChildByName("petSkillFrame_img");
                    var _skill = this.shenshouSkillsArr[index];
                    var _skillCofig = this._petSkillConfigData[_skill.skillId];
                    var _skillIconId = _skillCofig.icon; //技能头像
                    var _skillInitiative = _skillCofig.skilltype; //宠物技能：1.被动 2.主动
                    petSkill_img.skin = "common/icon/skill/" + _skillIconId + ".png";
                    if (_skillInitiative == 1)
                        petSkillFrame_img.skin = "common/ui/pet/beiji" + _skillCofig.color + ".png";
                    else
                        petSkillFrame_img.skin = "common/ui/pet/zhuji" + _skillCofig.color + ".png";
                };
                /** 检查人物身上神兽数量 */
                PetBattleChangeMediator.prototype.checkHaveShenShou = function () {
                    var _haveOneOrNot = false;
                    this._shenshouDic = new Laya.Dictionary();
                    this._shenshouDic = PetModel.getInstance().getShenshouDatas();
                    if (this._shenshouDic.keys.length == 1) { //身上只有一只神兽，直接进入选择重置神兽的界面
                        var _PetChooseMediator = new commonUI.PetChooseMediator(this._app);
                        var _shenShouId = this._shenshouDic.get(this._shenshouDic.keys[0]).id;
                        _PetChooseMediator.onShow(_shenShouId, this._shenshouDic.keys[0]);
                        _haveOneOrNot = true;
                    }
                    else if (this._shenshouDic.keys.length == 0) { //身上没有神兽,弹出提示飘窗
                        var _tipsStr2 = ChatModel.getInstance().chatMessageTips[162104]["msg"];
                        game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, _tipsStr2);
                        _haveOneOrNot = true;
                    }
                    return _haveOneOrNot;
                };
                /** 显示与隐藏部分UI
                 * @param isReset true:是神兽重置，false:不是神兽重置
                 */
                PetBattleChangeMediator.prototype.show_and_hide_UI = function (isReset) {
                    if (isReset) {
                        this._viewUI.title_lab.text = "神兽重置";
                        this._viewUI.tips_lab.text = "请选择要被重置神兽物";
                        this._viewUI.count_lab.visible = false;
                        this._viewUI.pet_list.visible = false;
                        this._viewUI.zhaohuan_btn.visible = false;
                        this._viewUI.reset_btn.visible = true;
                        this._viewUI.shenShou_lst.visible = true;
                    }
                    else {
                        this._viewUI.title_lab.text = "选择宠物";
                        this._viewUI.tips_lab.text = "请选择出战的宠物";
                        this._viewUI.count_lab.visible = true;
                        this._viewUI.pet_list.visible = true;
                        this._viewUI.zhaohuan_btn.visible = true;
                        this._viewUI.reset_btn.visible = false;
                        this._viewUI.shenShou_lst.visible = false;
                    }
                };
                return PetBattleChangeMediator;
            }(game.modules.UiMediator));
            commonUI.PetBattleChangeMediator = PetBattleChangeMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetBattleChangeMediator.js.map