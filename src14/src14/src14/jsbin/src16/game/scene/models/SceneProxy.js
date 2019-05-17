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
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            /**模型创建 */
            models.MODEL_CREATE = "model_create";
            /**人物移动*/
            models.ROLE_MOVE = "role_move";
            /**其他玩家移动*/
            models.OTHERROLE_MOVE = "otherrole_move";
            /**模型清除*/
            models.MODEL_CELAR = "model_clear";
            /**npc对话*/
            models.NPC_DIALOG = "npc_dialog";
            /**停止移动*/
            models.MOVE_STOP = "move_stop";
            /**路径描绘*/
            models.MOVE_PATH = "move_path";
            /**小地图移动*/
            models.SMALL_MOVE = "small_move";
            /**队伍移动*/
            models.TEAM_MOVE = "team_move";
            /**自动移动*/
            models.AUTO_MOVE = "auto_move";
            /**队伍状态*/
            models.TEAM_STATE = "team_state";
            /**选择npc*/
            models.NPC_SELECT = "npc_select";
            /**选择玩家*/
            models.ROLE_SELECT = "role_select";
            /**任务提示*/
            models.TASK_TIPS = "task_tips";
            var SceneProxy = /** @class */ (function (_super) {
                __extends(SceneProxy, _super);
                function SceneProxy() {
                    var _this = _super.call(this) || this;
                    SceneProxy._instance = _this;
                    return _this;
                    //this.init();
                }
                SceneProxy.getInstance = function () {
                    if (!this._instance) {
                        this._instance = new SceneProxy();
                    }
                    return this._instance;
                };
                SceneProxy.prototype.init = function () {
                    models.SceneModel.getInstance();
                    this.addNetworkListener();
                    //RequesterProtocols._instance.c2s_CReqNewHandBattle();
                    //RequesterProtocols._instance.c2s_check_move(1,[],1);
                    //RequesterProtocols._instance.c2s_CSetAutoBattle(1);
                    //RequesterProtocols._instance.c2s_CSetCharOpt(1,1);
                    //RequesterProtocols._instance.c2s_CSendAction(1,1,1);
                    //RequesterProtocols._instance.c2s_CRequestApplyList();
                    //RequesterProtocols._instance.c2s_CSendRoundPlayEnd([1,1,1]);
                };
                // 添加监听
                SceneProxy.prototype.addNetworkListener = function () {
                    Network._instance.addHanlder(ProtocolsEnum.SSendBattleStart, this, this.onSSendBattleStart);
                    Network._instance.addHanlder(ProtocolsEnum.SSendRoleInitAttrs, this, this.onSSendRoleInitAttrs);
                    Network._instance.addHanlder(ProtocolsEnum.SRefreshRoleData, this, this.onSRefreshRoleData);
                    Network._instance.addHanlder(ProtocolsEnum.SSendAlreadyUseItem, this, this.onSSendAlreadyUseItem);
                    Network._instance.addHanlder(ProtocolsEnum.SSendAddFighters, this, this.onSSendAddFighters);
                    Network._instance.addHanlder(ProtocolsEnum.SUpdateRoleSceneState, this, this.onSUpdateRoleSceneState);
                    Network._instance.addHanlder(ProtocolsEnum.SSendRoundScript, this, this.onSSendRoundScript);
                    Network._instance.addHanlder(ProtocolsEnum.SSendRoundPlayEnd, this, this.onSSendRoundPlayEnd);
                    Network._instance.addHanlder(ProtocolsEnum.SSendRoundStart, this, this.onSSendRoundStart);
                    Network._instance.addHanlder(ProtocolsEnum.SBuffChangeResult, this, this.onSBuffChangeResult);
                    Network._instance.addHanlder(ProtocolsEnum.SRefreshNaiJiu, this, this.onSRefreshNaiJiu);
                    Network._instance.addHanlder(ProtocolsEnum.SRspRoleInfo, this, this.onSRspRoleInfo);
                    Network._instance.addHanlder(ProtocolsEnum.SRefreshCurrency, this, this.onSRefreshCurrency);
                    Network._instance.addHanlder(ProtocolsEnum.SSendBattleEnd, this, this.onSSendBattleEnd);
                    /**添加人物到场景*/
                    Network._instance.addHanlder(ProtocolsEnum.SAddUserScreen, this, this.onAddUserScreen);
                    /**删除离开场景的人物与NPC*/
                    Network._instance.addHanlder(ProtocolsEnum.SRemoveUserScreen, this, this.onRemoveScreen);
                    /**人物移动*/
                    Network._instance.addHanlder(ProtocolsEnum.SRoleMove, this, this.onRoleMove);
                    /**人物停止*/
                    Network._instance.addHanlder(ProtocolsEnum.SRoleStop, this, this.onRoleStopMove);
                    /**访问NPC*/
                    Network._instance.addHanlder(ProtocolsEnum.SVisitNpc, this, this.onVisitNpc);
                    /**返回队伍信息*/
                    Network._instance.addHanlder(ProtocolsEnum.SSetRoleTeamInfo, this, this.onRoleTeamInfo);
                };
                // 移除监听
                SceneProxy.prototype.removeNetworkListener = function () {
                };
                SceneProxy.prototype.onSSendBattleStart = function (optcode, msg) {
                };
                SceneProxy.prototype.onSSendRoleInitAttrs = function (optcode, msg) {
                };
                SceneProxy.prototype.onSRefreshRoleData = function (optcode, msg) {
                };
                SceneProxy.prototype.onSSendAlreadyUseItem = function (optcode, msg) {
                };
                SceneProxy.prototype.onSSendAddFighters = function (optcode, msg) {
                    models.SceneModel.getInstance().fighterList = msg.fighterList;
                    models.SceneModel.getInstance().fighterList0 = msg.fighterList0;
                    models.SceneModel.getInstance().fighterList1 = msg.fighterList1;
                    console.log("SceneProxy onSSendAddFighters:", msg);
                };
                SceneProxy.prototype.onSUpdateRoleSceneState = function (optcode, msg) {
                    var roleState = new Laya.Dictionary;
                    var scenestate = new Laya.Dictionary;
                    /** key 角色id value 场景状态 */
                    scenestate.set(msg.roleId, msg.scenestate);
                    models.SceneModel.getInstance().roleStateInScene.set(msg.roleId, msg.scenestate);
                    roleState.set("sceneState", scenestate);
                    this.event(models.TEAM_STATE, roleState);
                };
                //添加到场景的人物以及NPC
                SceneProxy.prototype.onAddUserScreen = function (optcode, msg) {
                    console.log("----添加到场景的人物以及NPC：" + msg.rolelist + "," + msg.npclist);
                    var rolelist = new Laya.Dictionary();
                    var npclist = new Laya.Dictionary();
                    console.log(models.SceneModel.getInstance().rolelist.values);
                    for (var index = 0; index < msg.rolelist.length; index++) {
                        var role = msg.rolelist[index];
                        models.SceneModel.getInstance().rolelist.set(role.rolebasicOctets.roleid, role);
                        rolelist.set(role.rolebasicOctets.roleid, role);
                    }
                    for (var index = 0; index < msg.npclist.length; index++) {
                        var npc = msg.npclist[index];
                        models.SceneModel.getInstance().npclist.set(npc.npckey, npc);
                        npclist.set(npc.npckey, npc);
                    }
                    console.log(models.SceneModel.getInstance().smallallnpc.values);
                    if (models.SceneModel.getInstance().smallallnpc.get(models.SceneModel.getInstance().smallallnpc.keys[0]) == null) {
                        models.SceneModel.getInstance().smallallnpc = models.SceneModel.getInstance().npclist;
                    }
                    models.SceneModel.getInstance().newrolelist = rolelist;
                    models.SceneModel.getInstance().newnpclist = npclist;
                    models.SceneProxy.getInstance().event(models.MODEL_CREATE);
                    if (game.modules.activity.models.ActivityModel._instance.JingYingNpc.get(game.modules.mainhud.models.HudModel.getInstance().sceneid) && npclist.values.length > 0) {
                        game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.NEWTASK);
                    }
                };
                //离开场景的人物以及NPC
                SceneProxy.prototype.onRemoveScreen = function (optcode, msg) {
                    var roleinfo = new Laya.Dictionary();
                    var npcinfo = new Laya.Dictionary();
                    for (var index = 0; index < msg.roleids.length; index++) {
                        roleinfo.set(msg.roleids[index], models.SceneModel.getInstance().rolelist.get(msg.roleids[index]));
                        models.SceneModel.getInstance().rolelist.remove(msg.roleids[index]);
                    }
                    for (var index = 0; index < msg.npcids.length; index++) {
                        npcinfo.set(msg.npcids[index], models.SceneModel.getInstance().npclist.get(msg.npcids[index]));
                        models.SceneModel.getInstance().npclist.remove(msg.npcids[index]);
                    }
                    models.SceneProxy.getInstance().event(models.MODEL_CELAR, [roleinfo, npcinfo]);
                };
                //人物移动
                SceneProxy.prototype.onRoleMove = function (optcode, msg) {
                    if (msg.roleid == game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid) {
                        models.SceneProxy.getInstance().event(models.ROLE_MOVE, [msg.destPos]);
                    }
                    else {
                        models.SceneProxy.getInstance().event(models.OTHERROLE_MOVE, [msg.roleid, msg.destPos]);
                    }
                    var role = new models.RoleBasicVo();
                    role = models.SceneModel.getInstance().rolelist.get(msg.roleid);
                    role.pos = msg.destPos;
                    models.SceneModel.getInstance().rolelist.set(msg.roleid, role);
                };
                //人物停止移动
                SceneProxy.prototype.onRoleStopMove = function (optcode, msg) {
                    var role = models.SceneModel.getInstance().rolelist.get(msg.roleid);
                    role.pos = msg.pos;
                    models.SceneModel.getInstance().rolelist.set(msg.roleid, role);
                    if (msg.roleid == game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid) {
                        models.SceneProxy.getInstance().event(models.ROLE_MOVE, [msg.pos]);
                    }
                    else {
                        models.SceneProxy.getInstance().event(models.OTHERROLE_MOVE, [msg.roleid, msg.pos]);
                    }
                };
                //访问NPC
                SceneProxy.prototype.onVisitNpc = function (optcode, msg) {
                    models.SceneModel.getInstance().npckey = msg.npckey;
                    models.SceneModel.getInstance().npcservices = msg.services;
                    models.SceneModel.getInstance().scenarioquests = msg.scenarioquests;
                    models.SceneProxy.getInstance().event(models.NPC_DIALOG, [msg.npckey, msg.services, msg.scenarioquests]);
                };
                /**创建队伍时返回的消息*/
                SceneProxy.prototype.onRoleTeamInfo = function (optcode, msg) {
                    var teaminfo = new models.TeamOctetsVo();
                    teaminfo.teamid = msg.teamid;
                    teaminfo.normalnum = msg.teamnormalnum;
                    teaminfo.teamindexstate = (msg.teamindex << 4) + msg.teamstate; //将teamindex第几个成员，teamstate在队伍中的状态
                    teaminfo.hugindex = 0;
                    var role = models.SceneModel.getInstance().rolelist.get(msg.roleid);
                    if (role) {
                        if (msg.teamid == 0) { //队伍ID为零则为离开队伍
                            role.rolebasicOctets.datas.remove(2); //2为队伍key 移除队伍信息
                        }
                        else {
                            role.rolebasicOctets.datas.set(2, teaminfo); //添加队伍信息
                        }
                    }
                    this.event(models.TEAM_STATE);
                };
                // 服务端发送回合制战斗脚本
                SceneProxy.prototype.onSSendRoundScript = function (optcode, msg) {
                    console.log("SceneProxy onSSendRoundScript:", msg);
                };
                SceneProxy.prototype.onSSendRoundPlayEnd = function (optcode, msg) {
                };
                SceneProxy.prototype.onSSendRoundStart = function (optcode, msg) {
                };
                SceneProxy.prototype.onSBuffChangeResult = function (optcode, msg) {
                };
                SceneProxy.prototype.onSRefreshNaiJiu = function (optcode, msg) {
                };
                SceneProxy.prototype.onSRspRoleInfo = function (optcode, msg) {
                };
                SceneProxy.prototype.onSRefreshCurrency = function (optcode, msg) {
                };
                SceneProxy.prototype.onSSendBattleEnd = function (optcode, msg) {
                };
                return SceneProxy;
            }(hanlder.ProxyBase));
            models.SceneProxy = SceneProxy;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=SceneProxy.js.map