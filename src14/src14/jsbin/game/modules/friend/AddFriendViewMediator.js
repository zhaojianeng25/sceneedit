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
 * 添加好友类
 * @author  TXX
 */
// import AddFriendUI = ui.common.FriendAddUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var AddFriendViewMediator = /** @class */ (function (_super) {
                __extends(AddFriendViewMediator, _super);
                function AddFriendViewMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**选中列表下标 */
                    _this.selectNum = 0;
                    _this._viewUI = new ui.common.FriendAddUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this.isCenter = true;
                    _this._app = app;
                    return _this;
                }
                /**注册事件监听 */
                AddFriendViewMediator.prototype.eventListener = function () {
                    //监听服务器返回推荐好友列表
                    friend.models.FriendProxy.getInstance().on(friend.models.SRecommendFriend_EVENT, this, this.onRecommendFriend);
                    //监听搜索好友返回结果
                    friend.models.FriendProxy.getInstance().on(friend.models.SSearchFriend_EVENT, this, this.onSearchFriend);
                    //监听添加好友结果
                    friend.models.FriendProxy.getInstance().on(friend.models.SAddFriend_EVENT, this, this.onAddFriend);
                };
                /**初始化 */
                AddFriendViewMediator.prototype.initialize = function () {
                    this.touxiangImgArr = new Array();
                    this.zhiyeImgArr = new Array();
                    this.friendNameArr = new Array();
                    this.friendLevelArr = new Array();
                    this.friendIdArr = new Array();
                };
                /**添加好友成功S-->C */
                AddFriendViewMediator.prototype.onAddFriend = function (e) {
                    var addBtn = this._viewUI.friend_list.getCell(this.selectNum).getChildByName("add_btn");
                    addBtn.skin = "common/ui/tongyong/common_checkbox1.png";
                };
                /**搜索好友成功S-->C */
                AddFriendViewMediator.prototype.onSearchFriend = function (e) {
                    var data = friend.models.FriendModel.getInstance().SSearchFriendData.get("data");
                    this.selectNum = 0;
                    this.touxiangImgArr.length = 0;
                    this.zhiyeImgArr.length = 0;
                    this.friendNameArr.length = 0;
                    this.friendLevelArr.length = 0;
                    this.friendIdArr.length = 0;
                    this.touxiangImgArr.push({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data.FriendInfoBean["shape"]) + ".png" });
                    this.setFriendZhiyeImg(data.FriendInfoBean["school"]);
                    this.friendNameArr.push(data.FriendInfoBean["name"]);
                    this.friendLevelArr.push(data.FriendInfoBean["roleLevel"]);
                    this.friendIdArr.push(data.FriendInfoBean["roleId"]);
                    this.getListData();
                };
                /** 服务器返回推荐好友*/
                AddFriendViewMediator.prototype.onRecommendFriend = function (e) {
                    this.touxiangImgArr.length = 0;
                    this.zhiyeImgArr.length = 0;
                    this.friendNameArr.length = 0;
                    this.friendLevelArr.length = 0;
                    this.friendIdArr.length = 0;
                    var data = friend.models.FriendModel.getInstance().SRecommendFriendData.get("data");
                    for (var i = 0; i < data.friendInfoBeanList.length; i++) {
                        this.touxiangImgArr.push({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data.friendInfoBeanList[i]["shape"]) + ".png" });
                        this.setFriendZhiyeImg(data.friendInfoBeanList[i]["school"]);
                        this.friendNameArr.push(data.friendInfoBeanList[i]["name"]);
                        this.friendLevelArr.push(data.friendInfoBeanList[i]["roleLevel"]);
                        this.friendIdArr.push(data.friendInfoBeanList[i]["roleId"]);
                    }
                    this.getListData();
                };
                /**设置好友职业图标 */
                AddFriendViewMediator.prototype.setFriendZhiyeImg = function (school) {
                    //按照职业设置职业图标
                    switch (school) {
                        case zhiye.yunxiao:
                            this.zhiyeImgArr.push({ img: "common/ui/tongyong/11.png" });
                            break;
                        case zhiye.dahuang:
                            this.zhiyeImgArr.push({ img: "common/ui/tongyong/12.png" });
                            break;
                        case zhiye.cangyu:
                            this.zhiyeImgArr.push({ img: "common/ui/tongyong/13.png" });
                            break;
                        case zhiye.feixue:
                            this.zhiyeImgArr.push({ img: "common/ui/tongyong/14.png" });
                            break;
                        case zhiye.tianlei:
                            this.zhiyeImgArr.push({ img: "common/ui/tongyong/15.png" });
                            break;
                        case zhiye.wuliang:
                            this.zhiyeImgArr.push({ img: "common/ui/tongyong/16.png" });
                            break;
                        case zhiye.xuanming:
                            this.zhiyeImgArr.push({ img: "common/ui/tongyong/17.png" });
                            break;
                        case zhiye.qixing:
                            this.zhiyeImgArr.push({ img: "common/ui/tongyong/18.png" });
                            break;
                        case zhiye.danyang:
                            this.zhiyeImgArr.push({ img: "common/ui/tongyong/19.png" });
                            break;
                    }
                };
                /**初始化添加好友列表 */
                AddFriendViewMediator.prototype.getListData = function () {
                    this._viewUI.friend_list.vScrollBarSkin = "";
                    this._viewUI.friend_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.friend_list.scrollBar.elasticDistance = 50;
                    this._viewUI.friend_list.array = this.friendNameArr;
                    this._viewUI.friend_list.renderHandler = new Handler(this, this.onRender);
                };
                /**渲染添加好友列表 */
                AddFriendViewMediator.prototype.onRender = function (cell, index) {
                    var nameLab = cell.getChildByName("roleName_lab");
                    var levelLab = cell.getChildByName("level_lab");
                    var roleContentImg = cell.getChildByName("roleContent_img");
                    var schoolImg = cell.getChildByName("school_img");
                    var addBtn = cell.getChildByName("add_btn");
                    addBtn.on(LEvent.MOUSE_DOWN, this, this.clickAddFriendBtn, [index]);
                    nameLab.text = this.friendNameArr[index];
                    levelLab.text = this.friendLevelArr[index].toString();
                    roleContentImg.skin = this.touxiangImgArr[index].img;
                    schoolImg.skin = this.zhiyeImgArr[index].img;
                    var isMyfriendFlag = friend.models.FriendModel.getInstance().isMyFriend(this.friendIdArr[index]);
                    if (isMyfriendFlag == FriendEnum.STRANGE_KEY) {
                        addBtn.skin = "common/ui/tongyong/renwu_jiahao1.png";
                        addBtn.mouseEnabled = true;
                    }
                    else {
                        addBtn.skin = "common/ui/tongyong/common_checkbox1.png";
                        addBtn.mouseEnabled = false;
                    }
                };
                /**注册事件 */
                AddFriendViewMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.clickCloseBtnEvent);
                    this._viewUI.search_btn.on(LEvent.MOUSE_DOWN, this, this.clickSearchBtnEvent);
                    this._viewUI.change_btn.on(LEvent.MOUSE_DOWN, this, this.clickChangeBtnEvent);
                };
                /**添加好友 */
                AddFriendViewMediator.prototype.clickAddFriendBtn = function (index) {
                    this.selectNum = index;
                    RequesterProtocols._instance.c2s_CRequestAddFriend(this.friendIdArr[index]);
                };
                /**关闭界面 */
                AddFriendViewMediator.prototype.clickCloseBtnEvent = function () {
                    this.hide();
                };
                /**查找指定id的好友 */
                AddFriendViewMediator.prototype.clickSearchBtnEvent = function () {
                    RequesterProtocols._instance.c2s_CRequestSearchFriend(this._viewUI.idInput_tex.text); //搜索好友C-->S
                };
                /**请求推荐好友 */
                AddFriendViewMediator.prototype.clickChangeBtnEvent = function () {
                    RequesterProtocols._instance.c2s_CRecommendFriend(); //客户端请求推荐好友
                };
                AddFriendViewMediator.prototype.show = function () {
                    this.initialize();
                    this.registerEvent();
                    this.eventListener();
                    _super.prototype.show.call(this);
                    RequesterProtocols._instance.c2s_CRecommendFriend(); //客户端请求推荐好友
                };
                /** 移除事件监听 */
                AddFriendViewMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.MOUSE_DOWN, this, this.clickCloseBtnEvent);
                    this._viewUI.search_btn.off(LEvent.MOUSE_DOWN, this, this.clickSearchBtnEvent);
                    this._viewUI.change_btn.off(LEvent.MOUSE_DOWN, this, this.clickChangeBtnEvent);
                    friend.models.FriendProxy.getInstance().off(friend.models.SRecommendFriend_EVENT, this, this.onRecommendFriend);
                    friend.models.FriendProxy.getInstance().off(friend.models.SSearchFriend_EVENT, this, this.onSearchFriend);
                    friend.models.FriendProxy.getInstance().off(friend.models.SAddFriend_EVENT, this, this.onAddFriend);
                };
                AddFriendViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                AddFriendViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return AddFriendViewMediator;
            }(game.modules.UiMediator));
            friend.AddFriendViewMediator = AddFriendViewMediator;
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=AddFriendViewMediator.js.map