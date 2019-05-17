/**
* 场景
*/
var DataType;
(function (DataType) {
    /**展示宠物*/
    DataType[DataType["SHOW_PET"] = 1] = "SHOW_PET";
    /**组队信息*/
    DataType[DataType["TEAM_INFO"] = 2] = "TEAM_INFO";
    /**称谓id*/
    DataType[DataType["TITLE_ID"] = 3] = "TITLE_ID";
    /**称谓名字*/
    DataType[DataType["TITLE_NAME"] = 4] = "TITLE_NAME";
    /**招牌名称 */
    DataType[DataType["STALL_NAME"] = 5] = "STALL_NAME";
    /**人物造型模板 */
    DataType[DataType["MODEL_TEMPLATE"] = 6] = "MODEL_TEMPLATE";
    /**头饰造型 */
    DataType[DataType["HEADRESS_SHAPE"] = 7] = "HEADRESS_SHAPE";
    /**地图状态 */
    DataType[DataType["SCENE_STATE"] = 8] = "SCENE_STATE";
    /**当前装备武器的baseID int 没装备则为0 */
    DataType[DataType["WEAPON_BASEID"] = 9] = "WEAPON_BASEID";
    /**当前装备武器的颜色 byte 1为白色，2为绿色。。。6为暗金色 */
    DataType[DataType["WEAPON_COLOR"] = 10] = "WEAPON_COLOR";
    /**角色变造型时的造型 */
    DataType[DataType["ROLE_ACTUALLY_SHAPE"] = 12] = "ROLE_ACTUALLY_SHAPE";
    /**角色正在做的持续性动作 */
    DataType[DataType["PLAYING_ACTION"] = 13] = "PLAYING_ACTION";
    /**摊位招牌id */
    DataType[DataType["STALL_BOARD"] = 14] = "STALL_BOARD";
    /**logo id */
    DataType[DataType["FOOT_LOGO_ID"] = 15] = "FOOT_LOGO_ID";
    /**觉醒状态 */
    DataType[DataType["AWAKE_STATE"] = 16] = "AWAKE_STATE";
    /**跟随npc */
    DataType[DataType["FOLLOW_NPC"] = 17] = "FOLLOW_NPC";
    /**巡游id int,0为没有巡游，非0为巡游表的id */
    DataType[DataType["CRUISE"] = 18] = "CRUISE";
    /**装备特效 */
    DataType[DataType["EFFECT_EQUIP"] = 19] = "EFFECT_EQUIP";
    /**巡游id2 int,路线id */
    DataType[DataType["CRUISE2"] = 20] = "CRUISE2";
    /**巡游id3 int,路线id */
    DataType[DataType["CRUISE3"] = 21] = "CRUISE3";
})(DataType || (DataType = {}));
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var SceneModel = /** @class */ (function () {
                function SceneModel() {
                    /** 包含傀儡的职业 */
                    this.kuileiOccupation = [zhiye.tianlei, zhiye.xuanming];
                    /** 场景角色状态 */
                    this.roleStateInScene = new Laya.Dictionary();
                    SceneModel._instance = this;
                    this.rolelist = new Laya.Dictionary();
                    this.npclist = new Laya.Dictionary();
                    this.newrolelist = new Laya.Dictionary();
                    this.newnpclist = new Laya.Dictionary();
                    this.smallallnpc = new Laya.Dictionary();
                }
                SceneModel.clearModelData = function () {
                    SceneModel.getInstance().roleStateInScene.clear();
                };
                SceneModel.getInstance = function () {
                    if (!this._instance) {
                        this._instance = new SceneModel();
                    }
                    return this._instance;
                };
                return SceneModel;
            }());
            models.SceneModel = SceneModel;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=SceneModel.js.map