/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var ModuleNames = /** @class */ (function () {
            function ModuleNames() {
                ModuleNames._instance = this;
                this.init();
            }
            ModuleNames.getInstance = function () {
                if (!this._instance) {
                    this._instance = new ModuleNames();
                }
                return this._instance;
            };
            ModuleNames.prototype.init = function () {
                this.moduleClassDic = new Laya.Dictionary();
                this.moduleClassDic[ModuleNames.CREATE_ROLE] = game.modules.createrole.CreateRoleModule;
                this.moduleClassDic[ModuleNames.ROLE_Info] = game.modules.roleinfo.RoleInfoModule;
                this.moduleClassDic[ModuleNames.SKILL] = game.modules.skill.SkillModule;
                //sugq
                this.moduleClassDic[ModuleNames.MAIN_MENU] = game.modules.mainhud.MainHudModule;
                this.moduleClassDic[ModuleNames.MAP_WORLD] = game.modules.mapworld.MapWorldModule;
                this.moduleClassDic[ModuleNames.REWARD] = game.modules.reward.RewardModule;
                this.moduleClassDic[ModuleNames.ACTIVITY] = game.modules.activity.ActivityModule;
                //by：lqw
                this.moduleClassDic[ModuleNames.FRIEND] = game.modules.friend.FriendSystemModule;
                this.moduleClassDic[ModuleNames.BAG] = game.modules.bag.BagSystemModule;
                this.moduleClassDic[ModuleNames.Chat] = game.modules.chat.ChatModule;
                this.moduleClassDic[ModuleNames.PET] = game.modules.pet.PetModule;
                this.moduleClassDic[ModuleNames.ACHIEVENT] = game.modules.achievent.AchieventModule;
                this.moduleClassDic[ModuleNames.STRENG_THENING] = game.modules.strengThening.StrengTheningModule;
                this.moduleClassDic[ModuleNames.HUOBAN] = game.modules.huoban.HuoBanModule;
                this.moduleClassDic[ModuleNames.Team] = game.modules.team.TeamModule;
                this.moduleClassDic[ModuleNames.SALE] = game.modules.sale.SaleModule;
                this.moduleClassDic[ModuleNames.TIPS] = game.modules.tips.tipsModule;
                this.moduleClassDic[ModuleNames.DisapperTips] = game.modules.commonUI.DisappearMessageTipsMediator;
                this.moduleClassDic[ModuleNames.TASK] = game.modules.task.TaskModule;
                this.moduleClassDic[ModuleNames.Family] = game.modules.family.FamilyJoinViewMediator;
                this.moduleClassDic[ModuleNames.haveFamily] = game.modules.family.FamilyModule;
                //by: cwp
                this.moduleClassDic[ModuleNames.RANKING_LIST] = game.modules.ranKingList.RanKingListModule;
                this.moduleClassDic[ModuleNames.RED_PACKET] = game.modules.redPacket.RedPacketModule;
                this.moduleClassDic[ModuleNames.SET_BASICS] = game.modules.setBasics.SetBasicsModule;
                this.moduleClassDic[ModuleNames.GUA_JI] = game.modules.guaji.GuaJiModule;
                this.moduleClassDic[ModuleNames.TIAN_JI_XIAN_LING] = game.modules.tianjixianling.TianJiXianLingModule;
                this.moduleClassDic[ModuleNames.SHOP] = game.modules.shop.ShopModule;
                this.moduleClassDic[ModuleNames.XIANHUI] = game.modules.xianhui.XianHui3V3Module;
            };
            ModuleNames.CREATE_ROLE = "CreateRole"; //创建角色
            ModuleNames.MAIN_MENU = "mainhud"; //主界面
            ModuleNames.HI_MAIN_MENU = "Menu"; //主界面- 底部，头部菜单
            ModuleNames.NPC_TALK = "NpcTalk"; //Npc对话界面
            ModuleNames.MISSION = "Mission"; //任务界面
            ModuleNames.ROLE_Info = "RoleInfo"; //角色系统
            ModuleNames.Chat = "liaotian"; //聊天
            ModuleNames.SKILL = "skill"; //技能
            ModuleNames.MAP_WORLD = "mapworld"; //世界地图
            ModuleNames.REWARD = "reward"; //奖励系统
            ModuleNames.ACTIVITY = "huodong"; //活动系统
            //_NR 表示不需要加载url 资源文件					
            ModuleNames.BAG_SMELT = "BagSmelt_NR"; //背包-熔炼
            ModuleNames.ACHIEVENT = "Achievement"; //成就界面
            ModuleNames.STRENG_THENING = "qianghua"; //强化系统
            ModuleNames.SALE = "sale"; //拍卖
            ModuleNames.TIPS = "tongyong"; //tips
            ModuleNames.SystemSetting = "tongyong"; //系统设置
            ModuleNames.Team = "team"; //队伍界面
            ModuleNames.DisapperTips = "tongyong"; //弹窗飘动提示
            ModuleNames.Family = "family"; //没有帮派
            ModuleNames.haveFamily = "havefamily"; //拥有帮派
            ModuleNames.SHOP = "shopui"; //商城系统
            //by：lqw
            ModuleNames.BAG = "Bag";
            ModuleNames.FRIEND = "friend"; //好友
            ModuleNames.PET = "pet";
            ModuleNames.HUOBAN = "huoban";
            //by: cwp
            ModuleNames.RANKING_LIST = "paihangbang"; //排行榜系统		
            ModuleNames.RED_PACKET = "redpacket"; //红包系统
            ModuleNames.SET_BASICS = "tongyong"; //系统设置
            ModuleNames.GUA_JI = "guaJi"; //挂机系统
            ModuleNames.TIAN_JI_XIAN_LING = "tianjixiangl"; //天机仙令
            ModuleNames.TASK = "task";
            ModuleNames.XIANHUI = "zhanxianhui";
            return ModuleNames;
        }());
        modules.ModuleNames = ModuleNames;
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ModuleNames.js.map