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
* 宠物图鉴
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var PetTuJianMediator = /** @class */ (function (_super) {
                __extends(PetTuJianMediator, _super);
                function PetTuJianMediator(uiLayaer) {
                    var _this = _super.call(this, uiLayaer) || this;
                    /**宠物种类*/
                    _this.upkind = 0;
                    /**宠物种类图片*/
                    _this.kind = ["common/ui/pet/chongwu_yesheng.png", "common/ui/pet/chongwu_bb.png",
                        "common/ui/pet/chongwu_bianyi.png", "common/ui/pet/chongwu_shenshou.png",
                        "common/ui/pet/baobaolingshou.png", "common/ui/pet/bianyilingshou.png"];
                    /**宠物技能id*/
                    _this.petskillid = [];
                    _this._viewUI = new ui.common.PetTuJianUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this.ani = new Laya.Animation();
                    _this._viewUI.qudao1_btn.on(LEvent.MOUSE_DOWN, _this, _this.getqudao, [1]);
                    _this._viewUI.qudao2_btn.on(LEvent.MOUSE_DOWN, _this, _this.getqudao, [2]);
                    _this._viewUI.qudao3_btn.on(LEvent.MOUSE_DOWN, _this, _this.getqudao, [3]);
                    _this.model = new ModelsCreate();
                    _this.scene2DPanel = new TestRole2dPanel();
                    _this._viewUI.petbk_img.addChild(_this.scene2DPanel);
                    return _this;
                }
                PetTuJianMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    var parentui = this._viewUI.parent;
                    this.scene2DPanel.ape.x = parentui.x * parentui.globalScaleX;
                    this.scene2DPanel.ape.y = parentui.y * parentui.globalScaleY;
                    this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    this.petshop = new game.modules.commonUI.PetShopMediator(this._app);
                    this._viewUI.chongwu_tab.selectHandler = new Laya.Handler(this, this.chognwulist);
                    this._viewUI.liebie_tab.selectHandler = new Laya.Handler(this, this.fenbie);
                    this._viewUI.chongwu_tab.selectedIndex = game.modules.pet.models.PetModel.getInstance().tujiannum;
                    this.chognwulist(this._viewUI.chongwu_tab.selectedIndex);
                    this.init();
                };
                PetTuJianMediator.prototype.hide = function () {
                    game.modules.pet.models.PetModel.getInstance().tujiannum = 0;
                    _super.prototype.hide.call(this);
                };
                PetTuJianMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**模型创建*/
                PetTuJianMediator.prototype.modelcreate = function (modelid) {
                    if (this.model.role3d) { //是否已有模型
                        this.scene2DPanel.removeSceneChar(this.model.role3d);
                    }
                    var parentui = this._viewUI.parent;
                    this.model.role3d = new YxChar3d();
                    this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
                    this.model.role3d.set2dPos((this._viewUI.petbk_img.x + this._viewUI.petbk_img.width / 2) * parentui.globalScaleX * 1.17, (this._viewUI.petbk_img.y + this._viewUI.petbk_img.height) * parentui.globalScaleY * 1.17);
                    this.model.role3d.scale = 1;
                    this.model.role3d.rotationY = 135;
                    this.model.role3d.rotationX = 0;
                    this.scene2DPanel.addSceneChar(this.model.role3d);
                };
                /**宠物分类*/
                PetTuJianMediator.prototype.fenbie = function (index) {
                    switch (index) {
                        case 0:
                            if (this._viewUI.chongwu_tab.selectedIndex == 0) { //0为宝宝
                                this.petid = this.normalpet();
                            }
                            else if (this._viewUI.chongwu_tab.selectedIndex == 1) { //灵宠
                                this.petid = this.spiritanimal();
                            }
                            else { //神兽
                                this.petid = this.shenshou();
                                this.upkind = 0;
                            }
                            break;
                        case 1:
                            if (this._viewUI.chongwu_tab.selectedIndex == 0) { //宝宝
                                this.petid = this.petid = this.normalpet();
                            }
                            else if (this._viewUI.chongwu_tab.selectedIndex == 1) { //灵宠
                                this.petid = this.spiritanimal();
                            }
                            else { //神兽
                                this.petid = this.shenshou();
                                this.upkind = 1;
                            }
                            break;
                        case 2:
                            if (this._viewUI.chongwu_tab.selectedIndex == 0) { //宝宝
                                this.petid = this.normalpet();
                            }
                            else { //神兽
                                this.petid = this.shenshou();
                                this.upkind = 2;
                            }
                            break;
                        case 3:
                            this.petid = this.shenshou();
                            this.upkind = 3;
                            break; //只有神兽
                        default:
                            break;
                    }
                    this.showinfo();
                };
                /**宠物列表*/
                PetTuJianMediator.prototype.chognwulist = function (index) {
                    var petcount = 0;
                    var petid = 0;
                    var chattext;
                    switch (index) { //0为普通宠物 1为灵兽 2为神兽
                        case 0:
                            petcount = PetModel.petnum.normal; //该类型的宠物数量
                            petid = PetModel.petid.normal; //切换界面显示的第一只宠物
                            chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11797];
                            this._viewUI.liebie_tab.labels = chattext.msg;
                            this._viewUI.liebie_tab.scaleX = 0.99;
                            this._viewUI.liebie_tab.scaleY = 0.9;
                            this._viewUI.liebie_tab.space = 10;
                            var petCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[petid];
                            this._viewUI.qudao1_btn.label = petCPetAttrBaseVo.bornmapdes;
                            chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11800];
                            this._viewUI.qudao2_btn.label = chattext.msg;
                            chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11801];
                            this._viewUI.qudao3_btn.label = chattext.msg;
                            this.isclick(2, 1, 2);
                            this.petid = this.normalpet();
                            break;
                        case 1:
                            petcount = PetModel.petnum.lingshou; //该类型的宠物数量
                            petid = PetModel.petid.lingshou; //切换界面显示的第一只宠物
                            chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11798];
                            this._viewUI.liebie_tab.labels = chattext.msg;
                            this._viewUI.liebie_tab.scaleX = 0.99;
                            this._viewUI.liebie_tab.scaleY = 0.9;
                            this._viewUI.liebie_tab.space = 10;
                            chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11802];
                            this._viewUI.qudao1_btn.label = chattext.msg;
                            chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11800];
                            this._viewUI.qudao2_btn.label = chattext.msg;
                            chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11801];
                            this._viewUI.qudao3_btn.label = chattext.msg;
                            this.isclick(1, 1, 2);
                            this.petid = this.spiritanimal();
                            break;
                        case 2:
                            petcount = PetModel.petnum.shenshou; //该类型的宠物数量
                            petid = PetModel.petid.shenshou; //切换界面显示的第一只宠物
                            chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11799];
                            this._viewUI.liebie_tab.labels = chattext.msg;
                            this._viewUI.liebie_tab.scaleX = 0.76;
                            this._viewUI.liebie_tab.scaleY = 0.75;
                            this._viewUI.liebie_tab.space = 2;
                            chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11803];
                            this._viewUI.qudao1_btn.label = chattext.msg;
                            chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11800];
                            this._viewUI.qudao2_btn.label = chattext.msg;
                            chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11801];
                            this._viewUI.qudao3_btn.label = chattext.msg;
                            this.isclick(1, 1, 2);
                            this.petid = this.shenshou();
                            break;
                        default:
                            break;
                    }
                    var data = [];
                    for (var index = 0; index < petcount; index++) {
                        var petCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[this.petid + index];
                        var icondata = LoginModel.getInstance().cnpcShapeInfo[petCPetAttrBaseVo.modelid];
                        if (petCPetAttrBaseVo.unusualid == 1) { //灵兽
                            data.push({ kuang_img: "common/ui/tongyong/zikuang.png", peticon_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png" });
                        }
                        else if (petCPetAttrBaseVo.unusualid == 2) { //神兽
                            data.push({ kuang_img: "common/ui/tongyong/jinkuang.png", peticon_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png" });
                        }
                        else {
                            data.push({ kuang_img: "common/ui/tongyong/lankuang.png", peticon_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png" });
                        }
                    }
                    this._viewUI.petlist_list.array = data;
                    this._viewUI.petlist_list.vScrollBarSkin = "";
                    this._viewUI.petlist_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.petlist_list.scrollBar.elasticDistance = 100;
                    this._viewUI.petlist_list.renderHandler = new Laya.Handler(this, this.initselect);
                    this._viewUI.petlist_list.selectedIndex = 0;
                    this._viewUI.liebie_tab.selectedIndex = 0;
                    this.showinfo();
                };
                /**1为该渠道不可用 2为可用渠道*/
                PetTuJianMediator.prototype.isclick = function (isclick1, isclick2, isclick3) {
                    if (isclick1 == 1) { //1为不可用
                        this._viewUI.qudao1_btn.gray = true;
                        this._viewUI.qudao1_btn.mouseEnabled = false;
                    }
                    else {
                        this._viewUI.qudao1_btn.gray = false;
                        this._viewUI.qudao1_btn.mouseEnabled = true;
                    }
                    if (isclick2 == 1) { //1为不可用
                        this._viewUI.qudao2_btn.gray = true;
                        this._viewUI.qudao2_btn.mouseEnabled = false;
                    }
                    else {
                        this._viewUI.qudao2_btn.gray = false;
                        this._viewUI.qudao2_btn.mouseEnabled = true;
                    }
                    if (isclick3 == 1) { //1为不可用
                        this._viewUI.qudao3_btn.gray = true;
                        this._viewUI.qudao3_btn.mouseEnabled = false;
                    }
                    else {
                        this._viewUI.qudao3_btn.gray = false;
                        this._viewUI.qudao3_btn.mouseEnabled = true;
                    }
                };
                /**初始化数据*/
                PetTuJianMediator.prototype.init = function () {
                    //根据当前索引去显示
                    //先判断宠物种类	
                    switch (this._viewUI.chongwu_tab.selectedIndex) { //默认刚打开是为0 0为普通宠物
                        case 0:
                            this.petid = this.normalpet();
                            break;
                        default:
                            break;
                    }
                    this.showinfo(); //显示信息
                };
                /**选择宠物*/
                PetTuJianMediator.prototype.initselect = function (cell, index) {
                    var selectimg = cell.getChildByName("peticon_img");
                    selectimg.on(LEvent.MOUSE_DOWN, this, this.selectpet, [cell, index]);
                    if (index == this._viewUI.petlist_list.selectedIndex) { //是否为当前选择宠物
                        if (this.ani) {
                            this.ani.clear();
                        }
                        this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onload));
                        this.ani.scaleX = 0.96;
                        this.ani.scaleY = 0.96;
                        var imgs = cell.getChildByName("kuang_img");
                        imgs.addChild(this.ani);
                    }
                };
                /**选择宠物*/
                PetTuJianMediator.prototype.selectpet = function (cell, index) {
                    if (index > this._viewUI.petlist_list.length) { //超过列表数量return
                        return;
                    }
                    this._viewUI.petlist_list.selectedIndex = index;
                    this.showinfo();
                };
                /**普通宠物宝宝*/
                PetTuJianMediator.prototype.normalpet = function () {
                    var idmin;
                    switch (this._viewUI.liebie_tab.selectedIndex) { //0为宝宝 1为变异 2为野生
                        case 0:
                            idmin = PetModel.normal.baobao; //切换界面第一个显示的宠物id
                            this.petimg = PetModel.pettype.baobao; //宠物类型
                            break;
                        case 1:
                            idmin = PetModel.normal.bianyi; //切换界面第一个显示的宠物id
                            this.petimg = PetModel.pettype.puchongbianyi; //宠物类型
                            break;
                        case 2:
                            idmin = PetModel.normal.yesheng; //切换界面第一个显示的宠物id
                            this.petimg = PetModel.pettype.yesheng; //宠物类型
                            break;
                        default:
                            idmin = PetModel.normal.baobao; //切换界面第一个显示的宠物id
                            this.petimg = PetModel.pettype.baobao; //宠物类型
                            break;
                    }
                    return idmin;
                };
                /**灵兽*/
                PetTuJianMediator.prototype.spiritanimal = function () {
                    var idmin;
                    switch (this._viewUI.liebie_tab.selectedIndex) { //0为宝宝 1为变异
                        case 0:
                            idmin = PetModel.lingshou.baobao; //切换界面第一个显示的宠物id
                            this.petimg = PetModel.pettype.lingshou; //宠物类型
                            break;
                        case 1:
                            idmin = PetModel.lingshou.bianyi; //切换界面第一个显示的宠物id
                            this.petimg = PetModel.pettype.bianyi; //宠物类型
                            break;
                        default:
                            idmin = PetModel.lingshou.baobao; //切换界面第一个显示的宠物id
                            this.petimg = PetModel.pettype.lingshou; //宠物类型
                            break;
                    }
                    return idmin;
                };
                /**神兽宠物*/
                PetTuJianMediator.prototype.shenshou = function () {
                    this.petimg = PetModel.pettype.shenshou; //宠物类型
                    return PetModel.petid.shenshou; //切换界面第一个显示的宠物id
                };
                /**显示数据*/
                PetTuJianMediator.prototype.showinfo = function () {
                    var num = this._viewUI.petlist_list.selectedIndex;
                    //三种途径
                    var catchs = 1;
                    var shopbuy = 1;
                    var paimai = 1;
                    var petCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[this.petid + num];
                    console.log("宠物ID：" + this.petid + num);
                    var shape = LoginModel.getInstance().cnpcShapeInfo[petCPetAttrBaseVo.modelid];
                    this.modelcreate(parseInt(shape.shape));
                    this._viewUI.petname_lab.changeText(petCPetAttrBaseVo.name);
                    this._viewUI.petname_lab.color = "#" + petCPetAttrBaseVo.colour;
                    this._viewUI.petbb_img.skin = this.kind[this.petimg];
                    var petskill = petCPetAttrBaseVo.skillid;
                    this.petskillid = petskill;
                    var petlist = [];
                    for (var index = 0; index < 5; index++) { //最多显示5个技能
                        if (index < petskill.length) { //是否有效技能栏
                            var skilldata = PetModel.getInstance().petSkillConfigData[petskill[index]];
                            var petdata = PetModel.getInstance().petCPetAttrData[this.petid + num];
                            var skillgrate = petdata.skillrate[index];
                            if (skilldata.skilltype == 1) { //技能类型 1被动 2主动
                                if (skillgrate == 1001) { //1001为必带技能
                                    petlist.push({ skillicon_img: "common/ui/pet/beiji" + skilldata.color + ".png", skillpanel_img: "common/icon/skill/" + skilldata.icon + ".png", bidai_img: "common/ui/pet/chongwu_bidai.png" });
                                }
                                else
                                    petlist.push({ skillicon_img: "common/ui/pet/beiji" + skilldata.color + ".png", skillpanel_img: "common/icon/skill/" + skilldata.icon + ".png", bidai_img: "" });
                            }
                            else {
                                if (skillgrate == 1001) { //1001为必带技能
                                    petlist.push({ skillicon_img: "common/ui/pet/zhuji" + skilldata.color + ".png", skillpanel_img: "common/icon/skill/" + skilldata.icon + ".png", bidai_img: "common/ui/pet/chongwu_bidai.png" });
                                }
                                else
                                    petlist.push({ skillicon_img: "common/ui/pet/zhuji" + skilldata.color + ".png", skillpanel_img: "common/icon/skill/" + skilldata.icon + ".png", bidai_img: "" });
                            }
                        }
                        else {
                            petlist.push({ skillicon_img: "common/ui/tongyong/kuang94.png", skillpanel_img: "", bidai_img: "" });
                        }
                    }
                    this._viewUI.petskill_list.array = petlist;
                    this._viewUI.petskill_list.renderHandler = new Laya.Handler(this, this.initpetskill);
                    if (this.petimg == PetModel.pettype.shenshou) { //判断宠物列别
                        var petCShenShouIncBaseVo = PetModel.getInstance().petCPetShenShouIncdata[this._viewUI.petlist_list.selectedIndex + this.upkind];
                        if (this.upkind == 0) { //0为神兽
                            this._viewUI.gongji_lab.changeText(petCPetAttrBaseVo.attackaptmax + "");
                            this._viewUI.fangyu_lab.changeText(petCPetAttrBaseVo.defendaptmax + "");
                            this._viewUI.fashu_lab.changeText(petCPetAttrBaseVo.magicaptmax + "");
                            this._viewUI.tili_lab.changeText(petCPetAttrBaseVo.phyforceaptmax + "");
                            this._viewUI.speed_lab.changeText(petCPetAttrBaseVo.speedaptmax + "");
                            this._viewUI.growrate_lab.changeText((petCPetAttrBaseVo.growrate[6] / 1000).toFixed(3));
                        }
                        else {
                            this._viewUI.gongji_lab.changeText(petCPetAttrBaseVo.attackaptmax + petCShenShouIncBaseVo.atkinc * this.upkind + "");
                            this._viewUI.fangyu_lab.changeText(petCPetAttrBaseVo.defendaptmax + petCShenShouIncBaseVo.definc * this.upkind + "");
                            this._viewUI.fashu_lab.changeText(petCPetAttrBaseVo.magicaptmax + petCShenShouIncBaseVo.mpinc * this.upkind + "");
                            this._viewUI.tili_lab.changeText(petCPetAttrBaseVo.phyforceaptmax + petCShenShouIncBaseVo.hpinc * this.upkind + "");
                            this._viewUI.speed_lab.changeText(petCPetAttrBaseVo.speedaptmax + petCShenShouIncBaseVo.spdinc * this.upkind + "");
                            this._viewUI.growrate_lab.changeText(((petCPetAttrBaseVo.growrate[6] + petCShenShouIncBaseVo.attinc * this.upkind) / 1000).toFixed(3) + "");
                        }
                    }
                    else {
                        this._viewUI.gongji_lab.changeText(petCPetAttrBaseVo.attackaptmin + "-" + petCPetAttrBaseVo.attackaptmax);
                        this._viewUI.fangyu_lab.changeText(petCPetAttrBaseVo.defendaptmin + "-" + petCPetAttrBaseVo.defendaptmax);
                        this._viewUI.fashu_lab.changeText(petCPetAttrBaseVo.magicaptmin + "-" + petCPetAttrBaseVo.magicaptmax);
                        this._viewUI.tili_lab.changeText(petCPetAttrBaseVo.phyforceaptmin + "-" + petCPetAttrBaseVo.phyforceaptmax);
                        this._viewUI.speed_lab.changeText(petCPetAttrBaseVo.speedaptmin + "-" + petCPetAttrBaseVo.speedaptmax);
                        this._viewUI.growrate_lab.changeText((petCPetAttrBaseVo.growrate[0] / 1000).toFixed(3) + "-" + (petCPetAttrBaseVo.growrate[6] / 1000).toFixed(3));
                    }
                    this._viewUI.canzhandj_lab.changeText(petCPetAttrBaseVo.uselevel + "");
                    this._viewUI.qudao1_btn.label = petCPetAttrBaseVo.bornmapdes;
                    //判断是否可以捕捉或者购买 2为可点击 1 为不可点击
                    if (petCPetAttrBaseVo.bornmapid) { //是否可以捕捉 有地图ID就可以捕捉
                        catchs = 2;
                    }
                    else {
                        catchs = 1;
                    }
                    if (petCPetAttrBaseVo.nshoptype == 1) { //NPC商店
                        shopbuy = 2;
                        paimai = 1;
                    }
                    else if (petCPetAttrBaseVo.nshoptype == 3) { //拍卖行
                        shopbuy = 1;
                        if (catchs == 2) { //是否可捕捉
                            if (petCPetAttrBaseVo.kind == 1) { //宠物类型
                                paimai = 1;
                            }
                            else {
                                if (petCPetAttrBaseVo.uselevel >= 35) { //是否超过35
                                    paimai = 2;
                                }
                                else {
                                    paimai = 1;
                                }
                            }
                        }
                        else {
                            paimai = 2;
                        }
                    }
                    this.isclick(catchs, shopbuy, paimai);
                };
                /**获取的渠道*/
                PetTuJianMediator.prototype.getqudao = function (index) {
                    var petCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[this.petid + this._viewUI.petlist_list.selectedIndex];
                    switch (index) { // 第几个渠道
                        case 1: //跳转地图					
                            this.mapChange(petCPetAttrBaseVo.bornmapid);
                            break;
                        case 2: //NPC商店
                            if (petCPetAttrBaseVo.uselevel > game.modules.mainhud.models.HudModel.getInstance().levelNum) {
                                var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[160250];
                                this.tips.onShow(chattext.msg);
                                return;
                            }
                            else {
                                game.modules.createrole.models.LoginModel.getInstance().CommonPage = modules.ModuleNames.PET;
                                game.modules.pet.models.PetModel.getInstance().tabnum = 2;
                                this.petshop.init(petCPetAttrBaseVo.id);
                            }
                            break;
                        case 3: //拍卖行
                            game.modules.createrole.models.LoginModel.getInstance().CommonPage = modules.ModuleNames.PET;
                            game.modules.pet.models.PetModel.getInstance().tabnum = 3;
                            modules.sale.models.SaleModel.getInstance().saleTargetId = petCPetAttrBaseVo.id;
                            game.modules.sale.models.SaleProxy._instance.event(game.modules.sale.models.SearchItemResult);
                            modules.ModuleManager.show(modules.ModuleNames.SALE, this._app);
                            break;
                        default:
                            break;
                    }
                    modules.ModuleManager.hide(modules.ModuleNames.PET);
                };
                /**跳转地图*/
                PetTuJianMediator.prototype.mapChange = function (mapid) {
                    //如果有队伍切不是队长切未暂离则不可跳图
                    var role = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
                    var team = role.rolebasicOctets.datas.get(2);
                    if (team) {
                        if (team.teamindexstate > 0) { //在队伍中 暂离的话值为负数
                            if ((team.teamindexstate >> 4) != 1) { //141216
                                var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[141216];
                                this.tips.onShow(chattext.msg);
                                return;
                            }
                        }
                    }
                    this.getpost(mapid);
                    var mainUnit = this._app.sceneObjectMgr.mainUnit;
                    RequesterProtocols._instance.c2s_req_goto(mapid, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
                };
                /**获取随机位置*/
                PetTuJianMediator.prototype.getpost = function (mapid) {
                    var MapData = MapModel.getInstance().WorldMapConfigData[mapid];
                    var mainUnit = this._app.sceneObjectMgr.mainUnit;
                    var x, y;
                    x = (Math.random() * (MapData.bottomx - MapData.topx) + MapData.topx);
                    y = (Math.random() * (MapData.bottomy - MapData.topy) + MapData.topy);
                    mainUnit.SetPosX(x);
                    mainUnit.SetPosY(y);
                    mainUnit.SetPos(x, y);
                };
                /**初始化技能响应事件*/
                PetTuJianMediator.prototype.initpetskill = function (cell, index) {
                    var img = cell.getChildByName("skillpanel_img");
                    img.on(LEvent.MOUSE_DOWN, this, this.skillstips, [index]);
                };
                /**技能tips*/
                PetTuJianMediator.prototype.skillstips = function (index) {
                    if (index < this.petskillid.length) { //是否有效技能栏
                        var parame = new Dictionary();
                        parame.set("itemId", this.petskillid[index]);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, parame);
                    }
                };
                /**特效*/
                PetTuJianMediator.prototype.onload = function () {
                    Laya.Animation.createFrames(this.anUrls("xuanzhong", 9), "xuanzhong");
                    this.ani.play(0, true, "xuanzhong");
                    this.ani.interval = 112;
                };
                /**特效路径*/
                PetTuJianMediator.prototype.anUrls = function (aniName, length) {
                    var urls = [];
                    for (var index = 1; index <= length; index++) {
                        urls.push("common/ui/tuji/" + aniName + index + ".png");
                    }
                    return urls;
                };
                return PetTuJianMediator;
            }(game.modules.UiMediator));
            pet.PetTuJianMediator = PetTuJianMediator;
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetTuJianMediator.js.map