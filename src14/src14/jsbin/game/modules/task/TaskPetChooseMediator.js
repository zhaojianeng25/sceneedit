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
* 任务上交宠物
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var task;
        (function (task) {
            var TaskPetChooseMediator = /** @class */ (function (_super) {
                __extends(TaskPetChooseMediator, _super);
                function TaskPetChooseMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.TaskPetChooseUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._viewUI.confirm_btn.on(LEvent.MOUSE_DOWN, _this, _this.confirm);
                    return _this;
                }
                /**任务id npckey 提交的类型*/
                TaskPetChooseMediator.prototype.init = function (taskid, npckey, submittype, petid) {
                    this.show();
                    this.waittime = 0;
                    var strinfo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3];
                    this.taskid = taskid;
                    this.npckey = npckey;
                    this.submittype = submittype;
                    this.allpetkey = [];
                    this.lastbox = null;
                    var data = [];
                    if (taskid == 1010000) { //师门任务
                        var taskinfo = game.modules.task.models.TaskModel.getInstance().schooltask.get(taskid);
                        //遍历已有的宠物
                        for (var p in game.modules.pet.models.PetModel.getInstance().pets.keys) {
                            var petinfo = game.modules.pet.models.PetModel.getInstance().pets.get(game.modules.pet.models.PetModel.getInstance().pets.keys[p]);
                            var allpetbase = PetModel.getInstance().petCPetAttrData[petinfo.id];
                            var icondata = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid];
                            if (taskinfo.dstitemid == petinfo.id && game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex != petinfo.key) { //是否拥有该宠物
                                this.allpetkey.push(petinfo.key);
                                data.push({ petChooseName_lab: petinfo.name, petChooseLv_lab: petinfo.level + strinfo.msg, peticon_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png" });
                            }
                        }
                    }
                    else if (taskid != 0 && taskid != undefined) { //如果任务id不为零和无值
                        //获取天机仙令任务配置表
                        var _tjxlConfig = modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlConfig;
                        if (_tjxlConfig[taskid]) { //如果是属于天机仙令的任务
                            if (petid) {
                                var _petIndex = game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex;
                                //遍历已有的宠物
                                for (var p in game.modules.pet.models.PetModel.getInstance().pets.keys) {
                                    var petinfo = game.modules.pet.models.PetModel.getInstance().pets.get(game.modules.pet.models.PetModel.getInstance().pets.keys[p]);
                                    var allpetbase = PetModel.getInstance().petCPetAttrData[petinfo.id];
                                    var icondata = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid];
                                    if (petid[0] == petinfo.id && _petIndex != petinfo.key) { //是否拥有该宠物
                                        this.allpetkey.push(petinfo.key);
                                        data.push({ petChooseName_lab: petinfo.name, petChooseLv_lab: petinfo.level + strinfo.msg, peticon_img: "common/icon/avatarpet/" + icondata.littleheadID + ".png" });
                                    }
                                }
                            }
                        }
                    }
                    this._viewUI.pet_list.array = data;
                    this._viewUI.pet_list.vScrollBarSkin = "";
                    this._viewUI.pet_list.repeatY = data.length;
                    this._viewUI.pet_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.pet_list.scrollBar.elasticDistance = 50;
                    this._viewUI.pet_list.renderHandler = new Laya.Handler(this, this.initselect);
                    if (AutoHangUpModels.getInstance().autotask == 1) { //自动任务 延迟提交
                        Laya.timer.loop(1000, this, this.submit);
                    }
                };
                /**选择宠物初始化列表响应事件*/
                TaskPetChooseMediator.prototype.initselect = function (cell, index) {
                    var btn = cell.getChildByName("petselect_btn");
                    if (index == 0) {
                        this.selectpet(cell, index);
                    }
                    btn.on(LEvent.MOUSE_DOWN, this, this.selectpet, [cell, index]);
                };
                /**选择提交宠物*/
                TaskPetChooseMediator.prototype.selectpet = function (cell, index) {
                    this.currentselect = index;
                    if (this.lastbox) { //是否多次选择
                        var lastbtn = this.lastbox.getChildByName("petselect_btn");
                        lastbtn.selected = false;
                    }
                    var btn = cell.getChildByName("petselect_btn");
                    btn.selected = true;
                    this.lastbox = cell;
                    var strinfo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3];
                    var petinfo = game.modules.pet.models.PetModel.getInstance().pets.get(this.allpetkey[index]);
                    var allpetbase = PetModel.getInstance().petCPetAttrData[petinfo.id];
                    var icondata = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid];
                    this._viewUI.petName_lab.text = petinfo.name;
                    this._viewUI.petLv_lab.text = petinfo.level + strinfo.msg;
                    this._viewUI.attack_lab.text = petinfo.attackapt + "";
                    this._viewUI.defense_lab.text = petinfo.defendapt + "";
                    this._viewUI.hp_lab.text = petinfo.phyforceapt + "";
                    this._viewUI.mp_lab.text = petinfo.magicapt + "";
                    this._viewUI.speed_lab.text = petinfo.speedapt + "";
                    this._viewUI.life_lab.text = petinfo.life + "";
                    this._viewUI.growup_lab.text = petinfo.growrate / 1000 + "";
                    this._viewUI.skill_lab.text = petinfo.skills.length + "";
                    this._viewUI.peticon_img.skin = "common/icon/avatarpet/" + icondata.littleheadID + ".png";
                };
                /**上交道具或宠物*/
                TaskPetChooseMediator.prototype.confirm = function () {
                    //上交道具或宠物
                    var petinfo = game.modules.pet.models.PetModel.getInstance().pets.get(this.allpetkey[this.currentselect]);
                    var submit = new game.modules.task.models.SubmitUnitVo();
                    var submitinfo = [];
                    submit.key = petinfo.key;
                    submit.num = 1;
                    submitinfo[0] = submit;
                    if (this.npckey != 0) { //是否上交给NPC
                        RequesterProtocols._instance.c2s_submit_2npc(this.taskid, this.npckey, this.submittype, submitinfo);
                    }
                    else { //从天机仙令界面上交宠物，不需要NPC，所要NPC的id为0
                        game.modules.tianjixianling.models.TianJiXianLingProxy.getInstance().event(game.modules.tianjixianling.models.SUBMIT_PET, [submitinfo]);
                    }
                    this.hide();
                };
                TaskPetChooseMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                TaskPetChooseMediator.prototype.hide = function () {
                    Laya.timer.clear(this, this.submit);
                    if (AutoHangUpModels.getInstance().autotask == 0) { //非自动任务清楚其他状态
                        AutoHangUpModels.getInstance().istaskwalk = 0;
                        AutoHangUpModels.getInstance().notaketimer = 0;
                    }
                    _super.prototype.hide.call(this);
                };
                /**延迟提交*/
                TaskPetChooseMediator.prototype.submit = function () {
                    this.waittime++;
                    if (this.waittime >= 3) { //是否超过3秒
                        this.confirm();
                        Laya.timer.clear(this, this.submit);
                    }
                };
                TaskPetChooseMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return TaskPetChooseMediator;
            }(game.modules.UiMediator));
            task.TaskPetChooseMediator = TaskPetChooseMediator;
        })(task = modules.task || (modules.task = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TaskPetChooseMediator.js.map