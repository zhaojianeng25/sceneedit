var battle;
(function (battle) {
    var BattleProxy = /** @class */ (function () {
        function BattleProxy(_app) {
            this._app = _app;
            this.StageInfoData = {};
            this.StageInfoData2 = {};
            /** 技能相关表/j技能阶段串联表 */
            this.SkillInfoData = {};
            /** 战斗底图表 */
            this.BattleBackGroundData = {};
            /** 战斗背景音乐表 */
            this.BattleBackGroundMusicData = {};
            /** 战斗AI/AI动作表 */
            this.BattleAIConfigData = {};
            this.SkillTypeData = {};
            this.resolutiondata = {};
            this.BuffConfigData = {};
            // 特效配置表
            this.EffectPathConfigData = {};
            // 非剧情特效
            this.EffectPathNoneDramaConfigData = {};
            BattleProxy._instance = this;
            battle.NotifyMgr.register(0 /* BattleEnd */, this, this.onBattleEnd);
            battle.NotifyMgr.register(5 /* BattleDrugInUse */, this, this.onSelectTarget);
        }
        Object.defineProperty(BattleProxy.prototype, "battle", {
            get: function () {
                return this._battle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BattleProxy, "instance", {
            get: function () {
                return BattleProxy._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BattleProxy, "inBattle", {
            get: function () {
                if (BattleProxy.instance && BattleProxy.instance.battle) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        BattleProxy.prototype.init = function () {
            // 加载数据表
            Laya.loader.load("common/data/temp/battle.cstageinfo.bin", Handler.create(this, this.onloadedStageInfoBaseVoComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/battle.cstageinfo2.bin", Handler.create(this, this.onloadedStageInfo2BaseVoComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/battle.cskillinfo.bin", Handler.create(this, this.onloadedSkillInfoBaseVoComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/battle.cbattlebackground.bin", Handler.create(this, this.onloadedBattleBackGroundBaseVoComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/battle.cbattlebackmusic.bin", Handler.create(this, this.onloadedBattleBackMusicBaseVoComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/battle.cbattleaiconfig.bin", Handler.create(this, this.onloadedBattleAIConfigBaseVoComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/skill.cskilltypeconfig.bin", Handler.create(this, this.onloadedSkillTypeConfigComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/SysConfig.resolution.bin", Handler.create(this, this.onloadedResolutionComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/buff.cbuffconfig.bin", Handler.create(this, this.onloadedBuffConfigComplete), null, Loader.BUFFER);
            Laya.loader.load("common/data/temp/EffectPath.ceffectpath.bin", Handler.create(this, this.onloadedCEffectPathConfigComplete), null, Loader.BUFFER);
            // 监听战斗开始和结束协议
            Network._instance.addHanlder(ProtocolsEnum.SSendBattleStart, this, this.onSSendBattleStart);
            // 监听战斗开始和结束协议(观战)
            Network._instance.addHanlder(ProtocolsEnum.SSendWatchBattleStart, this, this.onSSendWatchBattleStart);
        };
        /** 技能相关表/j技能阶段表 */
        BattleProxy.prototype.onloadedStageInfoBaseVoComplete = function () {
            console.log("cstageinfo 表格加载完毕 completed");
            var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cstageinfo.bin");
            var data = new Byte(arrayBuffer);
            var size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, this.StageInfoData, StageInfoBaseVo, "id");
            console.log("cstageinfo.configData:", this.StageInfoData);
        };
        /** 技能相关表/j技能阶段表_远程 */
        BattleProxy.prototype.onloadedStageInfo2BaseVoComplete = function () {
            console.log("cstageinfo2 表格加载完毕 completed");
            var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cstageinfo2.bin");
            var data = new Byte(arrayBuffer);
            var size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, this.StageInfoData2, StageInfoBaseVo, "id");
            console.log("cstageinfo2.configData:", this.StageInfoData2);
        };
        //技能相关表/j技能阶段串联表
        BattleProxy.prototype.onloadedSkillInfoBaseVoComplete = function () {
            console.log("cskillinfo 表格加载完毕 completed");
            var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cskillinfo.bin");
            var data = new Byte(arrayBuffer);
            var size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, this.SkillInfoData, SkillInfoBaseVo, "id");
            console.log("cskillinfo.configData:", this.SkillInfoData);
        };
        BattleProxy.prototype.onloadedBattleBackGroundBaseVoComplete = function () {
            console.log("cbattlebackground 表格加载完毕 completed");
            var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cbattlebackground.bin");
            var data = new Byte(arrayBuffer);
            var size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, this.BattleBackGroundData, BattleBackGroundBaseVo, "id");
            console.log("cbattlebackground.configData:", this.BattleBackGroundData);
        };
        BattleProxy.prototype.onloadedBattleBackMusicBaseVoComplete = function () {
            console.log("cbattlebackmusic 表格加载完毕 completed");
            var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cbattlebackmusic.bin");
            var data = new Byte(arrayBuffer);
            var size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, this.BattleBackGroundMusicData, BattleBackGroundBaseVo, "id");
            console.log("cbattlebackmusic.configData:", this.BattleBackGroundMusicData);
        };
        BattleProxy.prototype.onloadedBattleAIConfigBaseVoComplete = function () {
            console.log("cbattleaiconfig 表格加载完毕 completed");
            var arrayBuffer = Laya.loader.getRes("common/data/temp/battle.cbattleaiconfig.bin");
            var data = new Byte(arrayBuffer);
            var size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, this.BattleAIConfigData, BattleAIConfigBaseVo, "id");
            console.log("cbattleaiconfig.configData:", this.BattleAIConfigData);
        };
        /** 技能类型*/
        BattleProxy.prototype.onloadedSkillTypeConfigComplete = function () {
            console.log("SkillTypeConfigData表格加载完毕 completed");
            var arrayBuffer = Laya.loader.getRes("common/data/temp/skill.cskilltypeconfig.bin");
            var data = new Byte(arrayBuffer);
            var size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, this.SkillTypeData, SkillTypeConfigBaseVo, "id");
            //	console.log("SkillTypeConfigData:", this.skillTypeConfigData);
        };
        /**f分辨率配置 */
        BattleProxy.prototype.onloadedResolutionComplete = function () {
            console.log("Resolution表格加载完毕 completed");
            var arrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.resolution.bin");
            var data = new Byte(arrayBuffer);
            var size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, this.resolutiondata, ResolutionBaseVo, "id");
            console.log("Resolution表格加载完毕 Resolution.configData:", this.resolutiondata);
            var resolutionBaseVo = this.resolutiondata["7"];
            battle.SceneBattleRes.BOTTOM_POSX = [];
            battle.SceneBattleRes.BOTTOM_POSX = [];
            battle.SceneBattleRes.BOTTOM_POSY = [];
            battle.SceneBattleRes.TOP_POSX = [];
            battle.SceneBattleRes.TOP_POSY = [];
            var elementArr;
            var posX;
            var posY;
            /** 战斗站位 */
            for (var index = 0; index < resolutionBaseVo.positionsByresolution.length; index++) {
                elementArr = (resolutionBaseVo.positionsByresolution[index]).split(";");
                posX = parseInt(elementArr[0]);
                posY = parseInt(elementArr[1]);
                if (index < battle.SceneBattleRes.MAX_POS) {
                    battle.SceneBattleRes.BOTTOM_POSX.push(posX);
                    battle.SceneBattleRes.BOTTOM_POSY.push(posY);
                }
                else {
                    battle.SceneBattleRes.TOP_POSX.push(posX);
                    battle.SceneBattleRes.TOP_POSY.push(posY);
                }
            }
            /** 观战阵位加载 */
            for (var _index = 0; _index < resolutionBaseVo.positionsBywatch.length; _index++) {
                elementArr = (resolutionBaseVo.positionsBywatch[_index]).split(";");
                posX = parseInt(elementArr[0]);
                posY = parseInt(elementArr[1]);
                battle.SceneBattleRes.MIDDLE_POX.push(posX);
                battle.SceneBattleRes.MIDDLE_POY.push(posY);
            }
            console.log("-----init pos  index = ", index, "  x = ", posX, "  y = ", posY);
            console.log("Resolution解析完毕Bottom:", battle.SceneBattleRes.BOTTOM_POSX.length, battle.SceneBattleRes.BOTTOM_POSY.length);
            console.log("Resolution解析完毕Top:", battle.SceneBattleRes.TOP_POSX.length, battle.SceneBattleRes.TOP_POSY.length);
        };
        //c持续性buff表
        BattleProxy.prototype.onloadedBuffConfigComplete = function () {
            console.log("BuffConfig表格加载完毕 completed");
            var arrayBuffer = Laya.loader.getRes("common/data/temp/buff.cbuffconfig.bin");
            var data = new Byte(arrayBuffer);
            var size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, this.BuffConfigData, BuffConfigBaseVo, "id");
            //	console.log("BuffConfig.configData:",this.BuffConfigData);
        };
        BattleProxy.prototype.onloadedCEffectPathConfigComplete = function () {
            console.log("CEffectPath表格加载完毕 completed");
            var arrayBuffer = Laya.loader.getRes("common/data/temp/EffectPath.ceffectpath.bin");
            var data = new Byte(arrayBuffer);
            var size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, this.EffectPathConfigData, CEffectPathBaseVo, "id");
            //console.log("RoleRColorModel.configData:",this.ceffectPathConfigData);
        };
        BattleProxy.prototype.onloadedCEffectPathNoneDramaConfigComplete = function () {
            console.log("CEffectPathNoneDrama表格加载完毕 completed");
            var arrayBuffer = Laya.loader.getRes("common/data/temp/EffectPath.ceffectpathnonedrama.bin");
            var data = new Byte(arrayBuffer);
            var size = game.data.ProjTemplate.readDataHead(data);
            ByteArrayUtils.FillList(data, size, this.EffectPathNoneDramaConfigData, CEffectPathNoneDramaBaseVo, "id");
            //	console.log("RoleRColorModel.configData:",this.ceffectPathNoneDramaConfigData);
        };
        /**
         * 战斗开始
         * @param optcode
         * @param msg
         */
        BattleProxy.prototype.onSSendBattleStart = function (optcode, msg) {
            console.log(">> BattleMgr.onSSendBattleStart");
            this._app.aCotrller.stop();
            if (this._battle) {
                console.warn("------ 已经在战场中");
                return;
            }
            // 切换战斗背景音乐
            var backMusic = this.BattleBackGroundMusicData[msg.backmusic];
            Laya.SoundManager.playMusic(backMusic.path);
            /** 进入战斗 关闭自动寻路状态 */
            var _isstar = LocalStorage.getItem("isstarAutoGuaJi" + game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
            this._app.sceneRoot.hangup = 0;
            AutoHangUpModels.getInstance().isstar = parseInt(_isstar);
            this._app.sceneObjectMgr.mainUnit.xunluo = 0;
            this._app.sceneObjectMgr.mainUnit.stopwalk = 1;
            var allpost = [];
            //战斗开始请求停止移动
            // RequesterProtocols._instance.c2s_role_stop(allpost,this._app.sceneObjectMgr.mainUnit.target,game.modules.mainhud.models.HudModel.getInstance().movesceneid);
            RequesterProtocols._instance.c2s_role_move(this._app.sceneObjectMgr.mainUnit.target, this._app.sceneObjectMgr.mainUnit.target, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
            for (var index = 0; index < this._app.sceneRoot.allwalk.length; index++) { //清除行走特效
                this._app.sceneRoot.allwalk[index].clear();
            }
            this._battle = new battle.Battle(this._app, msg);
        };
        BattleProxy.prototype.onSSendWatchBattleStart = function (optcode, msg) {
            this._app.aCotrller.stop();
            if (this._battle) {
                console.warn("------ 已经在战场中");
                return;
            }
            var backMusic = this.BattleBackGroundMusicData[msg.backmusic];
            Laya.SoundManager.playMusic(backMusic.path);
            /** 进入战斗 关闭自动寻路状态 */
            var _isstar = LocalStorage.getItem("isstarAutoGuaJi" + game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
            this._app.sceneRoot.hangup = 0;
            AutoHangUpModels.getInstance().isstar = parseInt(_isstar);
            this._app.sceneObjectMgr.mainUnit.xunluo = 0;
            this._app.sceneObjectMgr.mainUnit.stopwalk = 1;
            var allpost = [];
            for (var index = 0; index < this._app.sceneRoot.allwalk.length; index++) { //清除行走特效
                this._app.sceneRoot.allwalk[index].clear();
            }
            this._battle = new battle.Battle(this._app, msg);
        };
        BattleProxy.prototype.onBattleEnd = function () {
            this._battle = null;
        };
        /** 战斗药品使用选择*/
        BattleProxy.prototype.onSelectTarget = function (detail) {
            /** 使用对象 */
            var userto = detail[0];
            /** 物品key */
            var itemkey = detail[1];
            /** 物品名称 */
            var itemName = detail[2];
            if (this.battle) {
                this.battle.drugOnSelectTarget(userto, itemkey, itemName);
            }
        };
        return BattleProxy;
    }());
    battle.BattleProxy = BattleProxy;
})(battle || (battle = {}));
//# sourceMappingURL=BattleProxy.js.map