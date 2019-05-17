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
 * 招募类
 */
// import RecruitUI = ui.common.FriendRecruitUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var RecruitViewMediator = /** @class */ (function (_super) {
                __extends(RecruitViewMediator, _super);
                function RecruitViewMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**当前选中下标 */
                    _this.selectNum = 0;
                    _this._viewUI = new ui.common.FriendRecruitUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this.getListData();
                    _this.initialize();
                    _this.registerEvent();
                    _this.eventListener();
                    return _this;
                }
                /**初始化 */
                RecruitViewMediator.prototype.initialize = function () {
                    this.biaoqianNameArr = [{ Label: "招募" }, { Label: "招募奖励" }, { Label: "我的招募" }, { Label: "招募分享有奖" }];
                    this.rewardNameArr = new Array();
                    this.rewardItemArr1 = new Array();
                    this.rewardItemArr2 = new Array();
                    this.rewardImgArr1 = new Array();
                    this.rewardImgArr2 = new Array();
                };
                /**注册事件监听 */
                RecruitViewMediator.prototype.eventListener = function () {
                    friend.models.FriendProxy.getInstance().on(friend.models.SRspServerId_EVENT, this, this.onRspServerId);
                    friend.models.FriendProxy.getInstance().on(friend.models.SReqRecruitWheel_EVENT, this, this.onReqRecruitWheel);
                    friend.models.FriendProxy.getInstance().on(friend.models.SReqFortuneWheel_EVENT, this, this.onReqFortuneWheel);
                };
                /**服务器发送抽奖*/
                RecruitViewMediator.prototype.onReqFortuneWheel = function (e) {
                    var data = friend.models.FriendModel.getInstance().SReqFortuneWheelData.get("data");
                };
                /**请求招募大转盘信息结果*/
                RecruitViewMediator.prototype.onReqRecruitWheel = function (e) {
                    var data = friend.models.FriendModel.getInstance().SReqRecruitWheelData.get("data");
                };
                /**返回服务器id*/
                RecruitViewMediator.prototype.onRspServerId = function (e) {
                    var data = friend.models.FriendModel.getInstance().SRspServerIdData.get("data");
                    this.serverid = data.serverid.toString();
                };
                /**初始化数据 */
                RecruitViewMediator.prototype.initData = function () {
                    var myData = modules.createrole.models.LoginModel.getInstance().roleDetail;
                    this._viewUI.recruitCode_lab.text = myData.roleid + "2345"; //招募码
                    this.cRecruitRewardObj = friend.models.FriendModel.getInstance().CRecruitRewardBinDic;
                    this.cItemAttrObj = BagModel.getInstance().itemAttrData;
                    //招募奖励
                    for (var i = 1; i < 6; i++) {
                        this.rewardNameArr.push(this.cRecruitRewardObj[i]["text"]);
                        var str = this.cRecruitRewardObj[i]["items"];
                        var spit = str.split(";");
                        this.rewardItemArr1.push(spit[0]);
                        this.rewardItemArr2.push(spit[1]);
                    }
                    for (var i = 0; i < this.rewardItemArr1.length; i++) {
                        this.rewardImgArr1.push({ img: "common/icon/item/" + this.cItemAttrObj[this.rewardItemArr1[i]]["icon"] + ".png" });
                        this.rewardImgArr2.push({ img: "common/icon/item/" + this.cItemAttrObj[this.rewardItemArr2[i]]["icon"] + ".png" });
                    }
                    this.getRewardListData();
                    RequesterProtocols._instance.c2s_CReqServerId(1); //请求服务器id
                    RequesterProtocols._instance.c2s_req_recruitwheel(); //请求招募大转盘信息
                };
                /**渲染招募奖励列表 */
                RecruitViewMediator.prototype.getRewardListData = function () {
                    this._viewUI.recruidAward_list.vScrollBarSkin = "";
                    this._viewUI.recruidAward_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.recruidAward_list.scrollBar.elasticDistance = 50;
                    this._viewUI.recruidAward_list.array = this.rewardNameArr;
                    this._viewUI.recruidAward_list.renderHandler = new Handler(this, this.onRewardRender);
                    this._viewUI.recruidAward_list.selectHandler = new Handler(this, this.onRewardSelect);
                    this._viewUI.recruidAward_list.selectedIndex = 0;
                };
                RecruitViewMediator.prototype.onRewardRender = function (cell, index) {
                    var awardNameLab = cell.getChildByName("recruidAward_btn").getChildByName("awardName_lab");
                    var awardImg1 = cell.getChildByName("recruidAward_btn").getChildByName("awardContent1_img");
                    var awardImg2 = cell.getChildByName("recruidAward_btn").getChildByName("awardContent2_img");
                    awardNameLab.text = this.rewardNameArr[index];
                    awardImg1.skin = this.rewardImgArr1[index].img;
                    awardImg2.skin = this.rewardImgArr2[index].img;
                };
                RecruitViewMediator.prototype.onRewardSelect = function (index) {
                    if (index != -1) {
                        this.selectNum = index;
                        var getBtn = this._viewUI.recruidAward_list.getCell(index).getChildByName("recruidAward_btn").getChildByName("awardGet_btn");
                        getBtn.on(LEvent.MOUSE_DOWN, this, this.get);
                        this._viewUI.recruidAward_list.selectedIndex = -1;
                    }
                };
                /**
                 * 领取协议
                 * 奖励类型 1招募人数奖励 2招募玩家充值奖励 3招募玩家等级奖励
                 * 配置招募奖励表里的id
                 * 被招募的角色id
                 * 被招募的角色所在服务器id
                 */
                RecruitViewMediator.prototype.get = function () {
                    var myData = modules.createrole.models.LoginModel.getInstance().roleDetail;
                    RequesterProtocols._instance.c2s_get_recruitaward(1, this.selectNum + 1, myData.roleid, this.serverid);
                };
                /**渲染联系人列表 */
                RecruitViewMediator.prototype.getListData = function () {
                    this._viewUI.button_list.vScrollBarSkin = "";
                    this._viewUI.button_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.button_list.scrollBar.elasticDistance = 50;
                    this._viewUI.button_list.array = this.biaoqianNameArr;
                    this._viewUI.button_list.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.button_list.selectHandler = new Handler(this, this.onSelect);
                    this._viewUI.button_list.selectedIndex = 0;
                };
                RecruitViewMediator.prototype.onRender = function (cell, index) {
                    var recruitBtn = cell.getChildByName("recruit_btn");
                    recruitBtn.label = this.biaoqianNameArr[index].Label;
                };
                RecruitViewMediator.prototype.onSelect = function (index) {
                    if (index != -1) {
                        switch (index) {
                            case 0:
                                this._viewUI.recruitPanel_box.visible = true;
                                this._viewUI.recruidAward_list.visible = false;
                                this._viewUI.myRecruit_box.visible = false;
                                this._viewUI.rotaryPanel_box.visible = false;
                                break;
                            case 1:
                                this._viewUI.recruitPanel_box.visible = false;
                                this._viewUI.recruidAward_list.visible = true;
                                this._viewUI.myRecruit_box.visible = false;
                                this._viewUI.rotaryPanel_box.visible = false;
                                break;
                            case 2:
                                this._viewUI.recruitPanel_box.visible = false;
                                this._viewUI.recruidAward_list.visible = false;
                                this._viewUI.myRecruit_box.visible = true;
                                this._viewUI.rotaryPanel_box.visible = false;
                                break;
                            case 3:
                                this._viewUI.recruitPanel_box.visible = false;
                                this._viewUI.recruidAward_list.visible = false;
                                this._viewUI.myRecruit_box.visible = false;
                                this._viewUI.rotaryPanel_box.visible = true;
                                break;
                        }
                        this._viewUI.button_list.selectedIndex = -1;
                    }
                };
                RecruitViewMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.initData();
                };
                RecruitViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                RecruitViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**
                 * 注册事件
                 */
                RecruitViewMediator.prototype.registerEvent = function () {
                    this._viewUI.start_btn.on(LEvent.MOUSE_DOWN, this, this.xuanZhuan);
                };
                RecruitViewMediator.prototype.xuanZhuan = function () {
                    this._viewUI.zhuanPan_img.rotation = 0;
                    this._viewUI.start_btn.visible = false;
                    RequesterProtocols._instance.c2s_begin_recruitwheel(); //开始转盘协议
                    Laya.timer.frameLoop(1, this, this.animate);
                };
                RecruitViewMediator.prototype.animate = function (e) {
                    this._viewUI.zhuanPan_img.rotation += 3;
                    // switch(this.randomNum){
                    // 	case this.zhuanpanIdArr[0]:
                    // 		if(this._viewUI.zhuanPan_img.rotation == 945){
                    // 			Laya.timer.clear(this,this.animate);
                    // 			this._viewUI.tipItem_img.skin = "common/icon/item/20131.png";
                    // 			this._viewUI.start_btn.visible = true;
                    // 			RequesterProtocols._instance.c2s_CEndSchoolWheel();//结束转盘协议
                    // 		}
                    // 		break;
                    // 	case this.zhuanpanIdArr[1]:
                    // 		if(this._viewUI.zhuanPan_img.rotation == 990){
                    // 			Laya.timer.clear(this,this.animate);
                    // 			this._viewUI.tipItem_img.skin = "common/icon/item/20096.png";
                    // 			this._viewUI.start_btn.visible = true;
                    // 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
                    // 		}
                    // 		break;
                    // 	case this.zhuanpanIdArr[2]:
                    // 		if(this._viewUI.zhuanPan_img.rotation == 1035){
                    // 			Laya.timer.clear(this,this.animate);
                    // 			this._viewUI.tipItem_img.skin = "common/icon/item/20060.png";
                    // 			this._viewUI.start_btn.visible = true;
                    // 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
                    // 		}
                    // 		break;
                    // 	case this.zhuanpanIdArr[3]:
                    // 		if(this._viewUI.zhuanPan_img.rotation == 1080){
                    // 			Laya.timer.clear(this,this.animate);
                    // 			this._viewUI.tipItem_img.skin = "common/icon/item/20097.png";
                    // 			this._viewUI.start_btn.visible = true;
                    // 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
                    // 		}
                    // 		break;
                    // 	case this.zhuanpanIdArr[4]:
                    // 		if(this._viewUI.zhuanPan_img.rotation == 765){
                    // 			Laya.timer.clear(this,this.animate);
                    // 			this._viewUI.tipItem_img.skin = "common/icon/item/20096.png";
                    // 			this._viewUI.start_btn.visible = true;
                    // 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
                    // 		}
                    // 		break;
                    // 	case this.zhuanpanIdArr[5]:
                    // 		if(this._viewUI.zhuanPan_img.rotation == 810){
                    // 			Laya.timer.clear(this,this.animate);
                    // 			this._viewUI.tipItem_img.skin = "common/icon/item/20053.png";
                    // 			this._viewUI.start_btn.visible = true;
                    // 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
                    // 		}
                    // 		break;
                    // 	case this.zhuanpanIdArr[6]:
                    // 		if(this._viewUI.zhuanPan_img.rotation == 855){
                    // 			Laya.timer.clear(this,this.animate);
                    // 			this._viewUI.tipItem_img.skin = "common/icon/item/20051.png";
                    // 			this._viewUI.start_btn.visible = true;
                    // 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
                    // 		}
                    // 		break;
                    // 	case this.zhuanpanIdArr[7]:
                    // 		if(this._viewUI.zhuanPan_img.rotation == 900){
                    // 			Laya.timer.clear(this,this.animate);
                    // 			this._viewUI.tipItem_img.skin = "common/icon/item/20094.png";
                    // 			this._viewUI.start_btn.visible = true;
                    // 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
                    // 		}
                    // 		break;
                    // }
                };
                return RecruitViewMediator;
            }(game.modules.UiMediator));
            friend.RecruitViewMediator = RecruitViewMediator;
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RecruitViewMediator.js.map