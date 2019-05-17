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
* 活动奖励tips
*/
var tipsModel = game.modules.tips.models.TipsModel;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var tips;
        (function (tips) {
            var ActivityTipsMediator = /** @class */ (function (_super) {
                __extends(ActivityTipsMediator, _super);
                function ActivityTipsMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**活动配置表 */
                    _this.ActivityNewBinDic = game.modules.activity.models.ActivityModel._instance.ActivityNewBinDic;
                    /**复合表 */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /**活动奖励数据 */
                    _this.activityArr = [];
                    /**最小的高度 */
                    _this.minHtmlHeight = 40;
                    _this._viewUI = new ui.common.component.AcitvityTipsUI();
                    _this.isCenter = false;
                    _this._viewUI.mask_img.on(LEvent.MOUSE_DOWN, _this, _this.close);
                    return _this;
                }
                /**关闭tips */
                ActivityTipsMediator.prototype.close = function () {
                    tips.models.TipsProxy.getInstance().event(tips.models.CLOSE_TIPS);
                };
                /**
                 * 显示活动界面的tips
                 * @param activityId
                 */
                ActivityTipsMediator.prototype.showActivity = function (activityId) {
                    var name = this.ActivityNewBinDic[activityId].name; //活动名称
                    var maxnum = this.ActivityNewBinDic[activityId].maxnum; //次数
                    var maxact = this.ActivityNewBinDic[activityId].maxact; //最大活跃度奖励
                    var imgid = this.ActivityNewBinDic[activityId].imgid; //图片id
                    this._viewUI.name_lab.text = name;
                    this._viewUI.typeNumber_lab.text = tipsModel.stringType.cishu + maxnum;
                    this._viewUI.actvNum_lab.text = tipsModel.stringType.huoyuedu + maxact;
                    this._viewUI.item_icon.skin = "common/icon/item/" + imgid + ".png";
                    var html = "";
                    var text = this.ActivityNewBinDic[activityId].text; //活动详情
                    html += "<span style='fontSize:20;color:#fff2df;margin-top:50'>" + text + "</span><br>";
                    var timetext = this.ActivityNewBinDic[activityId].timetext; //开启时间
                    html += "<span style='fontSize:20'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    html += "<span style='fontSize:20;color:#fff2df;margin-top:50'>" + tipsModel.stringType.huodongshijian + "" + timetext + "</span><br>";
                    var activitylv = this.ActivityNewBinDic[activityId].activitylv; //活动要求
                    html += "<span style='fontSize:20'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    html += "<span style='fontSize:20;color:#fff2df;margin-top:50'>" + tipsModel.stringType.roleNum + " " + activitylv + "</span><br>";
                    var leveltext = this.ActivityNewBinDic[activityId].leveltext; //等级要求
                    html += "<span style='fontSize:20'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                    html += "<span style='fontSize:20;color:#fff2df'>" + tipsModel.stringType.levelNum + " " + leveltext + "</span><br>";
                    var getfoodid1 = this.ActivityNewBinDic[activityId].getfoodid1; //奖励1
                    var getfoodid2 = this.ActivityNewBinDic[activityId].getfoodid2; //奖励2
                    var getfoodid3 = this.ActivityNewBinDic[activityId].getfoodid3; //奖励3
                    var getfoodid4 = this.ActivityNewBinDic[activityId].getfoodid4; //奖励4
                    var getfoodid5 = this.ActivityNewBinDic[activityId].getfoodid5; //奖励5
                    if (getfoodid1 != 0) {
                        this.pushArrData(getfoodid1);
                    }
                    if (getfoodid2 != 0) {
                        this.pushArrData(getfoodid2);
                    }
                    if (getfoodid3 != 0) {
                        this.pushArrData(getfoodid3);
                    }
                    if (getfoodid4 != 0) {
                        this.pushArrData(getfoodid4);
                    }
                    if (getfoodid5 != 0) {
                        this.pushArrData(getfoodid5);
                    }
                    var list = this._viewUI.activityReward_list;
                    list.array = this.activityArr;
                    list.repeatX = this.activityArr.length;
                    list.renderHandler = new Handler(this, this.listRender);
                    var bgHeight = this._viewUI.bg_img.height;
                    this._viewUI.describe_html.innerHTML = html;
                    if (this._viewUI.describe_html.height > this.minHtmlHeight) {
                        this._viewUI.bg_img.height = bgHeight - this.minHtmlHeight + this._viewUI.describe_html.height;
                    }
                    this._viewUI.bg_img.centerY = 0;
                };
                /**将活动奖励数据存起来 */
                ActivityTipsMediator.prototype.pushArrData = function (getfoodid) {
                    var icon = this.itemAttrData[getfoodid].icon; //icon
                    var nquality = this.itemAttrData[getfoodid].nquality; //品质
                    var iconSkin = "common/icon/item/" + icon + ".png";
                    var frameSkin = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                    this.activityArr.push({ rewardFrame_img: frameSkin, rewardIcon_img: iconSkin, getfoodid: getfoodid });
                };
                /**列表渲染 */
                ActivityTipsMediator.prototype.listRender = function (cell, index) {
                    var rewardIcon_img = cell.getChildByName("rewardIcon_img");
                    rewardIcon_img.on(LEvent.MOUSE_DOWN, this, this.onIcon, [index]);
                };
                /**显示物品详情 */
                ActivityTipsMediator.prototype.onIcon = function (index) {
                    var arr = new Dictionary();
                    this._ItemDetailsTipsMediator = new game.modules.tips.ItemDetailsTipsMediator(this._viewUI, this._app);
                    this._ItemDetailsTipsMediator.show();
                    this._ItemDetailsTipsMediator.showCommonItemTips(this.activityArr[index].getfoodid, arr);
                };
                ActivityTipsMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                ActivityTipsMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                ActivityTipsMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ActivityTipsMediator;
            }(game.modules.UiMediator));
            tips.ActivityTipsMediator = ActivityTipsMediator;
        })(tips = modules.tips || (modules.tips = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ActivityTipsMediator.js.map