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
* LJM
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var achievent;
        (function (achievent) {
            var models;
            (function (models) {
                /**成就系统红点 */
                models.ACHIEVEPOINT_EVENT = "achievePoint";
                /**隐藏成就系统红点 */
                models.HIDEACHIEVEPOINT_EVENT = "hideAchievePoint";
                var AchieventProxy = /** @class */ (function (_super) {
                    __extends(AchieventProxy, _super);
                    function AchieventProxy() {
                        var _this = _super.call(this) || this;
                        AchieventProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    AchieventProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new AchieventProxy();
                        }
                        return this._instance;
                    };
                    AchieventProxy.prototype.init = function () {
                        models.AchieventModel.getInstance();
                        this.addNetworkListener();
                        /** z指引历程配置表 */
                        Laya.loader.load("common/data/temp/mission.cguidecourse.bin", Handler.create(this, this.onloadedGuideCourseComplete), null, Loader.BUFFER);
                        /** z指引历程页签表配置表  */
                        Laya.loader.load("common/data/temp/mission.cguidecourselabel.bin", Handler.create(this, this.onloadedGuideCourseLabelComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/role.schoolmasterskillinfo.bin", Handler.create(this, this.onloadedSchoolmasterSkillInfoComplete), null, Loader.BUFFER);
                    };
                    AchieventProxy.prototype.onloadedSchoolmasterSkillInfoComplete = function () {
                        console.log("schoolmasterskillinfo职业师傅配置表表格加载完毕------ completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/role.schoolmasterskillinfo.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.AchieventModel.getInstance().MasterNpcDic, game.data.template.SchoolMasterSkillInfoBaseVo, "id");
                        console.log("onloadedCreateRoleConfigComplete:", models.AchieventModel.getInstance().MasterNpcDic);
                    };
                    AchieventProxy.prototype.onloadedGuideCourseComplete = function () {
                        console.log("cguidecourse表格加载完毕------ completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cguidecourse.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.AchieventModel.getInstance().guideCourseDic, game.data.template.GuideCourseBaseVo, "id");
                        console.log("onloadedCreateRoleConfigComplete:", models.AchieventModel.getInstance().guideCourseDic);
                    };
                    AchieventProxy.prototype.onloadedGuideCourseLabelComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cguidecourselabel.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.AchieventModel.getInstance().guideCourseLabelDic, game.data.template.GuideCourseLabelBaseVo, "id");
                        console.log("onloadedSchoolInfoComplete:", models.AchieventModel.getInstance().guideCourseLabelDic);
                    };
                    /** 添加监听  */
                    AchieventProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SGetArchiveInfo, this, this.onSGetArchiveInfo);
                    };
                    /** 移除监听  */
                    AchieventProxy.prototype.removeNetworkListener = function () {
                        Network._instance.removeHanlder(ProtocolsEnum.SGetArchiveInfo, this, this.onSGetArchiveInfo);
                    };
                    /** 请求成就返回  */
                    AchieventProxy.prototype.onSGetArchiveInfo = function (optcode, msg) {
                        console.log("请求成就返回......AchieventProxy.......................................................");
                        var achieventInfoVo = new Array();
                        achieventInfoVo = msg.archiveinfos;
                        if (achieventInfoVo.length == 0)
                            return;
                        /** 清空数据  */
                        models.AchieventModel._instance.AchieventInfo = [];
                        models.AchieventModel._instance.AchieventInfo = achieventInfoVo;
                        //将所有成就存进map中
                        for (var i = 0; i < achieventInfoVo.length; i++) {
                            models.AchieventModel._instance.achieventDic.set(achieventInfoVo[i].archiveid, achieventInfoVo[i].state);
                        }
                        var key = true;
                        //如果有可以领取的成就，发送协议，通知主界面显示成就红点
                        for (var i = 0; i < models.AchieventModel._instance.achieventDic.keys.length; i++) {
                            if (models.AchieventModel._instance.achieventDic.values[i] == 1) {
                                AchieventProxy._instance.event(models.ACHIEVEPOINT_EVENT);
                                key = false;
                            }
                        }
                        //如果没有可以领取的成就，发送协议，通知主界面隐藏成就红点
                        if (key)
                            AchieventProxy._instance.event(models.HIDEACHIEVEPOINT_EVENT);
                    };
                    return AchieventProxy;
                }(hanlder.ProxyBase));
                models.AchieventProxy = AchieventProxy;
            })(models = achievent.models || (achievent.models = {}));
        })(achievent = modules.achievent || (modules.achievent = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=AchieventProxy.js.map