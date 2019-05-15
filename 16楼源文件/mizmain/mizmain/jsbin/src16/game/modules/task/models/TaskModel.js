/** 循环任务状态 */
var SpecialQuestState;
(function (SpecialQuestState) {
    /** 已成功，(已提交) */
    SpecialQuestState[SpecialQuestState["SUCCESS"] = 1] = "SUCCESS";
    /** 已失败 */
    SpecialQuestState[SpecialQuestState["FAIL"] = 2] = "FAIL";
    /** 已完成 */
    SpecialQuestState[SpecialQuestState["DONE"] = 3] = "DONE";
    /** 未完成 */
    SpecialQuestState[SpecialQuestState["UNDONE"] = 4] = "UNDONE";
    /** 已放弃 */
    SpecialQuestState[SpecialQuestState["ABANDONED"] = 5] = "ABANDONED";
    /** 回收 */
    SpecialQuestState[SpecialQuestState["RECYCLE"] = 6] = "RECYCLE";
    /** 副本中放弃 */
    SpecialQuestState[SpecialQuestState["INSTANCE_ABANDONED"] = 7] = "INSTANCE_ABANDONED";
})(SpecialQuestState || (SpecialQuestState = {}));
;
/** 刷新任务的数据字段枚举值 */
var RefreshDataType;
(function (RefreshDataType) {
    /** 任务状态 */
    RefreshDataType[RefreshDataType["STATE"] = 1] = "STATE";
    /** 目的npckey */
    RefreshDataType[RefreshDataType["DEST_NPD_KEY"] = 2] = "DEST_NPD_KEY";
    /** 目的npcid */
    RefreshDataType[RefreshDataType["DEST_NPD_ID"] = 3] = "DEST_NPD_ID";
    /** 目的地图id */
    RefreshDataType[RefreshDataType["DEST_MAP_ID"] = 4] = "DEST_MAP_ID";
    /** 目的x坐标 */
    RefreshDataType[RefreshDataType["DEST_XPOS"] = 5] = "DEST_XPOS";
    /** 目的y坐标 */
    RefreshDataType[RefreshDataType["DEST_YPOS"] = 6] = "DEST_YPOS";
    /** 目的道具id */
    RefreshDataType[RefreshDataType["DEST_ITEM_ID"] = 7] = "DEST_ITEM_ID";
    /** 累计次数 */
    RefreshDataType[RefreshDataType["SUMNUM"] = 8] = "SUMNUM";
    /** 目的道具1的数量 */
    RefreshDataType[RefreshDataType["DEST_ITEM1_NUM"] = 9] = "DEST_ITEM1_NUM";
    /** 目的道具2id */
    RefreshDataType[RefreshDataType["DEST_ITEM2_ID"] = 10] = "DEST_ITEM2_ID";
    /** 目的道具2的数量 */
    RefreshDataType[RefreshDataType["DEST_ITEM2_NUM"] = 11] = "DEST_ITEM2_NUM";
    /** 任务类型 */
    RefreshDataType[RefreshDataType["QUEST_TYPE"] = 12] = "QUEST_TYPE";
})(RefreshDataType || (RefreshDataType = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var task;
        (function (task) {
            var models;
            (function (models) {
                /** 任务model */
                var TaskModel = /** @class */ (function () {
                    function TaskModel() {
                        /**主线加支线*/
                        this.missionCMainMissionInfoData = {};
                        /**循环任务配置表*/
                        this.cRepeatTaskData = {};
                        /**循环总表*/
                        this.cSchoolTaskData = {};
                        /**循环总表通过type赋值*/
                        this.cSchoolTaskDataByType = new Laya.Dictionary;
                        /**任务表//师门任务*/
                        this.acceptableTaskData = {};
                        /**任务聊天*/
                        this.cRepeatTaskChatData = {};
                        /** 刷新的任务数据 */
                        this.datas = new Laya.Dictionary();
                        /** 根据活动任务id作为key来存放刷新的任务数据 */
                        this.refreshTaskDatas = new Laya.Dictionary();
                        /** 用来判断日常副本是否主动放弃 */
                        this.isAbandon = false;
                        /** 判断是否先接取了循环任务 */
                        this.isRefreshSpecialQuest = false;
                        this.tracktask = new Laya.Dictionary();
                        this.accepttask = new Laya.Dictionary();
                        this.maintask = new Laya.Dictionary();
                        this.acceptableTask = [];
                        this.schooltask = new Laya.Dictionary();
                        this.renwuid = new Laya.Dictionary();
                        this.taskStateDic = new Laya.Dictionary();
                        TaskModel._instance = this;
                    }
                    TaskModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new TaskModel();
                        }
                        return this._instance;
                    };
                    TaskModel.clearModelData = function () {
                        task.models.TaskModel._instance.tracktask = new Laya.Dictionary();
                        task.models.TaskModel._instance.accepttask = new Laya.Dictionary();
                        task.models.TaskModel._instance.maintask = new Laya.Dictionary();
                        task.models.TaskModel._instance.acceptableTask = [];
                        task.models.TaskModel._instance.schooltask = new Laya.Dictionary();
                        task.models.TaskModel._instance.renwuid = new Laya.Dictionary();
                        task.models.TaskModel._instance.taskStateDic = new Laya.Dictionary();
                        task.models.TaskModel._instance.chattype = 0;
                        task.models.TaskModel._instance.tjxltansuo = -1;
                        task.models.TaskModel._instance.tjxlExploreMapId = 0;
                        task.models.TaskModel._instance.datas = new Laya.Dictionary();
                        task.models.TaskModel._instance.refreshTaskDatas = new Laya.Dictionary();
                        task.models.TaskModel._instance.isAbandon = false;
                        task.models.TaskModel._instance.isRefreshSpecialQuest = false;
                    };
                    /** 获取该副本的单轮最大环数-用于任务刷新判断 */
                    TaskModel.prototype.getRound = function (questid) {
                        var schoolTasks = this.cSchoolTaskDataByType.get(questid);
                        for (var i = 0; i < schoolTasks.length; i++) {
                            if (HudModel.getInstance().levelNum >= schoolTasks[i].levelmin && HudModel.getInstance().levelNum <= schoolTasks[i].levelmax) {
                                return schoolTasks[i].maxnum;
                            }
                        }
                    };
                    return TaskModel;
                }());
                models.TaskModel = TaskModel;
            })(models = task.models || (task.models = {}));
        })(task = modules.task || (modules.task = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TaskModel.js.map