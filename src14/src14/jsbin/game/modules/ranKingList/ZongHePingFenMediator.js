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
        var ranKingList;
        (function (ranKingList) {
            /** 综合评分界面 */
            var ZongHePingFenMediator = /** @class */ (function (_super) {
                __extends(ZongHePingFenMediator, _super);
                function ZongHePingFenMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._zonghe_pingfen_data = new Dictionary();
                    _this.scoreArray = [];
                    _this.scoreArray_1 = [];
                    _this.scoreArray_2 = [];
                    _this.scoreArray_3 = [];
                    _this._viewUI = new ui.common.ZongHePingFenUI();
                    // this._viewUI.mouseThrough = true;
                    //this.isCenter = false;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.scene2DPanel = new TestRole2dPanel();
                    _this._viewUI.modelBg_img.addChild(_this.scene2DPanel);
                    _this.scene2DPanel.ape.x = 0;
                    _this.scene2DPanel.ape.y = 0;
                    _this.model = new ModelsCreate();
                    _this.roleModel = new ModelsCreate();
                    return _this;
                }
                /**
                 * 在综合评分界面进行玩家信息查看
                 * @param rank_num 排名
                 * @param Vo 综合评分界面需要用到信息数据
                 * @param school 职业
                 * @param fatherUI 父节点UI
                 */
                ZongHePingFenMediator.prototype.info_see = function (rank_num, Vo, school, fatherUI) {
                    this.fatherUI = fatherUI;
                    this._zongHePingFenData = [];
                    this._zongHePingFenData = Vo.get(rank_num);
                    this._viewUI.school_img.skin = RoleInfoModel.getInstance().setZhiyeImg(school);
                    this._viewUI.name_lab.text = this._zongHePingFenData["rolename"];
                    this._viewUI.levelNumber_lab.text = '等级' + this._zongHePingFenData["level"];
                    var _roledata = LoginModel.getInstance().createRoleConfigBinDic; //角色创建配置表
                    this.roleModelCreate(_roledata[this._zongHePingFenData["shape"]]["model"]);
                    this.updateScoreUI(this._zongHePingFenData["rolescore"], 1);
                    this.updateScoreUI(this._zongHePingFenData["manypetscore"], 2);
                    this.updateScoreUI(this._zongHePingFenData["totalscore"], 3);
                    //判断要显示的综合战力界面是否为玩家自己
                    if (this._zongHePingFenData["roleid"] != modules.createrole.models.LoginModel.getInstance().roleDetail.roleid) {
                        this._viewUI.chaKanRenWu_btn.visible = true;
                    }
                    else {
                        this._viewUI.chaKanRenWu_btn.visible = false;
                    }
                    this.show();
                };
                /**人物模型 */
                ZongHePingFenMediator.prototype.roleModelCreate = function (modelid) {
                    /** 读的是创角配置表的模型 由于创角配置表被改过，原Id是将首个2换成1 比如2010101 原1010101 */
                    modelid = parseInt((modelid + "").replace("2", "1"));
                    if (this.model.role3d) {
                        this.scene2DPanel.removeSceneChar(this.model.role3d);
                    }
                    this.model.role3d = new YxChar3d();
                    this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
                    //this.model.role3d.set2dPos((this._viewUI.showModel_box.x + this._viewUI.roleModel_img.width / 3 + this._viewUI.roleModel_img.x) * this._viewUI.globalScaleX, (this._viewUI.showModel_box.y + this._viewUI.roleModel_img.height/2 + this._viewUI.roleModel_img.y / 2) * this._viewUI.globalScaleY);  //坐标
                    this.model.role3d.set2dPos((this._viewUI.showModel_box.x + this._viewUI.roleModel_img.width * 26 / 51 + this._viewUI.roleModel_img.x) * this.fatherUI.globalScaleX, (this._viewUI.showModel_box.y + this._viewUI.roleModel_img.height * 4 / 5 + this._viewUI.roleModel_img.y) * this.fatherUI.globalScaleY); //坐标		
                    this.model.role3d.scale = 1;
                    this.model.role3d.rotationY = 180;
                    this.scene2DPanel.addSceneChar(this.model.role3d);
                    BagModel.chargeToWeapon(this.model.role3d);
                };
                ZongHePingFenMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.scene2DPanel.ape.x = this._viewUI.x * this._viewUI.globalScaleX;
                    this.scene2DPanel.ape.y = this._viewUI.y * this._viewUI.globalScaleY;
                    this.getFriend();
                    this.getPetInfo();
                    this.registerEvent();
                };
                /**
                 * 获取宠物信息
                 */
                ZongHePingFenMediator.prototype.getPetInfo = function () {
                    var _values = modules.pet.models.PetModel._instance.pets.values;
                    //存放可出战的宠物
                    var _beUsePets = [];
                    for (var i = 0; i < _values.length; i++) {
                        //人物等级大于该宠物的参战等级，即代表该宠物可出战
                        if (this._zongHePingFenData["level"] > _values[i].useLevel) {
                            _beUsePets.push(_values[i]);
                        }
                    }
                    // //比较可出战的宠物，按宠物评分的从高到低，从新排序
                    // var tempNum:number = 0;
                    // var i = _beUsePets.length;
                    // while(i>0){
                    //     for(let j= 0; j< i-1; j++){
                    //         if( _beUsePets[j].petscore < _beUsePets[j+1].petscore ){
                    //             tempNum = _beUsePets[j];
                    //             _beUsePets[j] = _beUsePets[j+1];
                    //             _beUsePets[j+1] = tempNum;
                    //         }
                    //     }
                    //     i--;
                    // }
                    //进行判断可出战宠物的数量
                    this._canUsePetsNum = [];
                    if (_beUsePets.length > 5 || _beUsePets.length == 0) {
                        this._canUsePetsNum.push(4);
                    }
                    else {
                        this._canUsePetsNum.push(_beUsePets.length);
                    }
                };
                /**
                 * 获取好友
                 */
                ZongHePingFenMediator.prototype.getFriend = function () {
                    var _friendIdArr = modules.friend.models.FriendModel._instance.friendIdArr;
                    this._friendIdDIc = new Laya.Dictionary();
                    for (var i = _friendIdArr.length; i > 0; i--) {
                        this._friendIdDIc.set(_friendIdArr[i], true);
                    }
                };
                ///////////////
                ///事件
                ////////////////
                /**注册事件
                 * @describe  UI的事件监听注册与消息监听注册
                 */
                ZongHePingFenMediator.prototype.registerEvent = function () {
                    //UI事件            
                    this._viewUI.close_btn.on(Laya.Event.CLICK, this, this.hide);
                    this._viewUI.chaKanRenWu_btn.on(Laya.Event.CLICK, this, this.update_ChaKan_RenWu_Info);
                    this._viewUI.tips_btn.on(LEvent.MOUSE_DOWN, this, this.showTips);
                    this._viewUI.onHideBg_img.on(LEvent.CLICK, this, this.onHide);
                };
                /**
                 * 关闭某些弹窗
                 */
                ZongHePingFenMediator.prototype.onHide = function () {
                    //如果有，则关闭说明型提示弹窗
                    if (this._tipsModule) {
                        this._tipsModule.hide();
                    }
                };
                /**
                 * 显示tips说明型提示信息
                 */
                ZongHePingFenMediator.prototype.showTips = function () {
                    var _parame = new Laya.Dictionary();
                    _parame.set("title", 11396);
                    _parame.set("contentId", 11395);
                    _parame.set("parame", this._canUsePetsNum);
                    this._tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, _parame, true);
                };
                /** 弹出查看人物信息的窗口 */
                ZongHePingFenMediator.prototype.update_ChaKan_RenWu_Info = function (e) {
                    //发请查看人物信息请求
                    RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(this._zongHePingFenData["roleid"]);
                    //发请组队请求
                    RequesterProtocols._instance.c2s_CReqRoleTeamState(this._zongHePingFenData["roleid"]);
                    var xPos = e.currentTarget.mouseX;
                    var yPos = e.currentTarget.mouseY;
                    var key = FriendEnum.STRANGE_KEY;
                    this._contactCharacterMediator = new modules.friend.ContactCharacterMediator(this._viewUI, this._app);
                    //判断当前查看的是不是自己好友
                    if (this._friendIdDIc.get(this._zongHePingFenData["roleid"]) != undefined) {
                        key = FriendEnum.FRIEND_KEY;
                        this._contactCharacterMediator.onShow(xPos, yPos, key);
                    }
                    else {
                        this._contactCharacterMediator.onShow(xPos, yPos, key);
                    }
                };
                ZongHePingFenMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                ZongHePingFenMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**
                 * 更新评分UI
                 * @param score  分数
                 * @param list  list样式
                 */
                ZongHePingFenMediator.prototype.updateScoreUI = function (score, list) {
                    var temp = score;
                    var i = 0;
                    do {
                        var num = Math.floor(temp % 10);
                        temp = temp / 10;
                        this.scoreArray[i] = num;
                        i++;
                    } while (temp >= 1);
                    var numarray = [];
                    for (var k = 0; k <= i - 1; k++) {
                        numarray[k] = this.scoreArray[i - k - 1];
                    }
                    var curr_scoreUI_list;
                    switch (list) {
                        case 1:
                            curr_scoreUI_list = this._viewUI.renWuNumber_list;
                            this.scoreArray_1 = numarray;
                            break;
                        case 2:
                            curr_scoreUI_list = this._viewUI.chongWuNumber_list;
                            this.scoreArray_2 = numarray;
                            break;
                        case 3:
                            var i_3 = i;
                            curr_scoreUI_list = this._viewUI.zongHeNumber_list;
                            this.scoreArray_3 = numarray;
                            break;
                        default:
                            break;
                    }
                    curr_scoreUI_list.repeatY = i;
                    curr_scoreUI_list.repeatY = 1;
                    curr_scoreUI_list.hScrollBarSkin = "";
                    curr_scoreUI_list.array = this.scoreArray;
                    switch (list) {
                        case 1:
                            curr_scoreUI_list = this._viewUI.renWuNumber_list;
                            curr_scoreUI_list.renderHandler = new Laya.Handler(this, this.updateNum_1);
                            break;
                        case 2:
                            curr_scoreUI_list = this._viewUI.chongWuNumber_list;
                            curr_scoreUI_list.renderHandler = new Laya.Handler(this, this.updateNum_2);
                            break;
                        case 3:
                            curr_scoreUI_list = this._viewUI.zongHeNumber_list;
                            curr_scoreUI_list.renderHandler = new Laya.Handler(this, this.updateNum_3);
                            break;
                        default:
                            break;
                    }
                };
                ZongHePingFenMediator.prototype.updateNum_1 = function (cell, _index) {
                    var clip = cell.getChildByName("clip");
                    clip.index = this.scoreArray_1[_index];
                };
                ZongHePingFenMediator.prototype.updateNum_2 = function (cell, _index) {
                    var clip = cell.getChildByName("clip");
                    clip.index = this.scoreArray_2[_index];
                };
                ZongHePingFenMediator.prototype.updateNum_3 = function (cell, _index) {
                    var clip = cell.getChildByName("clip");
                    clip.index = this.scoreArray_3[_index];
                };
                return ZongHePingFenMediator;
            }(game.modules.UiMediator));
            ranKingList.ZongHePingFenMediator = ZongHePingFenMediator;
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ZongHePingFenMediator.js.map