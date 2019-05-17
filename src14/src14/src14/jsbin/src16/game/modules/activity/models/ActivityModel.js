var game;
(function (game) {
    var modules;
    (function (modules) {
        var activity;
        (function (activity) {
            var models;
            (function (models) {
                /** ActivityModel 活动相关数据存储 */
                var ActivityModel = /** @class */ (function () {
                    function ActivityModel() {
                        /** 活跃度奖励表 */
                        this.ActiveGiftBoxBinDic = {};
                        /** 周历 */
                        this.WeekListBinDic = {};
                        /** 推送设置 */
                        this.TuiSongSettingBinDic = {};
                        /** 活动配置表 */
                        this.ActivityNewBinDic = {};
                        /** 活动配置表通过type赋值 */
                        this.ActivityNewBinDicAtType = new Laya.Dictionary;
                        /** 定时活动配置表通过活动id赋值 */
                        this.CheculedActivityBinDicAtActId = new Laya.Dictionary;
                        /** 活动-跳转地图 */
                        this.ActivityMapListBinDic = {};
                        /** 精英副本参数表 */
                        this.ShiGuangZhiXueBinDic = {};
                        /** 精英副本参数表 */
                        this.ShiGuangZhiXueByFuBenId = new Laya.Dictionary;
                        /** 各项活动完成次数-key为活动id，value为次数 */
                        this.activityInfos = new Laya.Dictionary;
                        /** 当前活动页面 */
                        this.firstInterface = -1;
                        /** 活动推送相关信息 */
                        this.actTuiSongInfos = new Laya.Dictionary;
                        /** 精英副本可否挑战状态 */
                        this.instances = new Laya.Dictionary;
                        /** 精英副本参数刷新表 */
                        this.JingYingNpc = new Laya.Dictionary;
                        /** 评级界面是否开启 */
                        this.isShowPingJi = false;
                        /** 精英副本完成提示 */
                        this.isOver = false;
                        ActivityModel._instance = this;
                        // ActivityProxy.getInstance();
                    }
                    ActivityModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new ActivityModel();
                        }
                        return this._instance;
                    };
                    ActivityModel.clearModelData = function () {
                        activity.models.ActivityModel._instance.RoleHookExpData = new models.RoleHookExpVo();
                        activity.models.ActivityModel._instance.activevalue = 0;
                        activity.models.ActivityModel._instance.activities = new Laya.Dictionary();
                        activity.models.ActivityModel._instance.activityInfos = new Laya.Dictionary();
                        activity.models.ActivityModel._instance.chests = new Laya.Dictionary();
                        activity.models.ActivityModel._instance.firstInterface = -1;
                        activity.models.ActivityModel._instance.actTuiSongInfos = new Laya.Dictionary();
                        activity.models.ActivityModel._instance.instances = new Laya.Dictionary();
                        activity.models.ActivityModel._instance.questdata = null;
                        activity.models.ActivityModel._instance.grade = 0;
                        activity.models.ActivityModel._instance.isShowPingJi = false;
                        activity.models.ActivityModel._instance.isOver = false;
                    };
                    /** 设置默认活动已完成次数 */
                    ActivityModel.prototype.setActivityInfo = function () {
                        for (var i in this.ActivityNewBinDic) {
                            this.activityInfos.set(this.ActivityNewBinDic[i].id, 0);
                        }
                    };
                    /**
                     * 设置活动默认全部推送
                     * @param key 账号名加活动推送表的活动编号
                     * @param value 是否开启推送+是否已经推送+活动id
                     * 响应事件
                     */
                    ActivityModel.prototype.setTuiSongState = function () {
                        for (var num in this.TuiSongSettingBinDic) {
                            var name = this.TuiSongSettingBinDic[num].name;
                            var account = LocalStorage.getItem("daowang_userLoginAccount");
                            if (LocalStorage.getItem(account + num) != null) {
                                var arr = LocalStorage.getItem(account + num).split("_");
                                var tuiSong = arr[0];
                                var id = arr[2];
                                var str = tuiSong + "_0_" + id;
                                LocalStorage.setItem(account + num, str);
                            }
                            else {
                                var view2 = this.ActivityNewBinDicAtType.get(2);
                                var newId;
                                for (var i = 0; i < view2.length; i++) {
                                    if (view2[i].name == name) {
                                        newId = view2[i].id;
                                        var str = "1_0_" + newId;
                                        LocalStorage.setItem(account + num, str);
                                    }
                                }
                            }
                        }
                    };
                    return ActivityModel;
                }());
                models.ActivityModel = ActivityModel;
            })(models = activity.models || (activity.models = {}));
        })(activity = modules.activity || (modules.activity = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ActivityModel.js.map