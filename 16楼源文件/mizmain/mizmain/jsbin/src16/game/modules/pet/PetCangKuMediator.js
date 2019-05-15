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
        var pet;
        (function (pet) {
            /** 宠物仓库 */
            var PetCangKuMediator = /** @class */ (function (_super) {
                __extends(PetCangKuMediator, _super);
                function PetCangKuMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 仓库列表数据 */
                    _this.cangKuListData = [];
                    /** 角色当前持有的宠物列表数据 */
                    _this.havePetListData = [];
                    /** 存放渲染宠物仓库列表所需的数据 */
                    _this.renderPetCKNeedData = [];
                    _this._viewUI = new ui.common.PetCangKuUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.petConfig = pet.models.PetModel.getInstance().petCPetAttrData;
                    _this.petCPetDepotPriceData = pet.models.PetModel.getInstance().petCPetDepotPriceData;
                    return _this;
                }
                /** UI的初始化 */
                PetCangKuMediator.prototype.initUI = function () {
                    this.lastCKSelectIndex = -1;
                    this.lastHavePetLstSelectIndex = -1;
                    //仓库列表初始化
                    this.cangkuListInit();
                    //持有宠物列表初始化
                    this.havePetLstInit();
                };
                /** 持有宠物列表初始化 */
                PetCangKuMediator.prototype.havePetLstInit = function () {
                    this.listInit(this._viewUI.xpet_list, this.havePetListData);
                    this._viewUI.xpet_list.renderHandler = new Laya.Handler(this, this.onRenderXPetLst);
                };
                /** 渲染持有宠物列表 */
                PetCangKuMediator.prototype.onRenderXPetLst = function (cell, index) {
                    if (index < 0 || index >= this.havePetListData.length)
                        return;
                    var xpet_btn = cell.getChildByName("xpet_btn");
                    xpet_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    xpet_btn.on(LEvent.CLICK, this, this.onSelectXPetLst, [index]);
                    xpet_btn.on(LEvent.DOUBLE_CLICK, this, this.depotMovePet, [this._viewUI.jicun_btn]); //双击监听
                    var xpetkuang_img = cell.getChildByName("xpetkuang_img");
                    xpetkuang_img.skin = this.havePetListData[index].xpetkuang_img;
                    var xpeticon_btn = cell.getChildByName("xpeticon_btn");
                    xpeticon_btn.skin = this.havePetListData[index].xpeticon_btn_skin;
                    xpeticon_btn.on(LEvent.CLICK, this, this.showPetDetail, [this.havePetsInfoData[index]]);
                    var xpetlv_lab = cell.getChildByName("xpetlv_lab");
                    xpetlv_lab.text = this.havePetListData[index].xpetlv_lab;
                    var xpetname_lab = cell.getChildByName("xpetname_lab");
                    xpetname_lab.text = this.havePetListData[index].xpetname_lab;
                    var xpinfen_lab = cell.getChildByName("xpinfen_lab");
                    xpinfen_lab.text = this.havePetListData[index].xpinfen_lab;
                    var xskillcount_lab = cell.getChildByName("xskillcount_lab");
                    xskillcount_lab.text = this.havePetListData[index].xskillcount_lab;
                    var xpetType_img = cell.getChildByName("xpetType_img");
                    xpetType_img.skin = this.havePetListData[index].xpetType_img;
                    var isZhenPin_img = cell.getChildByName("isZhenPin_img");
                    if (this.havePetListData[index].isZhenPin) {
                        isZhenPin_img.visible = true;
                    }
                    else {
                        isZhenPin_img.visible = false;
                    }
                    var ischuzhan_img = cell.getChildByName("ischuzhan_img");
                    if (this.havePetListData[index].isChuZhan) {
                        ischuzhan_img.visible = true;
                    }
                    else {
                        ischuzhan_img.visible = false;
                    }
                };
                /** 点击选择持有宠物列表 */
                PetCangKuMediator.prototype.onSelectXPetLst = function (index) {
                    if (this.lastHavePetLstSelectIndex != -1) {
                        this.lastPitchBtn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                    var xpet_btn = this._viewUI.xpet_list.getCell(index).getChildByName("xpet_btn");
                    xpet_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    this.lastPitchBtn = xpet_btn;
                    this.lastHavePetLstSelectIndex = index;
                };
                /** 仓库列表初始化 */
                PetCangKuMediator.prototype.cangkuListInit = function (arrData) {
                    this.currAtDepotNum = Number(this._viewUI.currDepotNum_lab.text);
                    if (!arrData && this.currAtDepotNum) {
                        arrData = [];
                        arrData = this.getCurrDepotData(arrData, this.currAtDepotNum); //此处是为了调整还能接着显示当前所处于的仓库数据
                    }
                    this.renderPetCKNeedData = arrData;
                    this.listInit(this._viewUI.ck_list, arrData);
                    this._viewUI.ck_list.renderHandler = new Laya.Handler(this, this.onRenderCKLst);
                };
                /** 点击选择仓库列表 */
                PetCangKuMediator.prototype.onSelectCKLst = function (index) {
                    if (this.lastCKSelectIndex != -1) {
                        var _pet_btn = this._viewUI.ck_list.getCell(this.lastCKSelectIndex).getChildByName("pet_btn");
                        _pet_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                    var pet_btn = this._viewUI.ck_list.getCell(index).getChildByName("pet_btn");
                    pet_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    this.lastCKSelectIndex = index;
                };
                /** 渲染仓库列表 */
                PetCangKuMediator.prototype.onRenderCKLst = function (cell, index) {
                    var pet_btn = cell.getChildByName("pet_btn");
                    pet_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    pet_btn.on(LEvent.CLICK, this, this.onSelectCKLst, [index]);
                    pet_btn.on(LEvent.DOUBLE_CLICK, this, this.depotMovePet, [this._viewUI.quchu_btn]); //双击监听
                    var suo_img = cell.getChildByName("suo_img");
                    var petDiTu_img = cell.getChildByName("petDiTu_img");
                    var petkuang_img = cell.getChildByName("petkuang_img");
                    var petType_img = cell.getChildByName("petType_img");
                    var isZhenPin_img = cell.getChildByName("isZhenPin_img");
                    var petname_lab = cell.getChildByName("petname_lab");
                    var lab1_lab = cell.getChildByName("lab1_lab");
                    var pingfen_lab = cell.getChildByName("pingfen_lab");
                    var lab2_lab = cell.getChildByName("lab2_lab");
                    var skillcount_lab = cell.getChildByName("skillcount_lab");
                    var petlv_lab = cell.getChildByName("petlv_lab");
                    var peticon_btn = cell.getChildByName("peticon_btn");
                    if (this.renderPetCKNeedData[index] == null) {
                        suo_img.visible = true;
                        suo_img.on(LEvent.CLICK, this, this.onShowConfirm);
                        petDiTu_img.visible = false;
                        petkuang_img.visible = false;
                        petType_img.visible = false;
                        isZhenPin_img.visible = false;
                        petname_lab.visible = false;
                        lab1_lab.visible = false;
                        pingfen_lab.visible = false;
                        lab2_lab.visible = false;
                        skillcount_lab.visible = false;
                        petlv_lab.visible = false;
                        peticon_btn.visible = false;
                    }
                    else if (this.renderPetCKNeedData[index] == 0) {
                        suo_img.visible = false;
                        petDiTu_img.visible = true;
                        petkuang_img.visible = false;
                        petType_img.visible = false;
                        isZhenPin_img.visible = false;
                        petname_lab.visible = false;
                        lab1_lab.visible = false;
                        pingfen_lab.visible = false;
                        lab2_lab.visible = false;
                        skillcount_lab.visible = false;
                        petlv_lab.visible = false;
                        peticon_btn.visible = false;
                    }
                    else {
                        suo_img.visible = false;
                        petDiTu_img.visible = false;
                        petkuang_img.visible = true;
                        petType_img.visible = true;
                        isZhenPin_img.visible = true;
                        petname_lab.visible = true;
                        lab1_lab.visible = true;
                        pingfen_lab.visible = true;
                        lab2_lab.visible = true;
                        skillcount_lab.visible = true;
                        petlv_lab.visible = true;
                        peticon_btn.visible = true;
                        petkuang_img.skin = this.cangKuListData[index].petkuang_img;
                        petType_img.skin = this.cangKuListData[index].petType_img;
                        if (this.cangKuListData[index].isZhenPin) {
                            isZhenPin_img.visible = true;
                        }
                        else {
                            isZhenPin_img.visible = false;
                        }
                        petname_lab.text = this.renderPetCKNeedData[index].petname_lab;
                        pingfen_lab.text = this.renderPetCKNeedData[index].pingfen_lab;
                        skillcount_lab.text = this.renderPetCKNeedData[index].skillcount_lab;
                        petlv_lab.text = this.renderPetCKNeedData[index].petlv_lab;
                        peticon_btn.skin = this.renderPetCKNeedData[index].peticon_btn_skin;
                        peticon_btn.on(LEvent.CLICK, this, this.showPetDetail, [this.depotPetsInfoData[index + (this.currAtDepotNum - 1) * 4]]);
                    }
                };
                /** 显示确认框是否开启新的宠物栏位 */
                PetCangKuMediator.prototype.onShowConfirm = function () {
                    //扩充新的宠物仓库栏位所需银币
                    var needYinBi = this.petCPetDepotPriceData[this.cangKuListData.length - 1]["nextneedmoney"];
                    //存确认框提示内容的字典
                    var _tipsDic = new Laya.Dictionary();
                    _tipsDic.set("contentId", 160027);
                    _tipsDic.set("parame", [needYinBi]);
                    modules.tips.models.TipsProxy.getInstance().once(modules.tips.models.TIPS_ON_OK, this, this.addpetlan);
                    var _tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, _tipsDic);
                };
                /** 显示宠物详情
                 * @param petinfo 被查看宠物的详细信息
                 */
                PetCangKuMediator.prototype.showPetDetail = function (petinfo) {
                    var petDetail = new pet.PetXiangQingMediator(this._app);
                    petDetail.init(petinfo);
                };
                /** 列表初始化
                 * @param lst 所要初始化的列表
                 * @param lstArrData 所要初始化的列表里填充的数据
                 */
                PetCangKuMediator.prototype.listInit = function (lst, lstArrData) {
                    lst.repeatX = 1;
                    lst.repeatY = 3;
                    lst.vScrollBarSkin = "";
                    lst.scrollBar.elasticBackTime = 100;
                    lst.scrollBar.elasticDistance = 100;
                    lst.array = lstArrData;
                };
                /** 事件注册监听 */
                PetCangKuMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.quchu_btn.on(LEvent.MOUSE_DOWN, this, this.depotMovePet, [this._viewUI.quchu_btn]);
                    this._viewUI.jicun_btn.on(LEvent.MOUSE_DOWN, this, this.depotMovePet, [this._viewUI.jicun_btn]);
                    this._viewUI.depotSelect_btn.on(LEvent.MOUSE_DOWN, this, this.onDepotSelect);
                    this._viewUI.up_btn.on(LEvent.MOUSE_DOWN, this, this.clickBtnShowDepot, [this._viewUI.up_btn]);
                    this._viewUI.down_btn.on(LEvent.MOUSE_DOWN, this, this.clickBtnShowDepot, [this._viewUI.down_btn]);
                    pet.models.PetProxy.getInstance().on(pet.models.GET_PET_DEPOT_DATA, this, this.onPetDepotData);
                    pet.models.PetProxy.getInstance().on(pet.models.DEPOT_ADD_PET, this, this.onDepotAddPetData);
                    pet.models.PetProxy.getInstance().on(pet.models.DEPOT_REMOVE_PET, this, this.onDepotRemovePetData);
                    pet.models.PetProxy.getInstance().on(pet.models.ADD_EVENT, this, this.onRoleAddPetData);
                    pet.models.PetProxy.getInstance().on(pet.models.NewPetDepotMaxNum, this, this.onSRefreshPetColumnCapacity);
                };
                /** 玩家角色身上增加了宠物 */
                PetCangKuMediator.prototype.onRoleAddPetData = function () {
                    this.init();
                };
                /** 刷新宠物栏的最大容量
                 * @param capacity 宠物栏的最大容量
                 */
                PetCangKuMediator.prototype.onSRefreshPetColumnCapacity = function (capacity) {
                    this.onPetDepotData(this.depotPetsInfoData, capacity, true);
                    this.cangkuListInit(this.depotListData[Number(this._viewUI.currDepotNum_lab.text) - 1]);
                };
                /** 宠物仓库被取出了宠物
                 * @param petkey 被取出的宠物对应的key
                 * @describe 除了要处理仓库列表里的数据，还要处理持有宠物列表数据
                 */
                PetCangKuMediator.prototype.onDepotRemovePetData = function (petkey) {
                    for (var i = 0; i < this.depotPetsInfoData.length; i++) {
                        var _petInfoData = this.depotPetsInfoData[i];
                        if (_petInfoData.key == petkey) {
                            this.havePetsInfoData.push(_petInfoData);
                            this.depotPetsInfoData.splice(i, 1);
                            var msg = modules.chat.models.ChatModel.getInstance().chatMessageTips[160023]["msg"];
                            var petName = _petInfoData.name;
                            msg = msg.replace("$parameter1$", petName);
                            this.showDisTips(msg);
                            this.onPetDepotData(this.depotPetsInfoData, this.totalOpenDepotNum, true);
                            this.cangkuListInit();
                            return;
                        }
                    }
                };
                /** 宠物仓库放入了宠物
                 * @param petData 所增加宠物的信息数据
                 */
                PetCangKuMediator.prototype.onDepotAddPetData = function (petData) {
                    var msg = modules.chat.models.ChatModel.getInstance().chatMessageTips[160022]["msg"];
                    var petName = petData.name;
                    msg = msg.replace("$parameter1$", petName);
                    this.showDisTips(msg);
                    this.depotPetsInfoData.push(petData);
                    this.onPetDepotData(this.depotPetsInfoData, this.totalOpenDepotNum, true);
                    this.init();
                };
                /** 点击按钮一个个显示宠物仓库
                 * @param btn 点击是哪个按钮
                 * @describ up_btn 显示上一个仓库；down_btn 显示下一个仓库
                 */
                PetCangKuMediator.prototype.clickBtnShowDepot = function (btn) {
                    //获得当前仓库是第几个仓库
                    var tempNum = Number(this._viewUI.currDepotNum_lab.text);
                    //用作判断是否变化
                    var pageIsUpdata = false;
                    switch (btn) {
                        case this._viewUI.down_btn:
                            if (this._viewUI.currDepotNum_lab.text < this._viewUI.totalDepotNum_lab.text) {
                                tempNum++;
                                this._viewUI.currDepotNum_lab.text = tempNum.toString();
                                pageIsUpdata = true;
                            }
                            break;
                        case this._viewUI.up_btn:
                            if (tempNum > 1) {
                                tempNum--;
                                this._viewUI.currDepotNum_lab.text = tempNum.toString();
                                pageIsUpdata = true;
                            }
                            break;
                    }
                    if (pageIsUpdata) {
                        this.cangkuListInit(this.depotListData[tempNum - 1]); //tempNum指向的就是当前第几个仓库，需要在其值上-1来代表数组的索引
                    }
                };
                /** 移除事件 */
                PetCangKuMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.quchu_btn.off(LEvent.MOUSE_DOWN, this, this.depotMovePet);
                    this._viewUI.jicun_btn.off(LEvent.MOUSE_DOWN, this, this.depotMovePet);
                    this._viewUI.depotSelect_btn.off(LEvent.MOUSE_DOWN, this, this.onDepotSelect);
                    this._viewUI.up_btn.off(LEvent.MOUSE_DOWN, this, this.clickBtnShowDepot);
                    this._viewUI.down_btn.off(LEvent.MOUSE_DOWN, this, this.clickBtnShowDepot);
                    pet.models.PetProxy.getInstance().off(pet.models.GET_PET_DEPOT_DATA, this, this.onPetDepotData);
                    pet.models.PetProxy.getInstance().off(pet.models.DEPOT_ADD_PET, this, this.onDepotAddPetData);
                    pet.models.PetProxy.getInstance().off(pet.models.DEPOT_REMOVE_PET, this, this.onDepotRemovePetData);
                    pet.models.PetProxy.getInstance().off(pet.models.ADD_EVENT, this, this.onRoleAddPetData);
                    pet.models.PetProxy.getInstance().off(pet.models.NewPetDepotMaxNum, this, this.onSRefreshPetColumnCapacity);
                };
                /** 显示/隐藏宠物仓库选择的UI */
                PetCangKuMediator.prototype.onDepotSelect = function () {
                    if (this._viewUI.up_img.visible) {
                        this._viewUI.up_img.visible = false;
                        this._viewUI.down_img.visible = true;
                        this._viewUI.childDepotBg_img.visible = false;
                        this._viewUI.childDepot_lst.visible = false;
                    }
                    else {
                        this._viewUI.up_img.visible = true;
                        this._viewUI.down_img.visible = false;
                        this._viewUI.childDepotBg_img.visible = true;
                        this._viewUI.childDepot_lst.visible = true;
                    }
                };
                /** 更新宠物仓库数据
                 * @param pets 宠物仓库里存储的宠物数据
                 * @param colunmSize 仓库的开启宠物栏位个数
                 * @param isUpdata 用来判断是在宠物仓库界面打开时，更新了数据
                 */
                PetCangKuMediator.prototype.onPetDepotData = function (pets, colunmSize, isUpdata) {
                    this.totalOpenDepotNum = colunmSize;
                    this.cangKuListData = [];
                    this.depotPetsInfoData = [];
                    this.depotPetsInfoData = pets;
                    if (pets.length != 0) {
                        for (var i = 0; i < pets.length; i++) {
                            //宠物仓库里某一只宠物的基本数据
                            var depotPetData = pets[i];
                            //存放在宠物仓库里宠物的id
                            var depotPetId = depotPetData.id;
                            //存放在宠物仓库里宠物的品质边框图
                            var depotPetQualityFrameImg = pet.models.PetModel.getInstance().getPetQualityFrameImg(depotPetId);
                            //存放在宠物仓库里宠物的名字
                            var depotPetName = depotPetData.name;
                            //存放在宠物仓库里宠物的评分
                            var depotPetScore = depotPetData.petscore;
                            //存放在宠物仓库里宠物的技能数
                            var depotPetSkillsNum = depotPetData.skills.length;
                            //存放在宠物仓库里宠物的种类图
                            var depotPetKindImg = pet.models.PetModel.getInstance().getPetKindImg(depotPetData.kind);
                            //存放在宠物仓库里宠物的小头像图
                            var depotPetAvatarImg = pet.models.PetModel.getInstance().getPetAvatarImg(depotPetId);
                            //存放在宠物仓库里宠物是否珍品
                            var depotPetIsZhenPin = pet.models.PetModel.getInstance().isZhenPin(depotPetId);
                            //存放在宠物仓库里宠物的等级
                            var depotPetLevel = depotPetData.level;
                            //存放在宠物仓库里宠物的key
                            var petkey = depotPetData.key;
                            this.cangKuListData.push({
                                petkuang_img: depotPetQualityFrameImg,
                                petname_lab: depotPetName,
                                pingfen_lab: depotPetScore.toString(),
                                skillcount_lab: depotPetSkillsNum.toString(),
                                petType_img: depotPetKindImg,
                                peticon_btn_skin: depotPetAvatarImg,
                                isZhenPin: depotPetIsZhenPin,
                                petlv_lab: depotPetLevel.toString(),
                                petkey: petkey
                            });
                        }
                        for (var i = 0; i < colunmSize; i++) {
                            if (this.cangKuListData[i] == undefined && this.cangKuListData[i] == null) {
                                this.cangKuListData[i] = 0; //放入0，暂时代表开启了但没存放宠物
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < colunmSize; i++) {
                            this.cangKuListData.push(0); //放入0，暂时代表开启了但没存放宠物
                        }
                    }
                    if (colunmSize % 4 != 0) {
                        this.cangKuListData.push(null); //放入null，暂时代表未开启栏位
                    }
                    this.countDepotNum(colunmSize);
                    if (isUpdata && isUpdata == true) {
                        return;
                    }
                    this.show();
                };
                /** 计算开启了几个宠物仓库,并初始化仓库选择按钮列表
                 * @param colunmSize 仓库的开启宠物栏位个数
                 * @describe 一共有4个宠物仓库，一个宠物仓库能有4个宠物栏位
                 */
                PetCangKuMediator.prototype.countDepotNum = function (colunmSize) {
                    //向上取整获得开了几个仓库
                    var depotNum = Math.ceil(colunmSize / 4);
                    this.depot1ListData = [];
                    this.depot2ListData = [];
                    this.depot3ListData = [];
                    this.depot4ListData = [];
                    this.depotListData = [];
                    if (this.cangKuListData.length % 4 == 0 && (this.cangKuListData.length + 1) <= 16 && this.cangKuListData[this.cangKuListData.length - 1] != null) { //如果宠物栏位够凑齐数个宠物仓库，并且没有开启最大限制（16个，这个数值写死的，目前只有服务器那边配表，客户端并没有）的宠物栏位，就要
                        depotNum++; //多开放一个仓库
                        this.cangKuListData.push(null); //多放入null，暂时代表未开启栏位
                    }
                    this._viewUI.totalDepotNum_lab.text = depotNum.toString();
                    switch (depotNum) {
                        case 1: //开启了一个仓库					
                            this.depot1ListData = this.cangKuListData;
                            break;
                        case 2: //开启了两个仓库
                            this.depot1ListData = this.split_array(this.cangKuListData, 0, 3);
                            this.depot2ListData = this.split_array(this.cangKuListData, 4, this.cangKuListData.length - 1);
                            break;
                        case 3: //开启了三个仓库
                            this.depot1ListData = this.split_array(this.cangKuListData, 0, 3);
                            this.depot2ListData = this.split_array(this.cangKuListData, 4, 7);
                            this.depot3ListData = this.split_array(this.cangKuListData, 8, this.cangKuListData.length - 1);
                            break;
                        case 4: //开启了四个仓库
                            this.depot1ListData = this.split_array(this.cangKuListData, 0, 3);
                            this.depot2ListData = this.split_array(this.cangKuListData, 4, 7);
                            this.depot3ListData = this.split_array(this.cangKuListData, 8, 11);
                            this.depot4ListData = this.split_array(this.cangKuListData, 12, this.cangKuListData.length - 1);
                            break;
                    }
                    this.currOpenDepotNum = depotNum;
                    this.depotListData = [this.depot1ListData, this.depot2ListData, this.depot3ListData, this.depot4ListData];
                    var depotNumArr = [];
                    for (var i = 0; i < depotNum; i++) {
                        depotNumArr.push(i);
                    }
                    this._viewUI.childDepot_lst.repeatX = 2;
                    this._viewUI.childDepot_lst.repeatY = Math.ceil(depotNumArr.length / 2);
                    this._viewUI.childDepot_lst.height = Math.ceil(depotNumArr.length / 2) / 2 * 104;
                    this._viewUI.childDepotBg_img.height = Math.ceil(depotNumArr.length / 2) / 2 * 106;
                    this._viewUI.childDepot_lst.vScrollBarSkin = "";
                    this._viewUI.childDepot_lst.array = depotNumArr;
                    this._viewUI.childDepot_lst.renderHandler = new Handler(this, this.onRenderChildDepotBtnLst);
                };
                /** 拆分数组
                 * @param arr 被拆分的数组
                 * @param start 被拆分数组中所需数据对应的起始下标
                 * @param end 被拆分数组中所需数据对应的末尾下标
                 */
                PetCangKuMediator.prototype.split_array = function (arr, start, end) {
                    var a_len = arr.length;
                    var result = [];
                    for (var i = start; i < end + 1; i++) {
                        result.push(arr[i]);
                    }
                    return result;
                };
                /** 渲染仓库按钮列表 */
                PetCangKuMediator.prototype.onRenderChildDepotBtnLst = function (cell, index) {
                    var childDepot_btn = cell.getChildByName("childDepot_btn");
                    childDepot_btn.label = "仓库" + (index + 1);
                    childDepot_btn.on(LEvent.CLICK, this, this.showChildDepot, [index]);
                };
                /** 显示各个仓库（一共4个仓库）
                 * @param index 第几个仓库的索引
                 */
                PetCangKuMediator.prototype.showChildDepot = function (index) {
                    this.cangkuListInit(this.depotListData[index]);
                    this._viewUI.currDepotNum_lab.text = (index + 1).toString();
                    this.onDepotSelect();
                };
                /** 给其它地方显示该界面 */
                PetCangKuMediator.prototype.onShow = function (columnid, npckey) {
                    this.registerEvent();
                    this.npckey = npckey;
                    this.CGetPetcolumnInfo(columnid, npckey);
                };
                PetCangKuMediator.prototype.show = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                    _super.prototype.show.call(this);
                    this.init();
                };
                /** 客户端请求宠物仓库信息 */
                PetCangKuMediator.prototype.CGetPetcolumnInfo = function (columnid, npckey) {
                    RequesterProtocols._instance.c2s_get_petcolumninfo(columnid, npckey);
                };
                /** 初始化数据 */
                PetCangKuMediator.prototype.init = function () {
                    this.havePetDataInit();
                    this.initUI();
                };
                /** 持有宠物数据初始化 */
                PetCangKuMediator.prototype.havePetDataInit = function () {
                    var havePets;
                    havePets = pet.models.PetModel.getInstance().pets;
                    this.havePetsInfoData = [];
                    this.havePetListData = [];
                    if (havePets.keys.length != 0) {
                        //宠物基本数据
                        var petInfoData = void 0;
                        for (var i = 0; i < havePets.keys.length; i++) {
                            //获得持有宠物中某一只的基本数据
                            petInfoData = havePets.get(havePets.keys[i]);
                            this.havePetsInfoData.push(petInfoData);
                            //持有宠物的id
                            var petId = petInfoData.id;
                            //持有宠物的名字
                            var petName = petInfoData.name;
                            //持有宠物的等级
                            var petLevel = petInfoData.level;
                            //持有宠物的头像图
                            var petAvatarImg = pet.models.PetModel.getInstance().getPetAvatarImg(petId);
                            //持有宠物的品质边框图
                            var petQualityFrameImg = pet.models.PetModel.getInstance().getPetQualityFrameImg(petId);
                            //持有宠物的评分
                            var petscore = petInfoData.petscore;
                            //持有宠物所拥有的技能数
                            var petSkillsNum = petInfoData.skills.length;
                            //持有宠物的类型图
                            var petKindImg = pet.models.PetModel.getInstance().getPetKindImg(petInfoData.kind);
                            //持有宠物是否珍品
                            var petIsZhenPin = pet.models.PetModel.getInstance().isZhenPin(petId);
                            //持有宠物是否出战
                            var petIsChuZhan = false;
                            if (havePets.keys[i] == LoginModel.getInstance().roleDetail.petIndex) {
                                petIsChuZhan = true;
                            }
                            this.havePetListData.push({
                                xpetname_lab: petName,
                                xpetlv_lab: petLevel.toString(),
                                xpeticon_btn_skin: petAvatarImg,
                                xpetkuang_img: petQualityFrameImg,
                                xpinfen_lab: petscore.toString(),
                                xskillcount_lab: petSkillsNum.toString(),
                                xpetType_img: petKindImg,
                                isZhenPin: petIsZhenPin,
                                isChuZhan: petIsChuZhan
                            });
                        }
                    }
                    else {
                        this.havePetListData = [];
                    }
                };
                PetCangKuMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                PetCangKuMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**告诉服务器给仓库增加栏位
                 * @describe 需要判断身上剩余的银币是否足够开启新的宠物仓库栏位后，再向服务器发消息
                */
                PetCangKuMediator.prototype.addpetlan = function () {
                    //角色当前所拥有的银币
                    var yinBiNum = HudModel.getInstance().sliverNum;
                    //扩充新的宠物仓库栏位所需银币
                    var needYinBi = this.petCPetDepotPriceData[this.cangKuListData.length - 1]["nextneedmoney"];
                    if (yinBiNum < needYinBi) { //如果不足，需要弹出银币补足界面
                        /** 需要兑换的银币 */
                        var duihuanMoney = needYinBi - HudModel.getInstance().sliverNum;
                        /** 兑换所需的仙晶 */
                        var _needFuShi = void 0;
                        if ((Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI) - HudModel.getInstance().fuShiNum) <= 0) {
                            _needFuShi = Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI);
                        }
                        else {
                            _needFuShi = (Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI) - HudModel.getInstance().fuShiNum);
                        }
                        /** 兑换所需的金币 */
                        var _needGold = void 0;
                        if ((Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI) - BagModel.getInstance().globalIcon) <= 0) {
                            _needGold = Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI);
                        }
                        else {
                            _needGold = (Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI) - BagModel.getInstance().globalIcon);
                        }
                        var yinBiBuZuView = new modules.commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
                        yinBiBuZuView.onShow(false, duihuanMoney.toString(), _needFuShi.toString(), _needGold.toString());
                        yinBiBuZuView.once(modules.commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.getSliverFromYuanBao, [_needFuShi]);
                        yinBiBuZuView.once(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.getGoldFromYuanBao, [_needFuShi]);
                        yinBiBuZuView.once(modules.commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.onCPetDepotColumnAddCapacity);
                    }
                    else {
                        this.onCPetDepotColumnAddCapacity();
                    }
                };
                /** 发起请求 */
                PetCangKuMediator.prototype.onCPetDepotColumnAddCapacity = function () {
                    RequesterProtocols._instance.c2s_pet_depotcolumnaddcapacity();
                };
                /** 通过元宝(又称仙晶或符石)兑换金币 */
                PetCangKuMediator.prototype.getGoldFromYuanBao = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    if (fuShiNum < yuanbao) {
                        var _TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                        _TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", RoleEnum.XIANJIN_TIP);
                        _TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        modules.bag.models.BagProxy.getInstance().once(modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.addpetlan);
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, yuanbao);
                    }
                };
                /** 通过元宝(又称仙晶或符石)兑换银币 */
                PetCangKuMediator.prototype.getSliverFromYuanBao = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    if (fuShiNum < yuanbao) {
                        var _TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                        _TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", RoleEnum.XIANJIN_TIP);
                        _TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        modules.bag.models.BagProxy.getInstance().once(modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.onCPetDepotColumnAddCapacity);
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_SilverCoin, yuanbao);
                    }
                };
                /** 商城充值 */
                PetCangKuMediator.prototype.goRecharge = function () {
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge); //前往充值界面。关闭当前界
                };
                /**
                 * 获取某个仓库的数据
                 */
                PetCangKuMediator.prototype.getCurrDepotData = function (arrData, num) {
                    switch (num) {
                        case 1:
                            arrData = this.depot1ListData;
                            break;
                        case 2:
                            arrData = this.depot2ListData;
                            break;
                        case 3:
                            arrData = this.depot3ListData;
                            break;
                        case 4:
                            arrData = this.depot4ListData;
                            break;
                    }
                    return arrData;
                };
                /** 检查当前对象仓库的宠物是否达到上限 */
                PetCangKuMediator.prototype.checkCurrPetDepotIsFull = function (btn) {
                    var flag = true;
                    switch (btn) {
                        case this._viewUI.quchu_btn: //取出宠物
                            //服务器有做判断，客户端无需提供相应的操作
                            break;
                        case this._viewUI.jicun_btn: //寄存宠物
                            //当前处于宠物仓库的第几个仓库
                            var _currAtDepotNum = Number(this._viewUI.currDepotNum_lab.text);
                            var _currDepotData = [];
                            _currDepotData = this.getCurrDepotData(_currDepotData, _currAtDepotNum);
                            for (var i = 0; i < _currDepotData.length; i++) {
                                if (_currDepotData[i] == 0) { //只要开启的宠物栏位还有有空位
                                    flag = false;
                                    break;
                                }
                            }
                            break;
                    }
                    return flag;
                };
                /** 在宠物仓库取出/寄存宠物
                 * @param btn 点击的按钮
                 * @describe quchu_btn 取出宠物；jicun_btn 寄存宠物
                 */
                PetCangKuMediator.prototype.depotMovePet = function (btn) {
                    //源宠物栏
                    var srccolumnid;
                    //目的宠物栏
                    var dstcolumnid;
                    //存或取的宠物key
                    var petkey;
                    switch (btn) {
                        case this._viewUI.quchu_btn: //取出宠物
                            srccolumnid = PetColumnTypes.DEPOT;
                            dstcolumnid = PetColumnTypes.PET;
                            //当前第几个仓库
                            var currDepotNum = Number(this._viewUI.currDepotNum_lab.text);
                            //当前宠物仓库中被选中的宠物信息数据
                            var depotPetInfoData = this.depotListData[currDepotNum - 1][this.lastCKSelectIndex];
                            if (!depotPetInfoData)
                                break;
                            petkey = depotPetInfoData.petkey;
                            break;
                        case this._viewUI.jicun_btn: //寄存宠物	
                            var flag = this.checkCurrPetDepotIsFull(btn);
                            if (flag) {
                                var _tipsMsg = ChatModel.getInstance().chatMessageTips[160034]["msg"];
                                this.showDisTips(_tipsMsg);
                                return;
                            }
                            srccolumnid = PetColumnTypes.PET;
                            dstcolumnid = PetColumnTypes.DEPOT;
                            //当前持有宠物中被选中的宠物信息数据
                            var havePetInfoData = this.havePetsInfoData[this.lastHavePetLstSelectIndex];
                            if (!havePetInfoData)
                                break;
                            petkey = havePetInfoData.key;
                            break;
                    }
                    if (!petkey) {
                        var _chatMessageTips = modules.chat.models.ChatModel.getInstance().chatMessageTips;
                        var msg = void 0;
                        switch (btn) {
                            case this._viewUI.quchu_btn: //取出宠物
                                msg = _chatMessageTips[160025]["msg"];
                                break;
                            case this._viewUI.jicun_btn: //寄存宠物
                                msg = _chatMessageTips[160032]["msg"];
                                break;
                        }
                        this.showDisTips(msg);
                        this.initUI();
                        return;
                    }
                    this.selectedBtn = btn;
                    pet.models.PetProxy.getInstance().once(pet.models.GET_PetError, this, this.showPetErrorTips);
                    RequesterProtocols._instance.c2s_move_petcolumn(srccolumnid, petkey, dstcolumnid, this.npckey);
                };
                /** 显示提示飘窗 */
                PetCangKuMediator.prototype.showDisTips = function (msg) {
                    var distips = new modules.commonUI.DisappearMessageTipsMediator(this._app);
                    distips.onShow(msg);
                };
                /** 显示在宠物仓库进行宠物相关操作的出错提示信息
                 * @param peterror 出错的编号
                 */
                PetCangKuMediator.prototype.showPetErrorTips = function (peterror) {
                    var _chatMessageTips = modules.chat.models.ChatModel.getInstance().chatMessageTips;
                    var msg;
                    switch (peterror) {
                        case PetError.FightPetCantMoveErr:
                            msg = _chatMessageTips[160021]["msg"];
                            break;
                        case PetError.HasEquip:
                            msg = _chatMessageTips[191055]["msg"];
                            break;
                        case PetError.KeyNotFound:
                            break;
                        case PetError.PetcolumnFull:
                            switch (this.selectedBtn) {
                                case this._viewUI.quchu_btn: //取出宠物
                                    msg = _chatMessageTips[160108]["msg"];
                                    break;
                                case this._viewUI.jicun_btn: //寄存宠物
                                    msg = _chatMessageTips[160028]["msg"];
                                    break;
                            }
                            break;
                        case PetError.ShowPetCantMoveErr:
                            break;
                        case PetError.UnkownError:
                            break;
                        case PetError.WrongDstCol:
                            break;
                    }
                    this.showDisTips(msg);
                    this.initUI();
                };
                return PetCangKuMediator;
            }(game.modules.UiMediator));
            pet.PetCangKuMediator = PetCangKuMediator;
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetCangKuMediator.js.map